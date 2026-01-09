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
    title: 'Custom Software Development',
    description: 'Bespoke software solutions tailored to your unique business requirements. From concept to deployment, we build systems that grow with you.',
    simpleExplanation: "Think of this like having a suit tailored just for you, but for your business software. Instead of using generic off-the-shelf tools that sort of fit, we build applications designed specifically around how YOUR business works. Need a system to track your unique processes? A tool that does exactly what you need without the clutter? That's what we create.",
  },
  {
    title: 'System Integrations',
    description: 'Connect your business tools and automate data flow between platforms. Seamless integrations that eliminate manual work and reduce errors.',
    simpleExplanation: "You know how frustrating it is when your accounting software doesn't talk to your CRM, and you're copying data between spreadsheets? We fix that. We connect all your different business tools so they share information automatically. Enter data once, and it flows everywhere it needs to go. No more double-entry, no more mismatched records.",
  },
  {
    title: 'Business Intelligence & Analytics',
    description: 'Transform raw data into actionable insights. Custom dashboards and reports that drive informed decision-making.',
    simpleExplanation: "Your business generates tons of data every day, but it's often scattered and hard to understand. We turn that chaos into clear, visual dashboards that show you exactly how your business is performing. Imagine opening your computer and instantly seeing your sales trends, team performance, and growth opportunities in simple charts and graphs.",
  },
  {
    title: 'Migration Services',
    description: 'Smooth transitions between systems with zero data loss. We handle the complexity so you can focus on your business.',
    simpleExplanation: "Switching from one software system to another can feel like moving house while trying to run a business. We handle the heavy lifting. We carefully move all your data, history, and records from your old system to your new one without losing anything. You wake up one day and everything just works in the new system.",
  },
  {
    title: 'Automation Solutions',
    description: 'Streamline repetitive tasks and workflows. Intelligent automation that saves time and reduces operational costs.',
    simpleExplanation: "All those repetitive tasks eating up your team's time? Sending the same emails, updating the same spreadsheets, copying data from here to there? We build digital helpers that do these tasks automatically. Your team can focus on work that actually needs human creativity and judgment, while the routine stuff happens in the background.",
  },
  {
    title: 'System Reconciliation',
    description: 'Ensure data consistency across all your systems. Automated reconciliation processes that identify and resolve discrepancies.',
    simpleExplanation: "Ever notice that your customer count in one system doesn't match another? Or your financial records don't quite line up? We build tools that automatically check your systems against each other, flag any differences, and help you fix them. Think of it as a smart assistant that constantly double-checks your books across all your tools.",
  },
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
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
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
