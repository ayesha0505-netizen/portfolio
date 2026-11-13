"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FolderGit2, ExternalLink, Code2, Filter, ChevronDown, Check } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contribution: string;
  highlights: string[];
  technologies: string[];
  techBadge: string;
  badgeClass: string;
  category: "all" | "platforms" | "frontend" | "interactive";
  statusText: string;
  statusType: "active" | "prototype" | "game" | "mini";
  image?: string;
  githubLink: string;
  liveDemo?: string;
}

// Currently kept empty as requested — add your authentic projects here when ready
const projects: Project[] = [];

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filterOptions = [
    { label: "All Projects", value: "all" },
    { label: "Web Platforms", value: "platforms" },
    { label: "Frontend & Roadmaps", value: "frontend" },
    { label: "Interactive & Games", value: "interactive" },
  ];

  return (
    <section
      className="py-20 bg-surface-container-low/60 border-y border-surface-container-highest/60 relative"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container text-secondary text-[11px] mb-2 font-bold tracking-wider">
              FEATURED PROJECTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              Projects I&apos;ve Built &amp; Contributed To
            </h2>
            <p className="text-xs sm:text-sm text-secondary mt-1 max-w-xl leading-relaxed">
              Authentic projects representing what I can currently build with Next.js, React, TypeScript, and modern web technologies.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 relative">
            {projects.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container-highest text-on-surface font-label-md text-label-md shadow-sm hover:border-[#d4252c] transition-colors"
                  type="button"
                  aria-expanded={isFilterOpen}
                >
                  <Filter className="w-4 h-4 text-primary" />
                  <span>Category Filter</span>
                  <ChevronDown className="w-4 h-4 text-secondary" />
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest border border-surface-container-highest rounded-xl shadow-xl py-2 z-30">
                    {filterOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setFilter(opt.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                          filter === opt.value
                            ? "bg-surface-container-low text-primary font-bold"
                            : "text-on-surface hover:bg-surface-container-low"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {filter === opt.value && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <a
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm active:scale-95 font-semibold"
              href="https://github.com/ayesha0505-netizen"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Empty State / Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-surface-container-lowest border-2 border-dashed border-surface-container-highest rounded-3xl p-12 md:p-16 text-center max-w-3xl mx-auto my-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center text-[#d4252c] mb-5 shadow-sm">
              <FolderGit2 className="w-8 h-8" />
            </div>
            <h3 className="font-title-sm text-xl text-on-surface font-bold mb-2">
              Curating Project Showcase
            </h3>
            <p className="font-body-md text-secondary max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
              Projects and repositories are currently being organized with clean documentation, live previews, and detailed contributions.
            </p>
            <a
              href="https://github.com/ayesha0505-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-surface-container-highest bg-surface-container-low text-on-surface hover:border-[#d4252c] hover:text-[#d4252c] font-label-md text-sm font-semibold transition-all duration-200"
            >
              <span>Explore Repositories on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-surface-container-lowest border border-surface-container-highest rounded-2xl overflow-hidden hover:border-[#d4252c] hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {project.image ? (
                    <div className="relative w-full h-44 overflow-hidden bg-surface-container border-b border-surface-container-highest">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#151c27]/85 backdrop-blur-md text-white border border-white/20 shadow-sm">
                          {project.statusText}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#d4252c]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${project.badgeClass}`}
                        >
                          {project.techBadge}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-secondary">
                        {project.statusText}
                      </span>
                    </div>
                  )}

                  <div className="p-5 pb-2">
                    {project.image && (
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[#d4252c]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${project.badgeClass}`}
                          >
                            {project.techBadge}
                          </span>
                        </div>
                      </div>
                    )}

                    <h3 className="font-title-sm text-base text-on-surface group-hover:text-primary transition-colors font-bold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-secondary mb-2.5">
                      {project.subtitle}
                    </p>

                    <p className="font-body-sm text-body-sm text-secondary mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="bg-surface-container-low/80 rounded-xl p-3 mb-4 border border-surface-container-highest/60">
                      <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider block mb-1">
                        My Contribution:
                      </span>
                      <p className="text-xs text-secondary leading-relaxed font-medium">
                        {project.contribution}
                      </p>
                    </div>

                    <ul className="space-y-1.5 mb-4 text-xs text-on-surface/90">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-primary font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1 mb-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-secondary text-[11px] font-medium border border-surface-container-highest"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-surface-container-high flex items-center justify-between text-secondary font-label-xs text-label-xs bg-surface-container-lowest">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-on-surface hover:text-primary transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-secondary" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3 text-secondary" />
                  </a>

                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-medium text-xs text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {project.statusText}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="font-body-sm text-body-sm italic text-tertiary">
            Hands-on projects focused on clean user experience, practical utility, and modern code practices.
          </p>
        </div>
      </div>
    </section>
  );
}
