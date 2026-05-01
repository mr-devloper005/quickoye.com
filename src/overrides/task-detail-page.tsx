import type { TaskKey } from '@/lib/site-config'
import { ProfileDetailPage } from './profile-detail-page'
import { notFound } from 'next/navigation'
import { getTaskConfig } from '@/lib/site-config'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function isValidImageUrl(value?: string | null): boolean {
  return typeof value === 'string' && (value.startsWith('/') || /^https?:\/\//i.test(value))
}

function getImageUrls(post: SitePost): string[] {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  const media = Array.isArray(post.media) ? post.media : []
  const mediaImages = media
    .map((item) => item?.url)
    .filter((url): url is string => isValidImageUrl(url))
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : []
  const merged = [...mediaImages, ...contentImages]
  if (merged.length) return merged
  const logo = typeof content.logo === 'string' ? content.logo : null
  if (logo && isValidImageUrl(logo)) return [logo]
  return ['/placeholder.svg?height=900&width=1400']
}

const toNumber = (value?: number | string): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const buildMapEmbedUrl = (
  latitude?: number | string,
  longitude?: number | string,
  address?: string
): string | null => {
  const lat = toNumber(latitude)
  const lon = toNumber(longitude)
  const normalizedAddress = typeof address === 'string' ? address.trim() : ''
  const googleMapsEmbedApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim()

  if (googleMapsEmbedApiKey) {
    const query = lat !== null && lon !== null ? `${lat},${lon}` : normalizedAddress
    if (!query) return null
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
      googleMapsEmbedApiKey
    )}&q=${encodeURIComponent(query)}`
  }

  if (lat !== null && lon !== null) {
    const delta = 0.01
    const left = lon - delta
    const right = lon + delta
    const bottom = lat - delta
    const top = lat + delta
    const bbox = `${left},${bottom},${right},${top}`
    return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
      bbox
    )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`
  }

  if (normalizedAddress) {
    return `https://www.google.com/maps?q=${encodeURIComponent(normalizedAddress)}&output=embed`
  }

  return null
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const taskConfig = getTaskConfig(task)

  let post: SitePost | null = null
  try {
    post = await fetchTaskPostBySlug(task, slug)
  } catch (error) {
    console.warn('Failed to load post detail', error)
  }

  if (!post) {
    notFound()
  }

  const content = post.content && typeof post.content === 'object' ? post.content : {}
  const category = typeof content.category === 'string' ? content.category : post.tags?.[0] || taskConfig?.label || task
  const description = typeof content.description === 'string' ? content.description : post.summary || 'Details coming soon.'
  const images = getImageUrls(post)
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const latitude = typeof content.latitude === 'number' ? content.latitude : typeof content.latitude === 'string' ? content.latitude : undefined
  const longitude = typeof content.longitude === 'number' ? content.longitude : typeof content.longitude === 'string' ? content.longitude : undefined
  const mapEmbedUrl = buildMapEmbedUrl(latitude, longitude, location)

  const related = (await fetchTaskPosts(task, 6))
    .filter((item) => item.slug !== post!.slug)
    .filter((item) => {
      if (!content.category) return true
      const itemContent = item.content && typeof item.content === 'object' ? item.content : {}
      return itemContent.category === content.category
    })
    .slice(0, 3)

  return (
    <ProfileDetailPage
      task={task}
      taskLabel={taskConfig?.label || task}
      taskRoute={taskConfig?.route || '/'}
      post={post}
      description={description}
      category={category}
      images={images}
      mapEmbedUrl={mapEmbedUrl}
      related={related}
    />
  )
}
