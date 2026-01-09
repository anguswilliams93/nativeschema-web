'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Ticker } from 'motion-plus/react'
import { AnimatedSection } from '@/components/animated-section'

const solutions = [
  {
    title: 'Microsoft Power BI 2025',
    year: '2025',
    category: 'Business Intelligence',
    description: 'Advanced analytics and interactive visualizations powered by Microsoft Power BI. Transform your data into compelling stories that drive business decisions.',
    features: ['Real-time Dashboards', 'Custom Reports', 'Data Modeling', 'AI Insights'],
  },
  {
    title: 'Krubase CRM 2025',
    year: '2025',
    category: 'Customer Relationship Management',
    description: 'Modern CRM solution designed for service businesses. Streamline client interactions, track opportunities, and build lasting relationships.',
    features: ['Contact Management', 'Pipeline Tracking', 'Automation', 'Integrations'],
  },
  {
    title: 'TGA Dashboard 2025',
    year: '2025',
    category: 'Regulatory Compliance',
    description: 'Comprehensive dashboard for TGA compliance monitoring and reporting. Stay ahead of regulatory requirements with real-time tracking.',
    features: ['Compliance Tracking', 'Automated Alerts', 'Audit Reports', 'Document Management'],
  },
]

function SolutionCard({ solution }: { solution: typeof solutions[0] }) {
  return (
    <Card className="h-full w-[350px] md:w-[400px] border-2 hover:border-primary/30 transition-colors flex-shrink-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs tracking-widest text-primary font-medium">
            {solution.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {solution.year}
          </span>
        </div>
        <CardTitle className="text-2xl">{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base">
          {solution.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {solution.features.map((feature, featureIndex) => (
            <span
              key={featureIndex}
              className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

export function FeaturedSolutionsSection() {
  const tickerItems = solutions.map((solution, index) => (
    <SolutionCard key={index} solution={solution} />
  ))

  return (
    <section id="solutions" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-16 px-4">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              FEATURED WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solutions That Drive Real Change
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects and see how we help businesses transform
              their operations with smart technology.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <Ticker
            items={tickerItems}
            velocity={30}
            gap={24}
            hoverFactor={0.5}
            fade={100}
            className="py-4"
          />
        </AnimatedSection>
      </div>
    </section>
  )
}






























































































































































