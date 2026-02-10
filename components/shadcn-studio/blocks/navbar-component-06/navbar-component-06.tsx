'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type NavItem = {
  title: string
  href: string
}

const Navbar = ({
  logo,
  navigationItems,
  actions,
}: {
  logo: React.ReactNode
  navigationItems: NavItem[]
  actions?: React.ReactNode
}) => {
  const pathname = usePathname()

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        {logo}

        {/* Desktop Navigation */}
        <NavigationMenu viewport={false} className="max-md:hidden">
          <NavigationMenuList className="gap-1">
            {navigationItems.map((item) => {
              const isHash = item.href.startsWith('#')
              const isActive = !isHash && pathname === item.href

              return (
                <NavigationMenuItem
                  key={item.href}
                  className={cn(
                    'has-[[data-active]]:text-foreground text-muted-foreground'
                  )}
                >
                  {isHash ? (
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.querySelector(item.href)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          // If section doesn't exist (we're on a subpage), navigate home with hash
                          window.location.href = '/' + item.href
                        }
                      }}
                      href={item.href}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  ) : (
                    <NavigationMenuLink
                      asChild
                      active={isActive}
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions (theme toggle, CTA) + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-2">
            {actions}
          </div>

          {/* Mobile: actions + hamburger */}
          <div className="flex sm:hidden items-center gap-1">
            {actions}
            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden" asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {navigationItems.map((item, index) => (
                  <DropdownMenuGroup key={item.href}>
                    <DropdownMenuItem asChild>
                      {item.href.startsWith('#') ? (
                        <button
                          className="w-full text-left"
                          onClick={() => {
                            const el = document.querySelector(item.href)
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' })
                            } else {
                              window.location.href = '/' + item.href
                            }
                          }}
                        >
                          {item.title}
                        </button>
                      ) : (
                        <Link href={item.href}>{item.title}</Link>
                      )}
                    </DropdownMenuItem>
                    {index === 2 && <DropdownMenuSeparator />}
                  </DropdownMenuGroup>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/contact" className="font-medium">
                      Get in Touch
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
