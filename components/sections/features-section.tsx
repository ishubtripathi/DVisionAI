import { Zap, Brain, Lock, BarChart3, Accessibility, Cpu } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Model',
      description: 'Powered by state-of-the-art vision language models for intelligent image understanding.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get results in milliseconds. Real-time processing for every image you upload.',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your images are processed securely. We never store or share your data.',
    },
    {
      icon: Accessibility,
      title: 'Accessibility',
      description: 'Make images accessible to everyone with detailed, contextual descriptions.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Track usage patterns and get insights about your image processing.',
    },
    {
      icon: Cpu,
      title: 'GPU Optimized',
      description: 'Enterprise-grade infrastructure for consistent, reliable performance.',
    },
  ]

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-2 leading-tight uppercase">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          <p className="text-sm sm:text-base text-muted-foreground">Everything you need to transform images into intelligent captions — reliable, fast and secure.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <article
                key={i}
                className="relative group overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-md shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                aria-labelledby={`feature-${i}`}
                role="region"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-none w-12 h-12 sm:w-14 sm:h-14 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-accent text-white shadow-md">
                    <Icon size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 id={`feature-${i}`} className="text-lg sm:text-xl font-semibold text-white truncate">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-gradient-to-tr from-primary/10 to-accent/6 pointer-events-none blur-md opacity-60" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}