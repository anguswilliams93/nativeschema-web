'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Scale,
  Monitor,
  Briefcase,
  ClipboardCheck,
  ArrowRight,
  Building2,
  Cog,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'
import { LogoHorizontal } from '@/components/logo'

interface Industry {
  title: string
  icon: React.ElementType
  tagline: string
  description: string
  challenges: string[]
  solutions: string[]
}

const industries: Industry[] = [
  {
    title: 'Information Technology',
    icon: Monitor,
    tagline: 'Streamline your tech operations',
    description:
      'IT companies juggle complex project pipelines, client environments, and constantly shifting priorities. We help technology businesses consolidate their tooling, automate reporting, and build internal systems that scale — so your team can focus on delivering for clients instead of wrestling with spreadsheets and disconnected platforms.',
    challenges: [
      'Disconnected project management & billing systems',
      'Manual time tracking and resource allocation',
      'Lack of real-time visibility into project profitability',
      'Scaling operations without scaling headcount',
    ],
    solutions: [
      'Integrated dashboards connecting PSA, billing & CRM',
      'Automated reporting on utilisation, revenue & margins',
      'Custom internal tools tailored to your delivery model',
      'System integrations that eliminate double-entry',
    ],
  },
  {
    title: 'Legal',
    icon: Scale,
    tagline: 'Technology that works the way your firm does',
    description:
      'Law firms run on precision, deadlines, and trust. But too many firms are held back by clunky workflows, disconnected systems, and manual processes that eat into billable hours. We specialise in legal technology — from Actionstep workflow design to Power BI reporting — helping firms automate the admin so lawyers can focus on the law.',
    challenges: [
      'Generic practice management workflows that don\'t fit',
      'Manual billing, WIP tracking & trust accounting',
      'Compliance reporting that takes hours to compile',
      'Staff spending more time on admin than billable work',
    ],
    solutions: [
      'Bespoke Actionstep workflows for every matter type',
      'Automated billing, deadline & task management',
      'Power BI dashboards for WIP, revenue & compliance',
      'Document automation & intake form integrations',
    ],
  },
  {
    title: 'Service-Based Businesses',
    icon: Briefcase,
    tagline: 'Spend less time managing, more time delivering',
    description:
      'Whether you\'re running a consulting firm, an accounting practice, a recruitment agency, or any other service-based business — your revenue depends on your people and their time. We build systems that reduce the operational drag on your team: automated workflows, connected platforms, and dashboards that give you real-time clarity on what\'s working and what isn\'t.',
    challenges: [
      'Revenue leakage from unbilled time and poor tracking',
      'Disconnected CRM, accounting & project management tools',
      'No single source of truth for business performance',
      'Onboarding new clients is manual and inconsistent',
    ],
    solutions: [
      'End-to-end system integrations across your tech stack',
      'Executive dashboards for revenue, pipeline & utilisation',
      'Automated client onboarding & workflow triggers',
      'Custom software to fill gaps off-the-shelf tools can\'t',
    ],
  },
  {
    title: 'Business Executives & Leaders',
    icon: ClipboardCheck,
    tagline: 'Reclaim your time from administrative overload',
    description:
      'If you\'re a CEO, COO, CFO, or director spending half your week chasing reports, reconciling data, or managing processes that should run themselves — we can help. We work with executives across industries to automate the repetitive, build clarity into reporting, and free up the hours you need to focus on strategy, growth, and the work that actually moves the needle.',
    challenges: [
      'Hours lost compiling reports from multiple systems',
      'Decision-making hampered by outdated or incomplete data',
      'Processes that depend on key people instead of systems',
      'Scaling the business without scaling the chaos',
    ],
    solutions: [
      'Automated executive reporting updated in real time',
      'Power BI dashboards tailored to your KPIs',
      'Workflow automation that removes bottlenecks',
      'System design that reduces key-person dependency',
    ],
  },
]

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon

  return (
    <AnimatedSection direction="up" delay={index * 0.1}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">{industry.title}</CardTitle>
          </div>
          <p className="text-sm font-medium text-primary">{industry.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {industry.description}
          </p>

          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">Common Challenges</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {industry.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">How We Help</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {industry.solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  )
}

export default function IndustriesPage() {
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
                INDUSTRIES WE SERVE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Built for Businesses{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  That Run on People
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                We work with service-driven organisations that want to stop wasting time
                on admin and start making decisions with real data.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <span className="text-sm tracking-[0.3em] text-primary mb-4 font-medium block">
                THE COMMON THREAD
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Every Business Deserves Systems That Work
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Regardless of industry, the problems are often the same: too much manual work,
                too many disconnected tools, and not enough visibility into what matters.
              </p>
            </div>
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cog className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Automate the Repetitive</h3>
                <p className="text-sm text-muted-foreground">
                  Stop doing manually what a well-designed system can handle for you — accurately
                  and consistently.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Connect Your Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Your CRM, accounting, project management, and reporting tools should talk
                  to each other. We make that happen.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Make Better Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time dashboards and automated reports give you the clarity to act fast
                  and lead with confidence.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              If your business runs on people, processes, and data — we can probably help.
              Get in touch and let&apos;s talk about what smarter systems could look like for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View Our Services</Link>
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
    </main>
  )
}
