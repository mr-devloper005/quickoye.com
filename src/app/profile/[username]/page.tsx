import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { MapPin, Globe, Mail, Tag, ArrowLeft } from "lucide-react";
import { ActionBar } from "./action-bar";

export const revalidate = 3;

function getTimeAgo(dateString?: string | Date): string {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*?<\/style>/gi, "")
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(text: string, maxLength: number = 400): string {
  const clean = stripHtml(text);
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trimEnd() + "…";
}

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const email = content.email as string | undefined;
  const location = typeof content.address === "string" ? content.address : typeof content.location === "string" ? content.location : undefined;
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === "string") : [];
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === "string") : [];
  const category = typeof content.category === "string" ? content.category : post.tags?.[0] || "Profile";
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]" suppressHydrationWarning>
      <NavbarShell />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Back Link */}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profiles
        </Link>

        {/* Main Profile Card */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Card Header - Profile Info */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
            <Avatar className="h-12 w-12 ring-2 ring-slate-100">
              <AvatarImage src={logoUrl || ""} alt={brandName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white">
                {brandName?.charAt(0).toUpperCase() || "P"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-base font-semibold text-slate-900">{brandName}</h1>
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
            <h2 className="text-lg font-semibold leading-snug text-slate-900">{post.title}</h2>

            {/* Description */}
            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              {getExcerpt(description, 400)}
            </p>

            {/* Read More Link */}
            {description.length > 400 && (
              <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                Read More
              </button>
            )}

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
                  <span>{website.replace(/^https?:\/\//, "")}</span>
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

          {/* Image Gallery */}
          {images.length > 0 && (
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

          {/* Action Bar */}
          <ActionBar />
        </article>

        {/* Suggested Articles Section */}
        {suggestedArticles.length > 0 && (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Suggested articles</h3>
              <Link
                href="/articles"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {suggestedArticles.slice(0, 2).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
