'use client'

import { motion } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NativeSchemaLogo from '@/components/native-schema-logo'
import { EASE_OUT } from '@/lib/motion'

type AppIcon = {
  name: string
  icon: string
  bgColor: string
}

/** Systems that hold the raw data - these flow INTO Native Schema. */
const sources: AppIcon[] = [
  {
    name: 'ActionStep',
    icon: 'https://avatars.githubusercontent.com/u/38897285?s=200&v=4',
    bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10',
  },
  {
    name: 'LawMaster',
    icon: 'https://www.lawmaster.com.au/favicon.ico',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
  },
  {
    name: 'HubSpot',
    icon: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    bgColor: 'bg-orange-600/10 dark:bg-orange-400/10',
  },
  {
    name: 'Salesforce',
    icon: 'https://img.icons8.com/color/48/salesforce.png',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
  },
  {
    name: 'Microsoft',
    icon: 'https://img.icons8.com/color/48/microsoft.png',
    bgColor: 'bg-sky-600/10 dark:bg-sky-400/10',
  },
  {
    name: 'Google Cloud',
    icon: 'https://img.icons8.com/color/48/google-cloud.png',
    bgColor: 'bg-blue-600/10 dark:bg-blue-400/10',
  },
  {
    name: 'AWS',
    icon: 'https://img.icons8.com/color/48/amazon-web-services.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
  },
  {
    name: 'Xero',
    icon: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Xero_software_logo.svg',
    bgColor: 'bg-cyan-600/10 dark:bg-cyan-400/10',
  },
]

/** Where the unified, processed data flows OUT to. */
const destinations: AppIcon[] = [
  {
    name: 'Power BI',
    icon: 'https://img.icons8.com/color/48/power-bi.png',
    bgColor: 'bg-amber-600/10 dark:bg-amber-400/10',
  },
  {
    name: 'AI Agents',
    icon: 'https://img.icons8.com/color/48/artificial-intelligence.png',
    bgColor: 'bg-purple-600/10 dark:bg-purple-400/10',
  },
  {
    name: 'Slack',
    icon: 'https://img.icons8.com/color/48/slack-new.png',
    bgColor: 'bg-fuchsia-600/10 dark:bg-fuchsia-400/10',
  },
  {
    name: 'Teams',
    icon: 'https://img.icons8.com/color/48/microsoft-teams-2019.png',
    bgColor: 'bg-indigo-600/10 dark:bg-indigo-400/10',
  },
  {
    name: 'Sheets',
    icon: 'https://img.icons8.com/color/48/google-sheets.png',
    bgColor: 'bg-emerald-600/10 dark:bg-emerald-400/10',
  },
]

// ---- Diagram geometry (SVG user units) ----
// Heights are derived from the larger column so the layout adapts to any
// number of nodes on each side.
const VB_W = 920
const PITCH = 80
const TOP_PAD = 60
const BOTTOM_PAD = 56
const maxCount = Math.max(sources.length, destinations.length)
const VB_H = TOP_PAD + (maxCount - 1) * PITCH + BOTTOM_PAD
const HUB = { x: VB_W / 2, y: VB_H / 2 }
const SRC_X = 110
const DST_X = VB_W - 110
const IN_END_X = HUB.x - 64 // incoming lines funnel to here (just left of hub)
const OUT_START_X = HUB.x + 64 // outgoing lines emanate from here (just right of hub)

// Evenly space a column of nodes centred on the hub.
function columnYs(count: number): number[] {
  const start = HUB.y - ((count - 1) * PITCH) / 2
  return Array.from({ length: count }, (_, i) => start + i * PITCH)
}
const sourceYs = columnYs(sources.length)
const destYs = columnYs(destinations.length)
const srcLabelY = sourceYs[0] - 40
const dstLabelY = destYs[0] - 40

const inPath = (y: number) =>
  `M ${SRC_X + 34} ${y} C ${SRC_X + 170} ${y}, ${HUB.x - 160} ${HUB.y}, ${IN_END_X} ${HUB.y}`

const outPath = (y: number) =>
  `M ${OUT_START_X} ${HUB.y} C ${HUB.x + 160} ${HUB.y}, ${DST_X - 170} ${y}, ${DST_X - 34} ${y}`

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

function Node({ app, x, y }: { app: AppIcon; x: number; y: number }) {
  return (
    <motion.g variants={nodeVariant} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
      <foreignObject x={x - 30} y={y - 30} width={60} height={60} className="overflow-visible">
        <div className="flex size-full items-center justify-center">
          <Avatar className={`${app.bgColor} border-background size-12 border-2 p-2.5 shadow-sm`}>
            <AvatarImage src={app.icon} alt={app.name} />
            <AvatarFallback className="text-[9px]">{app.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </foreignObject>
      <text
        x={x}
        y={y + 46}
        textAnchor="middle"
        className="fill-muted-foreground"
        style={{ fontSize: 13, fontFamily: 'var(--font-sans)' }}
      >
        {app.name}
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
          y={srcLabelY}
          textAnchor="middle"
          className="fill-primary"
          style={{ fontSize: 14, letterSpacing: 3, fontFamily: 'var(--font-mono)' }}
        >
          DATA IN
        </text>
        <text
          x={DST_X}
          y={dstLabelY}
          textAnchor="middle"
          className="fill-[var(--neon)]"
          style={{ fontSize: 14, letterSpacing: 3, fontFamily: 'var(--font-mono)' }}
        >
          DATA OUT
        </text>

        {/* ---- INCOMING wires (magenta) ---- */}
        {sourceYs.map((y, i) => (
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
                begin={`${1.1 + i * 0.3}s`}
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
        {destYs.map((y, i) => (
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
                begin={`${1.4 + i * 0.3}s`}
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
        </motion.g>

        {/* ---- Nodes ---- */}
        {sources.map((app, i) => (
          <Node key={app.name} app={app} x={SRC_X} y={sourceYs[i]} />
        ))}
        {destinations.map((app, i) => (
          <Node key={app.name} app={app} x={DST_X} y={destYs[i]} />
        ))}
      </motion.svg>
    </div>
  )
}
