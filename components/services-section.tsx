'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Typewriter } from 'motion-plus/react'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'

const services = [
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

function ServiceDialog({ service, open, onOpenChange }: {
  service: typeof services[0]
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
          {open && (
            <Typewriter speed={0.02}>
              {service.simpleExplanation}
            </Typewriter>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section id="services" className="min-h-screen flex items-center py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              WHAT WE DO
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Solutions, Built for Business
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in building intuitive systems that simplify complex technology
              and empower service businesses to scale.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {service.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="mt-4 text-primary p-0 h-auto">
                    What does this mean? →
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {selectedService && (
          <ServiceDialog
            service={selectedService}
            open={!!selectedService}
            onOpenChange={(open) => !open && setSelectedService(null)}
          />
        )}
      </div>
    </section>
  )
}
