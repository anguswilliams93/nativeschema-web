import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Resend webhook secret for verification (optional but recommended)
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET

// Team members to forward emails to
const FORWARD_TO = ['angus@nativeschema.com', 'di@nativeschema.com']

interface ResendEmailEvent {
  type: 'email.received'
  created_at: string
  data: {
    email_id: string
    from: string
    to: string[]
    subject: string
    text?: string
    html?: string
    attachments?: Array<{
      filename: string
      content_type: string
      content: string // base64 encoded
    }>
    headers: Record<string, string>
    raw?: string
  }
}

export async function POST(request: Request) {
  try {
    // Optional: Verify webhook signature
    const signature = request.headers.get('resend-signature')
    if (WEBHOOK_SECRET && signature) {
      // You can add signature verification here if needed
      // See: https://resend.com/docs/webhooks#verify-webhook-signature
    }

    const event: ResendEmailEvent = await request.json()

    // Only process email.received events
    if (event.type !== 'email.received') {
      return NextResponse.json({ received: true, processed: false })
    }

    const { from, to, subject, text, html } = event.data

    console.log('📧 Inbound email received:')
    console.log(`   From: ${from}`)
    console.log(`   To: ${to.join(', ')}`)
    console.log(`   Subject: ${subject}`)

    // Extract the local part of the receiving address (e.g., "support" from "support@helioshavo.resend.app")
    const recipientAddress = to[0] || ''
    const localPart = recipientAddress.split('@')[0]

    // Route based on the receiving address
    switch (localPart) {
      case 'support':
        await handleSupportEmail({ from, subject, text, html })
        break
      case 'hello':
        await handleGeneralInquiry({ from, subject, text, html })
        break
      case 'sales':
        await handleSalesInquiry({ from, subject, text, html })
        break
      default:
        // Default handler for any other address
        await handleInboundEmail({ from, to: recipientAddress, subject, text, html })
    }

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handler functions - customize these based on your needs

async function handleSupportEmail({ from, subject, text, html }: {
  from: string
  subject: string
  text?: string
  html?: string
}) {
  console.log(`🔧 Support request from ${from}: ${subject}`)

  // Example: Forward to your team, create a ticket, etc.
  // await forwardToSlack({ channel: '#support', from, subject, text })
  // await createZendeskTicket({ from, subject, text })
}

async function handleGeneralInquiry({ from, subject, text, html }: {
  from: string
  subject: string
  text?: string
  html?: string
}) {
  console.log(`📬 General inquiry from ${from}: ${subject}`)

  // Example: Forward to hello@nativeschema.com
  // await resend.emails.send({ to: 'hello@nativeschema.com', ... })
}

async function handleSalesInquiry({ from, subject, text, html }: {
  from: string
  subject: string
  text?: string
  html?: string
}) {
  console.log(`💰 Sales inquiry from ${from}: ${subject}`)

  // Example: Add to CRM, notify sales team
  // await addToHubspot({ email: from, subject, message: text })
}

async function handleDefaultEmail({ from, to, subject, text, html }: {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}) {
  console.log(`📩 Email to ${to} from ${from}: ${subject}`)

  // Default handling - log or forward
}

// Main inbound email handler - forwards to team and sends draft response
async function handleInboundEmail({ from, to, subject, text, html }: {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}) {
  console.log(`📩 Processing inbound email from ${from}: ${subject}`)

  // Extract sender's name from email (best effort)
  const senderName = extractNameFromEmail(from)

  // 1. Forward the original email to the team
  await forwardEmailToTeam({ from, to, subject, text, html })

  // 2. Send a draft response to the sender
  await sendDraftResponse({ to: from, senderName, originalSubject: subject })
}

function extractNameFromEmail(email: string): string {
  // Try to extract name from "Name <email@domain.com>" format
  const nameMatch = email.match(/^([^<]+)\s*</)
  if (nameMatch) {
    return nameMatch[1].trim()
  }
  // Otherwise use the local part of the email
  const localPart = email.split('@')[0].replace(/[._-]/g, ' ')
  return localPart.charAt(0).toUpperCase() + localPart.slice(1)
}

async function forwardEmailToTeam({ from, to, subject, text, html }: {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}) {
  const forwardedHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background-color: #f4f4f5;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 24px; color: white;">
      <h2 style="margin: 0 0 8px 0; font-size: 18px;">📧 New Inbound Email</h2>
      <p style="margin: 0; opacity: 0.8; font-size: 14px;">Received via ${to}</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #71717a; width: 80px; font-size: 14px;">From:</td>
          <td style="padding: 8px 0; font-weight: 600;">${from}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Subject:</td>
          <td style="padding: 8px 0; font-weight: 600;">${subject}</td>
        </tr>
      </table>
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;">
      <div style="font-size: 15px; line-height: 1.6; color: #27272a;">
        ${html || (text ? text.replace(/\n/g, '<br>') : '<em>No message content</em>')}
      </div>
    </div>
    <div style="padding: 16px 24px; background: #fafafa; border-top: 1px solid #e4e4e7;">
      <a href="mailto:${from}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #18181b; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Reply to ${extractNameFromEmail(from).split(' ')[0]}
      </a>
    </div>
  </div>
</body>
</html>
  `.trim()

  try {
    await resend.emails.send({
      from: 'Native Schema <notifications@noreply.nativeschema.com>',
      to: FORWARD_TO,
      subject: `[Inbound] ${subject}`,
      replyTo: from,
      html: forwardedHtml,
      text: `New email from ${from}\n\nSubject: ${subject}\n\n${text || 'No text content'}`,
    })
    console.log(`✅ Forwarded email to ${FORWARD_TO.join(', ')}`)
  } catch (error) {
    console.error('Failed to forward email:', error)
  }
}

async function sendDraftResponse({ to, senderName, originalSubject }: {
  to: string
  senderName: string
  originalSubject: string
}) {
  const firstName = senderName.split(' ')[0]

  const responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 32px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <img src="https://nativeschema.com/logo-horizontal.svg" alt="Native Schema" width="180" style="display: inline-block; max-width: 100%; height: auto; filter: brightness(0) invert(1);">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #18181b;">
                Hi ${firstName},
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #52525b; line-height: 1.6;">
                Thanks so much for reaching out! I'm Angus, one of the founders at Native Schema.
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #52525b; line-height: 1.6;">
                I'd love to learn more about what you're working on and see how we can help. Would you have some time this week for a quick chat?
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #52525b; line-height: 1.6;">
                <strong>What times work best for you?</strong> Feel free to reply with your availability, or if it's easier, you can book a time directly:
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="https://cal.com/nativeschema" style="display: inline-block; background-color: #18181b; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                      Book a Time to Chat
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #52525b; line-height: 1.6;">
                Looking forward to connecting!
              </p>

              <p style="margin: 0; font-size: 16px; color: #18181b;">
                Cheers,<br>
                <strong>Angus</strong><br>
                <span style="color: #71717a; font-size: 14px;">Co-Founder, Native Schema</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #e4e4e7; text-align: center;">
              <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                <tr>
                  <td align="center">
                    <img src="https://nativeschema.com/favicon.svg" alt="" width="32" height="32" style="display: block;">
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 12px 0;">
                <a href="https://linkedin.com/company/nativeschema" style="display: inline-block; margin: 0 8px; color: #71717a; text-decoration: none; font-size: 13px;">LinkedIn</a>
                <span style="color: #d4d4d8;">•</span>
                <a href="https://instagram.com/nativeschema" style="display: inline-block; margin: 0 8px; color: #71717a; text-decoration: none; font-size: 13px;">Instagram</a>
                <span style="color: #d4d4d8;">•</span>
                <a href="https://x.com/nativeschema" style="display: inline-block; margin: 0 8px; color: #71717a; text-decoration: none; font-size: 13px;">X</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #a1a1aa;">
                Level 2, 155 Queen St, Brisbane City QLD 4000, Australia
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const responseText = `Hi ${firstName},

Thanks so much for reaching out! I'm Angus, one of the founders at Native Schema.

I'd love to learn more about what you're working on and see how we can help. Would you have some time this week for a quick chat?

What times work best for you? Feel free to reply with your availability, or if it's easier, you can book a time directly: https://cal.com/nativeschema

Looking forward to connecting!

Cheers,
Angus
Co-Founder, Native Schema
`

  try {
    await resend.emails.send({
      from: 'Angus from Native Schema <angus@noreply.nativeschema.com>',
      to: to,
      subject: `Re: ${originalSubject}`,
      html: responseHtml,
      text: responseText,
    })
    console.log(`✅ Sent draft response to ${to}`)
  } catch (error) {
    console.error('Failed to send draft response:', error)
  }
}

// GET endpoint for webhook verification (if Resend requires it)
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' })
}
