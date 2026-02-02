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

interface Article {
  title: string
  description: string
  date: string
  category: string
  readTime: string
}

const defaultArticles: Article[] = [
  {
    title: 'The Future of Business Intelligence in 2025',
    description: 'Explore how AI-powered analytics and real-time data processing are reshaping the way businesses make decisions.',
    date: 'Jan 15, 2025',
    category: 'Analytics',
    readTime: '5 min read',
  },
  {
    title: 'Building Scalable CRM Solutions',
    description: 'Best practices for implementing customer relationship management systems that grow with your business.',
    date: 'Jan 10, 2025',
    category: 'Development',
    readTime: '7 min read',
  },
  {
    title: 'System Integration Strategies',
    description: 'How to connect legacy systems with modern platforms for seamless data flow and improved efficiency.',
    date: 'Jan 5, 2025',
    category: 'Integration',
    readTime: '6 min read',
  },
  {
    title: 'Data Migration Best Practices',
    description: 'Ensuring data integrity and minimal downtime when moving to new systems and platforms.',
    date: 'Dec 28, 2024',
    category: 'Migration',
    readTime: '8 min read',
  },
  {
    title: 'Automation in Modern Workflows',
    description: 'Leveraging automation to reduce manual tasks and improve operational efficiency across departments.',
    date: 'Dec 20, 2024',
    category: 'Automation',
    readTime: '5 min read',
  },
]

<<<<<<< HEAD
function EditableArticleCard({
  article,
  isAdmin,
  onUpdate,
  onDelete
}: {
  article: Article
  isAdmin: boolean
  onUpdate: (article: Article) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState(article)

  if (isAdmin && editing) {
    return (
      <Card className="h-full w-[320px] md:w-[360px] border-2 border-primary flex-shrink-0 p-4">
        <div className="space-y-3">
          <Input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            placeholder="Title"
            className="text-sm"
          />
          <Textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Description"
            rows={3}
            className="text-sm resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              placeholder="Category"
              className="text-sm"
            />
            <Input
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              placeholder="Date"
              className="text-sm"
            />
          </div>
          <Input
            value={editData.readTime}
            onChange={(e) => setEditData({ ...editData, readTime: e.target.value })}
            placeholder="Read time"
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { onUpdate(editData); setEditing(false) }}>
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
      className={`h-full w-[320px] md:w-[360px] border hover:border-primary/30 transition-colors flex-shrink-0 group ${isAdmin ? 'cursor-pointer' : ''}`}
      onClick={() => isAdmin && setEditing(true)}
    >
      <CardHeader>
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
          aria-label={`Go to article ${index + 1}`}
        />
      ))}
    </div>
  )
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 w-[90vw] max-w-3xl h-auto flex flex-col select-none mx-auto group">
      <CardHeader className="text-center pb-4 pt-8">
        <div className="flex items-center justify-center gap-4 mb-2">
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
          <span className="text-xs tracking-widest text-primary font-medium">
            {article.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 md:px-12 pb-8 space-y-4">
        <CardDescription className="text-base md:text-lg text-center leading-relaxed">
          {article.description}
        </CardDescription>
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="text-sm text-muted-foreground">
            {article.date}
          </span>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Read More →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AddArticleCard({ onAdd }: { onAdd: (article: Article) => void }) {
  const [adding, setAdding] = useState(false)
  const [newArticle, setNewArticle] = useState<Article>({
    title: '',
    description: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: '',
    readTime: '5 min read',
  })

  if (adding) {
    return (
      <Card className="h-full w-[320px] md:w-[360px] border-2 border-dashed border-primary flex-shrink-0 p-4">
        <div className="space-y-3">
          <Input
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            placeholder="Article title"
            className="text-sm"
          />
          <Textarea
            value={newArticle.description}
            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
            placeholder="Description"
            rows={3}
            className="text-sm resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              placeholder="Category"
              className="text-sm"
            />
            <Input
              value={newArticle.date}
              onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
              placeholder="Date"
              className="text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => { onAdd(newArticle); setAdding(false); setNewArticle({ title: '', description: '', date: '', category: '', readTime: '5 min read' }) }}>
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
      className="h-full w-[320px] md:w-[360px] border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors flex-shrink-0 cursor-pointer flex items-center justify-center min-h-[250px]"
      onClick={() => setAdding(true)}
    >
      <span className="text-primary/50 hover:text-primary text-lg font-medium">+ Add Article</span>
    </Card>
  )
}

export function ArticlesSection() {
<<<<<<< HEAD
  const { isAdmin } = useAdmin()
  const [articles, setArticles] = useState<Article[]>(defaultArticles)

  useEffect(() => {
    const stored = localStorage.getItem('content-articles')
    if (stored) {
      try {
        setArticles(JSON.parse(stored))
      } catch {
        setArticles(defaultArticles)
      }
    }
  }, [])

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles)
    localStorage.setItem('content-articles', JSON.stringify(newArticles))
  }

  const handleUpdate = (index: number, article: Article) => {
    const newArticles = [...articles]
    newArticles[index] = article
    saveArticles(newArticles)
  }

  const handleDelete = (index: number) => {
    const newArticles = articles.filter((_, i) => i !== index)
    saveArticles(newArticles)
  }

  const handleAdd = (article: Article) => {
    saveArticles([article, ...articles])
  }

  const tickerItems = [
    ...(isAdmin ? [<AddArticleCard key="add" onAdd={handleAdd} />] : []),
    ...articles.map((article, index) => (
      <EditableArticleCard
        key={index}
        article={article}
        isAdmin={isAdmin}
        onUpdate={(updated) => handleUpdate(index, updated)}
        onDelete={() => handleDelete(index)}
      />
    )),
  ]
=======
  const articleItems = articles.map((article, index) => (
    <ArticleCard key={index} article={article} />
  ))
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681

  return (
    <section id="journal" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
<<<<<<< HEAD
          <div className="text-center mb-16 px-4">
            <EditableText
              storageKey="articles-label"
              defaultValue="JOURNAL"
              as="p"
              className="text-sm tracking-[0.3em] text-primary mb-4 font-medium"
            />
            <EditableText
              storageKey="articles-title"
              defaultValue="Insights & Perspectives"
              as="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
            <EditableText
              storageKey="articles-description"
              defaultValue="Stay updated with our latest thoughts on technology, business, and innovation."
              as="p"
              className="text-muted-foreground max-w-2xl mx-auto"
            />
=======
          <div className="text-center mb-12 px-4">
            <p className="text-sm tracking-[0.3em] text-primary mb-4 font-medium">
              JOURNAL
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Insights & Perspectives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest thoughts on technology, business, and innovation.
            </p>
>>>>>>> 4fb72b88865c555a80bff66ad6b6600d97e9d681
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <div className="relative max-w-4xl mx-auto px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
            <Carousel
              items={articleItems}
              gap={0}
              className="py-4"
            >
              <AutoplayController duration={7000} />
              <Pagination />
            </Carousel>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
