import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Accepting these terms',
    body: `By accessing ${SITE_CONFIG.name} you agree to this agreement. If you disagree, discontinue use of the service.`,
  },
  {
    title: 'Accounts & eligibility',
    body: 'You must provide accurate information for profiles and communications. You are responsible for safeguarding credentials on your devices.',
  },
  {
    title: 'Content & licenses',
    body: 'You retain rights to bookmarks and profile materials you upload. You grant us a license to host, display, and distribute that content as needed to operate the product features you enable.',
  },
  {
    title: 'Acceptable use',
    body: 'No harassment, spam, malware links, or attempts to scrape the service in ways that degrade performance for others. Curators are expected to respect intellectual property when sharing links.',
  },
  {
    title: 'Disclaimers',
    body: 'Bookmarks may point to third-party sites—we do not endorse external content. Features are provided as-is while we continuously improve reliability.',
  },
  {
    title: 'Termination',
    body: 'We may suspend accounts that violate these terms. You may stop using the service at any time; certain provisions survive termination (e.g., dispute resolution where applicable).',
  },
]

export default function TermsPage() {
  return (
    <MarketingPublicShell
      eyebrow="Legal"
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name} as a profiles and social bookmarking platform.`}
      contentWidth="narrow"
      actions={<MarketingCtaRow primary={{ href: '/privacy', label: 'Privacy policy' }} secondary={{ href: '/contact', label: 'Ask a question' }} />}
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
          Industry terms can feel cold—if anything is unclear,{' '}
          <Link className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }} href="/contact">
            message us
          </Link>{' '}
          and we will plain-language it.
        </p>
      </MarketingSurfaceCard>
    </MarketingPublicShell>
  )
}
