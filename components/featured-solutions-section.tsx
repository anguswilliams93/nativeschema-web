'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { AnimatedSection } from '@/components/animated-section'
import { EditableText } from '@/components/editable-text'
import { useAdmin } from '@/components/admin-provider'

interface Solution {
  title: string
  year: string
  category: string
  description: string
  features: string[]
  link: string | null
}

const defaultSolutions: Solution[] = [
  {
    title: 'TaxWatch',
    year: '2026',
    category: 'Open Source / Civic Tech',
    description: 'Track Australian government spending, monitor parliamentary bills, and stay informed with aggregated political news. Transparency and accountability for every taxpayer.',
    features: ['Spending Tracker', 'Bill Monitoring', 'News Aggregation', 'Open Source'],
    link: 'https://preferred-jet.vercel.app/',
  },
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
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

function EditableSolutionCard({
  solution,
  isAdmin,
  onUpdate,
  onDelete
}: {
  solution: Solution
  isAdmin: boolean
  onUpdate: (solution: Solution) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState(solution)
  const [featuresText, setFeaturesText] = useState(solution.features.join(', '))

  if (isAdmin && editing) {
    return (
      <Card className="w-[90vw] max-w-lg border-2 border-primary p-4 mx-auto">
        <div className="space-y-3">
          <Input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Title"
            className="text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              placeholder="Category"
              className="text-sm"
            />
            <Input
              value={editData.year}
              onChange={(e) => setEditData({ ...editData, year: e.target.value })}
              placeholder="Year"
              className="text-sm"
            />
          </div>
          <Textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Description"
            rows={3}
            className="text-sm resize-none"
          />
          <Input
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="Features (comma separated)"
            className="text-sm"
          />
          <Input
            value={editData.link || ''}
            onChange={(e) => setEditData({ ...editData, link: e.target.value || null })}
            placeholder="Link URL (optional)"
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => {
              onUpdate({ ...editData, features: featuresText.split(',').map(f => f.trim()).filter(Boolean) })
              setEditing(false)
            }}>
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`w-[90vw] max-w-lg border-2 hover:border-primary/30 transition-colors select-none mx-auto ${isAdmin ? 'cursor-pointer' : ''}`}
      onClick={() => isAdmin && setEditing(true)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs tracking-widest text-primary font-medium">
            {solution.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {solution.year}
          </span>
        </div>
        <CardTitle className="text-2xl">{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base">
          {solution.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {solution.features.map((feature, featureIndex) => (
            <span
              key={featureIndex}
              className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        {solution.link ? (
          <Button variant="outline" className="w-full mt-4" asChild>
            <a href={solution.link} target="_blank" rel="noopener noreferrer">
              See It Live →
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full mt-4" disabled>
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function FeaturedSolutionsSection() {
  const { isAdmin } = useAdmin()
  const [solutions, setSolutions] = useState<Solution[]>(defaultSolutions)

  useEffect(() => {
    const stored = localStorage.getItem('content-solutions')
    if (stored) {
      try {
        setSolutions(JSON.parse(stored))
      } catch {
        setSolutions(defaultSolutions)
      }
    }
  }, [])

  const saveSolutions = (newSolutions: Solution[]) => {
    setSolutions(newSolutions)
    localStorage.setItem('content-solutions', JSON.stringify(newSolutions))
  }

  const handleUpdate = (index: number, solution: Solution) => {
    const newSolutions = [...solutions]
    newSolutions[index] = solution
    saveSolutions(newSolutions)
  }

  const handleDelete = (index: number) => {
    const newSolutions = solutions.filter((_, i) => i !== index)
    saveSolutions(newSolutions)
  }

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
    <section id="solutions" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-12 px-4">
            <EditableText
              storageKey="solutions-label"
              defaultValue="FEATURED WORK"
              as="p"
              className="text-sm tracking-[0.3em] text-primary mb-4 font-medium"
            />
            <EditableText
              storageKey="solutions-title"
              defaultValue="Solutions That Drive Real Change"
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <EditableText
              storageKey="solutions-description"
              defaultValue="Explore our latest projects and see how we help businesses transform their operations with smart technology."
              as="p"
              className="text-muted-foreground max-w-2xl mx-auto"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-2xl mx-auto px-4">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 6000, stopOnInteraction: false })]}
              className="py-4"
            >
              <CarouselContent>
                {solutions.map((solution, index) => (
                  <CarouselItem key={index}>
                    <EditableSolutionCard
                      solution={solution}
                      isAdmin={isAdmin}
                      onUpdate={(updated) => handleUpdate(index, updated)}
                      onDelete={() => handleDelete(index)}
                    />
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






































































































































