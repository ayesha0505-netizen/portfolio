"use client";

import React, { useState } from "react";
import {
  Terminal,
  Layers,
  Database,
  Wrench,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export type ProficiencyLevel = "standard" | "learning";

export interface SkillItem {
  name: string;
  level?: ProficiencyLevel;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    number: "01",
    title: "Languages",
    icon: Terminal,
    description: "Core programming and scripting languages for frontend, backend, and algorithmic problem solving.",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Java", level: "learning" },
      { name: "Python" },
      { name: "C" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    id: "frameworks",
    number: "02",
    title: "Frameworks & Libraries",
    icon: Layers,
    description: "Modern component architectures, web & mobile app frameworks, and state management.",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "React Native" },
      { name: "Node.js" },
      { name: "Spring Boot", level: "learning" },
      { name: "Tailwind CSS" },
      { name: "Redux Toolkit", level: "learning" },
      { name: "shadcn/ui" },
      { name: "Expo" },
      { name: "React Navigation" },
      { name: "AsyncStorage" },
    ],
  },
  {
    id: "databases",
    number: "03",
    title: "Databases & ORMs",
    icon: Database,
    description: "Relational databases, SQL querying, schema modeling, ORMs, and cloud data platforms.",
    skills: [
      { name: "MySQL" },
      { name: "PostgreSQL" },
      { name: "Prisma ORM" },
      { name: "Firebase" },
    ],
  },
  {
    id: "tools",
    number: "04",
    title: "Tools & Platforms",
    icon: Wrench,
    description: "Version control, API testing, containerization, cloud deployment, and design tooling.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Postman" },
      { name: "Vercel" },
      { name: "Figma" },
      { name: "VS Code" },
    ],
  },
  {
    id: "cs",
    number: "05",
    title: "Computer Science & Architecture",
    icon: Cpu,
    description: "Core computer science fundamentals, systems architecture, secure protocols, and software design.",
    skills: [
      { name: "Data Structures & Algorithms (DSA)", level: "learning" },
      { name: "Object-Oriented Programming (OOP)" },
      { name: "DBMS" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "REST APIs" },
      { name: "Authentication" },
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
            A structured breakdown of my technical stack—organized by Languages, Frameworks, Databases, Developer Tools, and Computer Science foundations.
          </p>
        </div>

        {/* ================= Single Unified Box Matrix ================= */}
        <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl shadow-xs overflow-hidden">
          
          {/* Box Header Toolbar & Legend */}
          <div className="px-5 py-3 sm:px-6 sm:py-3.5 bg-surface-container-low/60 border-b border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs text-secondary">
            <div className="flex items-center gap-2 font-mono font-semibold text-on-surface tracking-wide uppercase text-[10.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c]" />
              <span>36 Technologies Across 5 Technical Categories</span>
            </div>

            {/* Proficiency Legend */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="font-medium text-on-surface">Currently Learning</span>
            </div>
          </div>

          {/* Box Body: Unified Categorized Rows */}
          <div className="divide-y divide-surface-container-highest/70">
            {skillCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  className="px-5 py-4 sm:px-6 sm:py-5 hover:bg-surface-container-low/30 transition-colors duration-150 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start lg:items-center">
                    
                    {/* Left Column: Category Info with Clean Indexing */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        {/* Domain Icon */}
                        <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-[#d4252c] group-hover:bg-[#d4252c] group-hover:text-white transition-colors duration-200 shrink-0 mt-0.5 shadow-2xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Title & Number */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold text-[#d4252c]">
                              {category.number}
                            </span>
                            <h3 className="text-sm font-semibold text-on-surface leading-tight">
                              {category.title}
                            </h3>
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

                          return (
                            <span
                              key={skill.name}
                              onMouseEnter={() => setActiveSkill(skill.name)}
                              onMouseLeave={() => setActiveSkill(null)}
                              className={`px-3 py-1 rounded-full text-xs font-normal transition-all duration-150 cursor-pointer select-none border inline-flex items-center gap-1.5 ${
                                isHovered
                                  ? "bg-surface-container-lowest border-[#d4252c] text-[#d4252c] scale-105 shadow-2xs"
                                  : isLearning
                                  ? "bg-amber-50/80 border-amber-200/80 text-amber-900 hover:border-[#d4252c] hover:text-[#d4252c]"
                                  : "bg-surface-container-low border-surface-container-highest/60 text-on-surface hover:bg-surface-container-lowest hover:border-[#d4252c] hover:text-[#d4252c]"
                              }`}
                            >
                              {isLearning && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              )}
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
