'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CaptionCardProps {
  caption?: string
  description?: string
  type?: 'caption' | 'description' | 'prompt'
}

export default function CaptionCard({ 
  caption, 
  description, 
  type = 'caption' 
}: CaptionCardProps) {
  const [copied, setCopied] = useState(false)

  // Determine which text to display and the title based on type
  const displayText = caption || description || ''
  const getTitle = () => {
    switch (type) {
      case 'caption':
        return 'Short Caption'
      case 'description':
        return 'Detailed Description'
      case 'prompt':
        return 'detailed Prompt'
      default:
        return 'Generated Content'
    }
  }

  const getCharacterCountColor = (length: number) => {
    if (length < 50) return 'bg-yellow-500'
    if (length < 150) return 'bg-green-500'
    return 'bg-primary'
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!displayText) return null

  return (
    <div className="glass-dark rounded-xl p-4 sm:p-6 space-y-4 fade-in">
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">

    {/* TEXT SECTION */}
    <div className="space-y-3 flex-1 min-w-0">
      <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-wide">
        {getTitle()}
      </p>

      <p className="text-base text-gray-400 sm:text-lg leading-relaxed whitespace-pre-wrap wrap-break-words">
        {displayText}
      </p>
    </div>

    {/* COPY BUTTON */}
    <button
      onClick={handleCopy}
      className="self-end sm:self-start p-2 hover:bg-white/10 rounded-lg transition-all duration-200 shrink-0"
      title={`Copy ${getTitle().toLowerCase()}`}
    >
      {copied ? (
        <Check className="w-5 h-5 text-primary" />
      ) : (
        <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground" />
      )}
    </button>

  </div>
</div>
  )
}