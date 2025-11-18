'use client'

import { CheckCircle2 } from 'lucide-react'

export default function DemoSection() {
  return (
    <section className="py-24 border-y border-border/40 px-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">See It In Action</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the power of DVisionAI with real-world examples. Upload any image and watch as our AI generates accurate, detailed captions instantly.
            </p>

            <div className="space-y-4">
              {[
                'Multi-object detection and recognition',
                'Context-aware caption generation',
                'Scene understanding and analysis',
                'Real-time processing',
                'Support for any image format',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Image */}
          <div className="glass-dark p-1 rounded-2xl hover-lift">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl aspect-square flex items-center justify-center border border-white/10">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-muted-foreground">Your image preview will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
