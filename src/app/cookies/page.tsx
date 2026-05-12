import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for security, load balancing, and remembering that you are signed in (including local session continuity for profiles and bookmarks).',
  },
  {
    title: 'Functional preferences',
    body: 'Store UI choices such as theme, collapsed navigation, and filter defaults so returning visits feel instant.',
  },
  {
    title: 'Analytics (optional where applicable)',
    body: 'Aggregated telemetry helps us understand which help articles work and where curators drop off—never sold, never used for unrelated ads.',
  },
  {
    title: 'Managing cookies',
    body: 'Use browser controls to clear cookies. Some features may require reauthentication after clearing storage.',
  },
]

export default function CookiesPage() {
  return (
    <MarketingPublicShell
      eyebrow="Legal"
      title="Cookie policy"
      description="We keep cookies minimal: enough for auth continuity, preferences, and optional aggregated analytics."
      contentWidth="narrow"
      actions={<MarketingCtaRow primary={{ href: '/privacy', label: 'Privacy policy' }} secondary={{ href: '/contact', label: 'Cookie questions' }} />}
    >
      <MarketingSurfaceCard className="p-6 sm:p-8">
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[10px] border border-black/8 bg-[#faf8f5] p-5">
              <h3 className="text-base font-semibold text-[#1f1418]">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-black/55">
          Want fewer trackers everywhere? We support that philosophy—start with{' '}
          <Link className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }} href="/help">
            Help center → Privacy tips
          </Link>
          .
        </p>
      </MarketingSurfaceCard>
    </MarketingPublicShell>
  )
}
