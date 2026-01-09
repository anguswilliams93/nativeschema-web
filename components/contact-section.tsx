'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection } from '@/components/animated-section'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/nativeschema' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nativeschema' },
  { name: 'X', href: 'https://x.com/nativeschema' },
]

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'Process', href: '#process' },
  { name: 'Journal', href: '#articles' },
]

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto w-full">
        {/* CTA Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Shape the Future of{' '}
              <span className="text-primary">Your Business</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ready to build smarter systems? Let&apos;s discuss how we can help
              transform your operations.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <AnimatedSection direction="left" delay={0.2}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" placeholder="Your company name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection direction="right" delay={0.3}>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-4 font-medium">
                  NEW INQUIRIES
                </h3>
                <a
                  href="mailto:info@nativeschema.com"
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  info@nativeschema.com
                </a>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-4 font-medium">
                  GENERAL
                </h3>
                <a
                  href="mailto:hi@nativeschema.com"
                  className="text-xl font-medium hover:text-primary transition-colors"
                >
                  hi@nativeschema.com
                </a>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-4 font-medium">
                  LOCATION
                </h3>
                <p className="text-lg">
                  Level 2, 155 Queen St<br />
                  Brisbane City QLD 4000<br />
                  Australia
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-[0.2em] text-muted-foreground mb-4 font-medium">
                  SOCIAL
                </h3>
                <div className="flex gap-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <AnimatedSection direction="up" delay={0.4}>
          <div className="mt-24 pt-12 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                {/* Logo placeholder */}
                <span className="text-xl font-bold">Native Schema</span>
              </div>

              <nav className="flex flex-wrap justify-center gap-6">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Native Schema. All rights reserved.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
