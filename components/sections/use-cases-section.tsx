import { FileText, ShoppingCart, Accessibility, Search } from 'lucide-react'

export default function UseCasesSection() {
  const useCases = [
    {
      icon: FileText,
      title: 'Content Creation',
      description: 'Automatically generate descriptions for blog posts, social media, and marketing materials.',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Create compelling product descriptions that boost sales and improve SEO.',
    },
    {
      icon: Accessibility,
      title: 'Web Accessibility',
      description: 'Generate alt text for images to make your website accessible to everyone.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improve search rankings with detailed, keyword-rich image descriptions.',
    },
  ]

  return (
    <section className="py-24 px-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Use Cases</h2>
          <p className="text-xl text-muted-foreground">Discover how DVisionAI can transform your workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon
            return (
              <div key={i} className="glass-dark p-8 hover-lift slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
