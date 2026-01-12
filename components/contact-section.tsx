'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'

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
    <section id="contact" className="min-h-screen flex items-center py-24 px-4 bg-background relative overflow-hidden">
      {/* Background gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* CTA Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm tracking-[0.3em] text-primary font-medium uppercase">
                Let&apos;s Work Together
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Shape the Future of{' '}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Your Business
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
              Ready to build smarter systems? Let&apos;s discuss how we can help
              transform your operations.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
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
              {/* Email Cards */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                  New Inquiries
                </h3>
                <a
                  href="mailto:info@nativeschema.com"
                  className="text-2xl font-bold hover:text-primary transition-colors block"
                >
                  info@nativeschema.com
                </a>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                  General
                </h3>
                <a
                  href="mailto:hi@nativeschema.com"
                  className="text-2xl font-bold hover:text-primary transition-colors block"
                >
                  hi@nativeschema.com
                </a>
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
                  Social
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
            </div>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <AnimatedSection direction="up" delay={0.4}>
          <div className="pt-16 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="flex items-center">
                <Image
                  src="/logo-text.svg"
                  alt="Native Schema"
                  width={480}
                  height={100}
                  className="h-16 md:h-20 lg:h-24 w-auto text-foreground"
                />
              </div>

              <nav className="flex flex-wrap justify-center gap-8">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Native Schema. All rights reserved.
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
