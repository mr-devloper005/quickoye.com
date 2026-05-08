import { SITE_CONFIG } from '@/lib/site-config'

const splitEmails = (value: string) =>
  value
    .split(/[,\n;]/g)
    .map((item) => item.trim())
    .filter(Boolean)

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function getContactEmails() {
  const configured =
    process.env.NEXT_PUBLIC_CONTACT_EMAILS?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    ''

  const parsed = configured ? splitEmails(configured).filter(isValidEmail) : []
  const fallback = `support@${SITE_CONFIG.domain}`

  return parsed.length ? parsed : [fallback]
}

