'use client'

import { HeroSection } from '@/components/hero-section'
import { WhatWeDoSection } from '@/components/what-we-do-section'
import { SocialProofSection } from '@/components/social-proof-section'
import { ArticlesSection } from '@/components/articles-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatWeDoSection />
      <SocialProofSection />
      <ArticlesSection />
      <ContactSection />
    </main>
  )
}
