'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatedSection } from '@/components/animated-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoHorizontal } from '@/components/logo'

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
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
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
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="mb-16 flex justify-center">
            <LogoHorizontal className="h-12 md:h-14 lg:h-16 w-auto max-w-full px-4" />
          </div>
        </AnimatedSection>

        {/* Main headline */}
        <AnimatedSection direction="up" delay={0.3}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-8 text-foreground">
            Smart systems for service businesses
          </h1>
        </AnimatedSection>

        {/* Subheading */}
        <AnimatedSection direction="up" delay={0.5}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We build custom software, integrations, and analytics solutions
            that help you work smarter and scale faster.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
