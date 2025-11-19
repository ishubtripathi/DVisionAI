'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out DVisionAI',
      features: [
        '100 captions/month',
        'Basic features',
        'Community support',
        'Standard processing speed',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professionals and creators',
      features: [
        'Unlimited captions',
        'Priority processing',
        'API access',
        'Email support',
        'Advanced analytics',
        'Batch processing',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale operations',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'On-premise deployment',
        'Custom model training',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-[#1A1A1A] blur-[140px] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[400px] h-[35vw] max-h-[400px] bg-[#1F1F1F] blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <Navigation />

      <section className="pt-24 md:pt-40 pb-16 md:pb-24 relative z-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight uppercase">
              Simple, Transparent {" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pricing
              </span>{" "}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Choose the perfect plan for your needs. Always flexible, no long-term contracts. Upgrade or downgrade anytime.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-xs sm:text-sm text-muted-foreground">Monthly</span>
              <div className="w-12 h-6 rounded-full bg-primary/20 border border-primary/40"></div>
              <span className="text-xs sm:text-sm text-muted-foreground">Annual <span className="text-primary font-semibold">Save 20%</span></span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-16 px-2">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative overflow-visible rounded-2xl transition-all duration-300 ${
                  plan.highlighted
                    ? 'md:scale-105 p-6 sm:p-8 bg-gradient-to-br from-white/5 to-white/2 border border-primary/40 shadow-xl'
                    : 'p-6 sm:p-8 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 shadow-sm hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Decorative gradient */}
                <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/10 to-accent/6 pointer-events-none blur-md opacity-60" />

                {plan.highlighted && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-bold rounded-full shadow-lg z-20 whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="relative z-10">
                  {plan.highlighted && <div className="h-6" />}
                  
                  {/* Plan name & description */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-6 min-h-[2.5rem]">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold">{plan.price}</span>
                    {plan.period && <span className="text-xs sm:text-sm text-muted-foreground">{plan.period}</span>}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mb-8 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      plan.highlighted
                        ? 'bg-primary hover:brightness-110 text-white shadow-lg'
                        : 'border border-white/10 bg-white/3 text-white hover:bg-white/6'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </button>

                  {/* Features list */}
                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check
                          size={18}
                          className={`flex-shrink-0 mt-0.5 ${
                            plan.highlighted ? 'text-primary' : 'text-primary/70'
                          }`}
                        />
                        <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-12 md:mt-20 max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight text-center uppercase">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Feature
              </span>{" "}
              Comparison
            </h3>
            <div className="rounded-2xl border border-white/6 overflow-hidden bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-3 sm:p-4 font-semibold">Feature</th>
                      <th className="text-center p-3 sm:p-4 font-semibold">Starter</th>
                      <th className="text-center p-3 sm:p-4 font-semibold bg-primary/10 text-primary">Pro</th>
                      <th className="text-center p-3 sm:p-4 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {[
                      { feature: 'Monthly Captions', starter: '100', pro: 'Unlimited', enterprise: 'Unlimited' },
                      { feature: 'API Access', starter: '❌', pro: '✅', enterprise: '✅' },
                      { feature: 'Priority Support', starter: '❌', pro: '✅', enterprise: '✅' },
                      { feature: 'Analytics', starter: '❌', pro: '✅', enterprise: '✅' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/3 transition">
                        <td className="p-3 sm:p-4 font-medium text-left">{row.feature}</td>
                        <td className="text-center p-3 sm:p-4 text-muted-foreground">{row.starter}</td>
                        <td className="text-center p-3 sm:p-4 bg-primary/5">{row.pro}</td>
                        <td className="text-center p-3 sm:p-4 text-muted-foreground">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ CTA */}
          <div className="text-center mt-12 md:mt-16">
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">Have questions about pricing?</p>
            <Link href="/faq" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm sm:text-base">
              Visit our FAQ <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}