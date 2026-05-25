'use client'

import { AnimatedSection } from '@/components/animated-section'
import { AppIntegration } from '@/components/app-integration'

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection direction="up">
          <div className="text-center mb-8">
            <p className="text-eyebrow mb-4">
              TRUSTED PARTNERSHIPS & TECHNOLOGIES
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Seamless Integrations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your scattered systems flow in. Native Schema unifies, cleans, and
              automates — then sends intelligence back out to the tools you rely on.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <AppIntegration />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
