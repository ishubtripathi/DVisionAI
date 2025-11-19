'use client'

import { Star, Zap, Image, Globe } from 'lucide-react'

export default function StatsSection() {
  const stats = [
    { label: '99.8% Accuracy', value: 'Industry Leading', icon: Star },
    { label: '<500ms Response', value: 'Lightning Fast', icon: Zap },
    { label: '10M+ Images', value: 'Processed Daily', icon: Image },
    { label: '150+ Languages', value: 'Multilingual Support', icon: Globe },
  ]

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Performance & Reach</h3>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">Why teams trust DVisionAI</h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
            Accurate captions, blazing speed and global scale — engineered for production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-sm hover:shadow-lg transition-all"
                style={{ willChange: 'transform, box-shadow' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 sm:w-14 sm:h-14 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-accent text-white shadow-md">
                    <Icon size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <div className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-white leading-tight truncate">
                        {stat.label}
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-300 truncate">{stat.value}</p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-tr from-primary/10 to-accent/6 pointer-events-none blur-md" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}