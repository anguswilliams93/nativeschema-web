'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, type MotionValue } from 'motion/react'
import { AnimatedSection } from '@/components/animated-section'
import { EditableText } from '@/components/editable-text'
import { EASE_OUT } from '@/lib/motion'
import {
  Search,
  ClipboardList,
  PenTool,
  Zap,
  CheckCircle2,
  Rocket,
  Headset,
  Flag,
  RefreshCw,
  type LucideIcon,
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

/** Lights up once the scroll-progress line has travelled past this fraction. */
function useReached(progress: MotionValue<number>, threshold: number) {
  const [reached, setReached] = useState(false)
  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= threshold && !reached) setReached(true)
    else if (v < threshold && reached) setReached(false)
  })
  return reached
}

function StepRow({
  step,
  index,
  total,
  progress,
}: {
  step: Step
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const Icon = step.icon
  const isLeft = index % 2 === 0
  // Node sits roughly at the vertical centre of its row.
  const reached = useReached(progress, (index + 0.5) / total)

  return (
    <div className="relative lg:grid lg:min-h-[8.5rem] lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-4">
      {/* Milestone node — on the spine */}
      <div className="absolute left-8 top-7 z-20 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background transition-all duration-500 ${
            reached
              ? 'border-neon shadow-[0_0_0_4px_color-mix(in_oklch,var(--neon)_12%,transparent),0_0_28px_-4px_var(--neon)]'
              : 'border-border'
          }`}
        >
          <Icon
            className={`h-6 w-6 transition-colors duration-500 ${reached ? 'text-neon' : 'text-muted-foreground'}`}
            strokeWidth={1.75}
          />
          {/* Step number badge */}
          <span
            className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-card font-mono text-[10px] font-semibold transition-colors duration-500 ${
              reached ? 'border-neon/40 text-neon' : 'border-border text-muted-foreground'
            }`}
          >
            {step.number}
          </span>
        </div>
      </div>

      {/* Card — alternates sides on desktop, always right of the rail on mobile */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -32 : 32, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={`relative pb-12 pl-20 lg:pb-0 lg:pl-0 ${
          isLeft ? 'lg:col-start-1 lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'
        }`}
      >
        <div className="group neon-hover relative overflow-hidden rounded-xl border-2 border-border bg-card/60 p-6 backdrop-blur-sm sm:p-7">
          {/* Ghost number watermark */}
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-4 font-mono text-7xl font-bold leading-none text-neon/[0.06] ${
              isLeft ? 'left-4 lg:left-auto lg:right-4' : 'left-4'
            }`}
          >
            {step.number}
          </span>
          <span className={`text-eyebrow mb-2 block ${isLeft ? 'lg:text-right' : ''}`}>
            {step.subtitle}
          </span>
          <h3 className="relative mb-3 text-xl font-semibold sm:text-2xl">{step.title}</h3>
          <p className="relative leading-relaxed text-muted-foreground">{step.description}</p>
        </div>
      </motion.div>
    </div>
  )
}

export function ProcessSection({ showHeader = true }: { showHeader?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.6'],
  })

  return (
    <section id="process" className="overflow-hidden bg-background py-24">
      <div className="w-full">
        {showHeader && (
          <AnimatedSection direction="up">
            <div className="mb-16 px-4 text-center">
              <EditableText
                storageKey="process-label"
                defaultValue="OUR APPROACH"
                as="p"
                className="text-eyebrow mb-4"
              />
              <EditableText
                storageKey="process-title"
                defaultValue="How We Work"
                as="h2"
                className="mb-4 text-3xl font-semibold md:text-4xl"
              />
              <EditableText
                storageKey="process-description"
                defaultValue="A structured, transparent process that delivers results. We believe in collaboration, iteration, and precision."
                as="p"
                className="mx-auto max-w-2xl text-muted-foreground"
              />
            </div>
          </AnimatedSection>
        )}

        <div ref={trackRef} className="relative mx-auto max-w-5xl px-4">
          {/* ===== The spine ===== */}
          {/* Static track */}
          <div className="absolute bottom-0 left-8 top-0 w-0.5 -translate-x-1/2 bg-border/70 lg:left-1/2" />
          {/* Scroll-driven gradient fill */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-8 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-neon via-neon to-primary shadow-[0_0_16px_-2px_var(--neon)] lg:left-1/2"
          />

          {/* ===== Kickoff marker ===== */}
          <div className="relative flex items-center gap-4 pb-10 pl-20 lg:flex-col lg:items-center lg:gap-3 lg:pb-8 lg:pl-0">
            <div className="absolute left-8 top-1 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-neon bg-neon text-neutral-950 shadow-[0_0_24px_-4px_var(--neon)] lg:static lg:translate-x-0">
              <Flag className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-neon">
              Kickoff
            </span>
          </div>

          {/* ===== Steps ===== */}
          <div className="lg:space-y-2">
            {steps.map((step, index) => (
              <StepRow
                key={step.number}
                step={step}
                index={index}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* ===== Ongoing loop tail ===== */}
          <div className="relative flex items-center gap-4 pl-20 pt-2 lg:flex-col lg:items-center lg:gap-3 lg:pl-0 lg:pt-8">
            <div className="absolute left-8 top-1 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-card text-primary shadow-[0_0_24px_-6px_var(--primary)] lg:static lg:translate-x-0">
              <RefreshCw className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Ongoing partnership
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
