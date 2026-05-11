import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const guides = [
  {
    title: 'Getting started',
    description: 'Create a profile, sign in locally, and publish your first bookmark with tags that make sense later.',
    href: '/sbm/submit',
    cta: 'Add a link',
  },
  {
    title: 'Collections & shelves',
    description: 'Group bookmarks by theme, client, or research thread—then share a public shelf without exposing private notes.',
    href: '/sbm',
    cta: 'View feed',
  },
  {
    title: 'Profiles & trust',
    description: 'Choose avatars, bios, and bookmark stats that signal credibility while staying human and approachable.',
    href: '/profile',
    cta: 'See profiles',
  },
  {
    title: 'Community etiquette',
    description: 'Best practices for commenting, resharing, and crediting curators when you build on their work.',
    href: '/community',
    cta: 'Join community',
  },
]

export default function HelpPage() {
  return (
    <MarketingPublicShell
      eyebrow="Resources"
      title="Help center"
      description="Guides for profiles, social bookmarking, and community norms—written in plain language with the same calm layout as the rest of the product."
      actions={<MarketingCtaRow primary={{ href: '/contact', label: 'Contact support' }} secondary={{ href: '/status', label: 'System status' }} />}
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <MarketingSurfaceCard key={guide.title} className="p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#1f1418]">{guide.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{guide.description}</p>
            </MarketingSurfaceCard>
          ))}
        </div>

        <MarketingSurfaceCard className="h-fit lg:sticky lg:top-28">
          <h3 className="text-lg font-semibold text-[#1f1418]">Frequently asked</h3>
          <p className="mt-2 text-sm text-black/55">Quick answers pulled from the most common curator questions.</p>
          <Accordion type="single" collapsible className="mt-4">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-black/10">
                <AccordionTrigger className="text-left text-sm font-medium text-[#1f1418] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-black/60">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MarketingSurfaceCard>
      </div>
    </MarketingPublicShell>
  )
}
