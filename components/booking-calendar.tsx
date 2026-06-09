'use client'

import { useState, useMemo } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { CalendarCheck, Clock, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

// Working-hours slots offered for a 30-minute scoping call.
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

// Display label only. The authoritative timezone lives in BOOKING_TIMEZONE on the server.
const TIMEZONE_LABEL = 'Australian Eastern Standard Time (Brisbane)'

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

export function BookingCalendar() {
  const days = useMemo(() => buildUpcomingWeekdays(10), [])

  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [form, setForm] = useState({ name: '', email: '', company: '', notes: '' })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmedFor, setConfirmedFor] = useState('')

  const selectedDay = days.find((d) => d.value === selectedDate)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
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
        body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime, turnstileToken }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to book your call')
      }

      const label = selectedDay
        ? `${selectedDay.weekday} ${selectedDay.day} ${selectedDay.month} at ${to12Hour(selectedTime)}`
        : `${selectedDate} at ${to12Hour(selectedTime)}`
      setConfirmedFor(label)
      setStatus('success')
      setForm({ name: '', email: '', company: '', notes: '' })
      setSelectedDate('')
      setSelectedTime('')
      setTurnstileToken(null)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarCheck className="h-7 w-7" />
        </div>
        <h3 className="text-2xl font-semibold mb-3">Your call is booked</h3>
        <p className="text-muted-foreground text-lg mb-2">
          We have you down for {confirmedFor}.
        </p>
        <p className="text-muted-foreground">
          A confirmation email is on its way to your inbox. If anything changes,
          just reply to it and we will sort it out.
        </p>
        <Button className="mt-8" variant="outline" onClick={() => setStatus('idle')}>
          Book another time
        </Button>
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
            Pick a time that suits you. We will confirm instantly by email.
            Times shown in {TIMEZONE_LABEL}.
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
        <Textarea
          id="notes"
          placeholder="What would you like to cover? (optional)"
          rows={3}
          className="resize-none"
          value={form.notes}
          onChange={handleChange}
        />
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
