import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DVisionAI - AI Image Captioning Platform',
  description: 'Transform your images into vivid, accurate descriptions with DVisionAI. Powered by advanced AI models for instant, intelligent image analysis.',
  keywords: ['AI', 'Image captioning', 'Vision AI', 'Image description', 'Accessibility', 'SEO', 'Content creation'],
  authors: [{ name: 'DVisionAI Team' }],
  openGraph: {
    title: 'DVisionAI - AI Image Captioning Platform',
    description: 'Transform your images into vivid descriptions with cutting-edge AI technology.',
    type: 'website',
    url: 'https://dvisionai.com',
    siteName: 'DVisionAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DVisionAI - AI Image Captioning',
    description: 'Transform images into intelligent captions instantly.',
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased dark bg-background text-foreground`}>
        {children}
        <Toaster theme="dark" position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
