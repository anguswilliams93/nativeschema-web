'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TypewriterText({
  text,
  className = '',
  delay = 0,
  speed = 0.03,
  as: Component = 'span'
}: TypewriterTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const characters = text.split('')

  return (
    <Component ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.05,
            delay: delay + index * speed,
            ease: 'easeIn'
          }}
        >
          {char}
        </motion.span>
      ))}
    </Component>
  )
}

interface TypewriterParagraphProps {
  text: string
  className?: string
  delay?: number
  wordDelay?: number
}

export function TypewriterParagraph({
  text,
  className = '',
  delay = 0,
  wordDelay = 0.08
}: TypewriterParagraphProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.3,
            delay: delay + index * wordDelay,
            ease: 'easeOut'
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
