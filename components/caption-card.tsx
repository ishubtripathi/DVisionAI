'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CaptionCardProps {
  caption: string
}

export default function CaptionCard({ caption }: CaptionCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-dark rounded-xl p-8 space-y-4 fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide">Generated Description</p>
          <p className="text-xl leading-relaxed text-foreground">{caption}</p>
        </div>
        <button
          onClick={handleCopy}
          className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          title="Copy caption"
        >
          {copied ? (
            <Check className="w-5 h-5 text-primary" />
          ) : (
            <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          )}
        </button>
      </div>

      <div className="pt-4 border-t border-border/30 space-y-2">
        <p className="text-xs text-muted-foreground">Character count: {caption.length}</p>
        <div className="w-full bg-border/30 rounded-full h-1">
          <div
            className="bg-primary h-1 rounded-full"
            style={{ width: `${Math.min((caption.length / 300) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
