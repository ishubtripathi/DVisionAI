"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import workGif from "@/public/demo/DvisionWork.gif";

export default function DemoSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-transparent to-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 leading-tight uppercase">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Division
              </span>{" "}
              in action
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
              Upload any image and watch our AI deliver precise, context-aware
              captions and generation-ready prompts — fast and reliably.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                "Multi-object detection",
                "Context-aware descriptions",
                "Scene understanding",
                "Realtime processing",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white/6 rounded-xl border border-white/6 backdrop-blur-sm hover:shadow-lg transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center">
                    <CheckCircle2 className="text-white" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      High-quality results suitable for production.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/app"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:scale-105 transition"
              >
                Try Now
              </a>
              <button className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/10 text-white/90 bg-white/3 hover:bg-white/6 transition">
                <a href="/workflow">Learn More</a>
              </button>
            </div>
          </div>

          {/* Right: Attractive demo preview */}
          <div className="relative">
            <div className="rounded-2xl p-1 bg-gradient-to-br from-primary/10 to-accent/8">
              <div className="rounded-2xl bg-gradient-to-b from-black/70 to-black/60 overflow-hidden border border-white/15 shadow-lg">
                {/* MAIN GIF AREA */}
                <div
                  className="w-full max-w-full select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <Image
                      src={workGif}
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

                {/* Footer area with small examples */}
                <div className="p-4 flex gap-3 items-center justify-between">
                  <div className="flex items-center gap-3"></div>
                  <div className="text-xs text-gray-400">
                    Powered by DVisionAI
                  </div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -top-3 -left-3 md:-left-4">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-white shadow">
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
