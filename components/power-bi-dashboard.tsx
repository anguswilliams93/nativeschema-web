'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowDownRight,
  ArrowUpRight,
  MoreHorizontal,
  Sparkles,
  CalendarDays,
} from 'lucide-react'
import { LogoIcon } from '@/components/logo'
import { EASE_OUT } from '@/lib/motion'

/* ================================================================== */
/* Mock data — a fictional NativeSchema BI report for a services firm */
/* ================================================================== */

interface Month {
  label: string
  revenue: number // $k
  target: number // $k
  margin: number // %
  newClients: number
}

const MONTHLY: Month[] = [
  { label: 'Jul', revenue: 82, target: 80, margin: 59.1, newClients: 3 },
  { label: 'Aug', revenue: 79, target: 84, margin: 58.4, newClients: 2 },
  { label: 'Sep', revenue: 88, target: 88, margin: 60.2, newClients: 2 },
  { label: 'Oct', revenue: 95, target: 92, margin: 61.0, newClients: 1 },
  { label: 'Nov', revenue: 91, target: 96, margin: 60.6, newClients: 2 },
  { label: 'Dec', revenue: 104, target: 100, margin: 62.1, newClients: 1 },
  { label: 'Jan', revenue: 112, target: 104, margin: 62.8, newClients: 2 },
  { label: 'Feb', revenue: 108, target: 108, margin: 63.0, newClients: 1 },
  { label: 'Mar', revenue: 121, target: 112, margin: 63.9, newClients: 2 },
  { label: 'Apr', revenue: 118, target: 116, margin: 64.2, newClients: 1 },
  { label: 'May', revenue: 129, target: 120, margin: 64.8, newClients: 2 },
  { label: 'Jun', revenue: 138, target: 124, margin: 65.4, newClients: 1 },
]

const BASE_CLIENTS = 164

// Service mix drifts month-to-month so the donut shifts with the date range.
const SERVICE_DEFS = [
  { name: 'Power BI & Reporting', base: 0.34, drift: 0.011, margin: '68%', yoy: '+18%', token: 'var(--chart-1)' },
  { name: 'Workflow Automation', base: 0.25, drift: 0.007, margin: '61%', yoy: '+24%', token: 'var(--chart-2)' },
  { name: 'Custom Software', base: 0.27, drift: -0.013, margin: '59%', yoy: '+9%', token: 'var(--chart-3)' },
  { name: 'Hosting & Support', base: 0.14, drift: -0.005, margin: '72%', yoy: '+6%', token: 'var(--chart-4)' },
]

function serviceRevenueFor(month: Month, monthIdx: number) {
  const centred = monthIdx - 5.5
  return SERVICE_DEFS.map((s) => {
    const frac = Math.max(0.04, s.base + s.drift * centred)
    return { ...s, value: month.revenue * frac }
  })
}

const SALESPEOPLE = [
  { name: 'Sarah Nguyen', region: 'Metro East', revenue: 312, deals: 41, quota: 118 },
  { name: "James O'Brien", region: 'Northern', revenue: 268, deals: 36, quota: 104 },
  { name: 'Priya Sharma', region: 'Western', revenue: 241, deals: 33, quota: 96 },
  { name: 'Daniel Kerr', region: 'Metro West', revenue: 198, deals: 28, quota: 88 },
  { name: 'Aisha Bello', region: 'Regional', revenue: 162, deals: 24, quota: 79 },
]

const REGIONS = [
  { name: 'Metro East', revenue: 384, token: 'var(--chart-1)' },
  { name: 'Northern', revenue: 286, token: 'var(--chart-2)' },
  { name: 'Western', revenue: 252, token: 'var(--chart-3)' },
  { name: 'Metro West', revenue: 201, token: 'var(--chart-4)' },
  { name: 'Regional', revenue: 142, token: 'var(--chart-5)' },
]

const COST_SAVINGS = [
  { area: 'Process Automation', saved: 84 },
  { area: 'Manual Hours Removed', saved: 62 },
  { area: 'Hosting Consolidation', saved: 38 },
  { area: 'Error & Rework', saved: 27 },
  { area: 'Licensing Optimisation', saved: 19 },
]

const TOP_CLIENTS = [
  { name: 'Harbour Legal', full: 312 },
  { name: 'Meridian Health', full: 268 },
  { name: 'Apex Logistics', full: 201 },
  { name: 'Northwind Group', full: 164 },
  { name: 'Civic Partners', full: 122 },
]

const STAFF_TICKETS = [
  { name: 'Liam Carter', solved: 142 },
  { name: 'Noah Patel', solved: 128 },
  { name: 'Mia Tran', solved: 119 },
  { name: 'Ethan Ross', solved: 97 },
  { name: 'Zoe Lin', solved: 84 },
]

const SEVERITY: Record<string, string> = { High: 'var(--destructive)', Med: 'var(--chart-4)', Low: 'var(--chart-2)' }
const INCIDENTS = [
  { id: 'INC-2051', title: 'SSO login errors — Finance', severity: 'High', owner: 'L. Carter', age: '1h' },
  { id: 'INC-2039', title: 'Report refresh failing', severity: 'High', owner: 'M. Tran', age: '5h' },
  { id: 'INC-2042', title: 'Email sync delayed', severity: 'Med', owner: 'N. Patel', age: '2h' },
  { id: 'INC-2048', title: 'API rate-limit warnings', severity: 'Med', owner: 'E. Ross', age: '3h' },
  { id: 'INC-2033', title: 'Slow dashboard load', severity: 'Low', owner: 'Z. Lin', age: '1d' },
]

const PIPELINE = [
  { stage: 'Leads', value: 1240 },
  { stage: 'Qualified', value: 720 },
  { stage: 'Proposals', value: 380 },
  { stage: 'Won', value: 162 },
]

const LEAD_SOURCE = [
  { name: 'Referral', value: 38, token: 'var(--chart-1)' },
  { name: 'Inbound', value: 27, token: 'var(--chart-2)' },
  { name: 'Outbound', value: 22, token: 'var(--chart-3)' },
  { name: 'Partner', value: 13, token: 'var(--chart-4)' },
]

const QUARTERLY = [
  { label: 'Q1', value: 249 },
  { label: 'Q2', value: 290 },
  { label: 'Q3', value: 341 },
  { label: 'Q4', value: 385 },
]

const EVENTS = [
  { day: 3, title: 'Quarterly performance review', type: 'Review', token: 'var(--chart-3)' },
  { day: 9, title: 'Power BI rollout — Finance', type: 'Launch', token: 'var(--primary)' },
  { day: 14, title: 'Data quality audit', type: 'Ops', token: 'var(--chart-4)' },
  { day: 20, title: 'Board report due', type: 'Milestone', token: 'var(--neon)' },
  { day: 27, title: 'Automation go-live', type: 'Launch', token: 'var(--primary)' },
]
const EVENT_MONTH = { label: 'June 2026', days: 30, firstOffset: 0 } // 1 Jun 2026 = Monday (week starts Mon)

/* ================================================================== */
/* Helpers                                                            */
/* ================================================================== */

const fmtMoneyK = (k: number) => (k >= 1000 ? `$${(k / 1000).toFixed(2)}M` : `$${Math.round(k)}K`)
const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0)

/* ================================================================== */
/* Chart primitives                                                   */
/* ================================================================== */

function TrendChart({ revenue, target, labels }: { revenue: number[]; target: number[]; labels: string[] }) {
  const W = 720
  const H = 240
  const PAD = 28
  const all = [...revenue, ...target]
  const max = Math.max(...all) * 1.08
  const min = Math.min(...all) * 0.82
  const denom = Math.max(revenue.length - 1, 1)
  const px = (i: number) => (revenue.length === 1 ? W / 2 : PAD + (i * (W - 2 * PAD)) / denom)
  const py = (v: number) => H - PAD - ((v - min) / (max - min || 1)) * (H - 2 * PAD)
  const line = (vals: number[]) => vals.map((v, i) => `${px(i)},${py(v)}`).join(' ')
  const area =
    `M ${px(0)},${H - PAD} ` + revenue.map((v, i) => `L ${px(i)},${py(v)}`).join(' ') + ` L ${px(revenue.length - 1)},${H - PAD} Z`

  return (
    <>
      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-3 rounded-sm" style={{ background: 'var(--chart-1)' }} /> Revenue
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3 rounded-sm border-t-2 border-dashed border-muted-foreground" /> Target
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-48 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((g) => {
          const y = PAD + (g * (H - 2 * PAD)) / 3
          return <line key={g} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="var(--border)" strokeWidth="1" />
        })}
        <motion.path d={area} fill="url(#revFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }} />
        <motion.polyline points={line(revenue)} fill="none" stroke="var(--chart-1)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE_OUT }} />
        <motion.polyline points={line(target)} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }} />
        {revenue.map((v, i) => (
          <motion.circle
            key={i}
            cx={px(i)}
            cy={py(v)}
            r="3"
            fill="var(--card)"
            stroke="var(--chart-1)"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.5 + i * 0.05 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1 font-mono text-[10px] text-muted-foreground">
        {labels.map((m, i) => (
          <span key={`${m}-${i}`}>{m}</span>
        ))}
      </div>
    </>
  )
}

function DonutChart({ segments, centre, caption }: { segments: { name: string; value: number; token: string }[]; centre: string; caption: string }) {
  const total = sum(segments.map((s) => s.value)) || 1
  const pcts = segments.map((s) => (s.value / total) * 100)
  return (
    <div className="relative flex items-center justify-center">
      <motion.svg
        viewBox="0 0 42 42"
        className="h-44 w-44 -rotate-90"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--muted)" strokeWidth="5" />
        {segments.map((s, idx) => {
          const preceding = sum(pcts.slice(0, idx))
          return (
            <motion.circle
              key={s.name}
              cx="21"
              cy="21"
              r="15.915"
              fill="none"
              stroke={s.token}
              strokeWidth="5"
              strokeDashoffset={25 - preceding}
              initial={{ strokeDasharray: `0 100` }}
              animate={{ strokeDasharray: `${pcts[idx]} ${100 - pcts[idx]}` }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 + idx * 0.12 }}
            />
          )
        })}
      </motion.svg>
      <div className="absolute text-center">
        <p className="font-mono text-2xl font-semibold leading-none">{centre}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{caption}</p>
      </div>
    </div>
  )
}

function Gauge({ pct, centre, sub }: { pct: number; centre: string; sub: string }) {
  const clamped = Math.min(100, Math.max(0, pct))
  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 42 42" className="h-32 w-32 -rotate-90">
        <circle cx="21" cy="21" r="15.915" fill="none" stroke="var(--muted)" strokeWidth="4" />
        <motion.circle
          cx="21"
          cy="21"
          r="15.915"
          fill="none"
          stroke="var(--neon)"
          strokeWidth="4"
          strokeDashoffset="0"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 100` }}
          animate={{ strokeDasharray: `${clamped} ${100 - clamped}` }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-mono text-2xl font-semibold leading-none text-neon">{centre}</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function BarList({ items }: { items: { label: string; value: number; text: string; token?: string }[] }) {
  const max = Math.max(...items.map((i) => i.value)) || 1
  return (
    <ul className="space-y-3">
      {items.map((it, idx) => (
        <li key={it.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="truncate pr-2 text-muted-foreground">{it.label}</span>
            <span className="font-mono font-medium">{it.text}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ background: it.token ?? 'linear-gradient(90deg, var(--chart-1), var(--chart-2))' }}
              initial={{ width: 0 }}
              animate={{ width: `${(it.value / max) * 100}%` }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: idx * 0.08 }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

function Funnel({ stages }: { stages: { stage: string; value: number }[] }) {
  const max = stages[0]?.value || 1
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => {
        const conv = i === 0 ? 100 : Math.round((s.value / stages[i - 1].value) * 100)
        return (
          <div key={s.stage} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">{s.stage}</span>
            <div className="h-7 flex-1 overflow-hidden rounded-md bg-muted">
              <motion.div
                className="flex h-full items-center justify-end rounded-md px-2"
                style={{ background: 'linear-gradient(90deg, var(--chart-1), var(--chart-2))' }}
                initial={{ width: 0 }}
                animate={{ width: `${(s.value / max) * 100}%` }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.1 }}
              >
                <span className="font-mono text-xs font-semibold text-primary-foreground">{s.value.toLocaleString()}</span>
              </motion.div>
            </div>
            <span className="w-9 shrink-0 text-right font-mono text-[11px] text-muted-foreground">{conv}%</span>
          </div>
        )
      })}
    </div>
  )
}

function VBarChart({ bars, fmt }: { bars: { label: string; value: number }[]; fmt: (v: number) => string }) {
  const max = Math.max(...bars.map((b) => b.value)) || 1
  return (
    <div>
      <div className="flex h-40 items-end gap-3">
        {bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end">
            <span className="mb-1 font-mono text-[11px] font-medium">{fmt(b.value)}</span>
            <motion.div
              className="w-full rounded-t-md"
              style={{ background: 'linear-gradient(180deg, var(--chart-1), color-mix(in oklch, var(--chart-2) 80%, transparent))' }}
              initial={{ height: 0 }}
              animate={{ height: `${(b.value / max) * 100}%` }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.1 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        {bars.map((b) => (
          <span key={b.label} className="flex-1 text-center text-[11px] text-muted-foreground">{b.label}</span>
        ))}
      </div>
    </div>
  )
}

function Tile({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col rounded-lg border border-border bg-card shadow-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground/60" />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

function KpiTile({ label, value, delta, up, sub }: { label: string; value: string; delta: string; up: boolean; sub: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl font-semibold leading-none sm:text-3xl">{value}</p>
      <p className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${up ? 'text-neon' : 'text-destructive'}`}>
        {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
        {delta}
        <span className="text-muted-foreground">{sub}</span>
      </p>
    </div>
  )
}

/* ================================================================== */
/* Tab pages                                                          */
/* ================================================================== */

const PRESETS = [
  { label: 'Full Year', from: 0, to: 11 },
  { label: 'H1', from: 0, to: 5 },
  { label: 'H2', from: 6, to: 11 },
  { label: 'Last Quarter', from: 9, to: 11 },
]

type Tab = 'exec' | 'sales' | 'ops'

export function PowerBiDashboard() {
  const [tab, setTab] = useState<Tab>('exec')
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(11)

  const setRange = (f: number, t: number) => {
    setFrom(Math.min(f, t))
    setTo(Math.max(f, t))
  }

  const d = useMemo(() => {
    const slice = MONTHLY.slice(from, to + 1)
    const idxs = slice.map((_, i) => from + i)
    const totalRevenue = sum(slice.map((m) => m.revenue))
    const totalTarget = sum(slice.map((m) => m.target))
    const avgMargin = slice.length ? sum(slice.map((m) => m.margin * m.revenue)) / (totalRevenue || 1) : 0
    const netNew = sum(slice.map((m) => m.newClients))
    const activeClients = BASE_CLIENTS + sum(MONTHLY.slice(0, to + 1).map((m) => m.newClients))
    const fraction = slice.length / MONTHLY.length

    // service mix over the range
    const svcTotals = SERVICE_DEFS.map((s, si) => ({
      name: s.name,
      token: s.token,
      margin: s.margin,
      yoy: s.yoy,
      value: sum(slice.map((m, i) => serviceRevenueFor(m, idxs[i])[si].value)),
    }))

    const revVsTarget = totalTarget ? ((totalRevenue - totalTarget) / totalTarget) * 100 : 0
    const annualGoal = 1590
    const goalPct = (totalRevenue / (annualGoal * fraction || 1)) * 100

    return { slice, totalRevenue, totalTarget, avgMargin, netNew, activeClients, fraction, svcTotals, revVsTarget, goalPct }
  }, [from, to])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-2xl shadow-primary/5">
      {/* ===== Report chrome ===== */}
      <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
            <LogoIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Harbour &amp; Co — Performance Report</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-neon" />
              Designed &amp; built by Native Schema
            </p>
          </div>
        </div>

        {/* Date range filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2 py-1">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            <select
              aria-label="From month"
              value={from}
              onChange={(e) => setRange(Number(e.target.value), to)}
              className="bg-transparent text-xs font-medium outline-none"
            >
              {MONTHLY.map((m, i) => (
                <option key={m.label} value={i} className="bg-card text-foreground">{m.label}</option>
              ))}
            </select>
            <span className="text-xs text-muted-foreground">→</span>
            <select
              aria-label="To month"
              value={to}
              onChange={(e) => setRange(from, Number(e.target.value))}
              className="bg-transparent text-xs font-medium outline-none"
            >
              {MONTHLY.map((m, i) => (
                <option key={m.label} value={i} className="bg-card text-foreground">{m.label}</option>
              ))}
            </select>
          </div>
          {PRESETS.map((p) => {
            const active = from === p.from && to === p.to
            return (
              <button
                key={p.label}
                onClick={() => setRange(p.from, p.to)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  active ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ===== Canvas (min-height pinned so the report doesn't resize between tabs) ===== */}
      <div className="space-y-4 p-4 sm:p-6 lg:min-h-[957px]">
        {tab === 'exec' && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiTile label="Total Revenue" value={fmtMoneyK(d.totalRevenue)} delta={`${Math.abs(d.revVsTarget).toFixed(1)}%`} up={d.revVsTarget >= 0} sub="vs target" />
              <KpiTile label="Gross Margin" value={`${d.avgMargin.toFixed(1)}%`} delta={`${(d.avgMargin - 59).toFixed(1)} pts`} up={d.avgMargin >= 59} sub="vs FY24" />
              <KpiTile label="Active Clients" value={`${d.activeClients}`} delta={`${d.netNew}`} up sub="net new" />
              <KpiTile label="Avg. Engagement" value={`$${(d.activeClients ? d.totalRevenue / d.activeClients : 0).toFixed(1)}K`} delta="2.1%" up={d.revVsTarget >= 0} sub="vs FY24" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title={`Revenue vs Target — ${d.slice[0]?.label}–${d.slice[d.slice.length - 1]?.label}`} className="lg:col-span-2">
                <TrendChart key={`${from}-${to}`} revenue={d.slice.map((m) => m.revenue)} target={d.slice.map((m) => m.target)} labels={d.slice.map((m) => m.label)} />
              </Tile>

              <Tile title="Revenue by Service Line">
                <DonutChart key={`${from}-${to}`} segments={d.svcTotals} centre={fmtMoneyK(d.totalRevenue)} caption="Range total" />
                <ul className="mt-4 space-y-2">
                  {d.svcTotals.map((s) => {
                    const pct = d.totalRevenue ? Math.round((s.value / d.totalRevenue) * 100) : 0
                    return (
                      <li key={s.name} className="flex items-center gap-2 text-xs">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.token }} />
                        <span className="flex-1 truncate text-muted-foreground">{s.name}</span>
                        <span className="font-mono font-medium">{pct}%</span>
                      </li>
                    )
                  })}
                </ul>
              </Tile>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title="Top Clients by Revenue">
                <BarList
                  key={`${from}-${to}`}
                  items={TOP_CLIENTS.map((c) => {
                    const v = Math.round(c.full * d.fraction)
                    return { label: c.name, value: v, text: `${v}K` }
                  })}
                />
              </Tile>

              <Tile title="Target Completion">
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <Gauge key={`${from}-${to}`} pct={d.goalPct} centre={`${Math.round(d.goalPct)}%`} sub="to target" />
                  <p className="text-center text-xs text-muted-foreground">
                    <span className="font-mono font-medium text-foreground">{fmtMoneyK(d.totalRevenue)}</span> of{' '}
                    <span className="font-mono font-medium text-foreground">{fmtMoneyK(1590 * d.fraction)}</span> goal
                  </p>
                </div>
              </Tile>

              <Tile title="Service Performance">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Service</th>
                      <th className="pb-2 text-right font-medium">Rev</th>
                      <th className="pb-2 text-right font-medium">Margin</th>
                      <th className="pb-2 text-right font-medium">YoY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {d.svcTotals.map((s) => (
                      <tr key={s.name}>
                        <td className="py-2 pr-2">
                          <span className="flex items-center gap-2">
                            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: s.token }} />
                            <span className="truncate">{s.name}</span>
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">{fmtMoneyK(s.value)}</td>
                        <td className="py-2 text-right font-mono">{s.margin}</td>
                        <td className="py-2 text-right font-mono text-neon">{s.yoy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tile>
            </div>
          </>
        )}

        {tab === 'sales' && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiTile label="Bookings" value={fmtMoneyK(sum(SALESPEOPLE.map((s) => s.revenue)) * d.fraction)} delta={`${d.revVsTarget >= 0 ? '' : '-'}${Math.abs(d.revVsTarget).toFixed(1)}%`} up={d.revVsTarget >= 0} sub="vs target" />
              <KpiTile label="Deals Closed" value={`${Math.round(sum(SALESPEOPLE.map((s) => s.deals)) * d.fraction)}`} delta="11" up sub="vs FY24" />
              <KpiTile label="Win Rate" value="41%" delta="3.4 pts" up sub="vs FY24" />
              <KpiTile label="Avg. Deal Size" value="$18.2K" delta="1.2%" up sub="vs FY24" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title="Top Performers" className="lg:col-span-2">
                <ul key={`${from}-${to}`} className="space-y-3">
                  {SALESPEOPLE.map((p, i) => {
                    const rev = Math.round(p.revenue * d.fraction)
                    const max = Math.round(SALESPEOPLE[0].revenue * d.fraction) || 1
                    return (
                      <li key={p.name} className="flex items-center gap-3">
                        <span className="w-4 text-center font-mono text-xs text-muted-foreground">{i + 1}</span>
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground"
                          style={{ background: i === 0 ? 'var(--primary)' : 'color-mix(in oklch, var(--primary) 55%, var(--muted))' }}
                        >
                          {p.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="truncate text-sm font-medium">{p.name}</span>
                            <span className="font-mono text-sm font-semibold">${rev}K</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[11px] text-muted-foreground">{p.region} · {Math.round(p.deals * d.fraction)} deals</span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, var(--chart-1), var(--chart-2))' }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(rev / max) * 100}%` }}
                              transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.08 }}
                            />
                          </div>
                        </div>
                        <span className={`shrink-0 font-mono text-xs font-medium ${p.quota >= 100 ? 'text-neon' : 'text-muted-foreground'}`}>{p.quota}%</span>
                      </li>
                    )
                  })}
                </ul>
                <p className="mt-3 text-right text-[11px] text-muted-foreground">% = attainment vs quota</p>
              </Tile>

              <Tile title="Revenue by Region">
                <DonutChart
                  key={`${from}-${to}`}
                  segments={REGIONS.map((r) => ({ name: r.name, value: r.revenue * d.fraction, token: r.token }))}
                  centre={fmtMoneyK(sum(REGIONS.map((r) => r.revenue)) * d.fraction)}
                  caption="Range total"
                />
                <ul className="mt-4 space-y-2">
                  {REGIONS.map((r) => {
                    const tot = sum(REGIONS.map((x) => x.revenue))
                    return (
                      <li key={r.name} className="flex items-center gap-2 text-xs">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: r.token }} />
                        <span className="flex-1 truncate text-muted-foreground">{r.name}</span>
                        <span className="font-mono font-medium">{Math.round((r.revenue / tot) * 100)}%</span>
                      </li>
                    )
                  })}
                </ul>
              </Tile>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title="Sales Pipeline">
                <Funnel key={`${from}-${to}`} stages={PIPELINE.map((s) => ({ stage: s.stage, value: Math.round(s.value * d.fraction) }))} />
                <p className="mt-3 text-right text-[11px] text-muted-foreground">stage-to-stage conversion</p>
              </Tile>

              <Tile title="Quarterly Bookings">
                <VBarChart key={`${from}-${to}`} bars={QUARTERLY.map((q) => ({ label: q.label, value: Math.round(q.value * d.fraction) }))} fmt={(v) => `$${v}K`} />
              </Tile>

              <Tile title="Lead Source">
                <DonutChart
                  key={`${from}-${to}`}
                  segments={LEAD_SOURCE.map((s) => ({ name: s.name, value: s.value, token: s.token }))}
                  centre={`${Math.round(sum(PIPELINE.map((p) => p.value)) * d.fraction).toLocaleString()}`}
                  caption="Leads"
                />
                <ul className="mt-4 space-y-2">
                  {LEAD_SOURCE.map((s) => (
                    <li key={s.name} className="flex items-center gap-2 text-xs">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: s.token }} />
                      <span className="flex-1 truncate text-muted-foreground">{s.name}</span>
                      <span className="font-mono font-medium">{s.value}%</span>
                    </li>
                  ))}
                </ul>
              </Tile>
            </div>
          </>
        )}

        {tab === 'ops' && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <KpiTile label="Revenue (range)" value={fmtMoneyK(d.totalRevenue)} delta={`${Math.abs(d.revVsTarget).toFixed(1)}%`} up={d.revVsTarget >= 0} sub="vs target" />
              <KpiTile label="Costs Saved" value={fmtMoneyK(sum(COST_SAVINGS.map((c) => c.saved)) * d.fraction)} delta="14.6%" up sub="vs FY24" />
              <KpiTile label="Hours Reclaimed" value={`${Math.round(1840 * d.fraction)}`} delta="9.2%" up sub="vs FY24" />
              <KpiTile label="SLA Uptime" value="99.95%" delta="0.04 pts" up sub="vs FY24" />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title={`Upcoming Events — ${EVENT_MONTH.label}`} className="lg:col-span-2">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Calendar grid */}
                  <div>
                    <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dl, i) => (
                        <span key={i}>{dl}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: EVENT_MONTH.firstOffset }).map((_, i) => (
                        <span key={`pad-${i}`} />
                      ))}
                      {Array.from({ length: EVENT_MONTH.days }).map((_, i) => {
                        const day = i + 1
                        const ev = EVENTS.find((e) => e.day === day)
                        return (
                          <span
                            key={day}
                            className={`relative flex aspect-square items-center justify-center rounded-md text-[11px] ${
                              ev ? 'font-semibold text-foreground ring-1' : 'text-muted-foreground'
                            }`}
                            style={ev ? { background: 'color-mix(in oklch, var(--primary) 12%, transparent)', boxShadow: `inset 0 0 0 1px ${ev.token}` } : undefined}
                          >
                            {day}
                            {ev && <span className="absolute bottom-1 h-1 w-1 rounded-full" style={{ background: ev.token }} />}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  {/* Event list */}
                  <ul className="space-y-2.5">
                    {EVENTS.map((e) => (
                      <li key={e.day} className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md border border-border bg-background font-mono leading-none">
                          <span className="text-[9px] text-muted-foreground">JUN</span>
                          <span className="text-xs font-semibold">{e.day}</span>
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{e.title}</p>
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.token }} />
                            {e.type}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tile>

              <Tile title="Cost Savings by Area">
                <BarList
                  key={`${from}-${to}`}
                  items={COST_SAVINGS.map((c) => {
                    const v = Math.round(c.saved * d.fraction)
                    return { label: c.area, value: v, text: `$${v}K` }
                  })}
                />
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="text-muted-foreground">Total saved (range)</span>
                  <span className="font-mono font-semibold text-neon">{fmtMoneyK(sum(COST_SAVINGS.map((c) => c.saved)) * d.fraction)}</span>
                </div>
              </Tile>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Tile title="Tickets Solved by Staff">
                <BarList
                  key={`${from}-${to}`}
                  items={STAFF_TICKETS.map((s) => {
                    const v = Math.round(s.solved * d.fraction)
                    return { label: s.name, value: v, text: `${v}` }
                  })}
                />
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="text-muted-foreground">Total resolved (range)</span>
                  <span className="font-mono font-semibold text-neon">{Math.round(sum(STAFF_TICKETS.map((s) => s.solved)) * d.fraction).toLocaleString()}</span>
                </div>
              </Tile>

              <Tile title="Incidents in Progress" className="lg:col-span-2">
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: 'var(--destructive)' }} />
                    {INCIDENTS.filter((i) => i.severity === 'High').length} high
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: 'var(--chart-4)' }} />
                    {INCIDENTS.filter((i) => i.severity === 'Med').length} medium
                  </span>
                  <span className="ml-auto">{INCIDENTS.length} active</span>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Incident</th>
                      <th className="pb-2 font-medium">Severity</th>
                      <th className="pb-2 font-medium">Owner</th>
                      <th className="pb-2 text-right font-medium">Age</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {INCIDENTS.map((inc) => (
                      <tr key={inc.id}>
                        <td className="py-2 pr-2 font-mono text-muted-foreground">{inc.id}</td>
                        <td className="py-2 pr-2">{inc.title}</td>
                        <td className="py-2 pr-2">
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{ color: SEVERITY[inc.severity], background: `color-mix(in oklch, ${SEVERITY[inc.severity]} 15%, transparent)` }}
                          >
                            {inc.severity}
                          </span>
                        </td>
                        <td className="py-2 pr-2 text-muted-foreground">{inc.owner}</td>
                        <td className="py-2 text-right font-mono">{inc.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tile>
            </div>
          </>
        )}
      </div>

      {/* ===== Report page tabs (functional) ===== */}
      <div className="flex items-center gap-1 border-t border-border bg-card px-4 py-2 sm:px-6">
        {([
          { id: 'exec', label: 'Executive Summary' },
          { id: 'sales', label: 'Sales Detail' },
          { id: 'ops', label: 'Operations' },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              tab === t.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
