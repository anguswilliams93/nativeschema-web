'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { LogoHorizontal } from '@/components/logo'

interface Service {
  title: string
  description: string
  highlights: string[]
  simpleExplanation: string
}

const services: Service[] = [
  {
    title: 'Power BI Consulting & Dashboards',
    description: 'Custom Power BI dashboards tailored to your business. Executive reporting, financial performance, marketing ROI, and operational KPIs — all connected to your systems and updated automatically.',
    highlights: [
      'Executive & board reporting',
      'Financial performance & profitability',
      'Marketing ROI & lead conversion',
      'Data integration & automation',
      'Dashboard cleanup & optimisation',
    ],
    simpleExplanation: "Stop manually exporting spreadsheets. We create bespoke Power BI dashboards that connect directly to your accounting, CRM, practice management, and other systems. Your reports update automatically — accurate, consistent, and audit-ready. Perfect for CFOs, COOs, and directors who need clarity on revenue, profitability, WIP, and cash flow without digging through spreadsheets.",
  },
  {
    title: 'Actionstep Workflow Design',
    description: 'Bespoke Actionstep workflows for law firms. Matter intake, automated tasks, document generation, billing workflows, and compliance controls — designed around how your firm actually operates.',
    highlights: [
      'Custom workflow design',
      'Automated tasks & deadlines',
      'Document generation',
      'Intake & CRM alignment',
      'System cleanup & optimisation',
    ],
    simpleExplanation: "No two law firms run the same way, so why use generic workflows? We design Actionstep workflows aligned to your firm's structure and work types. Automated task creation, deadline triggers, document generation, and billing workflows that actually work. The result? Consistent file progression, fewer errors, and your team spending less time managing the system and more time on billable work.",
  },
  {
    title: 'Custom Software Development',
    description: 'Bespoke software solutions tailored to your unique business requirements. From concept to deployment, we build systems that grow with you.',
    highlights: [
      'Web & mobile applications',
      'Internal business tools',
      'Client portals & dashboards',
      'API development',
      'Legacy system modernisation',
    ],
    simpleExplanation: "Think of this like having a suit tailored just for you, but for your business software. Instead of using generic off-the-shelf tools that sort of fit, we build applications designed specifically around how YOUR business works. Need a system to track your unique processes? A tool that does exactly what you need without the clutter? That's what we create.",
  },
  {
    title: 'System Integrations',
    description: 'Connect your business tools and automate data flow between platforms. Seamless integrations that eliminate manual work and reduce errors.',
    highlights: [
      'CRM & accounting sync',
      'Practice management links',
      'API & webhook connections',
      'Real-time data flow',
      'Error handling & monitoring',
    ],
    simpleExplanation: "You know how frustrating it is when your accounting software doesn't talk to your CRM, and you're copying data between spreadsheets? We fix that. We connect all your different business tools so they share information automatically. Enter data once, and it flows everywhere it needs to go. No more double-entry, no more mismatched records.",
  },
  {
    title: 'Migration Services',
    description: 'Smooth transitions between systems with zero data loss. We handle the complexity so you can focus on your business.',
    highlights: [
      'Data extraction & mapping',
      'Historical record migration',
      'Validation & testing',
      'Parallel running support',
      'Post-migration cleanup',
    ],
    simpleExplanation: "Switching from one software system to another can feel like moving house while trying to run a business. We handle the heavy lifting. We carefully move all your data, history, and records from your old system to your new one without losing anything. You wake up one day and everything just works in the new system.",
  },
  {
    title: 'Website Design & Hosting',
    description: 'Professional websites without the ongoing pain. Tired of spending hundreds of dollars a month on hosting? We build fast, modern websites with affordable hosting solutions.',
    highlights: [
      'Custom website design',
      'Low-cost hosting options',
      'SEO optimisation',
      'Mobile-responsive layouts',
      'Ongoing support & updates',
    ],
    simpleExplanation: "Sick of paying $200, $300, or more every month just to keep your website running? We build professional, fast websites using modern technology that costs a fraction of what traditional agencies charge for hosting. You get a great-looking site that actually converts visitors into clients — without the monthly hosting bill eating into your profits.",
  }
]

function TypewriterExplanation({ text, isVisible }: { text: string; isVisible: boolean }) {
  const words = text.split(' ')

  if (!isVisible) return null

  return (
    <p className="leading-relaxed">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.15,
            delay: index * 0.04,
            ease: 'easeOut'
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}

function ServiceDialog({ service, open, onOpenChange }: {
  service: Service
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.title}</DialogTitle>
          <DialogDescription className="text-base pt-2">
            In simple terms...
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 text-foreground leading-relaxed min-h-[120px]">
          <TypewriterExplanation text={service.simpleExplanation} isVisible={open} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ServiceCard({
  service,
  onClick
}: {
  service: Service
  onClick: () => void
}) {
  return (
    <Card
      className="transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer select-none h-full"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4">
          {service.description}
        </CardDescription>
        <ul className="space-y-1.5 text-sm text-muted-foreground mb-4">
          {service.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {highlight}
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
          Learn more →
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

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
                OUR SERVICES
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Solutions,{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Built for Business
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                We specialize in building intuitive systems that simplify complex technology
                and empower service businesses to scale.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} direction="up" delay={index * 0.1}>
                <ServiceCard
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your operations with smarter systems
              and seamless integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </AnimatedSection>
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

      {/* Service Dialog */}
      {selectedService && (
        <ServiceDialog
          service={selectedService}
          open={!!selectedService}
          onOpenChange={(open) => !open && setSelectedService(null)}
        />
      )}
    </main>
  )
}
