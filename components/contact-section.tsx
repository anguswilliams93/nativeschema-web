'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'

const quickLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'How We Work', href: '/how-we-work' },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 bg-card border-t border-border/40 relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* CTA Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-eyebrow">
                Let&apos;s Work Together
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.02]">
              Shape the Future of{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Your Business
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl mb-8">
              Ready to build smarter systems? Book a free 30-minute scoping call
              and we will map out exactly how connected data and Power BI
              reporting could work for your business. No cost, no obligation,
              just a clear plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact#book">Book a 30-minute scope</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="pt-16 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="flex items-center">
                <LogoHorizontal className="h-8 md:h-10 w-auto" />
              </div>

              <nav className="flex flex-wrap justify-center gap-8">
                {quickLinks.map((link) => (
                  link.href.startsWith('/') ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </nav>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                (c) {new Date().getFullYear()} Native Schema. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
