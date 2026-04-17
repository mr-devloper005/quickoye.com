export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'tqopmf6o0j',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Quickoye',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'SBM , Profile platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A sbm , profile site for Quickoye, built for clean discovery and structured publishing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'quickoye.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://quickoye.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

