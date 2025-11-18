import { Code2, Zap, Shield, Globe } from 'lucide-react'

export default function IntegrationSection() {
  const integrations = [
    {
      icon: Code2,
      title: 'REST API',
      description: 'Easy-to-use API for seamless integration into your applications.',
    },
    {
      icon: Zap,
      title: 'Batch Processing',
      description: 'Process multiple images efficiently with our batch API.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with encryption and privacy protection.',
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Deploy globally with low-latency response times worldwide.',
    },
  ]

  return (
    <section className="py-24 border-b border-border/40 px-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Built for Integration</h2>
          <p className="text-xl text-muted-foreground">Integrate DVisionAI into your workflow effortlessly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="glass-dark p-6 text-center hover-lift slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
