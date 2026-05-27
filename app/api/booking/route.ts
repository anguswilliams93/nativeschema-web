import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

// Booking creates a real Google Calendar event. It relies on a Google service
// account. Set these environment variables in production:
//   GOOGLE_CLIENT_EMAIL        service account email
//   GOOGLE_PRIVATE_KEY         service account private key (newlines as \n)
//   GOOGLE_IMPERSONATED_USER   Workspace user to act as (required to invite
//                              attendees; needs domain-wide delegation)
//   GOOGLE_CALENDAR_ID         calendar to write to (defaults to the user above)
//   BOOKING_TIMEZONE           IANA timezone, e.g. Australia/Brisbane
// If the Google variables are absent the booking still succeeds and the team is
// emailed, but no calendar event is created.

export const runtime = 'nodejs'

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY
const BOOKING_TIMEZONE = process.env.BOOKING_TIMEZONE || 'Australia/Brisbane'
const BOOKING_RECIPIENT = process.env.BOOKING_RECIPIENT || 'angus@nativeschema.com'

interface BookingData {
  name: string
  email: string
  company?: string
  notes?: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  turnstileToken: string
}

async function verifyTurnstile(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: TURNSTILE_SECRET || '', response: token }),
    })
    const data = await response.json()
    return { success: data.success, error: data['error-codes']?.join(', ') }
  } catch (err) {
    console.error('Turnstile verification error:', err)
    return { success: false, error: 'Verification request failed' }
  }
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const hh = String(Math.floor(total / 60)).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url')
}

// Mint an OAuth access token for the service account via a signed JWT bearer.
async function getGoogleAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const subject = process.env.GOOGLE_IMPERSONATED_USER

  if (!clientEmail || !privateKey) {
    throw new Error('Google Calendar is not configured')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claim: Record<string, unknown> = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/calendar.events',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  // Impersonation (domain-wide delegation) is required to invite attendees.
  if (subject) claim.sub = subject

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`
  const signer = crypto.createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const signature = signer.sign(privateKey).toString('base64url')
  const assertion = `${unsigned}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.access_token) {
    throw new Error(`Google token exchange failed: ${data.error_description || data.error || res.status}`)
  }
  return data.access_token as string
}

async function createCalendarEvent(booking: BookingData): Promise<string> {
  const accessToken = await getGoogleAccessToken()
  const calendarId =
    process.env.GOOGLE_CALENDAR_ID || process.env.GOOGLE_IMPERSONATED_USER || 'primary'

  const endTime = addMinutes(booking.time, 30)
  const descriptionLines = [
    `Scoping call booked from the Native Schema website.`,
    ``,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Company: ${booking.company || 'Not provided'}`,
    ``,
    `What they want to cover:`,
    booking.notes || 'Not provided',
  ]

  const event = {
    summary: `Scoping call: Native Schema x ${booking.name}`,
    description: descriptionLines.join('\n'),
    start: { dateTime: `${booking.date}T${booking.time}:00`, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: `${booking.date}T${endTime}:00`, timeZone: BOOKING_TIMEZONE },
    attendees: [{ email: booking.email, displayName: booking.name }],
    reminders: { useDefault: true },
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  }

  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all&conferenceDataVersion=1`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    },
  )
  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Calendar event creation failed: ${data.error?.message || res.status}`)
  }
  return data.htmlLink as string
}

export async function POST(request: Request) {
  try {
    const body: BookingData = await request.json()
    const { name, email, company, notes, date, time, turnstileToken } = body

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Name, email, date and time are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return NextResponse.json({ error: 'Invalid date or time' }, { status: 400 })
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Please complete the security check' }, { status: 400 })
    }
    const turnstileResult = await verifyTurnstile(turnstileToken)
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: `Security verification failed: ${turnstileResult.error || 'Please try again.'}` },
        { status: 400 },
      )
    }

    // Create the calendar event. If Google is not configured we still record the
    // booking via email so nothing is lost.
    let calendarLink: string | null = null
    let calendarError: string | null = null
    try {
      calendarLink = await createCalendarEvent(body)
    } catch (err) {
      calendarError = err instanceof Error ? err.message : 'Unknown calendar error'
      console.error('Calendar booking error:', calendarError)
    }

    // Notify the team regardless of calendar outcome.
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'contact@noreply.nativeschema.com',
        to: BOOKING_RECIPIENT,
        replyTo: email,
        subject: `New scoping call: ${name} on ${date} at ${time}`,
        text: [
          `New 30-minute scoping call booked.`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || 'Not provided'}`,
          `When: ${date} at ${time} (${BOOKING_TIMEZONE})`,
          `Notes: ${notes || 'Not provided'}`,
          ``,
          calendarLink
            ? `Calendar event: ${calendarLink}`
            : `Calendar event was NOT created automatically: ${calendarError}. Please add it manually.`,
        ].join('\n'),
      })
    } catch (err) {
      console.error('Booking email error:', err)
      // If the calendar event also failed, the booking is effectively lost.
      if (!calendarLink) {
        return NextResponse.json(
          { error: 'We could not confirm your booking. Please try again or email us directly.' },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ success: true, calendar: Boolean(calendarLink) })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
