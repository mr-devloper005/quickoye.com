'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowUp, Bookmark, Share2, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Bookmark as BookmarkType } from '@/types'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import { useToast } from '@/components/ui/use-toast'


export function BookmarkCard({
  bookmark,
  compact = false,
  showActions = true,
}: {
  bookmark: BookmarkType
  compact?: boolean
  showActions?: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const [isUpvoted, setIsUpvoted] = useState(bookmark.isUpvoted)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [isSaved, setIsSaved] = useState(bookmark.isSaved)
  const [upvotes, setUpvotes] = useState(bookmark.upvotes)
  const [saves, setSaves] = useState(bookmark.saves)
  const [shareLabel, setShareLabel] = useState('Share')
  const router = useRouter()
  const { toast } = useToast()
  const author = bookmark.author

  useEffect(() => {
    setMounted(true)
    setSavedIds(loadFromStorage<string[]>(storageKeys.bookmarkSaves, []))
  }, [])

  useEffect(() => {
    setIsSaved(savedIds.includes(bookmark.id) || bookmark.isSaved)
  }, [bookmark.id, bookmark.isSaved, savedIds])

  const handleUpvote = () => {
    // Redirect to login for upvoting
    router.push('/login')
  }

  const handleSave = () => {
    const next = !isSaved
    setIsSaved(next)
    const nextIds = next
      ? Array.from(new Set([...savedIds, bookmark.id]))
      : savedIds.filter((id) => id !== bookmark.id)
    setSavedIds(nextIds)
    saveToStorage(storageKeys.bookmarkSaves, nextIds)
    setSaves((current) => current + (next ? 1 : -1))
    toast({
      title: next ? 'Bookmark saved' : 'Bookmark removed',
      description: next ? 'Added to your saved bookmarks.' : 'Removed from saved bookmarks.',
    })
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url)
      setShareLabel('Copied')
      setTimeout(() => setShareLabel('Share'), 1500)
    } catch {
      setShareLabel('Copy failed')
      setTimeout(() => setShareLabel('Share'), 1500)
    }
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full overflow-hidden border-border bg-card transition-all hover:border-muted-foreground/20">
        <Link href={`/sbm/${bookmark.slug}`} className="block">
          <div className={cn('flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3', compact && 'px-3 py-2')}>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {bookmark.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{bookmark.domain}</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Link>

        <CardContent className={cn('p-5', compact && 'p-4')}>
          <div className="mb-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{author.name}</span>
            <span className="mx-2">•</span>
            <span>{bookmark.domain}</span>
          </div>

          <Link href={`/sbm/${bookmark.slug}`}>
            <h3 className={cn('mb-2 font-semibold leading-tight text-foreground', compact ? 'text-base' : 'text-lg')}>
              {bookmark.title}
            </h3>
          </Link>
          <p className={cn('mb-4 text-sm text-muted-foreground')}>
            {bookmark.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {bookmark.tags.slice(0, compact ? 2 : 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {showActions && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                variant={isUpvoted ? 'secondary' : 'ghost'}
                size="sm"
                className="gap-2"
                onClick={handleUpvote}
              >
                <ArrowUp className="h-4 w-4" />
                {upvotes}
              </Button>
              <Button
                variant={isSaved ? 'secondary' : 'ghost'}
                size="sm"
                className="gap-2"
                onClick={handleSave}
              >
                <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                {saves}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
                {shareLabel === 'Copied' ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {shareLabel}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
