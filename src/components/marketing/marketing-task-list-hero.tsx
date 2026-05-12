import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import type { TaskConfig, TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { marketingTheme } from '@/components/marketing/marketing-theme'

const copy: Partial<
  Record<
    TaskKey,
    { label: string; headline: string; body: string; cta: { href: string; label: string }; secondary?: { href: string; label: string } }
  >
> = {
  profile: {
    label: 'Profiles',
    headline: 'People and teams worth following',
    body: 'Browse public profiles, see how curators present themselves, and jump into the bookmarks they surface—without marketplace noise.',
    cta: { href: '/sbm', label: 'Explore bookmarks' },
    secondary: { href: '/sbm/submit', label: 'Share a link' },
  },
  sbm: {
    label: 'Social bookmarking',
    headline: 'Collections built for deep work',
    body: 'Saved links with context, calmer cards, and filters that help you scan by category instead of chasing an endless feed.',
    cta: { href: '/sbm/submit', label: 'Submit a bookmark' },
  },
  social: {
    label: 'Community',
    headline: 'Where curators and readers meet',
    body: 'Follow discussions, discover groups aligned with your interests, and find the next profile or shelf to subscribe to.',
    cta: { href: '/sbm', label: 'Browse resources' },
    secondary: { href: '/contact', label: 'Partner with us' },
  },
}

export function MarketingTaskListHero({
  task,
  taskConfig,
  normalizedCategory,
}: {
  task: TaskKey
  taskConfig: TaskConfig | null | undefined
  normalizedCategory: string
}) {
  const route = taskConfig?.route || (task === 'profile' ? '/profile' : task === 'sbm' ? '/sbm' : '/community')
  const meta = copy[task] || {
    label: taskConfig?.label || 'Explore',
    headline: taskConfig?.description || 'Discover more',
    body: 'Explore structured surfaces on this site.',
    cta: { href: route, label: 'Get started' },
  }

  return (
    <section className="mb-10 grid gap-8 rounded-[12px] border border-black/8 bg-white p-6 shadow-[0_20px_60px_rgba(40,20,24,0.07)] sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black/45">{meta.label}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{meta.headline}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60">{meta.body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={meta.cta.href}
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15"
            style={{ backgroundColor: marketingTheme.maroon }}
          >
            {meta.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {meta.secondary ? (
            <Link
              href={meta.secondary.href}
              className="inline-flex items-center gap-2 rounded-[10px] border border-black/10 bg-[#faf8f5] px-5 py-2.5 text-sm font-semibold text-[#1f1418] hover:bg-[#f3efe8]"
            >
              {meta.secondary.label}
            </Link>
          ) : null}
          {task === 'profile' ? (
            <Link
              href="/create/profile"
              className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-black/15"
              style={{ backgroundColor: marketingTheme.accent }}
            >
              <Plus className="h-4 w-4" />
              Create profile
            </Link>
          ) : null}
        </div>
      </div>
      <div className="rounded-[12px] border border-black/8 bg-[#faf8f5] p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Filter by category</p>
        <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" action={route}>
          <div className="min-w-0 flex-1">
            <label htmlFor={`m-cat-${task}`} className="text-xs font-medium text-black/55">
              Category
            </label>
            <select
              id={`m-cat-${task}`}
              name="category"
              defaultValue={normalizedCategory}
              className="mt-2 h-11 w-full rounded-[10px] border border-black/10 bg-white px-3 text-sm text-[#1f1418]"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="h-11 shrink-0 rounded-[10px] px-5 text-sm font-semibold text-white sm:px-6"
            style={{ backgroundColor: marketingTheme.maroon }}
          >
            Apply
          </button>
        </form>
        <p className="mt-4 text-xs leading-relaxed text-black/50">Tip: combine filters with search in the nav to jump directly to a topic.</p>
      </div>
    </section>
  )
}
