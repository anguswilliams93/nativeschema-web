'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated-section'
<<<<<<< HEAD
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'
import { EditableText } from '@/components/editable-text'
=======
import { Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
import {
  Search,
  ClipboardList,
  PenTool,
  Zap,
  CheckCircle2,
  Rocket,
  Headset,
  type LucideIcon
} from 'lucide-react'
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understand',
    description: 'We start by understanding your business, challenges, and goals. Through collaborative sessions, we map out requirements and identify opportunities for improvement.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Planning',
    subtitle: 'Strategise',
    description: 'Define scope, timelines, and deliverables. We create a roadmap that balances ambition with practicality, ensuring clear expectations from day one.',
    icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Architect',
    description: 'Craft user experiences and system architecture. We design solutions that are intuitive, scalable, and aligned with your brand and technical requirements.',
    icon: PenTool,
  },
  {
    number: '04',
    title: 'Development',
    subtitle: 'Build',
    description: 'Using agile methodologies, we build solutions in focused sprints. Regular feedback ensures we stay aligned with your vision throughout development.',
    icon: Zap,
  },
  {
    number: '05',
    title: 'Testing',
    subtitle: 'Validate',
    description: 'Rigorous quality assurance across functionality, performance, and security. We ensure your solution works flawlessly before it reaches your users.',
    icon: CheckCircle2,
  },
  {
    number: '06',
    title: 'Deployment',
    subtitle: 'Launch',
    description: 'We deploy robust, tested solutions with comprehensive documentation and training. Smooth transitions with minimal disruption to your operations.',
    icon: Rocket,
  },
  {
    number: '07',
    title: 'Support',
    subtitle: 'Evolve',
    description: 'Our partnership continues beyond launch. Ongoing support, monitoring, and iterative improvements ensure lasting success and continuous value.',
    icon: Headset,
  },
]

function AutoplayController({ duration = 4000 }: { duration?: number }) {
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
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

function ProcessCard({ step }: { step: Step }) {
  const Icon = step.icon
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-2xl h-auto flex flex-col select-none mx-auto">
      <CardHeader className="text-center pb-4 pt-8 px-6 md:px-8 flex-shrink-0">
        <div className="mb-3 flex justify-center">
          <Icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
        </div>
        <span className="text-xs tracking-[0.2em] text-primary font-medium uppercase">
          {step.subtitle}
        </span>
        <CardTitle className="text-xl md:text-2xl mt-2">
          <span className="text-primary/40 mr-2">{step.number}</span>
          {step.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 md:px-8 pb-8">
        <CardDescription className="text-base md:text-lg text-center leading-relaxed">
          {step.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export function ProcessSection() {
  const carouselItems = steps.map((step, index) => (
    <ProcessCard key={index} step={step} />
  ))

  return (
    <section id="process" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
<<<<<<< HEAD
          <div className="text-center mb-16">
            <EditableText
              storageKey="process-label"
              defaultValue="OUR APPROACH"
              as="p"
              className="text-sm tracking-[0.3em] text-primary mb-4 font-medium"
            />
            <EditableText
              storageKey="process-title"
              defaultValue="How We Work"
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <EditableText
              storageKey="process-description"
              defaultValue="A structured, transparent process that delivers results. We believe in collaboration, iteration, and precision."
              as="p"
              className="text-muted-foreground max-w-2xl mx-auto"
            />
          </div>
        </AnimatedSection>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <Card className="h-full bg-background border-none shadow-none">
                <CardHeader className="text-center pb-4">
                  <span className="text-5xl md:text-6xl font-bold text-primary/20 mb-4">
                    {step.number}
                  </span>
                  <CardTitle className="text-2xl">
                    <EditableText
                      storageKey={`process-step-${index}-title`}
                      defaultValue={step.title}
                      as="span"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    <EditableText
                      storageKey={`process-step-${index}-description`}
                      defaultValue={step.description}
                      as="span"
                    />
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
=======
          <div className="text-center mb-12 px-4">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              OUR APPROACH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured, transparent process that delivers results.
              We believe in collaboration, iteration, and precision.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-3xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={carouselItems}
              gap={0}
              className="py-4"
            >
              <AutoplayController duration={5000} />
              <Pagination />
            </Carousel>
          </div>
        </AnimatedSection>
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
      </div>
    </section>
  )
}
