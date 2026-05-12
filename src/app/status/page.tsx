import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'

const services = [
  { name: 'Web application', detail: 'Profiles, feeds, and bookmark submission', status: 'Operational' },
  { name: 'Search & filters', detail: 'Category facets and keyword matching', status: 'Operational' },
  { name: 'Media & avatars', detail: 'CDN-backed profile imagery', status: 'Operational' },
  { name: 'Auth sessions', detail: 'Local persistence + sign-in flows', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notification emails', detail: 'Queue backlog cleared after infra patch.', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', detail: 'Bookmark additions appeared after ~8 minutes.', status: 'Resolved' },
  { date: 'Jan 04, 2026', title: 'Avatar upload retries', detail: 'Third-party storage timeout mitigations deployed.', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <MarketingPublicShell
      eyebrow="Resources"
      title="System status"
      description="Live snapshot of the surfaces that power profiles and social bookmarking. We post incidents here first—no login required."
      actions={<MarketingCtaRow primary={{ href: '/contact', label: 'Report an issue' }} secondary={{ href: '/help', label: 'Help guides' }} />}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <MarketingSurfaceCard key={service.name} className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#1f1418]">{service.name}</h2>
                <p className="mt-1 text-sm text-black/55">{service.detail}</p>
              </div>
              <span className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white" style={{ backgroundColor: marketingTheme.maroon }}>
                {service.status}
              </span>
            </div>
          </MarketingSurfaceCard>
        ))}
      </div>

      <MarketingSurfaceCard className="mt-10 p-5 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#1f1418]">Incident history</h3>
            <p className="mt-2 max-w-2xl text-sm text-black/60">Transparent notes about what broke, what we saw, and how we fixed it.</p>
          </div>
          <Link href="/contact" className="text-sm font-semibold" style={{ color: marketingTheme.maroon }}>
            Subscribe via contact →
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {incidents.map((incident) => (
            <div key={incident.title} className="rounded-[10px] border border-black/8 bg-[#faf8f5] px-4 py-4">
              <div className="text-sm font-semibold text-[#1f1418]">{incident.title}</div>
              <p className="mt-1 text-sm text-black/55">{incident.detail}</p>
              <div className="mt-2 text-xs font-medium text-black/45">{incident.status}</div>
            </div>
          ))}
        </div>
      </MarketingSurfaceCard>
    </MarketingPublicShell>
  )
}
