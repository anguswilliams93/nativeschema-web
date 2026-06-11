import { randomUUID } from 'node:crypto'

/** Extract the bare domain from an email address. */
function hostFromEmail(email: string): string {
  return email.split('@')[1]?.toLowerCase() ?? 'unknown'
}

/**
 * Best-effort push to the Zerobi bd-worker after a successful contact form
 * submission. This triggers the BD intake workflow (research brief, questionnaire
 * draft) for the lead.
 *
 * Self-gating: no-op unless NS_BD_WORKER_URL + NS_BD_WORKER_SECRET are set.
 * Never throws — a failure is logged and the contact form response is unaffected.
 *
 * Env vars:
 *   NS_BD_WORKER_URL     – Full URL to the bd-worker /leads/bd endpoint
 *                          e.g. https://bd.example.com/leads/bd (via cloudflared)
 *   NS_BD_WORKER_SECRET  – X-BD-Secret header value (matches BD_LEAD_SECRET in server/.env)
 */
export async function pushLeadToBdWorker({
  email,
  name,
  company,
  service,
  message,
}: {
  email: string
  name: string
  company: string
  service: string
  message: string
}): Promise<void> {
  const url = process.env.NS_BD_WORKER_URL
  const secret = process.env.NS_BD_WORKER_SECRET
  if (!url || !secret) return

  const host = hostFromEmail(email)

  // Build the note field: company + service + message give the workflow enough
  // context to research the prospect and draft the intake questionnaire.
  const note = [
    company ? `Company: ${company}` : null,
    service ? `Service interested in: ${service}` : null,
    message ? `Message:\n${message}` : null,
  ]
    .filter(Boolean)
    .join('\n\n')

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-BD-Secret': secret },
      body: JSON.stringify({
        leadId: randomUUID(),
        email,
        // Use the email domain as the prospect website — the workflow uses this
        // URL to research the company online.
        website: `https://${host}`,
        host,
        name: name || null,
        note: note || null,
      }),
    })
    if (!res.ok) {
      console.error('[contact] bd-worker push failed', res.status, await res.text())
    } else {
      console.log('[contact] bd-worker push accepted for', host)
    }
  } catch (err) {
    console.error('[contact] bd-worker push error', err)
  }
}
