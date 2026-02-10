'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoHorizontal, LogoIcon } from '@/components/logo'
import Navbar from '@/components/shadcn-studio/blocks/navbar-component-06/navbar-component-06'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '#services' },
  { title: 'Solutions', href: '#solutions' },
  { title: 'Industries', href: '/industries' },
  { title: 'Process', href: '#process' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'Journal', href: '#journal' },
  { title: 'Contact', href: '/contact' },
]

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <Navbar
            logo={
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity flex items-center"
              >
                <LogoIcon className="h-6 w-6 md:hidden" />
                <LogoHorizontal className="hidden md:block h-6 w-auto" />
              </Link>
            }
            navigationItems={navItems}
            actions={
              <>
                <ThemeToggle />
                <Button size="sm" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </>
            }
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
