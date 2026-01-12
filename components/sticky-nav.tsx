'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type NavLink = { label: string; href: string }

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
]

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (approximately viewport height)
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.8)

      // Determine active section
      const sections = navLinks.map(link => link.href.slice(1))
      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
        >
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center justify-between h-24 md:h-28">
              {/* Logo / Brand */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:opacity-80 transition-opacity flex items-center"
              >
                {/* Mobile: Favicon */}
                <Image
                  src="/favicon.svg"
                  alt="Native Schema"
                  width={48}
                  height={48}
                  className="h-12 w-12 md:hidden text-foreground"
                />
                {/* Desktop: Full Logo */}
                <Image
                  src="/logo-horizontal.svg"
                  alt="Native Schema"
                  width={800}
                  height={200}
                  className="hidden md:block h-20 lg:h-24 w-auto text-foreground"
                />
              </button>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'px-3 py-2 text-sm rounded-md transition-colors',
                      activeSection === link.href.slice(1)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="sm"
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex"
              >
                Get in Touch
              </Button>

              {/* Mobile Menu Button */}
              <MobileMenu
                navLinks={navLinks}
                activeSection={activeSection}
                onNavigate={scrollToSection}
              />
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

function MobileMenu({
  navLinks,
  activeSection,
  onNavigate
}: {
  navLinks: NavLink[]
  activeSection: string
  onNavigate: (href: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigate = (href: string) => {
    onNavigate(href)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 md:top-28 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 p-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className={cn(
                    'px-4 py-3 text-left rounded-md transition-colors',
                    activeSection === link.href.slice(1)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </button>
              ))}
              <Button
                className="mt-2 w-full"
                onClick={() => handleNavigate('#contact')}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
