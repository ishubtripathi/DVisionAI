"use client";

import { useState, useRef } from "react";
import { Upload, ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageSelect,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      // For URL images, we'll load them and convert to base64
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const base64 = canvas.toDataURL("image/jpeg");
          onImageSelect(base64);
          setImageUrl("");
        }
      };
      img.onerror = () => {
        alert("Failed to load image from URL");
      };
      img.src = imageUrl;
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`glass-dark rounded-xl p-8 border-2 border-dashed border-gray-900 cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary/80 bg-primary/10"
            : "border-border/50 hover:border-primary/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-primary/20 rounded-lg">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Drag and drop your image</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <form onSubmit={handleUrlSubmit} className="space-y-3 w-full">
        <p className="text-sm text-muted-foreground">Or paste an image URL:</p>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
            className="w-full bg-input border border-border rounded-lg px-4 py-2 
                 text-foreground placeholder-muted-foreground
                 focus:outline-none focus:ring-2 focus:ring-primary 
                 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={disabled || !imageUrl.trim()}
            className="sm:w-auto w-full px-4 py-2 bg-primary hover:bg-primary/90 
                 disabled:bg-primary/50 text-primary-foreground rounded-lg 
                 transition-all flex items-center justify-center"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
