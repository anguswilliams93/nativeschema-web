import type { Transition, Variants } from 'motion/react'

/**
 * Shared Motion.dev tokens so every reveal on the site feels like one system:
 * a calm cubic ease for entrances, a crisp spring for interactive elements.
 */

// Refined ease-out cubic — clean, no overshoot. Used for content reveals.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

// Snappy spring for hover / press micro-interactions.
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 0.6,
}

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const

/** Standard "rise + fade" reveal. */
export const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
}

/** Parent that releases children in sequence. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

/** Per-line / per-word child for heading reveals. */
export const lineReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

/** Shared in-view config — reveal once, slightly before fully on screen. */
export const VIEWPORT = { once: true, margin: '-100px' } as const
