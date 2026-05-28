'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'
import { EditableText } from '@/components/editable-text'
import { LayoutDashboard, Rocket, ArrowRight, type LucideIcon } from 'lucide-react'

interface Overview {
  storageKey: string
  eyebrow: string
  title: string
  blurb: string
  href: string
  cta: string
  icon: LucideIcon
}

const overviews: Overview[] = [
  {
    storageKey: 'overview-services',
    eyebrow: 'SERVICES',
    title: 'What we build',
    blurb: 'Power BI reporting, practice-management workflows, custom software, and the integrations that tie your tools together — tailored to how your team actually works.',
    href: '/services',
    cta: 'Explore our services',
    icon: LayoutDashboard,
  },
  {
    storageKey: 'overview-solutions',
    eyebrow: 'OUR WORK',
    title: 'What we have shipped',
    blurb: 'A look at real projects, from civic-tech transparency tools to business intelligence dashboards and custom CRMs delivered for clients and the wider community.',
    href: '/solutions',
    cta: 'See our work',
    icon: Rocket,
  },
]

function OverviewCard({ item }: { item: Overview }) {
  const Icon = item.icon
  return (
    <Link href={item.href} className="group block h-full focus:outline-none">
      <Card className="neon-hover flex h-full flex-col border-2">
        <CardContent className="flex flex-1 flex-col p-8 sm:p-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-border bg-card transition-colors duration-300 group-hover:border-primary">
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
          </div>
          <span className="text-eyebrow mb-3">{item.eyebrow}</span>
          <h3 className="mb-4 text-2xl font-semibold sm:text-3xl">{item.title}</h3>
          <p className="mb-8 leading-relaxed text-muted-foreground">{item.blurb}</p>
          <span className="mt-auto inline-flex items-center gap-2 font-medium text-primary transition-colors group-hover:text-neon">
            {item.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="bg-background border-t border-border/40 overflow-hidden py-24">
      <AnimatedSection direction="up">
        <div className="text-center mb-12 px-4">
          <EditableText
            storageKey="what-we-do-label"
            defaultValue="WHAT WE DO"
            as="p"
            className="text-eyebrow mb-4"
          />
          <EditableText
            storageKey="what-we-do-title"
            defaultValue="Smarter systems, built around your business"
            as="h2"
            className="text-3xl md:text-4xl font-semibold mb-4"
          />
          <EditableText
            storageKey="what-we-do-description"
            defaultValue="We design and build the technology that runs quietly underneath your operations — then prove it with the work we ship. Start with what you need."
            as="p"
            className="text-muted-foreground max-w-2xl mx-auto"
          />
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-4xl px-4">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2" staggerDelay={0.1}>
          {overviews.map((item) => (
            <StaggerItem key={item.storageKey} className="h-full">
              <OverviewCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
