export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      avatar: '👩‍💼',
      quote: 'DVisionAI saved me countless hours writing image descriptions. The accuracy is incredible and the speed is unmatched.',
    },
    {
      name: 'Marcus Chen',
      role: 'Web Developer',
      avatar: '👨‍💻',
      quote: 'Perfect for accessibility. Our clients love the automatically generated captions, and it\'s improved our SEO significantly.',
    },
    {
      name: 'Elena Rodriguez',
      role: 'E-commerce Manager',
      avatar: '👩‍🔬',
      quote: 'We process thousands of product images daily. DVisionAI has been a game-changer for our workflow and customer experience.',
    },
  ]

  return (
    <section className="py-24 bg-card/30 border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Trusted by Thousands</h2>
          <p className="text-xl text-muted-foreground">See what users love about DVisionAI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="glass-dark p-8 hover-lift slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
