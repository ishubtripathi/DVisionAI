"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import {
  Upload,
  Zap,
  Brain,
  Sparkles,
  Download,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WorkflowPage() {
  const mainSteps = [
    {
      icon: Upload,
      title: "Upload Image",
      description:
        "Select and upload your image from your device or provide a URL",
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-500/20",
      number: "01",
    },
    {
      icon: Zap,
      title: "AI Processing",
      description:
        "Advanced AI analyzes image in real-time, identifying objects and context",
      color: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-500/20",
      number: "02",
    },
    {
      icon: Brain,
      title: "Caption Generation",
      description: "Human-like captions and production-ready prompts",
      color: "from-pink-500 to-pink-600",
      lightColor: "bg-pink-500/20",
      number: "03",
    },
    {
      icon: Download,
      title: "Download Results",
      description:
        "Get captions instantly in multiple formats or use via our API",
      color: "from-cyan-500 to-cyan-600",
      lightColor: "bg-cyan-500/20",
      number: "04",
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-blue-500/10 blur-[140px] rounded-full opacity-50 pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[30vw] max-w-[400px] h-[30vw] max-h-[400px] bg-purple-500/10 blur-[120px] rounded-full opacity-40 pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[400px] h-[35vw] max-h-[400px] bg-pink-500/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <Navigation />

      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative z-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Simple 4-Step Process
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight uppercase">
              How{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DVisionAI
              </span>{" "}
              Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2 leading-relaxed">
              Transform your images into intelligent, detailed captions with our
              advanced AI in just 4 simple steps.
            </p>
          </motion.div>

          {/* Main Flowchart */}
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {mainSteps.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === mainSteps.length - 1;

                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Connector Arrow */}
                    {!isLast && (
                      <div className="hidden md:flex absolute -right-8 top-24 z-20 pointer-events-none">
                        <motion.div
                          className="relative"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight
                            className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg"
                            size={24}
                          />
                        </motion.div>
                      </div>
                    )}

                    {/* Step Card */}
                    <div
                      className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-md`}
                    >
                      {/* Gradient Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          {/* Number */}
                          <div
                            className={`w-14 h-14 rounded-xl ${step.lightColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            {step.number}
                          </div>
 
                          {/* Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white uppercase">
                            {step.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {step.description}
                        </p>

                        {/* Supports badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          <Check size={14} className="text-blue-400" />
                          <span className="text-xs font-medium text-white/70">
                            Supported
                          </span>
                        </div>
                      </div>

                      {/* Decorative gradient */}
                      <div
                        className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gradient-to-tr ${step.color} opacity-20 blur-2xl pointer-events-none`}
                      />
                    </div>

                    {/* Mobile Connector */}
                    {!isLast && (
                      <div className="md:hidden flex justify-center my-4">
                        <motion.div
                          animate={{ y: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight
                            className="rotate-90 text-purple-400"
                            size={28}
                          />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            className="mt-16 md:mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Try DVisionAI free today. No credit card required. Start
              generating intelligent captions in seconds.
            </p>
            <motion.a
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now for Free <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
