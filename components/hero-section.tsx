'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Typewriter } from 'motion-plus/react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animated-section'

export function HeroSection() {
  const tagline = 'BUILDING SMARTER'
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Manually trigger play for browsers that block autoplay
    const playVideo = async () => {
      try {
        await video.play()
        setVideoLoaded(true)
      } catch {
        // Autoplay blocked, show video anyway
        setVideoLoaded(true)
      }
    }

    // Try to play immediately
    playVideo()

    // Also try on canplaythrough event
    const handleCanPlay = () => {
      playVideo()
    }

    video.addEventListener('canplaythrough', handleCanPlay)

    // Fallback: show video after timeout even if not playing
    const fallbackTimeout = setTimeout(() => {
      setVideoLoaded(true)
    }, 1000)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      clearTimeout(fallbackTimeout)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/nativeschema-hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Animated tagline with typewriter effect */}
        <div className="mb-4">
          <Typewriter
            as="h1"
            className="text-sm md:text-base tracking-[0.4em] text-muted-foreground font-medium"
            speed="slow"
            cursorClassName="text-primary"
          >
            {tagline}
          </Typewriter>
        </div>

        {/* Main headline */}
        <AnimatedSection direction="up" delay={0.4}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            SYSTEMS FOR{' '}
            <span className="text-primary">REAL CHANGE</span>.
          </h2>
        </AnimatedSection>

        {/* Subheading */}
        <AnimatedSection direction="up" delay={0.6}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A technology company focusing on data, automation and efficiency.
            We build smart systems that empower service businesses to work smarter and scale faster.
          </p>
        </AnimatedSection>

        {/* Extended description */}
        <AnimatedSection direction="up" delay={0.7}>
          <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto mb-12">
            Fueled by innovation and guided by precision, we deliver custom software,
            seamless integrations, and data-driven solutions.
          </p>
        </AnimatedSection>

        {/* CTAs */}
        <AnimatedSection direction="up" delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Our Services
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
