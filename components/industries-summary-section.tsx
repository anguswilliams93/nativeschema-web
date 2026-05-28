'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  Monitor,
  Scale,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'

const industries = [
  {
    title: 'Information Technology',
    icon: Monitor,
    summary:
      'Connect project, billing, CRM, and delivery data so technology teams can see utilisation, margin, and delivery health without manual reporting.',
  },
  {
    title: 'Legal',
    icon: Scale,
    summary:
      'Design workflows, reporting, and matter operations that match how firms actually work, from Actionstep processes to Power BI dashboards.',
  },
  {
    title: 'Service-Based Businesses',
    icon: Briefcase,
    summary:
      'Reduce operational drag across consulting, accounting, recruitment, and other people-led businesses with connected systems and clearer reporting.',
  },
  {
    title: 'Business Executives & Leaders',
    icon: ClipboardCheck,
    summary:
      'Give CEOs, COOs, CFOs, and directors reliable data for revenue, profitability, cash flow, and operational decisions.',
  },
]

export function IndustriesSummarySection() {
  return (
    <section id="industries" className="py-24 bg-muted/30 border-t border-border/40 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4">
        <AnimatedSection direction="up">
          <div className="mb-12 text-center">
            <p className="text-eyebrow mb-4">INDUSTRIES</p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Built for Businesses That Run on People, Process, and Data
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with service-driven organisations that want less admin,
              better connected systems, and decisions backed by real operational data.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {industries.map((industry) => {
            const Icon = industry.icon

            return (
              <StaggerItem key={industry.title} className="h-full">
                <Card className="h-full border-border/70 bg-card/70 transition-colors hover:border-primary/30">
                  <CardHeader>
                    <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {industry.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {industry.summary}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/industries">
                View Industries
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
