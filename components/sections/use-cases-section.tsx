"use client";

import {
  FileText,
  ShoppingCart,
  Accessibility,
  Search,
  AccessibilityIcon,
  ImageIcon,
  Brain,
  Layers,
} from "lucide-react";

export default function UseCasesSection() {
  const useCases = [
    {
      title: "Image Captioning",
      description: "Automatically generate descriptive captions for any image.",
      icon: ImageIcon,
    },
    {
      title: "Accessibility",
      description: "Help visually-impaired users understand visual content.",
      icon: AccessibilityIcon,
    },
    {
      title: "E-commerce",
      description: "Generate product descriptions from product images.",
      icon: ShoppingCart,
    },
    {
      title: "Content Automation",
      description: "Bulk-process image descriptions for blogs & media.",
      icon: FileText,
    },
    {
      title: "Research",
      description: "Use deep learning captioning for datasets and studies.",
      icon: Brain,
    },
    {
      title: "Applications",
      description: "Enhance mobile or web apps with AI vision capabilities.",
      icon: Layers,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-2 leading-tight uppercase">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Use
            </span>{" "}
            Cases
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Discover how DVisionAI can transform workflows across teams — from
            marketing to accessibility and e‑commerce.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {useCases.map((item, index) => (
            <div key={index} className="group">
              {/* Icon + Title */}
              <div className="flex items-center gap-3 mb-3">
                <item.icon className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent uppercase">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              {/* Subtle divider */}
              <div className="mt-6 h-px w-full bg-white/10 group-hover:bg-white/20 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
