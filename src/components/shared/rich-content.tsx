import { cn } from "@/lib/utils";

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const linkifyEscapedText = (escaped: string) => {
  const withUrls = escaped.replace(
    /\b((?:https?:\/\/|www\.)[^\s<]+[^\s<\.)\],:;"'])/gi,
    (match) => {
      const href = match.toLowerCase().startsWith("www.") ? `https://${match}` : match;
      return `<a href="${href}" target="_blank" rel="noreferrer noopener">${match}</a>`;
    }
  );

  return withUrls.replace(
    /\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi,
    (match) =>
      `<a href="mailto:${match}" class="break-all" rel="noreferrer">${match}</a>`
  );
};

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

export const formatRichHtml = (raw?: string | null, fallback = "Details coming soon.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;

  const maybeDecoded =
    !/<[a-z][\s\S]*>/i.test(source) && /&lt;[a-z][\s\S]*&gt;/i.test(source)
      ? decodeHtmlEntities(source)
      : source;

  if (/<[a-z][\s\S]*>/i.test(maybeDecoded)) {
    return sanitizeRichHtml(maybeDecoded);
  }

  return maybeDecoded
    .split(/\n{2,}/)
    .map((paragraph) => {
      const escaped = escapeHtml(paragraph.replace(/\n/g, " ").trim());
      return `<p>${linkifyEscapedText(escaped)}</p>`;
    })
    .join("");
};

const baseClasses =
  "article-content prose prose-slate max-w-none text-base leading-7 prose-p:my-4 prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-strong:font-semibold prose-h2:my-7 prose-h2:text-3xl prose-h2:font-bold prose-h2:leading-tight prose-h3:my-5 prose-h3:text-2xl prose-h3:font-semibold prose-h3:leading-tight prose-ul:my-5 prose-ol:my-5 prose-li:my-1 prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4";

export function RichContent({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return <article className={cn(baseClasses, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
