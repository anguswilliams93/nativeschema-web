'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated-section'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { EditableText } from '@/components/editable-text'
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

function Pagination({ count, current, onSelect }: { count: number; current: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            current === index
              ? 'bg-primary scale-125'
              : 'bg-muted hover:bg-muted-foreground/50'
          }`}
          onClick={() => onSelect(index)}
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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <section id="process" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-12 px-4">
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

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-3xl mx-auto px-4">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
              className="py-4"
            >
              <CarouselContent>
                {steps.map((step, index) => (
                  <CarouselItem key={index}>
                    <ProcessCard step={step} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Pagination count={count} current={current} onSelect={scrollTo} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
