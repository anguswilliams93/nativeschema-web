'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/nativeschema' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nativeschema' },
  { name: 'X', href: 'https://x.com/nativeschema' },
]

export default function ContactPage() {
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
              <span className="text-sm tracking-[0.3em] text-primary mb-4 font-medium block">
                GET IN TOUCH
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Let&apos;s Build Something{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                Ready to transform your operations? We&apos;d love to hear about your project
                and discuss how we can help.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form */}
            <AnimatedSection direction="left" delay={0.2} className="lg:col-span-3">
              <form className="space-y-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Company
                  </label>
                  <Input id="company" placeholder="Your company name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Service Interested In
                  </label>
                  <Input id="service" placeholder="e.g., Power BI, Custom Software, Integrations" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold">
                  Send Message
                </Button>
              </form>
            </AnimatedSection>

            {/* Contact Info Cards */}
            <AnimatedSection direction="right" delay={0.3} className="lg:col-span-2">
              <div className="space-y-6">
                {/* Primary Email */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                    Email Us
                  </h3>
                  <a
                    href="mailto:di@nativeschema.com"
                    className="text-2xl font-bold hover:text-primary transition-colors block"
                  >
                    di@nativeschema.com
                  </a>
                  <p className="text-muted-foreground mt-2 text-sm">
                    For all inquiries, project discussions, and support
                  </p>
                </div>

                {/* Response Time */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                    Response Time
                  </h3>
                  <p className="text-lg font-medium">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>

                {/* Location Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                    Location
                  </h3>
                  <p className="text-lg leading-relaxed font-medium">
                    Level 2, 155 Queen St<br />
                    Brisbane City QLD 4000<br />
                    Australia
                  </p>
                </div>

                {/* Social Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-4 font-bold uppercase">
                    Follow Us
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* View Services CTA */}
                <div className="pt-4">
                  <Button size="lg" variant="outline" className="w-full" asChild>
                    <Link href="/services">View Our Services</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Native Schema. All rights reserved.
          </p>
          <nav className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Services
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
