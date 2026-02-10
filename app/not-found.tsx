'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'

const terminalLines = [
  { text: '> Initializing connection...', delay: 300 },
  { text: '> Resolving route...', delay: 800 },
  { text: '', delay: 1000 },
  { text: '> 404 — Page not found', delay: 1400 },
  { text: '', delay: 1600 },
  { text: '> Oops, looks like this page doesn\'t exist.', delay: 2000 },
  { text: '', delay: 2200 },
  { text: '> Redirecting you back home...', delay: 2800 },
]

const CHAR_SPEED = 0.03
const REDIRECT_DELAY = 4200

function TypewriterLine({ text, className }: { text: string; className?: string }) {
  if (!text) return <div>{'\u00A0'}</div>

  const characters = text.split('')

  return (
    <div className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.04,
            delay: i * CHAR_SPEED,
            ease: 'easeIn',
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}

export default function NotFound() {
  const router = useRouter()
  const [lines, setLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    terminalLines.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, step.text])
      }, step.delay)
      timeouts.push(timeout)
    })

    // Stop cursor blink and redirect
    const redirectTimeout = setTimeout(() => {
      setShowCursor(false)
      router.push('/')
    }, REDIRECT_DELAY)
    timeouts.push(redirectTimeout)

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Subtle gradient background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl px-6"
      >
        {/* Terminal window */}
        <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-white/50 font-mono">nativeschema-terminal</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm text-white space-y-1 min-h-[220px]">
            {lines.map((line, index) => (
              <TypewriterLine key={index} text={line} />
            ))}

            {/* Blinking cursor */}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block h-4 w-2 bg-white mt-1"
              />
            )}
          </div>
        </div>

        {/* 404 heading below terminal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center text-white/40 text-xs font-mono mt-6 tracking-widest uppercase"
        >
          Error 404
        </motion.p>
      </motion.div>
    </div>
  )
}
