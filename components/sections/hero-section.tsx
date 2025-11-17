'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6 fade-in">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 slide-up leading-tight">
            Transform Images Into Vivid Descriptions
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto slide-up">
            Experience the future of image understanding. DVisionAI uses cutting-edge AI to generate accurate, detailed captions instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 slide-up">
            <Link
              href="/app"
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover-lift inline-flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <button className="px-8 py-3 border border-border hover:bg-card/50 text-foreground rounded-lg font-semibold transition-all hover-lift">
              Watch Demo
            </button>
          </div>

          {/* Preview Box */}
          <div className="relative mx-auto max-w-3xl slide-up">
            <div className="glass-dark p-1">
              <div className="bg-black/60 rounded-2xl p-8 aspect-video flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mb-4">
                    <Sparkles size={32} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground">AI Image Recognition in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
