'use client'

import Navigation from '@/components/navigation'
import HeroSection from '@/components/sections/hero-section'
import FeaturesSection from '@/components/sections/features-section'
import DemoSection from '@/components/sections/demo-section'
import StatsSection from '@/components/sections/stats-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import IntegrationSection from '@/components/sections/integration-section'
import UseCasesSection from '@/components/sections/use-cases-section'
import CTA from '@/components/sections/cta-section'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import Preloader from '@/components/Preloader'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])
  if (loading) return <Preloader />

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      {/* <StatsSection /> */}
      {/* <FeaturesSection /> */}
      <UseCasesSection />
      <DemoSection />
      {/* <TestimonialsSection /> */}
      {/* <IntegrationSection /> */}
      <CTA />
      <Footer />
    </main>
  )
}
