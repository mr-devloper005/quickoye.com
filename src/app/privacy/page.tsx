import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide (name, email, avatar), bookmarks and profile content you publish, lightweight usage events (pages viewed, errors), and device preferences needed to keep you signed in locally.',
  },
  {
    title: 'How we use information',
    body: 'We operate the service, personalize your profile and collections, prevent abuse, and improve search relevance. We do not sell personal data to data brokers.',
  },
  {
    title: 'Bookmarks & public profiles',
    body: 'Content you mark as public can be discovered by other visitors. Private drafts stay on your device until you submit them—refer to each feature’s on-screen notes for specifics.',
  },
  {
    title: 'Retention & deletion',
    body: 'You may request deletion of your account and associated bookmarks. Some logs may persist for a short window for security investigations, then roll off automatically.',
  },
  {
    title: 'Your controls',
    body: 'Update profile fields, clear local sessions, export bookmarks where available, and manage marketing emails from account settings.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be sent through the contact page—choose “Profiles & identity” or “Bookmarks & collections” so we route quickly.',
  },
]

export default function PrivacyPage() {
  return (
    <MarketingPublicShell
      eyebrow="Legal"
      title="Privacy policy"
      description="How we handle data for a profiles-and-bookmarks product: lean collection, transparent use, and practical controls."
      contentWidth="narrow"
      actions={<MarketingCtaRow primary={{ href: '/contact', label: 'Privacy questions' }} secondary={{ href: '/cookies', label: 'Cookie policy' }} />}
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
          Need a deeper review?{' '}
          <Link className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }} href="/contact">
            Contact the team
          </Link>
          .
        </p>
      </MarketingSurfaceCard>
    </MarketingPublicShell>
  )
}
