'use client'

import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { IntegrationsSection } from '@/components/integrations-section'
import { FeaturedSolutionsSection } from '@/components/featured-solutions-section'
import { ProcessSection } from '@/components/process-section'
import { SocialProofSection } from '@/components/social-proof-section'
import { ArticlesSection } from '@/components/articles-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <IntegrationsSection />
      <FeaturedSolutionsSection />
      <ProcessSection />
      <SocialProofSection />
      <ArticlesSection />
      <ContactSection />
    </main>
  )
}
