'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { MARKETING_AUTH_OPEN, requestMarketingAuthOpen } from '@/overrides/marketing-auth-events'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const maroon = '#4A0E1C'
const accent = '#E8486A'

export function MarketingNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onHome = pathname === '/'
  // Support email removed as per request

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = () => setAuthOpen(true)
    window.addEventListener(MARKETING_AUTH_OPEN, handler)
    return () => window.removeEventListener(MARKETING_AUTH_OPEN, handler)
  }, [])

  const darkShell = onHome && !scrolled && !isAuthenticated

  const submitLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!email.trim() || !password) {
        toast({ title: 'Missing fields', description: 'Enter an email and password to continue.', variant: 'destructive' })
        return
      }
      try {
        await login(email.trim(), password)
        toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
        setAuthOpen(false)
        setPassword('')
        router.push('/')
      } catch {
        toast({ title: 'Sign-in failed', description: 'Please try again.', variant: 'destructive' })
      }
    },
    [email, login, password, router, toast],
  )

  const navGroups = useMemo(
    () => [
      {
        label: 'Resources',
        items: [
          { label: 'Help center', href: '/help', hint: 'Guides and answers' },
          { label: 'Community', href: '/community', hint: 'Meet other curators' },
          { label: 'Status', href: '/status', hint: 'Uptime and incidents' },
        ],
      },
      {
        label: 'Company',
        items: [
          { label: 'About', href: '/about', hint: 'Why we built this' },
          { label: 'Contact', href: '/contact', hint: 'Talk with us' },
          { label: 'Careers', href: '/careers', hint: 'Join the team' },
        ],
      },
    ],
    [],
  )

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300',
          darkShell
            ? 'border-b border-white/15 bg-[#1a0408]/88 text-white shadow-[0_4px_28px_rgba(0,0,0,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#1a0408]/78'
            : 'border-b border-black/8 bg-[#F9F7F2]/98 text-[#1f1418] shadow-sm backdrop-blur-xl',
        )}
      >
        <nav className="mx-auto flex min-h-16 max-w-6xl flex-nowrap items-center justify-between gap-2 px-4 py-2.5 sm:min-h-[4.25rem] sm:gap-3 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none">
            <Link href="/" className="flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3">
              <span
                className={cn(
                  'relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border shadow-sm',
                  darkShell ? 'border-white/25 bg-white' : 'border-black/10 bg-white',
                )}
              >
                <img
                  src="/favicon.png?v=20260422"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain p-0.5 sm:h-11 sm:w-11"
                  decoding="async"
                />
              </span>
              <div className="min-w-0">
                <span className="block truncate text-base font-semibold leading-tight sm:text-lg">{SITE_CONFIG.name}</span>
                {/* Support email removed */}
              </div>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 px-2 lg:flex">
            {mounted ? (
              navGroups.map((group) => (
                <DropdownMenu key={group.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className={cn(
                        'gap-1 rounded-[10px] px-3 text-sm font-semibold',
                        darkShell ? 'text-white hover:bg-white/10 hover:text-white' : 'text-[#1f1418] hover:bg-black/[0.04]',
                      )}
                    >
                      {group.label}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 rounded-[10px] border-black/10 bg-white p-2 shadow-xl">
                    {group.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild className="rounded-[8px] p-0">
                        <Link href={item.href} className="flex cursor-pointer flex-col gap-0.5 px-3 py-2">
                          <span className="text-sm font-semibold text-[#1f1418]">{item.label}</span>
                          <span className="text-xs text-black/55">{item.hint}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))
            ) : (
              // SSR placeholder - simple links without dropdown
              navGroups.flatMap((g) => g.items).slice(0, 2).map((item) => (
                <Button
                  key={item.href}
                  type="button"
                  variant="ghost"
                  asChild
                  className={cn(
                    'rounded-[10px] px-3 text-sm font-semibold',
                    darkShell ? 'text-white hover:bg-white/10 hover:text-white' : 'text-[#1f1418] hover:bg-black/[0.04]',
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))
            )}
            <Button
              type="button"
              variant="ghost"
              asChild
              className={cn(
                'rounded-[10px] px-3 text-sm font-semibold',
                darkShell ? 'text-white hover:bg-white/10 hover:text-white' : 'text-[#1f1418] hover:bg-black/[0.04]',
              )}
            >
              <Link href="/contact#plans">Pricing</Link>
            </Button>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  asChild
                  className={cn(
                    'rounded-[10px] px-3 text-sm font-semibold',
                    darkShell ? 'text-white hover:bg-white/10 hover:text-white' : 'text-[#1f1418] hover:bg-black/[0.04]',
                  )}
                >
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  type="button"
                  className="rounded-[10px] px-4 text-sm font-semibold text-white shadow-md shadow-black/15"
                  style={{ backgroundColor: accent }}
                  onClick={() => requestMarketingAuthOpen()}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn('rounded-full lg:hidden', darkShell ? 'text-white hover:bg-white/10' : 'text-[#1f1418] hover:bg-black/[0.04]')}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {mobileOpen ? (
          <div className="border-t border-black/5 bg-[#F9F7F2] px-4 py-4 text-[#1f1418] lg:hidden">
            <div className="space-y-2">
              {navGroups.flatMap((g) => g.items).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[10px] px-3 py-3 text-sm font-semibold hover:bg-black/[0.04]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact#plans" className="block rounded-[10px] px-3 py-3 text-sm font-semibold hover:bg-black/[0.04]" onClick={() => setMobileOpen(false)}>
                Pricing
              </Link>
              {/* Contact sales removed */}
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="outline" className="rounded-[10px] border-[#4A0E1C]/25">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    className="rounded-[10px] text-white"
                    style={{ backgroundColor: accent }}
                    onClick={() => {
                      setMobileOpen(false)
                      requestMarketingAuthOpen()
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="max-w-md rounded-[12px] border-black/10 bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-[-0.02em]">Welcome to {SITE_CONFIG.name}</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-black/60">
              Sign in to save your session on this device. We keep it local so you can jump back into bookmarks and your profile instantly.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 pt-2" onSubmit={submitLogin}>
            <div className="grid gap-2">
              <Label htmlFor="marketing-email">Email</Label>
              <Input
                id="marketing-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-[10px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="marketing-password">Password</Label>
              <Input
                id="marketing-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-[10px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 rounded-[10px] text-sm font-semibold text-white"
              style={{ backgroundColor: maroon }}
            >
              {isLoading ? 'Signing in…' : 'Continue'}
            </Button>
            <p className="text-center text-xs text-black/55">
              New here?{' '}
              <Link href="/register" className="font-semibold text-[#4A0E1C] hover:underline" onClick={() => setAuthOpen(false)}>
                Create an account
              </Link>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
