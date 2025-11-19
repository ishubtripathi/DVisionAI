"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image"
import logo from "@/public/logo/logo1.svg" 

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-white/6">
      <div className="container mx-auto px-3 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-1 font-bold text-xl gradient-text uppercase text-white"
          >
            <Image
              src={logo}
              alt="DVisionAI Logo"
              className="w-12 h-12 object-contain"
              priority
              onContextMenu={(e) => e.preventDefault()}
            />
            DVision-AI
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/workflow"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Workflow
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="px-4 py-2 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/app"
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all hover-lift text-sm"
            >
              Try Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border/40 animate-in fade-in slide-in-from-top-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/workflow"
              onClick={closeMenu}
              className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Workflow
            </Link>
            <Link
              href="/pricing"
              onClick={closeMenu}
              className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={closeMenu}
              className="block px-4 py-2 text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <div className="border-t border-border/40 mt-4 pt-4 px-4">
              <Link
                href="/app"
                onClick={closeMenu}
                className="block w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all text-center text-sm"
              >
                Try Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
