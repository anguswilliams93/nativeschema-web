import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Booking creates a real Outlook (Microsoft 365) calendar event via Microsoft
// Graph, using the OAuth2 client-credentials flow. Set these environment
// variables in production:
//   MS_TENANT_ID       Azure AD / Entra tenant ID
//   MS_CLIENT_ID       App registration (client) ID
//   MS_CLIENT_SECRET   App registration client secret
//   MS_CALENDAR_USER   UPN/mailbox whose calendar receives events
//                      (e.g. angus@nativeschema.com or a shared bookings mailbox)
//   BOOKING_TIMEZONE   IANA timezone, e.g. Australia/Brisbane
// The app registration needs the Calendars.ReadWrite *application* permission
// with admin consent. If the MS_* variables are absent the booking still
// succeeds and the team is emailed, but no calendar event is created.

export const runtime = 'nodejs'

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY
const BOOKING_TIMEZONE = process.env.BOOKING_TIMEZONE || 'Australia/Brisbane'
const BOOKING_RECIPIENT = process.env.BOOKING_RECIPIENT || 'angus@nativeschema.com'

interface BookingData {
  name: string
  email: string
  company?: string
  service?: string
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

// Exchange the app registration credentials for a Microsoft Graph access token.
async function getGraphAccessToken(): Promise<string> {
  const tenant = process.env.MS_TENANT_ID
  const clientId = process.env.MS_CLIENT_ID
  const clientSecret = process.env.MS_CLIENT_SECRET

  if (!tenant || !clientId || !clientSecret) {
    throw new Error('Microsoft 365 calendar is not configured')
  }

  const res = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials',
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.access_token) {
    throw new Error(`Microsoft token request failed: ${data.error_description || data.error || res.status}`)
  }
  return data.access_token as string
}

async function createCalendarEvent(booking: BookingData): Promise<string> {
  const accessToken = await getGraphAccessToken()
  const user = process.env.MS_CALENDAR_USER || BOOKING_RECIPIENT
  const endTime = addMinutes(booking.time, 30)

  const descriptionLines = [
    `Scoping call booked from the Native Schema website.`,
    ``,
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Company: ${booking.company || 'Not provided'}`,
    `Type of work: ${booking.service || 'Not specified'}`,
    ``,
    `What they want to cover:`,
    booking.notes || 'Not provided',
  ]

  const event = {
    subject: `Scoping call: Native Schema x ${booking.name}${booking.service ? ` - ${booking.service}` : ''}`,
    body: { contentType: 'Text', content: descriptionLines.join('\n') },
    start: { dateTime: `${booking.date}T${booking.time}:00`, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: `${booking.date}T${endTime}:00`, timeZone: BOOKING_TIMEZONE },
    attendees: [
      { emailAddress: { address: booking.email, name: booking.name }, type: 'required' },
    ],
    isOnlineMeeting: true,
    onlineMeetingProvider: 'teamsForBusiness',
  }

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(user)}/events`,
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
  return (data.webLink as string) || 'created'
}

export async function POST(request: Request) {
  try {
    const body: BookingData = await request.json()
    const { name, email, company, service, notes, date, time, turnstileToken } = body

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

    // Create the calendar event. If Microsoft 365 is not configured we still
    // record the booking via email so nothing is lost.
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
          `Type of work: ${service || 'Not specified'}`,
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
