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
// Comma-separated list supported, e.g. "angus@nativeschema.com,di@nativeschema.com".
const BOOKING_RECIPIENTS = (process.env.BOOKING_RECIPIENT || 'angus@nativeschema.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

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

// Human-friendly "Wed 11 Jun 2026 at 2:30 PM" from raw date/time parts.
function formatWhen(date: string, time: string): string {
  const [y, mo, d] = date.split('-').map(Number)
  const [h, mi] = time.split(':').map(Number)
  const dt = new Date(Date.UTC(y, mo - 1, d, h, mi))
  const day = dt.toLocaleDateString('en-AU', { weekday: 'short', timeZone: 'UTC' })
  const dnum = dt.toLocaleDateString('en-AU', { day: 'numeric', timeZone: 'UTC' })
  const month = dt.toLocaleDateString('en-AU', { month: 'short', timeZone: 'UTC' })
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  const t = `${hour12}:${String(mi).padStart(2, '0')} ${period}`
  return `${day} ${dnum} ${month} ${y} at ${t}`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function bookerHtml(args: {
  name: string
  whenLabel: string
  timezone: string
  notes?: string
  calendarLink: string | null
}): string {
  const { name, whenLabel, timezone, notes, calendarLink } = args
  const meetingBlock = calendarLink
    ? `<p style="margin:0 0 16px"><a href="${escapeHtml(calendarLink)}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600">View the meeting &amp; video link</a></p>`
    : `<p style="margin:0 0 16px;color:#475569">We'll send through the video meeting link before the call. Need to reschedule? Just reply to this email.</p>`
  const notesBlock = notes
    ? `<p style="margin:16px 0 0;color:#475569"><strong>What you wanted to cover:</strong><br/>${escapeHtml(notes).replace(/\n/g, '<br/>')}</p>`
    : ''
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
  <h2 style="margin:0 0 8px">You're booked in 🎉</h2>
  <p style="margin:0 0 16px;color:#475569">Hi ${escapeHtml(name)}, thanks for booking a 30-minute scoping call with Native Schema.</p>
  <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
    <tr><td style="padding:8px 0;color:#64748b;width:90px">When</td><td style="padding:8px 0;font-weight:600">${escapeHtml(whenLabel)}</td></tr>
    <tr><td style="padding:8px 0;color:#64748b">Timezone</td><td style="padding:8px 0">${escapeHtml(timezone)}</td></tr>
    <tr><td style="padding:8px 0;color:#64748b">Duration</td><td style="padding:8px 0">30 minutes</td></tr>
  </table>
  ${meetingBlock}
  ${notesBlock}
  <p style="margin:24px 0 0;color:#94a3b8;font-size:13px">Native Schema</p>
</div>`.trim()
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

    const resend = new Resend(process.env.RESEND_API_KEY)
    const whenLabel = formatWhen(date, time)

    // Notify the team regardless of calendar outcome.
    let teamEmailed = false
    try {
      await resend.emails.send({
        from: 'contact@noreply.nativeschema.com',
        to: BOOKING_RECIPIENTS,
        replyTo: email,
        subject: `New scoping call: ${name} on ${date} at ${time}`,
        text: [
          `New 30-minute scoping call booked.`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || 'Not provided'}`,
          `When: ${whenLabel} (${BOOKING_TIMEZONE})`,
          `Notes: ${notes || 'Not provided'}`,
          ``,
          calendarLink
            ? `Calendar event: ${calendarLink}`
            : `Calendar event was NOT created automatically: ${calendarError}. Please add it manually.`,
        ].join('\n'),
      })
      teamEmailed = true
    } catch (err) {
      console.error('Booking team email error:', err)
    }

    // Confirm to the person who booked. Until calendar invites are wired up this
    // is the only thing that lands in their inbox, so it is the real confirmation.
    let bookerEmailed = false
    try {
      await resend.emails.send({
        from: 'Native Schema <contact@noreply.nativeschema.com>',
        to: email,
        replyTo: BOOKING_RECIPIENTS,
        subject: `Your scoping call with Native Schema — ${whenLabel}`,
        text: [
          `Hi ${name},`,
          ``,
          `Thanks for booking a 30-minute scoping call with Native Schema.`,
          ``,
          `When: ${whenLabel} (${BOOKING_TIMEZONE})`,
          `Duration: 30 minutes`,
          ``,
          calendarLink
            ? `Join / view the meeting: ${calendarLink}`
            : `We will send through the video meeting link before the call. If you need to reschedule, just reply to this email.`,
          ``,
          notes ? `What you wanted to cover:\n${notes}\n` : ``,
          `Talk soon,`,
          `Native Schema`,
        ].join('\n'),
        html: bookerHtml({ name, whenLabel, timezone: BOOKING_TIMEZONE, notes, calendarLink }),
      })
      bookerEmailed = true
    } catch (err) {
      console.error('Booking confirmation email error:', err)
    }

    // The booking is only lost if nothing reached anyone and no calendar event exists.
    if (!calendarLink && !teamEmailed && !bookerEmailed) {
      return NextResponse.json(
        { error: 'We could not confirm your booking. Please try again or email us directly.' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      calendar: Boolean(calendarLink),
      confirmationEmailed: bookerEmailed,
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
