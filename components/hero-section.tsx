'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/animated-section'
import { TextReveal } from '@/components/text-reveal'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoHorizontal } from '@/components/logo'
import { AppIntegration } from '@/components/app-integration'
import { Button } from '@/components/ui/button'

export function HeroSection() {
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
    <section className="relative min-h-screen flex items-center px-4 py-24 overflow-hidden">
      {/* Theme toggle - top right corner */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

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
        {/* Overlay for text readability (dark theme only) */}
        <div className="absolute inset-0 dark:bg-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: headline, copy, calls to action */}
        <div className="text-center lg:text-left">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="mb-10 flex justify-center lg:justify-start">
              <LogoHorizontal className="h-10 md:h-12 w-auto max-w-full text-white" />
            </div>
          </AnimatedSection>

          {/* Main headline - the tagline */}
          <TextReveal
            as="h1"
            text="Seamless integrations for smart business"
            delay={0.3}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white text-balance"
          />

          {/* Subheading - expanded explanation */}
          <AnimatedSection direction="up" delay={0.5}>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4">
              Native Schema connects the tools you already use, cleans up the
              messy data in between, and turns it into Power BI reports your
              whole team can trust.
            </p>
            <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              No more manual exports. No more mismatched spreadsheets. Just one
              reliable source of truth for revenue, profitability, and cash flow,
              so you can make decisions with confidence.
            </p>
          </AnimatedSection>

          {/* Calls to action */}
          <AnimatedSection direction="up" delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-12 text-base font-semibold" asChild>
                <Link href="/contact">Get my Power BI reports</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 text-base font-semibold" asChild>
                <Link href="/contact#book">Book a 30-minute scope</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Right: seamless integration diagram */}
        <AnimatedSection direction="left" delay={0.6}>
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-4 md:p-6 shadow-xl">
            <p className="text-eyebrow mb-4 text-center">
              How the data flows
            </p>
            <AppIntegration />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
