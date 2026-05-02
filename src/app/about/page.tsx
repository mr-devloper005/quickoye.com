import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Founded', value: '2024' },
  { label: 'Focus', value: 'SBM + Profiles' },
  { label: 'Approach', value: 'Calm UI' },
]

const pillars = [
  {
    title: 'Built for link lovers',
    description:
      'Quickoye is a social bookmarking platform where you can save, organize, and share links that matter to you. Create collections, add tags, and build your personal library of the web.',
  },
  {
    title: 'Your public identity',
    description:
      'Every user gets a public profile showing who they are, what they curate, and their bookmark collections. It is your corner of the internet to showcase your interests and discoveries.',
  },
  {
    title: 'Discovery without algorithms',
    description:
      'Browse bookmarks and profiles without recommendation engines deciding what you see. Find curators with similar interests and explore their collections organically.',
  },
]

export default function AboutPage() {
  return (
    <MarketingPublicShell
      eyebrow="About"
      title={`What is ${SITE_CONFIG.name}?`}
      description={`${SITE_CONFIG.name} is a social bookmarking and profile platform. Save links, build your identity, and connect with fellow curators in a clean, distraction-free space.`}
      actions={
        <MarketingCtaRow primary={{ href: '/register', label: 'Create profile' }} secondary={{ href: '/sbm', label: 'Browse bookmarks' }} />
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <MarketingSurfaceCard>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">Our story</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#1f1418]">A quieter place for bookmarks and profiles.</h2>
          <p className="mt-4 text-sm leading-relaxed text-black/60">
            {SITE_CONFIG.name} was built to solve a simple problem: bookmarks get lost in browser bars, and profiles on social media 
            are buried under endless feeds. We wanted a dedicated space where your saved links and your identity coexist peacefully.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/60">
            The result is a platform that prioritizes curation over consumption. No infinite scroll, no engagement metrics, 
            no algorithmic sorting—just you, your collections, and a community of people who care about the same things you do.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-[10px] border border-black/8 bg-[#faf8f5] p-4">
                <div className="text-2xl font-semibold" style={{ color: marketingTheme.maroon }}>
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-black/50">{item.label}</div>
              </div>
            ))}
          </div>
        </MarketingSurfaceCard>

        <div className="space-y-4">
          {pillars.map((pillar) => (
            <MarketingSurfaceCard key={pillar.title} className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-[#1f1418]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{pillar.description}</p>
            </MarketingSurfaceCard>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-black/8 pt-10">
        <h2 className="text-2xl font-semibold text-[#1f1418]">How it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MarketingSurfaceCard className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A0E1C]/10 text-lg font-semibold" style={{ color: marketingTheme.maroon }}>1</div>
            <h4 className="mt-4 text-base font-semibold text-[#1f1418]">Create your profile</h4>
            <p className="mt-2 text-sm text-black/60">Sign up and set up your public profile with an avatar, bio, and your areas of interest.</p>
          </MarketingSurfaceCard>
          <MarketingSurfaceCard className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A0E1C]/10 text-lg font-semibold" style={{ color: marketingTheme.maroon }}>2</div>
            <h4 className="mt-4 text-base font-semibold text-[#1f1418]">Save bookmarks</h4>
            <p className="mt-2 text-sm text-black/60">Add links with titles, descriptions, and tags. Organize them into collections that make sense to you.</p>
          </MarketingSurfaceCard>
          <MarketingSurfaceCard className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A0E1C]/10 text-lg font-semibold" style={{ color: marketingTheme.maroon }}>3</div>
            <h4 className="mt-4 text-base font-semibold text-[#1f1418]">Share collections</h4>
            <p className="mt-2 text-sm text-black/60">Make your bookmarks public or keep them private. Share specific collections with others.</p>
          </MarketingSurfaceCard>
          <MarketingSurfaceCard className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4A0E1C]/10 text-lg font-semibold" style={{ color: marketingTheme.maroon }}>4</div>
            <h4 className="mt-4 text-base font-semibold text-[#1f1418]">Discover curators</h4>
            <p className="mt-2 text-sm text-black/60">Browse profiles, find people with similar interests, and explore their bookmark collections.</p>
          </MarketingSurfaceCard>
        </div>
      </div>
    </MarketingPublicShell>
  )
}
