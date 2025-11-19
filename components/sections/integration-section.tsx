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
    <section className="py-12 md:py-20 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-10 px-2">
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-2 leading-tight uppercase">
              Built for {" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Integration
              </span>{" "}
            </h2>
          <p className="text-sm sm:text-base text-muted-foreground">Integrate DVisionAI into your workflow effortlessly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {integrations.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="glass-dark p-5 sm:p-6 text-center rounded-2xl hover-lift slide-up transition-transform duration-200 hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
                role="article"
                aria-labelledby={`integration-${i}`}
              >
                <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={20} />
                </div>

                <h3 id={`integration-${i}`} className="font-semibold text-base sm:text-lg md:text-xl mb-2 truncate">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-[22rem] mx-auto">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
