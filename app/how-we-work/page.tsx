'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'
import { ProcessSection } from '@/components/process-section'

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up">
            <div className="text-center">
              <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                <LogoHorizontal className="h-10 w-auto mx-auto" />
              </Link>
              <span className="text-eyebrow mb-4 block">
                OUR APPROACH
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-[1.02]">
                How We{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Work
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                Good systems are built on a clear process. From the first
                conversation to long after launch, every engagement follows the
                same seven structured steps. You always know what is happening,
                why it matters, and what comes next, so there are no surprises
                and no wasted effort.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process steps - distinct surface for clear separation */}
      <section className="bg-muted/30 border-y border-border/40">
        <ProcessSection showHeader={false} />
      </section>

      {/* Why the process matters */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <span className="text-eyebrow mb-4 block">
                WHY IT MATTERS
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                A Process Built Around You
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We keep the work transparent and collaborative at every stage.
                You stay close to the decisions that shape your systems, and we
                handle the technical detail. The result is software and reporting
                that fit the way your business actually runs, delivered without
                drama.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-card border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Book a free 30-minute scoping call and we will map out the first
              few steps together. No obligation, just a clear plan for what
              smarter systems could look like for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact#book">Book a 30-minute scope</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View Our Services</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            (c) {new Date().getFullYear()} Native Schema. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/how-we-work" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              How We Work
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
