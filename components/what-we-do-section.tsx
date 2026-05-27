'use client'

import { ServicesShowcase } from '@/components/services-section'
import { SolutionsShowcase } from '@/components/featured-solutions-section'

export function WhatWeDoSection() {
  return (
    <section id="services" className="bg-background border-t border-border/40 overflow-hidden">
      {/* What we do */}
      <div className="py-24">
        <ServicesShowcase />
      </div>

      {/* Featured work - distinct band so the two halves read clearly */}
      <div id="solutions" className="bg-card/60 border-t border-border/40 py-24">
        <SolutionsShowcase />
      </div>
    </section>
  )
}
