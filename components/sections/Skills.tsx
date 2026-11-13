"use client";

import React, { useState } from "react";
import {
  Terminal,
  Monitor,
  Smartphone,
  Server,
  Database,
  Wrench,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type ProficiencyLevel = "comfortable" | "basic" | "learning";

export interface SkillItem {
  name: string;
  level: ProficiencyLevel;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
  tier: "primary" | "secondary" | "foundation";
  tierLabel: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  // ── GROUP 1: PRIMARY DEVELOPMENT FOCUS (Web & Mobile) ──
  {
    id: "languages",
    number: "01",
    title: "Languages",
    icon: Terminal,
    description: "Core programming and scripting languages for web structure, styling, and algorithmic logic.",
    tier: "primary",
    tierLabel: "Core Focus",
    skills: [
      { name: "HTML5", level: "comfortable" },
      { name: "CSS3", level: "comfortable" },
      { name: "JavaScript", level: "comfortable" },
      { name: "TypeScript", level: "basic" },
      { name: "Python", level: "basic" },
      { name: "C", level: "basic" },
      { name: "Java", level: "learning" },
    ],
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend Development",
    icon: Monitor,
    description: "Modern component-driven web interfaces, responsive styling, and state management.",
    tier: "primary",
    tierLabel: "Core Focus",
    skills: [
      { name: "React.js", level: "basic" },
      { name: "Next.js", level: "basic" },
      { name: "Tailwind CSS", level: "basic" },
      { name: "shadcn/ui", level: "basic" },
      { name: "Redux Toolkit", level: "learning" },
    ],
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile Development",
    icon: Smartphone,
    description: "Cross-platform mobile apps for Android and iOS using the React Native ecosystem.",
    tier: "primary",
    tierLabel: "Core Focus",
    skills: [
      { name: "React Native", level: "basic" },
      { name: "Expo", level: "basic" },
      { name: "React Navigation", level: "basic" },
      { name: "AsyncStorage", level: "basic" },
    ],
  },

  // ── GROUP 2: EXPANDING STACK & INFRASTRUCTURE ──
  {
    id: "backend",
    number: "04",
    title: "Backend & APIs",
    icon: Server,
    description: "Server-side integration, HTTP communications, authentication, and backend services.",
    tier: "secondary",
    tierLabel: "Expanding Stack",
    skills: [
      { name: "Node.js", level: "basic" },
      { name: "REST APIs", level: "basic" },
      { name: "Authentication", level: "basic" },
      { name: "Spring Boot", level: "learning" },
    ],
  },
  {
    id: "database",
    number: "05",
    title: "Database",
    icon: Database,
    description: "Relational data querying, schema modeling, ORMs, and cloud-hosted data stores.",
    tier: "secondary",
    tierLabel: "Expanding Stack",
    skills: [
      { name: "MySQL", level: "comfortable" },
      { name: "SQL", level: "comfortable" },
      { name: "Prisma ORM", level: "basic" },
      { name: "Firebase", level: "basic" },
    ],
  },
  {
    id: "tools",
    number: "06",
    title: "Tools & Deployment",
    icon: Wrench,
    description: "Version control, modern developer environments, build tools, and design handoff.",
    tier: "secondary",
    tierLabel: "Expanding Stack",
    skills: [
      { name: "VS Code", level: "comfortable" },
      { name: "Vercel", level: "comfortable" },
      { name: "Git", level: "basic" },
      { name: "GitHub", level: "basic" },
      { name: "Docker", level: "basic" },
      { name: "Figma", level: "basic" },
    ],
  },

  // ── GROUP 3: ACADEMIC & ENGINEERING BEDROCK ──
  {
    id: "cs",
    number: "07",
    title: "Computer Science",
    icon: Cpu,
    description: "Core computer science theory, systems architecture, problem solving, and algorithmic theory.",
    tier: "foundation",
    tierLabel: "Academic Bedrock",
    skills: [
      { name: "OOP", level: "basic" },
      { name: "DBMS", level: "basic" },
      { name: "Operating Systems", level: "basic" },
      { name: "Computer Networks", level: "basic" },
      { name: "DSA", level: "learning" },
    ],
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-20 bg-surface" id="skills">
      {/* Anchor for #expertise nav link */}
      <div id="expertise" className="relative -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ================= Header ================= */}
        <div className="max-w-2xl mb-8">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-error-container text-primary font-bold text-[11px] tracking-wider mb-2.5">
            TECHNICAL SKILLS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mb-2">
            Technologies I Work With
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            A structured breakdown of my core technical stack as an undergraduate IT student—focused primarily on Web &amp; Mobile Development, with backend services, databases, and core foundations as active expansion areas.
          </p>
        </div>

        {/* ================= Single Unified Box Matrix ================= */}
        <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-xs overflow-hidden">
          
          {/* Box Header Toolbar & Legend */}
          <div className="px-5 py-3 sm:px-6 sm:py-3.5 bg-surface-container-low/60 border-b border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs text-secondary">
            <div className="flex items-center gap-2 font-mono font-semibold text-on-surface tracking-wide uppercase text-[10.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c]" />
              <span>35 Core Technologies Across 7 Domains</span>
            </div>

            {/* Proficiency Legend */}
            <div className="flex flex-wrap items-center gap-3.5 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-on-surface">Comfortable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span className="font-medium text-on-surface">Basic Knowledge</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="font-medium text-on-surface">Currently Learning</span>
              </div>
            </div>
          </div>

          {/* Box Body: Unified Categorized Rows */}
          <div className="divide-y divide-surface-container-highest/70">
            {skillCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  className="px-5 py-4 sm:px-6 sm:py-4.5 hover:bg-surface-container-low/30 transition-colors duration-150 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start lg:items-center">
                    
                    {/* Left Column: Category Info with Clean Indexing */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        {/* Domain Icon */}
                        <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-[#d4252c] group-hover:bg-[#d4252c] group-hover:text-white transition-colors duration-200 shrink-0 mt-0.5 shadow-2xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Title, Number & Badge */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono font-bold text-[#d4252c]">
                              {category.number}
                            </span>
                            <h3 className="text-sm font-semibold text-on-surface leading-tight">
                              {category.title}
                            </h3>
                            <span
                              className={`text-[9.5px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                                category.tier === "primary"
                                  ? "bg-red-50 text-[#d4252c] border-red-200/80"
                                  : category.tier === "secondary"
                                  ? "bg-slate-100 text-slate-700 border-slate-200"
                                  : "bg-indigo-50 text-indigo-700 border-indigo-200/80"
                              }`}
                            >
                              {category.tierLabel}
                            </span>
                          </div>

                          <p className="text-[11.5px] text-secondary mt-1 leading-snug">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Skills Pills */}
                    <div className="lg:col-span-8">
                      <div className="flex flex-wrap gap-1.5 pt-1 lg:pt-0">
                        {category.skills.map((skill) => {
                          const isHovered = activeSkill === skill.name;
                          const isLearning = skill.level === "learning";
                          const isComfortable = skill.level === "comfortable";

                          return (
                            <span
                              key={skill.name}
                              onMouseEnter={() => setActiveSkill(skill.name)}
                              onMouseLeave={() => setActiveSkill(null)}
                              className={`px-2.5 py-1 rounded-full text-xs font-normal transition-all duration-150 cursor-pointer select-none border inline-flex items-center gap-1.5 ${
                                isHovered
                                  ? "bg-surface-container-lowest border-[#d4252c] text-[#d4252c] scale-105 shadow-2xs"
                                  : isLearning
                                  ? "bg-amber-50/80 border-amber-200/80 text-amber-900 hover:border-[#d4252c] hover:text-[#d4252c]"
                                  : isComfortable
                                  ? "bg-emerald-50/80 border-emerald-200/80 text-emerald-900 hover:border-[#d4252c] hover:text-[#d4252c]"
                                  : "bg-surface-container-low border-surface-container-highest/60 text-on-surface hover:bg-surface-container-lowest hover:border-[#d4252c] hover:text-[#d4252c]"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  isComfortable
                                    ? "bg-emerald-500"
                                    : isLearning
                                    ? "bg-amber-500"
                                    : "bg-sky-500"
                                }`}
                              />
                              <span>{skill.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Box Footer Note */}
          <div className="px-5 py-2.5 sm:px-6 bg-surface-container-low/40 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-secondary gap-1.5">
            <span>
              Undergraduate Information Technology curriculum &amp; practical projects.
            </span>
            <span className="text-[10.5px] text-secondary/70">
              Hover over any technology for focus highlight
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
