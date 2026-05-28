'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'
import { PowerBiDashboard } from '@/components/power-bi-dashboard'

const capabilities = [
  {
    title: 'Connected to your systems',
    body: 'Live links to Xero, your CRM, practice-management and operational data — no manual exports, refreshed automatically every morning.',
  },
  {
    title: 'Built for decisions',
    body: 'Executive KPIs, revenue trends, service-line profitability and target tracking, laid out so the answer is obvious at a glance.',
  },
  {
    title: 'Designed, not templated',
    body: 'A clean, branded report that matches how your business actually thinks — not a generic dashboard bolted onto your data.',
  },
]

export default function PowerBiDemoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-4 pb-12 pt-32 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection direction="up">
            <div className="text-center">
              <Link href="/" className="mb-8 inline-block transition-opacity hover:opacity-80">
                <LogoHorizontal className="mx-auto h-10 w-auto" />
              </Link>
              <span className="text-eyebrow mb-4 block">BUSINESS INTELLIGENCE · DEMO</span>
              <h1 className="mb-6 text-4xl font-semibold leading-[1.02] md:text-5xl lg:text-6xl">
                A Power BI report,{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  designed for you.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                A live-style mock-up of the kind of executive dashboard we build,
                connected to your data, refreshed automatically, and laid out for fast decisions.
                Sample figures shown for illustration.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The dashboard mock */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection direction="up" delay={0.1}>
            <PowerBiDashboard />
          </AnimatedSection>
        </div>
      </section>

      {/* What you're looking at */}
      <section className="border-y border-border/40 bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection direction="up">
            <div className="mb-12 text-center">
              <span className="text-eyebrow mb-4 block">WHAT MAKES IT WORK</span>
              <h2 className="text-3xl font-semibold md:text-4xl">More than charts on a page</h2>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <AnimatedSection key={c.title} direction="up" delay={i * 0.1}>
                <div className="neon-hover h-full rounded-xl border-2 border-border bg-card p-6">
                  <h3 className="mb-3 text-lg font-semibold">{c.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection direction="up">
            <h2 className="mb-6 text-3xl font-semibold md:text-4xl">Want one built on your numbers?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              We will connect your systems and design a report your whole team
              actually uses. Book a free scoping call to see what is possible.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact#book">Book a 30-minute scope</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/solutions">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Solutions
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} Native Schema. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Home</Link>
            <Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">Services</Link>
            <Link href="/solutions" className="text-sm text-muted-foreground transition-colors hover:text-primary">Solutions</Link>
            <Link href="/how-we-work" className="text-sm text-muted-foreground transition-colors hover:text-primary">How We Work</Link>
            <Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
