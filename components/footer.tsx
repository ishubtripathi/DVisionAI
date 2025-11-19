"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo/logo1.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black/60 to-transparent border-t border-border/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 items-start">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <Image
                src={logo}
                alt="DVisionAI Logo"
                className="w-12 h-12 object-contain shadow-md"
                priority
              />
              <span className="font-bold text-lg uppercase">DVision-AI</span>
            </Link>

            <p className="text-sm text-muted-foreground mb-6">
              Transform images into human-quality captions with fast, reliable
              AI.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ishubtripathi"
                aria-label="GitHub"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                target="blank"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com/Ishubtripathi"
                aria-label="Twitter"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                target="blank"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/ishubtripathi/"
                aria-label="LinkedIn"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                target="blank"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:ishubtripathi@gmail.com"
                aria-label="Email"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/app"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Try Now
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-3">
                Resources
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-3">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DVisionAI developed by{" "}
            <a
              href="https://www.linkedin.com/in/ishubtripathi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white underline underline-offset-2 transition-colors "
            >
              Shubh Tripathi
            </a>
            {/* . All rights reserved. */}
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
