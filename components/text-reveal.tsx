'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { EASE_OUT, DURATION } from '@/lib/motion'

interface TextRevealProps {
  text: string
  /** Render element. Defaults to span so callers control the heading level. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  /** Per-word stagger in seconds. */
  stagger?: number
  once?: boolean
}

/**
 * Clean masked word-rise reveal for headings.
 * Each word sits in an overflow-hidden box and rises from below — the words
 * appear to wipe into place rather than fade in piecemeal. Pairs with the
 * tight Geist heading styles for a precise, engineered feel.
 */
export function TextReveal({
  text,
  as: Component = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once })
  const words = text.split(' ')

  const MotionTag = motion[Component]

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] mr-[0.25em] align-bottom last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: {
                y: '0%',
                transition: { duration: DURATION.slow, ease: EASE_OUT },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
