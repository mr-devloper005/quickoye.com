import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Social Bookmarking & Profiles',
  },
  footer: {
    tagline: 'Your bookmarks, your identity, one place.',
  },
  hero: {
    badge: 'Discover and share',
    title: ['Your hub for', 'bookmarks and profiles.'],
    description: 'Quickoye brings together social bookmarking and public profiles—save what matters, build your identity, and connect with curators who share your interests.',
    primaryCta: {
      label: 'Browse bookmarks',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'View profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search bookmarks, profiles, articles, and more',
    focusLabel: 'Focus',
    featureCardBadge: 'trending now',
    featureCardTitle: 'Discover what the community is saving and sharing.',
    featureCardDescription:
      'Latest bookmarks and profiles surface organically based on community activity and curation quality.',
  },
  home: {
    metadata: {
      title: 'Quickoye - Social Bookmarking & Profile Platform',
      description: 'Save links, build your profile, and discover curated content from a community of bookmarkers.',
      openGraphTitle: 'Quickoye - Social Bookmarking & Profile Platform',
      openGraphDescription:
        'Your personal space for saving what matters and sharing who you are with the world.',
      keywords: ['social bookmarking', 'profile platform', 'link curation', 'content discovery', 'personal profiles'],
    },
    introBadge: 'About Quickoye',
    introTitle: 'Built for people who live in links and value their online identity.',
    introParagraphs: [
      'Quickoye combines social bookmarking with public profiles, giving you one place to save what matters and present who you are.',
      'Create collections of links with context and tags, then share your curated shelves with followers who appreciate your taste.',
      'Discover bookmarkers with similar interests, explore their collections, and build a following around the resources you trust.',
    ],
    sideBadge: 'Platform highlights',
    sidePoints: [
      'Save links with titles, summaries, and custom tags for easy rediscovery.',
      'Build a public profile with avatar, bio, and bookmark counts.',
      'Follow curators and explore their collections in a clean, ad-free interface.',
      'Share your curated shelves on desktop and mobile with beautiful previews.',
    ],
    primaryLink: {
      label: 'Browse bookmarks',
      href: '/sbm',
    },
    secondaryLink: {
      label: 'Explore profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Join the community',
    title: 'Start saving links and building your presence on Quickoye.',
    description: 'Create your profile, organize your bookmarks, and connect with fellow curators who share your passions.',
    primaryCta: {
      label: 'Get started',
      href: '/register',
    },
    secondaryCta: {
      label: 'View profiles',
      href: '/profile',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest additions to this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, guides, and stories from the Quickoye community.',
  },
  listing: {
    title: 'Business listings and services',
    description: 'Discover businesses, services, and listings shared by our community.',
  },
  classified: {
    title: 'Classifieds and offers',
    description: 'Browse classified ads, deals, and time-sensitive opportunities.',
  },
  image: {
    title: 'Images and visual content',
    description: 'Explore image galleries and visual stories from curators on Quickoye.',
  },
  profile: {
    title: 'Public profiles and curators',
    description: 'Discover bookmarkers, view their collections, and follow curators who share your interests.',
  },
  sbm: {
    title: 'Social bookmarks and saved links',
    description: 'Browse curated links, saved resources, and bookmark collections from the Quickoye community.',
  },
  pdf: {
    title: 'Documents and PDF library',
    description: 'Access reports, guides, and downloadable documents shared by our community.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Business listings and local services',
    paragraphs: [
      'Discover businesses, services, and local listings shared by the Quickoye community.',
      'Each listing includes essential details like contact information, location, and website links to help you connect with the right service.',
      'Browse by category to find what you need, from professional services to local shops and everything in between.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
  article: {
    title: 'Articles, guides, and stories',
    paragraphs: [
      'Explore articles, how-to guides, and stories from curators on Quickoye.',
      'From productivity tips to deep dives on niche topics, find reading that matches your interests.',
      'Use this section to learn, get inspired, and discover new perspectives from our community.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Explore images', href: '/images' },
    ],
  },
  classified: {
    title: 'Classifieds, deals, and opportunities',
    paragraphs: [
      'Find deals, announcements, and time-sensitive opportunities in our classifieds section.',
      'Whether you are looking for something specific or browsing for inspiration, these posts update regularly.',
      'Filter by category to find exactly what you need, from services to items for sale.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
  image: {
    title: 'Visual content and image galleries',
    paragraphs: [
      'Browse image collections, visual stories, and galleries shared by Quickoye curators.',
      'Images can spark ideas, showcase work, or simply provide a visual break from text-heavy content.',
      'Explore visual content and follow curators whose aesthetic matches your taste.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
  profile: {
    title: 'Public profiles and curators',
    paragraphs: [
      'Discover bookmarkers, creators, and curators who share your interests.',
      'Profiles on Quickoye show avatars, bios, and bookmark counts so you know who you are following.',
      'Browse profiles to find your next favorite curator, then explore their bookmark collections.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' }
    ],
  },
  sbm: {
    title: 'Social bookmarks and curated links',
    paragraphs: [
      'The heart of Quickoye—bookmarks saved and shared by our community of curators.',
      'Each bookmark includes context, tags, and a preview so you know what to expect before clicking.',
      'Browse by tag or curator to discover your next favorite resource, tool, or read.',
    ],
    links: [
      { label: 'View profiles', href: '/profile' }
    ],
  },
  pdf: {
    title: 'Documents and downloadable resources',
    paragraphs: [
      'Access guides, reports, ebooks, and other documents shared by the Quickoye community.',
      'These resources are perfect for deeper learning and offline reading.',
      'Browse by category to find documents relevant to your interests and needs.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
  social: {
    title: 'Community updates and signals',
    paragraphs: [
      'Quick updates, announcements, and community signals from Quickoye curators.',
      'Stay in the loop with what is happening across the platform in real-time.',
      'Use these as entry points to discover new curators and their bookmark collections.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
  comment: {
    title: 'Comments and discussions',
    paragraphs: [
      'Join the conversation on articles and bookmark discussions.',
      'Comments add context, ask questions, and build community around shared content.',
      'Engage with curators and fellow bookmarkers to get more from every post.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  org: {
    title: 'Organizations and teams',
    paragraphs: [
      'Organization pages for teams, brands, and communities on Quickoye.',
      'These pages provide a central hub for organizational content, bookmarks, and team profiles.',
      'Follow organizations to stay updated on their latest shares and collections.',
    ],
    links: [
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Read articles', href: '/articles' },
    ],
  },
} as const
