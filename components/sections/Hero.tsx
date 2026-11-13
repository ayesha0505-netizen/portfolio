"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, GraduationCap, Code2 } from "lucide-react";

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

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded-full bg-white text-[#a60122] font-bold text-xs sm:text-sm hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <span>View My Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-transparent border-2 border-white text-white font-bold text-xs sm:text-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact Me
            </a>
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
