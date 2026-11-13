"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Certifications & Learning", href: "/#certifications" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/90 backdrop-blur-md border-b border-surface-container-highest shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 h-16">
        {/* Brand Logo */}
        <Link
          className="text-2xl font-extrabold tracking-tight text-on-surface flex items-center gap-0.5 active:scale-95 transition-transform duration-150"
          href="/"
        >
          <span>Ayesha Naaz</span>
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-secondary hover:text-on-surface text-[15px] font-semibold transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Action & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <a
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-on-surface text-surface-container-lowest text-sm hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-sm active:scale-95 font-bold"
            href="/#contact"
          >
            Contact
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-surface-container-highest px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-secondary hover:text-on-surface font-label-md text-base py-2 transition-colors border-b border-surface-container-highest"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-3 py-2.5 rounded-full bg-on-surface text-surface-container-lowest font-bold text-sm shadow-sm"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
