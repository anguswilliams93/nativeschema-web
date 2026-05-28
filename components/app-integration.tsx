'use client'

import { motion } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NativeSchemaLogo from '@/components/native-schema-logo'
import { EASE_OUT } from '@/lib/motion'
import { Bot, ListChecks } from 'lucide-react'

type AppIcon = {
  name: string
  icon?: string
  label?: string
  badge?: string
  bgColor: string
  iconColor?: string
  kind?: 'image' | 'bot' | 'tasks'
}

const sources: AppIcon[] = [
  {
    name: 'Microsoft',
    icon: 'https://img.icons8.com/color/48/microsoft.png',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
  },
  {
    name: 'Google',
    icon: 'https://img.icons8.com/color/48/google-logo.png',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
  },
  {
    name: 'Xero',
    icon: 'https://img.icons8.com/color/48/xero.png',
    badge: 'NEW',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
  },
  {
    name: 'AWS',
    icon: 'https://img.icons8.com/color/48/amazon-web-services.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
  },
]

const destinations: AppIcon[] = [
  {
    name: 'Power BI',
    icon: 'https://img.icons8.com/color/48/power-bi.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
  },
  {
    name: 'AI Agents',
    label: 'AI',
    bgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
    iconColor: 'text-purple-500',
    kind: 'bot',
  },
  {
    name: 'Teams',
    icon: 'https://img.icons8.com/color/48/microsoft-teams.png',
    bgColor: 'bg-indigo-600/10 dark:bg-indigo-400/10',
  },
  {
    name: 'Tasks',
    label: 'To do',
    bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10',
    iconColor: 'text-emerald-500',
    kind: 'tasks',
  },
]

// ---- Diagram geometry (SVG user units) ----
const VB_W = 920
const VB_H = 460
const HUB = { x: 460, y: 230 }
const SRC_X = 110
const DST_X = 810
const NODE_Y = [70, 185, 295, 410]
const IN_END_X = 394
const OUT_START_X = 526

const inPath = (y: number) =>
  `M ${SRC_X + 34} ${y} C ${SRC_X + 170} ${y}, 300 ${HUB.y}, ${IN_END_X} ${HUB.y}`

const outPath = (y: number) =>
  `M ${OUT_START_X} ${HUB.y} C 620 ${HUB.y}, ${DST_X - 170} ${y}, ${DST_X - 34} ${y}`

// ---- Motion variants ----
const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const nodeVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
} as const

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1, ease: EASE_OUT }, opacity: { duration: 0.3 } },
  },
} as const

function AppGlyph({ app }: { app: AppIcon }) {
  if (app.kind === 'bot') {
    return <Bot className={`size-6 ${app.iconColor}`} strokeWidth={1.8} />
  }

  if (app.kind === 'tasks') {
    return <ListChecks className={`size-6 ${app.iconColor}`} strokeWidth={1.8} />
  }

  return (
    <>
      {app.icon && <AvatarImage src={app.icon} alt={app.name} />}
      <AvatarFallback className="text-[9px]">{app.label ?? app.name.slice(0, 2)}</AvatarFallback>
    </>
  )
}

function Node({ app, x, y, align }: { app: AppIcon; x: number; y: number; align: 'left' | 'right' }) {
  const labelX = align === 'left' ? x + 42 : x - 42
  const textAnchor = align === 'left' ? 'start' : 'end'

  return (
    <motion.g variants={nodeVariant} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <foreignObject x={x - 30} y={y - 30} width={60} height={60} className="overflow-visible">
        <div className="flex size-full items-center justify-center">
          <Avatar className={`${app.bgColor} border-background size-12 border-2 p-2.5 shadow-sm`}>
            <AppGlyph app={app} />
          </Avatar>
        </div>
      </foreignObject>
      {app.badge && (
        <foreignObject x={x + 8} y={y - 36} width={48} height={20} className="overflow-visible">
          <div className="rounded-full border border-[var(--neon)] bg-card px-2 py-0.5 text-[9px] font-semibold text-[var(--neon)] shadow-[0_0_14px_-7px_var(--neon)]">
            {app.badge}
          </div>
        </foreignObject>
      )}
      <text
        x={labelX}
        y={y + 5}
        textAnchor={textAnchor}
        className="fill-foreground"
        style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
      >
        {app.name}
      </text>
      <text
        x={labelX}
        y={y + 23}
        textAnchor={textAnchor}
        className="fill-muted-foreground"
        style={{ fontSize: 11, fontFamily: 'var(--font-sans)' }}
      >
        {align === 'left' ? 'source system' : 'decision layer'}
      </text>
    </motion.g>
  )
}

export function AppIntegration() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <motion.svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="h-auto w-full overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={parent}
      >
        <defs>
          {/* Soft neon/colour glow for the moving pulses and active wires. */}
          <filter id="flowGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Stronger bloom for the central hub ring. */}
          <filter id="hubGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Column labels */}
        <text
          x={SRC_X}
          y={28}
          textAnchor="middle"
          className="fill-primary"
          style={{ fontSize: 14, letterSpacing: 0, fontFamily: 'var(--font-mono)' }}
        >
          SOURCES
        </text>
        <text
          x={DST_X}
          y={28}
          textAnchor="middle"
          className="fill-[var(--neon)]"
          style={{ fontSize: 14, letterSpacing: 0, fontFamily: 'var(--font-mono)' }}
        >
          DESTINATIONS
        </text>

        {/* ---- INCOMING wires (magenta) ---- */}
        {NODE_Y.map((y, i) => (
          <g key={`in-wire-${i}`}>
            <motion.path
              id={`in-${i}`}
              d={inPath(y)}
              fill="none"
              variants={drawVariant}
              className="stroke-primary/30"
              strokeWidth={1.5}
            />
            <circle r={3.5} className="fill-primary" filter="url(#flowGlow)">
              <animateMotion
                dur="2.4s"
                begin={`${1.1 + i * 0.35}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#in-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ---- OUTGOING wires (neon green) ---- */}
        {NODE_Y.map((y, i) => (
          <g key={`out-wire-${i}`}>
            <motion.path
              id={`out-${i}`}
              d={outPath(y)}
              fill="none"
              variants={drawVariant}
              className="stroke-[var(--neon)]"
              strokeOpacity={0.45}
              strokeWidth={1.5}
              filter="url(#flowGlow)"
            />
            <circle r={4} className="fill-[var(--neon)]" filter="url(#flowGlow)">
              <animateMotion
                dur="2.4s"
                begin={`${1.4 + i * 0.35}s`}
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#out-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {/* ---- Central Native Schema hub with pulsing neon ring ---- */}
        <motion.g variants={nodeVariant} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          {/* Pulsing halo */}
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={62}
            className="fill-[var(--neon)]"
            filter="url(#hubGlow)"
            animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <foreignObject x={HUB.x - 62} y={HUB.y - 62} width={124} height={124} className="overflow-visible">
            <div className="flex size-full items-center justify-center">
              <div className="bg-card flex size-24 items-center justify-center rounded-2xl border-2 border-[var(--neon)] shadow-[0_0_30px_-4px_var(--neon)]">
                <NativeSchemaLogo className="size-16 text-foreground" />
              </div>
            </div>
          </foreignObject>
          <text
            x={HUB.x}
            y={HUB.y + 88}
            textAnchor="middle"
            className="fill-foreground"
            style={{ fontSize: 15, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
          >
            Ingest, model, activate
          </text>
          <text
            x={HUB.x}
            y={HUB.y + 108}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 12, fontFamily: 'var(--font-sans)' }}
          >
            one governed data layer
          </text>
        </motion.g>

        {/* ---- Nodes ---- */}
        {sources.map((app, i) => (
          <Node key={app.name} app={app} x={SRC_X} y={NODE_Y[i]} align="left" />
        ))}
        {destinations.map((app, i) => (
          <Node key={app.name} app={app} x={DST_X} y={NODE_Y[i]} align="right" />
        ))}
      </motion.svg>
      <div className="mt-2 grid gap-2 text-center text-xs text-muted-foreground sm:grid-cols-3">
        <span className="rounded-md border border-border/60 bg-background/45 px-3 py-2">Connect source systems</span>
        <span className="rounded-md border border-border/60 bg-background/45 px-3 py-2">Unify operational data</span>
        <span className="rounded-md border border-border/60 bg-background/45 px-3 py-2">Deliver decisions where teams work</span>
      </div>
    </div>
  )
}
