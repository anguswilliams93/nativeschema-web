'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { AnimatedSection } from '@/components/animated-section'
import { EditableText } from '@/components/editable-text'
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

function Pagination({ count, current, onSelect }: { count: number; current: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            current === index
              ? 'bg-primary scale-125'
              : 'bg-muted hover:bg-muted-foreground/50'
          }`}
          onClick={() => onSelect(index)}
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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <section id="testimonials" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-12 px-4">
            <EditableText
              storageKey="testimonials-label"
              defaultValue="TESTIMONIALS"
              as="p"
              className="text-sm tracking-[0.3em] text-primary mb-4 font-medium"
            />
            <EditableText
              storageKey="testimonials-title"
              defaultValue="What Our Clients Say"
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <EditableText
              storageKey="testimonials-description"
              defaultValue="We're proud to partner with businesses who trust us to deliver exceptional results."
              as="p"
              className="text-muted-foreground max-w-2xl mx-auto"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-4xl mx-auto px-4">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
              className="py-4"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <Pagination count={count} current={current} onSelect={scrollTo} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
