"use client";

import { useState } from "react";
import Navigation from "@/components/navigation";
import ImageUploader from "@/components/image-uploader";
import CaptionCard from "@/components/caption-card";
import LoaderSpinner from "@/components/loader-spinner";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function AppPage() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [detailedPrompt, setDetailedPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (imageData: string) => {
    setImage(imageData);
    setCaption(null);
    setError(null);
  };

  const handleGenerateCaption = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);
    setCaption(null);

    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) throw new Error("Failed to generate caption");

      const data = await response.json();
      setCaption(data.caption);
      setDetailedPrompt(data.detailed_prompt);
      toast.success("Caption generated successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setCaption(null);
    setDetailedPrompt(null);
    setError(null);
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* subtle backgrounds remain but responsive */}
      <div className="absolute top-0 left-0 w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-[#1A1A1A] blur-[140px] rounded-full opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[35vw] max-w-[400px] h-[35vw] max-h-[400px] bg-[#1F1F1F] blur-[120px] rounded-full opacity-40 pointer-events-none" />

      <Navigation />

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-24 pb-10 text-center px-4 sm:px-6 lg:px-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight uppercase">
          AI Image{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Caption
          </span>{" "}
          Generator
        </h1>

        <p className="mx-auto max-w-2xl text-gray-400 text-sm sm:text-base mt-4 px-2">
          Upload your image and get an intelligent, human-like caption
          instantly.
        </p>
      </motion.section>

      {/* Info cards */}
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-12 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-md border border-gray-800 shadow"
          >
            <h3 className="text-lg font-semibold mb-1">⚡ Fast Processing</h3>
            <p className="text-xs text-gray-400">
              Get captions in just a few seconds powered by AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-md border border-gray-800 shadow"
          >
            <h3 className="text-lg font-semibold mb-1">🎯 High Accuracy</h3>
            <p className="text-xs text-gray-400">
              Captions are detailed, descriptive, and context-aware.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#0b0b0b]/60 backdrop-blur-md border border-gray-800 shadow"
          >
            <h3 className="text-lg font-semibold mb-1">🖼️ Unlimited Uploads</h3>
            <p className="text-xs text-gray-400">
              Upload as many images as you want — no limits.
            </p>
          </motion.div>
        </div>
      </div> */}

      {/* Main content area - responsive grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT CARD — IMAGE UPLOADER */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-800 backdrop-blur-md shadow-md bg-[#070707]/60"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 uppercase text-gray-300">
              Upload Image
            </h2>

            {!image ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-4 sm:p-6 border border-gray-800 bg-transparent"
              >
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  disabled={loading}
                />
              </motion.div>
            ) : (
              <>
                {/* Image Preview Card - responsive full preview */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-lg overflow-hidden border border-gray-800 bg-[#0b0b0b]"
                >
                  <div className="w-full h-auto flex items-center justify-center bg-transparent">
                    <img
                      src={image}
                      alt="Selected"
                      className="w-full h-auto max-h-[60vh] md:max-h-[56vh] object-contain rounded-md"
                    />
                  </div>
                </motion.div>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={handleGenerateCaption}
                    disabled={loading}
                    className="flex-1 py-2.5 sm:py-3 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white font-medium transition flex items-center justify-center"
                  >
                    {loading ? <LoaderSpinner size={18} /> : "Generate Caption"}
                  </button>

                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="px-4 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
                  >
                    Reset
                  </button>
                </div>
              </>
            )}

            {error && (
              <div className="mt-4 p-3 rounded-md bg-red-900/20 border border-red-800 text-red-300 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </motion.div>

          {/* RIGHT CARD — Caption Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-800 backdrop-blur-md shadow-md bg-[#070707]/60"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 uppercase text-gray-300">
              Generated Caption
            </h2>

            {caption ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-lg bg-[#0b0b0b] border border-gray-800 p-4 sm:p-6"
              >
                <CaptionCard caption={caption} />
              </motion.div>
            ) : (
              <div className="flex items-center justify-center min-h-40 sm:min-h-[220px] rounded-lg border border-gray-800 text-gray-500 p-4">
                {loading ? "Analyzing..." : "Your caption will appear here"}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
