'use client'

import Link from 'next/link'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThumbsUp, Share2, Eye, MapPin, Globe, Mail, Phone, Tag, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ProfileDetailPageProps {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getFullText(text: string): string {
  return stripHtml(text)
}

export function ProfileDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: ProfileDetailPageProps) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [views, setViews] = useState(0)

  useEffect(() => {
    setViews(Math.floor(Math.random() * 500) + 50)
  }, [])

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []

  const handleLike = () => {
    // Redirect to login for liking
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: getFullText(description).slice(0, 100),
          url: window.location.href,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {taskLabel}
        </Link>

        {/* Main Profile Card */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header - Profile Info */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
            {task !== 'sbm' && (
              <Avatar className="h-12 w-12 ring-2 ring-slate-100">
                <AvatarImage src={images[0] || ''} alt={post.title} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                  {post.title?.charAt(0).toUpperCase() || 'P'}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <h1 className="text-base font-semibold text-slate-900">{post.title}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 text-blue-600">
                  <Tag className="h-3 w-3" />
                  {category}
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-5 py-4">
            {/* Title */}
            <h2 className="text-lg font-semibold leading-snug text-slate-900">
              {post.title}
            </h2>

            {/* Full Description */}
            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-slate-600">
              {getFullText(description)}
            </p>

            {/* Contact Info Grid */}
            <div className="mt-5 grid gap-2">
              {location && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  <span>{website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                >
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{email}</span>
                </a>
              )}
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {highlights.slice(0, 4).map((highlight, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Gallery - Hidden for SBM */}
          {task !== 'sbm' && images.length > 0 && (
            <div className="border-t border-slate-100">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <ContentImage
                  src={images[0]}
                  alt={post.title}
                  fill
                  className="object-cover"
                  intrinsicWidth={1200}
                  intrinsicHeight={675}
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-1 p-1">
                  {images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                      <ContentImage
                        src={image}
                        alt={`${post.title} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Map */}
          {mapEmbedUrl && (
            <div className="border-t border-slate-100">
              <div className="p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} location`}
                    className="h-48 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-full px-4 ${
                  isLiked ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {likes > 0 ? likes : 'Like'}
                </span>
              </Button>


              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full px-4 text-slate-600 hover:bg-slate-100"
              >
                <Share2 className="h-4 w-4" />
                <span className="text-sm font-medium">Share</span>
              </Button>
            </div>

            {/* Views Count */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Eye className="h-4 w-4" />
              <span>{views} views</span>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {related.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                More in {category}
              </h3>
              <Link
                href={taskRoute}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <TaskPostCard
                  key={item.id}
                  post={item}
                  href={`${taskRoute}/${item.slug}`}
                  taskKey={task}
                  compact
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
