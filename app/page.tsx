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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <UseCasesSection />
      <DemoSection />
      <TestimonialsSection />
      <IntegrationSection />
      <CTA />
      <Footer />
    </main>
  )
}
