import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-on-background border-t border-tertiary-container/20 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto px-6 py-8 gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
          <Link
            className="font-headline-md text-headline-md font-bold text-surface-container-lowest flex items-center hover:opacity-90 transition-opacity"
            href="/"
          >
            Ayesha Naaz<span className="text-primary">.</span>
          </Link>

          <span className="hidden md:inline text-tertiary-fixed-dim">|</span>

          <p className="font-body-sm text-body-sm text-secondary-fixed-dim">
            © 2026 Ayesha Naaz. Aspiring Software Developer • Learning. Building. Growing.
          </p>
        </div>

        {/* Footer Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link
            className="font-label-xs text-label-xs text-secondary-fixed-dim hover:text-surface-container-lowest transition-colors"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="font-label-xs text-label-xs text-secondary-fixed-dim hover:text-surface-container-lowest transition-colors"
            href="/terms"
          >
            Terms of Service
          </Link>
          <a
            className="font-label-xs text-label-xs text-secondary-fixed-dim hover:text-surface-container-lowest transition-colors flex items-center gap-1"
            href="https://github.com/ayesha0505-netizen"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            className="font-label-xs text-label-xs text-secondary-fixed-dim hover:text-surface-container-lowest transition-colors flex items-center gap-1"
            href="https://www.linkedin.com/in/ayesha-naaz-11296333a"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
