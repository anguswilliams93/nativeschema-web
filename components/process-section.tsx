'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animated-section'
import { StaggerContainer, StaggerItem } from '@/components/stagger-container'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, challenges, and goals. Through collaborative sessions, we map out requirements and identify opportunities for improvement.',
  },
  {
    number: '02',
    title: 'Iteration',
    description: 'Using agile methodologies, we design and build solutions in focused sprints. Regular feedback ensures we stay aligned with your vision throughout development.',
  },
  {
    number: '03',
    title: 'Delivery',
    description: 'We deploy robust, tested solutions with comprehensive documentation and training. Our support continues beyond launch to ensure lasting success.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="min-h-screen flex items-center py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-16">
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
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
