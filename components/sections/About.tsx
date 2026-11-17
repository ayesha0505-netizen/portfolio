"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Terminal, Code2, GraduationCap, User } from "lucide-react";

function parseDriveOrCloudUrl(url?: string): string {
  if (!url || !url.trim()) return "/images/profile.jpg";
  const trimmed = url.trim();
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
  }
  return trimmed;
}

export default function About() {
  const [imgError, setImgError] = useState(false);
  const profileSrc = parseDriveOrCloudUrl(process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL);
  return (
    <section
      className="relative pt-20 pb-28 md:pt-28 md:pb-36 bg-[#a60122] text-white overflow-hidden"
      id="about"
    >
      {/* Subtle Decorative Background Circles matching visual identity */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 w-[32rem] h-[32rem] rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: Typography & Content ================= */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] text-white tracking-wider uppercase font-bold">
                01 / ABOUT ME
              </span>
            </div>

            {/* Main & Highlighted Headings */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                More than just writing code.
              </h2>
              <span className="block text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                I love building things that matter.
              </span>
            </div>

            {/* Description Paragraphs - Authentic student developer voice */}
            <div className="space-y-3 pt-1 text-white/90 text-sm sm:text-[15px] leading-relaxed max-w-xl">
              <p className="font-normal">
                I&apos;m <strong className="text-white font-bold">Ayesha Naaz</strong>, an undergraduate Information Technology student at Narula Institute of Technology. I&apos;m interested in web and mobile application development, with a focus on JavaScript, TypeScript, React, and Next.js.
              </p>
              <p className="text-white/85">
                I enjoy creating practical projects, developing responsive user interfaces, and learning how applications work. I&apos;m currently exploring React Native and Java while strengthening my software development fundamentals.
              </p>
            </div>

            {/* Education Highlight Card */}
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white w-full max-w-xl">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Narula Institute of Technology</p>
                <p className="text-[11px] text-white/80">B.Tech in Information Technology • Undergraduate Student</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#contact"
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.pushState(null, "", "#contact");
                  }
                }}
                className="px-6 py-2.5 rounded-full bg-white text-[#a60122] text-xs sm:text-sm font-bold hover:bg-white/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#certifications"
                className="px-6 py-2.5 rounded-full border-2 border-white/80 text-white text-xs sm:text-sm font-bold hover:bg-white hover:text-[#a60122] transition-all duration-200 active:scale-95"
              >
                My Journey
              </a>
            </div>

            {/* Mini Live Status Indicator */}
            <div className="pt-5 flex flex-wrap items-center gap-5 text-white/80 border-t border-white/15 w-full text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-white" />
                <span>IT Student &amp; Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-white" />
                <span>Building Web &amp; Mobile Apps</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Tilted Photo Card Visual ================= */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* Angle Tilt Outer Frame matching reference image */}
            <div className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-2xl p-3 bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              
              {/* Internal Image Frame with Red Border */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900 border-4 border-[#d4252c] shadow-inner flex items-center justify-center">
                {!imgError ? (
                  <Image
                    src={profileSrc}
                    alt="Ayesha Naaz - Aspiring Software Developer"
                    fill
                    className="w-full h-full object-cover object-top"
                    sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, 384px"
                    priority
                    unoptimized={profileSrc.startsWith("http")}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#80011a] to-[#40000d] text-white p-6 text-center select-none">
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mb-3 shadow-lg">
                      <User className="w-10 h-10 text-white/90" />
                    </div>
                    <span className="font-bold text-lg text-white">Ayesha Naaz</span>
                    <span className="text-xs text-white/70 mt-1">Aspiring Software Developer</span>
                  </div>
                )}
              </div>

              {/* Floating Tech Badge 1: React.js (Top Left) */}
              <div className="absolute -top-3 -left-5 bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 flex items-center gap-1.5 z-20 hover:scale-105 transition-transform duration-200">
                <Code2 className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-bold text-slate-900">React.js</span>
              </div>

              {/* Floating Tech Badge 2: JavaScript (Bottom Right) */}
              <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-1.5 z-20 hover:scale-105 transition-transform duration-200">
                <Terminal className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-900">JavaScript</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Organic Wave Divider transitioning smoothly to light surface canvas */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-12 md:h-20 text-[#f9f9ff]"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,48C1200,64,1320,96,1380,112L1440,128L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
