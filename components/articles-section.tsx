'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Ticker } from 'motion-plus/react'
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

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <Card className="h-full w-[320px] md:w-[360px] border hover:border-primary/30 transition-colors flex-shrink-0 group">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs tracking-widest text-primary font-medium">
            {article.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {article.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {article.date}
          </span>
          <Button variant="ghost" size="sm" className="text-primary">
            Read More →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ArticlesSection() {
  const tickerItems = articles.map((article, index) => (
    <ArticleCard key={index} article={article} />
  ))

  return (
    <section id="journal" className="min-h-screen flex items-center py-24 bg-muted/30 overflow-hidden">
      <div className="w-full">
        <AnimatedSection direction="up">
          <div className="text-center mb-16 px-4">
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
          <Ticker
            items={tickerItems}
            velocity={-25}
            gap={24}
            hoverFactor={0.5}
            fade={100}
            className="py-4"
          />
        </AnimatedSection>
      </div>
    </section>
  )
}
