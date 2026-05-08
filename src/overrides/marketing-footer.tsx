import Link from 'next/link'
import { Bookmark, Sparkles, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const maroon = '#4A0E1C'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Profiles', href: '/profile', icon: UserRound },
      { label: 'Social bookmarking', href: '/sbm', icon: Bookmark },
      { label: 'Submit a link', href: '/sbm/submit', icon: Sparkles },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '/help' },
      { label: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-black/6 bg-[#f3efe8] text-[#1f1418]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-black/8 bg-white shadow-sm">
                <img
                  src="/favicon.png?v=20260422"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain p-0.5 sm:h-11 sm:w-11"
                  decoding="async"
                />
              </span>
              <div>
                <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">Profiles & bookmarks</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-black/60">{SITE_CONFIG.description}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">{col.title}</p>
              <ul className="mt-4 space-y-3 text-sm text-black/70">
                {col.links.map((item: any) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex items-center gap-2 hover:text-[#4A0E1C]">
                      {item.icon ? <item.icon className="h-4 w-4" style={{ color: maroon }} /> : null}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-black/8 pt-6 text-center text-xs text-black/50">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. Crafted for profiles and curated links.
        </div>
      </div>
    </footer>
  )
}
