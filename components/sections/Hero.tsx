"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, ArrowUpRight, GraduationCap, Code2 } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If it has already played, ensure it stays stopped at the start frame
    if (hasStartedRef.current) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Initialize video ready with audio (strictly no loop)
    video.loop = false;
    video.volume = 1.0;
    video.muted = false;

    // Start video with audio once on user gesture (click anywhere or scroll)
    const startVideoWithAudio = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      cleanup();

      video.muted = false;
      video.volume = 1.0;
      video.loop = false;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricted sound on scroll event, fallback to play and unmute on tap
          video.muted = true;
          video.play().catch(() => {});

          const clickToUnmute = () => {
            if (!hasCompletedRef.current) {
              video.muted = false;
              video.volume = 1.0;
            }
            window.removeEventListener("pointerdown", clickToUnmute);
            window.removeEventListener("click", clickToUnmute);
          };
          window.addEventListener("pointerdown", clickToUnmute, { once: true });
          window.addEventListener("click", clickToUnmute, { once: true });
        });
      }
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", startVideoWithAudio);
      window.removeEventListener("click", startVideoWithAudio);
      window.removeEventListener("touchstart", startVideoWithAudio);
      window.removeEventListener("scroll", startVideoWithAudio);
      window.removeEventListener("wheel", startVideoWithAudio);
      window.removeEventListener("keydown", startVideoWithAudio);
    };

    // Attach listeners for single trigger
    window.addEventListener("pointerdown", startVideoWithAudio, { passive: true });
    window.addEventListener("click", startVideoWithAudio, { passive: true });
    window.addEventListener("touchstart", startVideoWithAudio, { passive: true });
    window.addEventListener("scroll", startVideoWithAudio, { passive: true });
    window.addEventListener("wheel", startVideoWithAudio, { passive: true });
    window.addEventListener("keydown", startVideoWithAudio, { passive: true });

    return () => {
      cleanup();
    };
  }, []);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      hasCompletedRef.current = true;
      video.pause();
      video.currentTime = 0; // Reset to start frame
      video.muted = true; // Mute so audio never plays again
    }
  };

  const handlePlay = () => {
    // If it has already completed its one-time play, prevent any replay
    const video = videoRef.current;
    if (hasCompletedRef.current && video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
      if (id === "contact") {
        setTimeout(() => {
          const input = element.querySelector<HTMLInputElement>("input[type='text'], textarea");
          input?.focus({ preventScroll: true });
        }, 600);
      }
    } else {
      window.location.hash = id;
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[calc(100dvh-48px)] flex items-center overflow-hidden bg-[#a60122]"
    >
      {/* Video Background Layer - Preserves native aspect ratio, right-aligned, positioned lower so head is never cut from top */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex justify-end items-end">
        <video
          ref={videoRef}
          className="h-full w-auto max-w-none aspect-video object-contain object-right-bottom translate-y-3 sm:translate-y-5 md:translate-y-6"
          src="/videos/hero-intro.mp4"
          playsInline
          loop={false}
          preload="auto"
          onEnded={handleVideoEnded}
          onPlay={handlePlay}
        />
        {/* Seamless blend gradient on the left side to guarantee pure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#a60122] via-[#a60122]/90 to-transparent w-full lg:w-3/5 z-10" />
        {/* Soft top gradient to ensure smooth transition below navbar */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#a60122] to-transparent z-10" />
        {/* Soft bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#a60122] via-[#a60122]/60 to-transparent z-10" />
      </div>

      {/* Hero Content - Formatted with personal identity and authentic student developer voice */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-0 max-w-7xl mx-auto flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] text-white tracking-wider uppercase font-bold">
              Learning. Building. Growing.
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-sm font-headline-lg">
            Hi, I&apos;m Ayesha Naaz
            <span className="block text-white font-extrabold mt-1.5 sm:mt-2 text-2xl sm:text-3xl md:text-4xl">
              Aspiring Software Developer
            </span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed mt-4 max-w-xl drop-shadow-sm">
            I&apos;m an Information Technology student passionate about building web and mobile applications. I work with JavaScript, TypeScript, React, and Next.js, and I&apos;m exploring React Native and Java. I enjoy learning through hands-on projects, solving problems, and turning ideas into functional applications.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            <a
              href="#projects"
              onClick={handleScrollTo("projects")}
              className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#a60122] font-semibold text-xs border border-white hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span className="tracking-wide">View My Work</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>

            <a
              href="#contact"
              onClick={handleScrollTo("contact")}
              className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-transparent border border-white text-white font-semibold text-xs hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span className="tracking-wide">Contact Me</span>
            </a>

            {/* Subtle Divider (Desktop) */}
            <div className="hidden sm:block h-5 w-px bg-white/25" />

            {/* LinkedIn & GitHub Profile Links - Small Theme-Matching Glass Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/in/ayesha-naaz-11296333a"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile — Ayesha Naaz"
                aria-label="Open LinkedIn Profile in a new tab"
                className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/25 hover:border-white/50 text-white font-semibold text-xs backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LinkedInIcon className="w-3.5 h-3.5 fill-current text-white/90 group-hover:text-white transition-colors" />
                <span className="tracking-wide">LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>

              <a
                href="https://github.com/ayesha0505-netizen"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile — ayesha0505-netizen"
                aria-label="Open GitHub Profile in a new tab"
                className="group inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/25 hover:border-white/50 text-white font-semibold text-xs backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <GitHubIcon className="w-3.5 h-3.5 fill-current text-white/90 group-hover:text-white transition-colors" />
                <span className="tracking-wide">GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </div>

          {/* Mini Live Status Indicator */}
          <div className="pt-5 flex flex-wrap items-center gap-5 text-white/80 border-t border-white/15 w-full mt-6 text-xs">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>Narula Institute of Technology (IT)</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-white" />
              <span>Web &amp; Mobile Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
