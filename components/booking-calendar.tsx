'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import {
  CalendarCheck,
  Clock,
  Video,
  ChevronDown,
  CalendarPlus,
  BarChart3,
  Briefcase,
  Code,
  Link2,
  ArrowRightLeft,
  Globe,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

// Working-hours slots offered for a 30-minute scoping call.
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

// Display label and IANA zone. Keep in step with BOOKING_TIMEZONE on the server.
const TIMEZONE_LABEL = 'Australian Eastern Standard Time (Brisbane)'
const BOOKING_TZID = 'Australia/Brisbane'

const services = [
  { value: 'Power BI Consulting & Dashboards', icon: BarChart3 },
  { value: 'Actionstep Workflow Design', icon: Briefcase },
  { value: 'Custom Software Development', icon: Code },
  { value: 'System Integrations', icon: Link2 },
  { value: 'Migration Services', icon: ArrowRightLeft },
  { value: 'Website Design & Hosting', icon: Globe },
  { value: 'Other / Not Sure', icon: HelpCircle },
]

interface DayOption {
  value: string // YYYY-MM-DD
  weekday: string
  day: string
  month: string
}

function buildUpcomingWeekdays(count: number): DayOption[] {
  const days: DayOption[] = []
  const cursor = new Date()
  cursor.setHours(12, 0, 0, 0)
  cursor.setDate(cursor.getDate() + 1) // start tomorrow

  while (days.length < count) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) {
      const year = cursor.getFullYear()
      const month = String(cursor.getMonth() + 1).padStart(2, '0')
      const date = String(cursor.getDate()).padStart(2, '0')
      days.push({
        value: `${year}-${month}-${date}`,
        weekday: cursor.toLocaleDateString('en-AU', { weekday: 'short' }),
        day: cursor.toLocaleDateString('en-AU', { day: 'numeric' }),
        month: cursor.toLocaleDateString('en-AU', { month: 'short' }),
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

function to12Hour(time: string): string {
  const [hStr, m] = time.split(':')
  const h = Number(hStr)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${m} ${period}`
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const hh = String(Math.floor(total / 60)).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

// ---- ICS generation (client-side "Add to calendar") ----
function icsEscape(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

function localStamp(date: string, time: string): string {
  return `${date.replace(/-/g, '')}T${time.replace(':', '')}00`
}

function utcStamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}T${p(d.getUTCHours())}${p(d.getUTCMinutes())}${p(d.getUTCSeconds())}Z`
}

function buildIcs(opts: { date: string; startTime: string; endTime: string; summary: string; description: string }): string {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@nativeschema.com`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Native Schema//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    `TZID:${BOOKING_TZID}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+1000',
    'TZOFFSETTO:+1000',
    'TZNAME:AEST',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART;TZID=${BOOKING_TZID}:${localStamp(opts.date, opts.startTime)}`,
    `DTEND;TZID=${BOOKING_TZID}:${localStamp(opts.date, opts.endTime)}`,
    `SUMMARY:${icsEscape(opts.summary)}`,
    `DESCRIPTION:${icsEscape(opts.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

interface ConfirmedBooking {
  label: string
  date: string
  startTime: string
  endTime: string
  summary: string
  description: string
  calendarCreated: boolean
}

export function BookingCalendar({ onBookedChange }: { onBookedChange?: (booked: boolean) => void }) {
  const days = useMemo(() => buildUpcomingWeekdays(10), [])

  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [service, setService] = useState<string>('')
  const [form, setForm] = useState({ name: '', email: '', company: '', notes: '' })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null)

  // Typewriter auto-generation of the description, matching the contact form.
  const [isTyping, setIsTyping] = useState(false)
  const [targetMessage, setTargetMessage] = useState('')
  const typewriterRef = useRef<NodeJS.Timeout | null>(null)

  const selectedDay = days.find((d) => d.value === selectedDate)

  useEffect(() => {
    if (!targetMessage || !isTyping) return

    let currentIndex = 0
    setForm((prev) => ({ ...prev, notes: '' }))

    const typeNextChar = () => {
      if (currentIndex < targetMessage.length) {
        setForm((prev) => ({ ...prev, notes: targetMessage.slice(0, currentIndex + 1) }))
        currentIndex++
        typewriterRef.current = setTimeout(typeNextChar, 15)
      } else {
        setIsTyping(false)
        setTargetMessage('')
      }
    }

    typewriterRef.current = setTimeout(typeNextChar, 100)

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current)
    }
  }, [targetMessage, isTyping])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleServiceChange = (value: string) => {
    setService(value)

    if (typewriterRef.current) clearTimeout(typewriterRef.current)

    setForm((prev) => {
      const shouldAutoFill =
        !prev.notes || prev.notes.startsWith('Hi,') || prev.notes.startsWith('Hi\n') || isTyping

      if (shouldAutoFill && value && value !== 'Other / Not Sure') {
        const greeting = prev.name ? `Hi, I'm ${prev.name}` : 'Hi'
        const companyPart = prev.company ? ` from ${prev.company}` : ''
        const emailPart = prev.email ? `\n\nYou can reach me at ${prev.email}.` : ''
        const newMessage = `${greeting}${companyPart}.\n\nI'd like to use this 30-minute call to scope out your ${value} service and how you can help.${emailPart}\n\nLooking forward to speaking with you!`
        setTargetMessage(newMessage)
        setIsTyping(true)
      }
      return prev
    })
  }

  const setBooked = (value: boolean) => {
    onBookedChange?.(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.name.trim()) {
      setStatus('error'); setErrorMessage('Please enter your name'); return
    }
    if (!emailRegex.test(form.email)) {
      setStatus('error'); setErrorMessage('Please enter a valid email address'); return
    }
    if (!service) {
      setStatus('error'); setErrorMessage('Please choose the type of work'); return
    }
    if (!selectedDate || !selectedTime) {
      setStatus('error'); setErrorMessage('Please choose a day and a time slot'); return
    }
    if (!turnstileToken) {
      setStatus('error'); setErrorMessage('Please complete the security check'); return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service, date: selectedDate, time: selectedTime, turnstileToken }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to book your call')
      }

      const label = selectedDay
        ? `${selectedDay.weekday} ${selectedDay.day} ${selectedDay.month} at ${to12Hour(selectedTime)}`
        : `${selectedDate} at ${to12Hour(selectedTime)}`
      const description = `Type of work: ${service}\n\n${form.notes || 'No additional notes provided.'}`

      setConfirmed({
        label,
        date: selectedDate,
        startTime: selectedTime,
        endTime: addMinutes(selectedTime, 30),
        summary: `Scoping call: Native Schema x ${form.name}`,
        description,
        calendarCreated: Boolean(data.calendar),
      })
      setStatus('success')
      setBooked(true)
      setForm({ name: '', email: '', company: '', notes: '' })
      setService('')
      setSelectedDate('')
      setSelectedTime('')
      setTurnstileToken(null)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleBookAnother = () => {
    setConfirmed(null)
    setStatus('idle')
    setBooked(false)
  }

  const handleAddToCalendar = () => {
    if (!confirmed) return
    const ics = buildIcs({
      date: confirmed.date,
      startTime: confirmed.startTime,
      endTime: confirmed.endTime,
      summary: confirmed.summary,
      description: confirmed.description,
    })
    downloadIcs('native-schema-scoping-call.ics', ics)
  }

  if (status === 'success' && confirmed) {
    return (
      <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Appointment created</h3>
        <p className="text-muted-foreground text-lg mb-2">
          You are booked in for {confirmed.label}.
        </p>
        <p className="text-muted-foreground">
          {confirmed.calendarCreated
            ? 'A calendar invite with a video link is on its way to your inbox. You can also add it to your own calendar below.'
            : 'We have your appointment and will be in touch to confirm. Add it to your own calendar below so you do not forget.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleAddToCalendar}>
            <CalendarPlus className="h-4 w-4" />
            Add to calendar
          </Button>
          <Button variant="outline" onClick={handleBookAnother}>
            Book another time
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-xl space-y-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Book a 30-minute scoping call</h3>
          <p className="text-sm text-muted-foreground">
            Pick a time that suits you. We will confirm instantly and send a
            calendar invite with a video link. Times shown in {TIMEZONE_LABEL}.
          </p>
        </div>
      </div>

      {status === 'error' && errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-center text-sm">
          {errorMessage}
        </div>
      )}

      {/* Step 1: choose a day */}
      <div className="space-y-3">
        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          1. Choose a day
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {days.map((day) => {
            const active = day.value === selectedDate
            return (
              <button
                key={day.value}
                type="button"
                onClick={() => { setSelectedDate(day.value); setSelectedTime('') }}
                className={`flex flex-col items-center rounded-lg border px-2 py-3 text-center transition-colors ${
                  active
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border/60 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-xs uppercase tracking-wide">{day.weekday}</span>
                <span className="text-lg font-semibold leading-tight">{day.day}</span>
                <span className="text-xs">{day.month}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: choose a time */}
      <div className="space-y-3">
        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          2. Choose a time
        </label>
        {selectedDate ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => {
              const active = slot === selectedTime
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/60 hover:border-primary/50 text-foreground'
                  }`}
                >
                  {to12Hour(slot)}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Select a day first to see available times.
          </p>
        )}
      </div>

      {/* Step 3: your details */}
      <div className="space-y-4">
        <label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          3. Your details
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="name" placeholder="Your name" className="h-12" value={form.name} onChange={handleChange} required />
          <Input id="email" type="email" placeholder="your@email.com" className="h-12" value={form.email} onChange={handleChange} required />
        </div>
        <Input id="company" placeholder="Company (optional)" className="h-12" value={form.company} onChange={handleChange} />

        {/* Type of work */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Type of work</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full h-12 justify-between text-left font-normal">
                {service ? (
                  <span className="flex items-center gap-2">
                    {(() => {
                      const match = services.find((s) => s.value === service)
                      if (match) {
                        const Icon = match.icon
                        return (<><Icon className="size-4 text-primary" />{match.value}</>)
                      }
                      return service
                    })()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Select the type of work...</span>
                )}
                <ChevronDown className="size-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
              <DropdownMenuLabel>What do you need help with?</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={service} onValueChange={handleServiceChange}>
                {services.map((s) => {
                  const Icon = s.icon
                  return (
                    <DropdownMenuRadioItem key={s.value} value={s.value}>
                      <Icon className="size-4 text-primary" />
                      {s.value}
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auto-generated, editable description */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">What would you like to cover?</span>
          <Textarea
            id="notes"
            placeholder="Pick a type of work above and we will draft this for you, or write your own."
            rows={5}
            className="resize-none"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Turnstile
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
        />
      </div>

      <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold" disabled={status === 'loading'}>
        {status === 'loading' ? 'Booking your call...' : 'Confirm my 30-minute call'}
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Video className="h-3.5 w-3.5" />
        Includes a video meeting link. No cost, no obligation.
      </p>
    </form>
  )
}
