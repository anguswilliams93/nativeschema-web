'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { EASE_OUT, DURATION, VIEWPORT } from '@/lib/motion'

interface AnimatedSectionProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
}

export function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, VIEWPORT)

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: DURATION.base,
        delay,
        ease: EASE_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
