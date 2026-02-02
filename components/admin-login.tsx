'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAdmin } from '@/components/admin-provider'

export function AdminLogin() {
  const { isAdmin, login, logout } = useAdmin()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLogin = () => {
    if (login(password)) {
      setOpen(false)
      setPassword('')
      setError(false)
    } else {
      setError(true)
    }
  }

  if (isAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <span className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium">
          Admin Mode
        </span>
        <Button variant="outline" size="sm" onClick={logout}>
          Exit
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed bottom-4 right-4 z-50 w-3 h-3 rounded-full bg-muted-foreground/20 hover:bg-primary/50 transition-colors"
          aria-label="Admin login"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={error ? 'border-destructive' : ''}
          />
          {error && (
            <p className="text-sm text-destructive">Incorrect password</p>
          )}
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
