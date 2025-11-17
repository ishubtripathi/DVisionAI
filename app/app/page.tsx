'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import ImageUploader from '@/components/image-uploader'
import CaptionCard from '@/components/caption-card'
import LoaderSpinner from '@/components/loader-spinner'
import { toast } from 'sonner'

export default function AppPage() {
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (imageData: string) => {
    setImage(imageData)
    setCaption(null)
    setError(null)
  }

  const handleGenerateCaption = async () => {
    if (!image) return

    setLoading(true)
    setError(null)
    setCaption(null)

    try {
      const response = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate caption')
      }

      const data = await response.json()
      setCaption(data.caption)
      toast.success('Caption generated successfully!')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setCaption(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Image Caption Generator</h1>
            <p className="text-lg text-muted-foreground">Upload an image and let AI generate a detailed, accurate caption in seconds.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Upload Your Image</h2>
                <ImageUploader onImageSelect={handleImageSelect} disabled={loading} />
              </div>

              {image && (
                <div className="space-y-4 fade-in">
                  <div className="glass-dark rounded-xl p-6">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Selected"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleGenerateCaption}
                      disabled={loading}
                      className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <LoaderSpinner size={20} />
                          Generating...
                        </>
                      ) : (
                        'Generate Caption'
                      )}
                    </button>
                    <button
                      onClick={handleReset}
                      disabled={loading}
                      className="px-6 py-3 rounded-lg border border-border hover:bg-card disabled:opacity-50 transition-all duration-200"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-4 text-destructive-foreground fade-in">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
            </div>

            {/* Caption Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">AI-Generated Caption</h2>
                {caption ? (
                  <CaptionCard caption={caption} />
                ) : (
                  <div className="glass-dark rounded-xl p-8 flex items-center justify-center min-h-64">
                    <p className="text-muted-foreground text-center">
                      {loading ? 'Analyzing your image...' : 'Your caption will appear here'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
