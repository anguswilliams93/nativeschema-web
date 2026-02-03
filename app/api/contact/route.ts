import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY

interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  message: string
  turnstileToken: string
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET || '',
      response: token,
    }),
  })

  const data = await response.json()
  return data.success
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

    const isValidToken = await verifyTurnstile(turnstileToken)
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Send email via Resend
    // TODO: Change 'to' to hello@nativeschema.com once domain is fully verified
    const { error } = await resend.emails.send({
      from: 'Native Schema <contact@noreply.nativeschema.com>',
      to: 'hello@nativeschema.com',
      replyTo: email,
      subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service Interested In: ${service || 'Not specified'}

Message:
${message}
      `.trim(),
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Service Interested In:</strong> ${service || 'Not specified'}</p>
<hr />
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br />')}</p>
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
