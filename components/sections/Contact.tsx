"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowUpRight, Code2, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section
      className="relative bg-on-background text-surface-container-lowest overflow-hidden pt-20 pb-28"
      id="contact"
    >
      {/* Giant Architectural Background Statement Typography */}
      <div className="absolute inset-x-0 top-6 pointer-events-none select-none flex justify-center opacity-10">
        <span className="text-[130px] md:text-[240px] font-black tracking-tighter uppercase leading-none text-white whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-primary-fixed font-label-xs text-label-xs mb-3 font-bold tracking-wider">
            GET IN TOUCH
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white tracking-tight text-3xl md:text-4xl font-extrabold">
            Let&apos;s Build Something Meaningful
          </h2>
          <p className="font-body-md text-body-md text-surface-variant max-w-lg mx-auto mt-2">
            Have an idea or a project in mind? I&apos;d love to connect and build something meaningful.
          </p>

          {/* Direct Contact Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <a
              href="mailto:ayeshait889@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label-md text-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>ayeshait889@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ayesha-naaz-11296333a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label-md text-xs transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/ayesha0505-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label-md text-xs transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Overlapping Crimson Contact Card Container */}
        <div className="bg-primary-container rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/20 mb-8 gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-white" />
              <span className="font-headline-md text-headline-md text-white font-bold tracking-tight">
                SEND A MESSAGE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-label-md text-label-md text-white/90">
                Open to Internships &amp; Collaboration
              </span>
            </div>
          </div>

          {isSuccess ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center text-white space-y-4 border border-white/20 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-white text-primary-container mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-9 h-9 text-primary-container" />
              </div>
              <h3 className="font-headline-md text-2xl font-bold">Message Sent!</h3>
              <p className="font-body-md text-white/90 max-w-md mx-auto">
                Thank you for reaching out. I&apos;ve received your message and will respond to your email promptly.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-on-background text-white font-label-md text-label-md hover:bg-white hover:text-primary-container transition-colors shadow-md font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-md text-label-md text-white mb-2 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white text-on-surface border-0 focus:ring-2 focus:ring-on-background placeholder:text-secondary font-body-md text-body-md shadow-inner transition-shadow"
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-white mb-2 font-semibold">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white text-on-surface border-0 focus:ring-2 focus:ring-on-background placeholder:text-secondary font-body-md text-body-md shadow-inner transition-shadow"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-label-md text-label-md text-white mb-2 font-semibold">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your thoughts, opportunity, or project idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white text-on-surface border-0 focus:ring-2 focus:ring-on-background placeholder:text-secondary font-body-md text-body-md shadow-inner transition-shadow resize-y"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-white/80 font-body-sm text-xs">
                  <span>Direct message will be sent to my inbox</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-on-background text-white font-label-md text-label-md hover:bg-surface-container-lowest hover:text-primary-container transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
