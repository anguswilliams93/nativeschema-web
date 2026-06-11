'use client'

import { HeroSection } from '@/components/hero-section'
import { WhatWeDoSection } from '@/components/what-we-do-section'
import { IndustriesSummarySection } from '@/components/industries-summary-section'
import { ContactSection } from '@/components/contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatWeDoSection />
      <IndustriesSummarySection />
      <ContactSection />
    </main>
  )
}
