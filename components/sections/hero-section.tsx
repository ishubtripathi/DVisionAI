"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import frontGif from "@/public/animation/var7.gif";

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
      {/* Gradient Background - responsive sizes/positions */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-12 md:top-20 left-1/2 md:left-1/2 -translate-x-1/2 w-56 h-56 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-12 md:bottom-20 right-8 md:right-1/4 w-56 h-56 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
          </div>

          <svg
            viewBox="0 0 1320 300"
            className="w-full h-auto block text-[5.5rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[10rem] font-extrabold gradient-text mb-2 slide-up uppercase tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.15em] leading-tight"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <text x="50%" y="50%" dy="0.35em" textAnchor="middle">
              DVISION
            </text>
          </svg>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto slide-up px-2">
            Experience the future of image understanding. DVisionAI uses
            cutting-edge AI to generate accurate, detailed captions instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-12 slide-up relative z-20">
            <Link
              href="/app"
              className="px-5 sm:px-8 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover-lift inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <button className="px-5 sm:px-8 py-2.5 sm:py-3 border border-border hover:bg-card/50 text-foreground rounded-lg font-semibold transition-all hover-lift text-sm sm:text-base">
              Watch Demo
            </button>
          </div>

          {/* Preview Box - responsive aspect and sizing */}
          <div className="relative mx-auto max-w-full md:max-w-xl slide-up -mt-10 -mb-30 z-10">
            <Image
              src={frontGif}
              alt="DVision AI Demo"
              className="w-full h-auto object-contain rounded-xl pointer-events-none"
              sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 768px) 90vw,
                    (max-width: 1024px) 80vw,
                    700px
                  "
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
