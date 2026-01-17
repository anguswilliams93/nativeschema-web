'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
import { AnimatedSection } from '@/components/animated-section'

const solutions = [
  {
    title: 'Zerobi Pty Ltd',
    year: '2025',
    category: 'Website Design',
    description: 'Modern, high-performance marketing website for a data analytics and AI consulting firm. Clean design with smooth animations and optimised for conversions.',
    features: ['Custom Design', 'Motion Animations', 'SEO Optimised', 'Fast Hosting'],
    link: 'https://zerobi.au/',
  },
  {
    title: 'Microsoft Power BI 2025',
    year: '2025',
    category: 'Business Intelligence',
    description: 'Advanced analytics and interactive visualizations powered by Microsoft Power BI. Transform your data into compelling stories that drive business decisions.',
    features: ['Real-time Dashboards', 'Custom Reports', 'Data Modeling', 'AI Insights'],
    link: null,
  },
  {
    title: 'Krubase CRM 2025',
    year: '2025',
    category: 'Customer Relationship Management',
    description: 'Modern CRM solution designed for service businesses. Streamline client interactions, track opportunities, and build lasting relationships.',
    features: ['Contact Management', 'Pipeline Tracking', 'Automation', 'Integrations'],
    link: 'https://krubase.com/',
  },
  {
    title: 'TGA Dashboard 2025',
    year: '2025',
    category: 'Regulatory Compliance',
    description: 'Comprehensive dashboard for TGA compliance monitoring and reporting. Stay ahead of regulatory requirements with real-time tracking.',
    features: ['Compliance Tracking', 'Automated Alerts', 'Audit Reports', 'Document Management'],
    link: 'https://tga-dashboard.vercel.app/',
  },
]

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
          aria-label={`Go to solution ${index + 1}`}
        />
      ))}
    </div>
  )
}

function SolutionCard({ solution }: { solution: typeof solutions[0] }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-3xl h-auto flex flex-col select-none mx-auto">
      <CardHeader className="text-center pb-4 pt-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <span className="text-xs tracking-widest text-primary font-medium">
            {solution.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {solution.year}
          </span>
        </div>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 md:px-12 pb-8 space-y-6">
        <CardDescription className="text-base md:text-lg text-center leading-relaxed">
          {solution.description}
        </CardDescription>
        <div className="flex flex-wrap justify-center gap-2">
          {solution.features.map((feature, featureIndex) => (
            <span
              key={featureIndex}
              className="text-xs md:text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="text-center pt-2">
          {solution.link ? (
            <Button variant="outline" asChild>
              <a href={solution.link} target="_blank" rel="noopener noreferrer">
                See It Live →
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function FeaturedSolutionsSection() {
  const solutionItems = solutions.map((solution, index) => (
    <SolutionCard key={index} solution={solution} />
  ))

  return (
    <section id="solutions" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-12 px-4">
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
          <div className="relative max-w-4xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={solutionItems}
              gap={0}
              className="py-4"
            >
              <AutoplayController duration={6000} />
              <Pagination />
            </Carousel>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}






























































































































































