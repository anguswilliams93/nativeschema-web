import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY

// Who gets the internal enquiry notification. Comma-separated list supported.
// Falls back to BOOKING_RECIPIENT, then to both team inboxes.
const CONTACT_RECIPIENTS = (
  process.env.CONTACT_RECIPIENT ||
  process.env.BOOKING_RECIPIENT ||
  'angus@nativeschema.com,di@nativeschema.com'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

// Resend hosted template sent to the lead as their confirmation.
const LEAD_TEMPLATE_ID =
  process.env.RESEND_LEAD_TEMPLATE_ID || 'c0ad8ece-ec28-4ab7-8568-090e8240077d'

// Friendly labels for the service the lead picked, matching the contact form.
const SERVICE_LABELS: Record<string, string> = {
  'power-bi': 'Power BI Consulting & Dashboards',
  actionstep: 'Actionstep Workflow Design',
  'custom-software': 'Custom Software Development',
  integrations: 'System Integrations',
  migration: 'Migration Services',
  website: 'Website Design & Hosting',
  other: 'Other / Not Sure',
}

interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  message: string
  turnstileToken: string
}

async function verifyTurnstile(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET || '',
        response: token,
      }),
    })

    const data = await response.json()
    console.log('Turnstile verification response:', data)
    return { success: data.success, error: data['error-codes']?.join(', ') }
  } catch (err) {
    console.error('Turnstile verification error:', err)
    return { success: false, error: 'Verification request failed' }
  }
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, company, service, message, turnstileToken } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Please complete the security check' },
        { status: 400 }
      )
    }

    const turnstileResult = await verifyTurnstile(turnstileToken)
    if (!turnstileResult.success) {
      console.error('Turnstile failed:', turnstileResult.error)
      return NextResponse.json(
        { error: `Security verification failed: ${turnstileResult.error || 'Please try again.'}` },
        { status: 400 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const serviceLabel = service ? SERVICE_LABELS[service] || service : 'Not specified'

    // 1. Notify the team. This is the email that must succeed — if it fails the
    // enquiry is effectively lost, so we surface an error to the visitor.
    console.log('Sending team notification via Resend...')
    const { data, error } = await resend.emails.send({
      from: 'contact@noreply.nativeschema.com',
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service Interested In: ${serviceLabel}

Message:
${message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Service Interested In:</strong> ${serviceLabel}</p>
<hr />
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br />')}</p>
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: `Failed to send message: ${error.message}` },
        { status: 500 }
      )
    }

    // 2. Confirm to the lead using the Resend hosted template. Best-effort: a
    // failure here should not block the enquiry the team already received.
    try {
      const { error: leadError } = await resend.emails.send({
        from: 'Native Schema <contact@noreply.nativeschema.com>',
        to: email,
        replyTo: CONTACT_RECIPIENTS,
        template: {
          id: LEAD_TEMPLATE_ID,
          variables: {
            name,
            company: company || 'your team',
            email,
            service: serviceLabel,
            message,
          },
        },
      })
      if (leadError) console.error('Lead confirmation email error:', leadError)
    } catch (err) {
      console.error('Lead confirmation email threw:', err)
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
