'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Typewriter } from 'motion-plus/react'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'
import { EditableText } from '@/components/editable-text'
import { useAdmin } from '@/components/admin-provider'
=======
import { Typewriter, Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
import { AnimatedSection } from '@/components/animated-section'
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681

interface Service {
  title: string
  description: string
  highlights: string[]
  simpleExplanation: string
}

const defaultServices: Service[] = [
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
          {open && (
            <Typewriter speed={0.01}>
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

<<<<<<< HEAD
function EditServiceDialog({
  service,
  open,
  onOpenChange,
  onSave
}: {
  service: Service
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (service: Service) => void
}) {
  const [editData, setEditData] = useState(service)
  const [highlightsText, setHighlightsText] = useState(service.highlights.join('\n'))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Service</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={3}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Highlights (one per line)</label>
            <Textarea
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              rows={5}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Simple Explanation</label>
            <Textarea
              value={editData.simpleExplanation}
              onChange={(e) => setEditData({ ...editData, simpleExplanation: e.target.value })}
              rows={5}
              className="mt-1"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            onSave({ ...editData, highlights: highlightsText.split('\n').map(h => h.trim()).filter(Boolean) })
            onOpenChange(false)
          }}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
=======
function AutoplayController({ duration = 6000 }: { duration?: number }) {
  const { currentPage, nextPage } = useCarousel()
  const progress = useMotionValue(0)

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration: duration / 1000,
      ease: 'linear',
      onComplete: nextPage,
    })

    return () => animation.stop()
  }, [duration, nextPage, progress, currentPage])

  return null
}

function Pagination() {
  const { currentPage, totalPages, gotoPage } = useCarousel()

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <motion.button
          key={index}
          initial={false}
          animate={{
            scale: currentPage === index ? 1.2 : 1,
            backgroundColor: currentPage === index ? 'var(--primary)' : 'var(--muted)',
          }}
          className="w-2 h-2 rounded-full transition-colors"
          onClick={() => gotoPage(index)}
          aria-label={`Go to service ${index + 1}`}
        />
      ))}
    </div>
  )
}

function ServiceCard({ service, onLearnMore }: { service: typeof services[0], onLearnMore: () => void }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-3xl h-auto flex flex-col select-none mx-auto">
      <CardHeader className="text-center pb-4 pt-8">
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 md:px-12 pb-8">
        <CardDescription className="text-base md:text-lg text-center mb-6 leading-relaxed">
          {service.description}
        </CardDescription>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base text-muted-foreground mb-6">
          {service.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {highlight}
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
            onClick={(e) => {
              e.stopPropagation()
              onLearnMore()
            }}
          >
            What does this mean? →
          </Button>
        </div>
      </CardContent>
    </Card>
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
  )
}

export function ServicesSection() {
  const { isAdmin } = useAdmin()
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('content-services')
    if (stored) {
      try {
        setServices(JSON.parse(stored))
      } catch {
        setServices(defaultServices)
      }
    }
  }, [])

  const saveServices = (newServices: Service[]) => {
    setServices(newServices)
    localStorage.setItem('content-services', JSON.stringify(newServices))
  }

  const handleSaveService = (index: number, service: Service) => {
    const newServices = [...services]
    newServices[index] = service
    saveServices(newServices)
  }

  const serviceItems = services.map((service, index) => (
    <ServiceCard
      key={index}
      service={service}
      onLearnMore={() => setSelectedService(service)}
    />
  ))

  return (
    <section id="services" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
<<<<<<< HEAD
          <div className="text-center mb-16">
            <EditableText
              storageKey="services-label"
              defaultValue="WHAT WE DO"
              as="p"
              className="text-sm tracking-[0.3em] text-primary mb-4 font-medium"
            />
            <EditableText
              storageKey="services-title"
              defaultValue="Smart Solutions, Built for Business"
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <EditableText
              storageKey="services-description"
              defaultValue="We specialize in building intuitive systems that simplify complex technology and empower service businesses to scale."
              as="p"
              className="text-muted-foreground max-w-2xl mx-auto"
            />
          </div>
        </AnimatedSection>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 cursor-pointer relative"
                onClick={() => isAdmin ? setEditingIndex(index) : setSelectedService(service)}
              >
                {isAdmin && (
                  <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    Click to edit
                  </div>
                )}
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
                    {isAdmin ? 'Edit service →' : 'What does this mean? →'}
                  </Button>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
=======
          <div className="text-center mb-12 px-4">
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

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-4xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={serviceItems}
              gap={0}
              className="py-4"
            >
              <AutoplayController duration={8000} />
              <Pagination />
            </Carousel>
          </div>
        </AnimatedSection>
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681

        {selectedService && !isAdmin && (
          <ServiceDialog
            service={selectedService}
            open={!!selectedService}
            onOpenChange={(open) => !open && setSelectedService(null)}
          />
        )}

        {editingIndex !== null && isAdmin && (
          <EditServiceDialog
            service={services[editingIndex]}
            open={editingIndex !== null}
            onOpenChange={(open) => !open && setEditingIndex(null)}
            onSave={(service) => handleSaveService(editingIndex, service)}
          />
        )}
      </div>
    </section>
  )
}
