'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative max-w-3xl mx-auto">
          {/* Background Gradient */}
          <div className="absolute inset-0 -z-10 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50"></div>
          </div>

          <div className="glass-dark p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Ready to Transform Your Images?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start generating professional image captions in seconds. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/app"
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover-lift inline-flex items-center gap-2"
              >
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-3 border border-border hover:bg-card/50 text-foreground rounded-lg font-semibold transition-all hover-lift">
                Schedule Demo
              </button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">Available on web, iOS, and Android.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
