'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Turnstile } from '@marsidev/react-turnstile'
import {
  BarChart3,
  Briefcase,
  Code,
  Link2,
  ArrowRightLeft,
  Globe,
  HelpCircle,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/nativeschema' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/nativeschema' },
  { name: 'X', href: 'https://x.com/nativeschema' },
]

const services = [
  { value: 'power-bi', label: 'Power BI Consulting & Dashboards', icon: BarChart3 },
  { value: 'actionstep', label: 'Actionstep Workflow Design', icon: Briefcase },
  { value: 'custom-software', label: 'Custom Software Development', icon: Code },
  { value: 'integrations', label: 'System Integrations', icon: Link2 },
  { value: 'migration', label: 'Migration Services', icon: ArrowRightLeft },
  { value: 'website', label: 'Website Design & Hosting', icon: Globe },
  { value: 'other', label: 'Other / Not Sure', icon: HelpCircle },
]

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [targetMessage, setTargetMessage] = useState('')
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)

  // Typewriter effect for auto-generated messages
  useEffect(() => {
    if (!targetMessage || !isTyping) return

    let currentIndex = 0
    setFormData(prev => ({ ...prev, message: '' }))

    const typeNextChar = () => {
      if (currentIndex < targetMessage.length) {
        setFormData(prev => ({
          ...prev,
          message: targetMessage.slice(0, currentIndex + 1)
        }))
        currentIndex++
        typewriterRef.current = setTimeout(typeNextChar, 15)
      } else {
        setIsTyping(false)
        setTargetMessage('')
      }
    }

    typewriterRef.current = setTimeout(typeNextChar, 100)

    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [targetMessage, isTyping])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleServiceChange = (value: string) => {
    const serviceLabel = services.find(s => s.value === value)?.label || ''

    // Clear any ongoing typewriter effect
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current)
    }

    setFormData(prev => {
      // Only auto-fill message if it's empty or was auto-generated
      const shouldAutoFill = !prev.message || prev.message.startsWith('Hi,') || prev.message.startsWith('Hi\n') || isTyping

      if (shouldAutoFill && value && value !== 'other') {
        const greeting = prev.name ? `Hi, I'm ${prev.name}` : 'Hi'
        const companyPart = prev.company ? ` from ${prev.company}` : ''
        const emailPart = prev.email ? `\n\nYou can reach me at ${prev.email}.` : ''
        const newMessage = `${greeting}${companyPart}.\n\nI'm interested in your ${serviceLabel} service and would love to learn more about how you can help.${emailPart}\n\nLooking forward to hearing from you!`

        // Trigger typewriter effect
        setTargetMessage(newMessage)
        setIsTyping(true)

        return { ...prev, service: value }
      }

      return { ...prev, service: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    if (!formData.service) {
      setStatus('error')
      setErrorMessage('Please select a service you are interested in')
      return
    }

    if (!turnstileToken) {
      setStatus('error')
      setErrorMessage('Please complete the security check')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

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
              <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-10 shadow-xl">
                {status === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-600 dark:text-green-400 text-center">
                    Thank you! Your message has been sent. We&apos;ll be in touch soon.
                  </div>
                )}
                {status === 'error' && errorMessage && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-center">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="h-12"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="h-12"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Company
                  </label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    className="h-12"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Service Interested In <span className="text-red-500">*</span>
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-between text-left font-normal"
                      >
                        {formData.service ? (
                          <span className="flex items-center gap-2">
                            {(() => {
                              const service = services.find(s => s.value === formData.service)
                              if (service) {
                                const Icon = service.icon
                                return (
                                  <>
                                    <Icon className="size-4 text-primary" />
                                    {service.label}
                                  </>
                                )
                              }
                              return null
                            })()}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Select a service...</span>
                        )}
                        <ChevronDown className="size-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                      <DropdownMenuLabel>Our Services</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={formData.service} onValueChange={handleServiceChange}>
                        {services.map((service) => {
                          const Icon = service.icon
                          return (
                            <DropdownMenuRadioItem key={service.value} value={service.value}>
                              <Icon className="size-4 text-primary" />
                              {service.label}
                            </DropdownMenuRadioItem>
                          )
                        })}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-semibold"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </AnimatedSection>

            {/* Contact Info Cards */}
            <AnimatedSection direction="right" delay={0.3} className="lg:col-span-2">
              <div className="space-y-6">
                {/* Response Time */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xs tracking-[0.25em] text-muted-foreground mb-3 font-bold uppercase">
                    Response Time
                  </h3>
                  <p className="text-lg font-medium">
                    We typically respond within 24 hours during business days.
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
            <Link href="/industries" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Industries
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
