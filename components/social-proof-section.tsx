'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
import { AnimatedSection } from '@/components/animated-section'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Native Schema understood our challenges from day one. Their solutions have transformed how we operate, giving us the efficiency and insights we needed to scale our business.",
    name: "Mario Dallas",
    role: "CEO",
    company: "DebtSmart Solutions"
  },
  {
    quote: "The team delivered beyond our expectations. Their expertise in data integration saved us months of work and the solution has been running flawlessly ever since.",
    name: "Sarah Chen",
    role: "CTO",
    company: "LegalTech Partners"
  },
  {
    quote: "Working with Native Schema was a game-changer for our digital transformation. They brought clarity to our complex requirements and delivered a robust, scalable platform.",
    name: "James Morrison",
    role: "Director of Operations",
    company: "FinanceFlow"
  },
  {
    quote: "Their approach to problem-solving is exceptional. They don't just build software, they become true partners invested in your success.",
    name: "Emily Watson",
    role: "Managing Partner",
    company: "Watson & Associates"
  },
  {
    quote: "The automation solutions they implemented have reduced our manual processes by 70%. The ROI was visible within the first quarter.",
    name: "Michael Torres",
    role: "Head of IT",
    company: "Pacific Consulting Group"
  },
  {
    quote: "From discovery to deployment, the process was seamless. Native Schema's attention to detail and commitment to quality is unmatched.",
    name: "Rebecca Liu",
    role: "Product Manager",
    company: "InnovateTech"
  },
  {
    quote: "They took the time to truly understand our industry-specific needs. The custom solution they built has become central to our operations.",
    name: "David Anderson",
    role: "Founder",
    company: "Anderson Legal Services"
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
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  )
}

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-3xl h-auto flex flex-col select-none mx-auto">
      <CardContent className="py-12 px-8 md:px-12 flex flex-col h-full">
        <Quote className="w-12 h-12 text-primary/40 mb-6 mx-auto" strokeWidth={1.5} />
        <blockquote className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 text-center">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-base md:text-lg">{testimonial.name}</p>
          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
          <p className="text-primary text-sm">{testimonial.company}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function SocialProofSection() {
  const testimonialItems = testimonials.map((testimonial, index) => (
    <TestimonialCard key={index} testimonial={testimonial} />
  ))

  return (
    <section id="testimonials" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        {/* Testimonials Carousel */}
        <AnimatedSection direction="up">
          <div className="text-center mb-12 px-4">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              TESTIMONIALS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;re proud to partner with businesses who trust us to deliver exceptional results.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative mb-16 max-w-4xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={testimonialItems}
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
