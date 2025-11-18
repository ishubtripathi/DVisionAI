export default function StatsSection() {
  const stats = [
    { label: '99.8% Accuracy', value: 'Industry Leading' },
    { label: '<500ms Response', value: 'Lightning Fast' },
    { label: '10M+ Images', value: 'Processed Daily' },
    { label: '150+ Languages', value: 'Multilingual Support' },
  ]

  return (
    <section className="py-16 border-y border-border/40 px-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.label}</div>
              <p className="text-muted-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
