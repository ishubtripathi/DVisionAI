'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="glass-dark relative rounded-2xl border border-white/7 overflow-hidden shadow-xl p-6 sm:p-8 md:p-12">
          {/* subtle decorative gradient */}
          <div className="pointer-events-none absolute -inset-y-6 -left-24 w-72 bg-gradient-to-br from-primary/10 to-accent/6 blur-3xl opacity-70 transform -rotate-12 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Message */}
            <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold mb-2 leading-tight uppercase">
              Ready to {" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                transform
              </span>{" "}
              your images into intelligent captions?
            </h2>
              
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto md:mx-0">
                Start generating detailed, production-ready captions and prompts in seconds. Trusted by teams for accuracy and speed.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto md:mx-0">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-white text-xs">✓</span>
                  No credit card required
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-white text-xs">✓</span>
                  Fast, reliable results
                </li>
              </ul>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <Link
                  href="/app"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:brightness-105 transition"
                >
                  Start for Free <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-white/10 bg-transparent text-white/90 rounded-lg hover:bg-white/5 transition"
                >
                 Watch Demo
                </button>
              </div>

              <div className="mt-3 text-xs text-gray-400 text-center md:text-right">
                <div>Available on web, iOS & Android</div>
                <div className="mt-2 flex items-center justify-center md:justify-end gap-2">
                  {/* <span className="px-2 py-1 rounded-full bg-white/6 text-xs">30-day trial</span> */}
                  <span className="px-2 py-1 rounded-full bg-white/6 text-xs">Enterprise-ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}