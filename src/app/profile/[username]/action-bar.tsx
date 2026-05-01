"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ActionBar() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-1 border-t border-slate-100 px-5 py-3">
      {/* Like - redirects to login */}
      <Link href="/login">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full px-4 text-slate-600 hover:bg-slate-100"
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">Like</span>
        </Button>
      </Link>

      {/* Comment - redirects to login */}
      <Link href="/login">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full px-4 text-slate-600 hover:bg-slate-100"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Comment</span>
        </Button>
      </Link>

      {/* Share - copies URL */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full px-4 text-slate-600 hover:bg-slate-100"
      >
        <Share2 className="h-4 w-4" />
        <span className="text-sm font-medium">
          {copied ? "Copied!" : "Share"}
        </span>
      </Button>
    </div>
  );
}
