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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">Everything you need to transform images into intelligent captions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="glass-dark p-8 hover-lift slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
