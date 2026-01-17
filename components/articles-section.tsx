'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Carousel, useCarousel } from 'motion-plus/react'
import { animate, useMotionValue, motion } from 'motion/react'
import { AnimatedSection } from '@/components/animated-section'

const articles = [
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

export function ArticlesSection() {
  const articleItems = articles.map((article, index) => (
    <ArticleCard key={index} article={article} />
  ))

  return (
    <section id="journal" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
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
