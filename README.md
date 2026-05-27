This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

Set these in your hosting provider (for example, Vercel project settings). The
site builds without them, but the contact form and booking calendar need them
to work at runtime.

Email and spam protection (already in use):

- `RESEND_API_KEY` - Resend API key used to send contact and booking emails.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Cloudflare Turnstile site key (public).
- `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile secret key.

Booking calendar (Google Calendar integration in `app/api/booking`):

- `GOOGLE_CLIENT_EMAIL` - service account email.
- `GOOGLE_PRIVATE_KEY` - service account private key. Keep the literal `\n`
  sequences; the code converts them to newlines.
- `GOOGLE_IMPERSONATED_USER` - Workspace user the service account acts as.
  Required to invite the client as an attendee, and the service account must
  have domain-wide delegation for the `calendar.events` scope.
- `GOOGLE_CALENDAR_ID` - calendar to write events to. Defaults to the
  impersonated user, or `primary`.
- `BOOKING_TIMEZONE` - IANA timezone for the slots, for example
  `Australia/Brisbane`. Defaults to `Australia/Brisbane`.
- `BOOKING_RECIPIENT` - email address that receives booking notifications.
  Defaults to `angus@nativeschema.com`.

If the Google variables are not set, a booking still records by emailing the
team, but no calendar event is created automatically.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
