'use client'

<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Ticker } from 'motion-plus/react'
=======
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
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

<<<<<<< HEAD
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
      <Card className="h-full w-[350px] md:w-[400px] border-2 border-primary flex-shrink-0 p-4">
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
      className={`h-full w-[350px] md:w-[400px] border-2 hover:border-primary/30 transition-colors flex-shrink-0 ${isAdmin ? 'cursor-pointer' : ''}`}
      onClick={() => isAdmin && setEditing(true)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
=======
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
          aria-label={`Go to solution ${index + 1}`}
        />
      ))}
    </div>
  )
}

function SolutionCard({ solution }: { solution: typeof solutions[0] }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-3xl h-auto flex flex-col select-none mx-auto">
      <CardHeader className="text-center pb-4 pt-8">
        <div className="flex items-center justify-center gap-4 mb-2">
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
          <span className="text-xs tracking-widest text-primary font-medium">
            {solution.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {solution.year}
          </span>
        </div>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl">{solution.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 md:px-12 pb-8 space-y-6">
        <CardDescription className="text-base md:text-lg text-center leading-relaxed">
          {solution.description}
        </CardDescription>
        <div className="flex flex-wrap justify-center gap-2">
          {solution.features.map((feature, featureIndex) => (
            <span
              key={featureIndex}
              className="text-xs md:text-sm px-3 py-1 bg-muted rounded-full text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="text-center pt-2">
          {solution.link ? (
            <Button variant="outline" asChild>
              <a href={solution.link} target="_blank" rel="noopener noreferrer">
                See It Live →
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function AddSolutionCard({ onAdd }: { onAdd: (solution: Solution) => void }) {
  const [adding, setAdding] = useState(false)
  const [newSolution, setNewSolution] = useState<Solution>({
    title: '',
    year: new Date().getFullYear().toString(),
    category: '',
    description: '',
    features: [],
    link: null,
  })
  const [featuresText, setFeaturesText] = useState('')

  if (adding) {
    return (
      <Card className="h-full w-[350px] md:w-[400px] border-2 border-dashed border-primary flex-shrink-0 p-4">
        <div className="space-y-3">
          <Input
            value={newSolution.title}
            onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
            placeholder="Solution title"
            className="text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={newSolution.category}
              onChange={(e) => setNewSolution({ ...newSolution, category: e.target.value })}
              placeholder="Category"
              className="text-sm"
            />
            <Input
              value={newSolution.year}
              onChange={(e) => setNewSolution({ ...newSolution, year: e.target.value })}
              placeholder="Year"
              className="text-sm"
            />
          </div>
          <Textarea
            value={newSolution.description}
            onChange={(e) => setNewSolution({ ...newSolution, description: e.target.value })}
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
            value={newSolution.link || ''}
            onChange={(e) => setNewSolution({ ...newSolution, link: e.target.value || null })}
            placeholder="Link URL (optional)"
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => {
              onAdd({ ...newSolution, features: featuresText.split(',').map(f => f.trim()).filter(Boolean) })
              setAdding(false)
              setNewSolution({ title: '', year: new Date().getFullYear().toString(), category: '', description: '', features: [], link: null })
              setFeaturesText('')
            }}>
              Add
            </Button>
            <Button size="sm" variant="outline" onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className="h-full w-[350px] md:w-[400px] border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors flex-shrink-0 cursor-pointer flex items-center justify-center min-h-[300px]"
      onClick={() => setAdding(true)}
    >
      <span className="text-primary/50 hover:text-primary text-lg font-medium">+ Add Solution</span>
    </Card>
  )
}

export function FeaturedSolutionsSection() {
<<<<<<< HEAD
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

  const handleAdd = (solution: Solution) => {
    saveSolutions([solution, ...solutions])
  }

  const tickerItems = [
    ...(isAdmin ? [<AddSolutionCard key="add" onAdd={handleAdd} />] : []),
    ...solutions.map((solution, index) => (
      <EditableSolutionCard
        key={index}
        solution={solution}
        isAdmin={isAdmin}
        onUpdate={(updated) => handleUpdate(index, updated)}
        onDelete={() => handleDelete(index)}
      />
    )),
  ]
=======
  const solutionItems = solutions.map((solution, index) => (
    <SolutionCard key={index} solution={solution} />
  ))
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681

  return (
    <section id="solutions" className="min-h-screen flex items-center py-24 bg-background overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
<<<<<<< HEAD
          <div className="text-center mb-16 px-4">
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
=======
          <div className="text-center mb-12 px-4">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              FEATURED WORK
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Solutions That Drive Real Change
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects and see how we help businesses transform
              their operations with smart technology.
            </p>
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-4xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={solutionItems}
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






























































































































































