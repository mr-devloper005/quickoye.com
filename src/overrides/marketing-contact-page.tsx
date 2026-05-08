import Link from 'next/link'
import { Mail, MessageSquare, Sparkles } from 'lucide-react'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingContactForm } from '@/components/marketing/marketing-contact-form'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { SITE_CONFIG } from '@/lib/site-config'

const lanes = [
  {
    icon: Sparkles,
    title: 'Profiles & identity',
    body: 'Questions about public bios, avatars, verification badges, or how your profile appears to visitors.',
  },
  {
    icon: MessageSquare,
    title: 'Bookmarks & collections',
    body: 'Help with organizing shelves, tagging links, importing resources, or sharing a curated list with your team.',
  },
  {
    icon: Mail,
    title: 'Partnerships',
    body: 'Press, integrations, education programs, or co-marketing around curated knowledge bases.',
  },
]

export function MarketingContactPage() {
  return (
    <MarketingPublicShell
      eyebrow="Company"
      title={`Talk with ${SITE_CONFIG.name}`}
      description="We route questions to the right lane—profiles, bookmarks, or partnerships—so you get a useful answer instead of a generic autoreply."
      actions={
        <MarketingCtaRow primary={{ href: '/help', label: 'Browse help' }} secondary={{ href: '/sbm', label: 'See bookmarks' }} />
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-start">
        <div className="space-y-5">
          {lanes.map((lane) => (
            <MarketingSurfaceCard key={lane.title} className="p-5 sm:p-6">
              <lane.icon className="h-5 w-5" style={{ color: marketingTheme.maroon }} />
              <h2 className="mt-3 text-lg font-semibold text-[#1f1418]">{lane.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{lane.body}</p>
            </MarketingSurfaceCard>
          ))}
          <div className="rounded-[12px] border border-dashed border-black/15 bg-[#faf8f5] p-5 text-sm text-black/60">
            <p className="font-medium text-[#1f1418]">Prefer email?</p>
            <p className="mt-1">
              Write to{' '}
              <a className="font-semibold underline decoration-[#4A0E1C]/40 underline-offset-2" style={{ color: marketingTheme.maroon }} href={`mailto:support@${SITE_CONFIG.domain}`}>
                support@{SITE_CONFIG.domain}
              </a>{' '}
              with context, links, and what outcome you need—we reply within two business days.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <MarketingSurfaceCard id="plans" className="scroll-mt-28 p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Plans</p>
            <h2 className="mt-2 text-xl font-semibold text-[#1f1418]">Simple tiers for teams and curators</h2>
            <p className="mt-2 text-sm text-black/60">
              Starter is free for individuals. Teams unlock shared shelves, approval flows, and priority routing—tell us your size and we will
              recommend a fit.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-black/65">
              <li>· Starter — personal profiles + unlimited bookmarks</li>
              <li>· Studio — shared collections + branded profile domains</li>
              <li>· Organization — SSO, audit trails, and dedicated success</li>
            </ul>
          </MarketingSurfaceCard>

          <MarketingSurfaceCard className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-[#1f1418]">Send a message</h2>
            <p className="mt-2 text-sm text-black/55">Share enough detail for us to respond in one pass—no account required for general questions.</p>
            <MarketingContactForm />
            <p className="mt-4 text-xs text-black/50">
              For account-specific issues, sign in and use{' '}
              <Link href="/help" className="font-semibold underline" style={{ color: marketingTheme.maroon }}>
                Help center
              </Link>{' '}
              shortcuts.
            </p>
          </MarketingSurfaceCard>
        </div>
      </div>
    </MarketingPublicShell>
  )
}
