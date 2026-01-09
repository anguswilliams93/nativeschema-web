'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Ticker } from 'motion-plus/react'
import { AnimatedSection } from '@/components/animated-section'

const partners = [
  { name: 'ActionStep', placeholder: 'ActionStep' },
  { name: 'LawMaster', placeholder: 'LawMaster' },
  { name: 'DebtSmart', placeholder: 'DebtSmart' },
  { name: 'HubSpot', placeholder: 'HubSpot' },
  { name: 'Salesforce', placeholder: 'Salesforce' },
  { name: 'Microsoft', placeholder: 'Microsoft' },
  { name: 'AWS', placeholder: 'AWS' },
  { name: 'Google Cloud', placeholder: 'Google Cloud' },
]

function PartnerLogo({ partner }: { partner: typeof partners[0] }) {
  return (
    <div
      className="text-xl md:text-2xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors px-8"
      title={`${partner.name} logo - add image to public/`}
    >
      {partner.placeholder}
    </div>
  )
}

export function SocialProofSection() {
  const tickerItems = partners.map((partner, index) => (
    <PartnerLogo key={index} partner={partner} />
  ))

  return (
    <section id="testimonials" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        {/* Testimonial */}
        <AnimatedSection direction="up">
          <div className="max-w-6xl mx-auto px-4">
            <Card className="bg-muted/50 border-none mb-16">
              <CardContent className="py-12 px-8 md:px-16">
                <div className="max-w-3xl mx-auto text-center">
                  <svg
                    className="w-12 h-12 text-primary/30 mx-auto mb-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed">
                    &ldquo;Native Schema understood our challenges from day one. Their solutions
                    have transformed how we operate, giving us the efficiency and insights
                    we needed to scale our business.&rdquo;
                  </blockquote>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold">Mario Dallas</p>
                    <p className="text-muted-foreground text-sm">CEO</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Partners - Infinite Ticker */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="text-center px-4">
            <p className="text-sm tracking-[0.3em] text-muted-foreground mb-8 font-medium">
              TRUSTED PARTNERSHIPS
            </p>
          </div>
          <Ticker
            items={tickerItems}
            velocity={20}
            gap={32}
            hoverFactor={0.5}
            className="py-4"
          />
        </AnimatedSection>
      </div>
    </section>
  )
}
