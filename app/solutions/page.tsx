'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'
import { SolutionsShowcase } from '@/components/featured-solutions-section'

export default function SolutionsPage() {
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
                OUR WORK
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-[1.02]">
                Solutions That Drive{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Real Change
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                Real projects we have shipped for clients and the wider
                community, from government spending transparency to business
                intelligence dashboards and custom CRMs.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 px-4 bg-muted/30 border-y border-border/40">
        <SolutionsShowcase showHeader={false} />
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Tell us what you are trying to fix and we will map out how the same
              approach could work for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
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
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Solutions
            </Link>
            <Link href="/industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Industries
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
