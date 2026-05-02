import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'No open positions currently',
    location: 'Remote',
    type: 'Check back soon',
    level: 'N/A',
    focus: 'We are not actively hiring at the moment. If you are passionate about social bookmarking and profiles, feel free to reach out—we keep interesting profiles on file.',
  },
]

const benefits = [
  'Small, focused team building something useful',
  'Remote-friendly environment',
  'Opportunity to shape a growing platform',
  'Curiosity and good taste valued over credentials',
]

export default function CareersPage() {
  return (
    <MarketingPublicShell
      eyebrow="Careers"
      title="Work with us"
      description={`${SITE_CONFIG.name} is a small team building tools for people who live in links. When we do hire, we look for curiosity, taste, and a genuine love for the open web.`}
      actions={<MarketingCtaRow primary={{ href: '/contact', label: 'Get in touch' }} secondary={{ href: '/about', label: 'About us' }} />}
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <MarketingSurfaceCard key={role.title} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-[6px] border-0 text-white" style={{ backgroundColor: marketingTheme.maroon }}>
                  {role.level}
                </Badge>
                <Badge variant="outline" className="rounded-[6px] border-black/15 text-[#1f1418]">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#1f1418]">{role.title}</h2>
              <p className="mt-1 text-sm text-black/50">{role.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{role.focus}</p>
              <Button variant="outline" className="mt-5 rounded-[10px] border-[#4A0E1C]/25" asChild>
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </MarketingSurfaceCard>
          ))}
        </div>

        <MarketingSurfaceCard className="h-fit lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Why join</p>
          <h3 className="mt-3 text-xl font-semibold text-[#1f1418]">Build something meaningful</h3>
          <p className="mt-3 text-sm leading-relaxed text-black/60">
            Quickoye is a side project with ambition. We are creating a calmer space for bookmarks and profiles—
            a place where curation matters more than algorithms.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-black/65">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded-[10px] border border-black/8 bg-[#faf8f5] px-3 py-3">
                {benefit}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full rounded-[10px] text-white" style={{ backgroundColor: marketingTheme.accent }} asChild>
            <Link href="/contact">Introduce yourself</Link>
          </Button>
        </MarketingSurfaceCard>
      </div>
    </MarketingPublicShell>
  )
}
