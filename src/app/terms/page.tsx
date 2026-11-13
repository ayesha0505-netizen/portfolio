import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import {
  FileText,
  ArrowLeft,
  Mail,
  Scale,
  Code2,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Shield,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Ayesha Naaz | Aspiring Software Developer",
  description:
    "Terms of Service for Ayesha Naaz's personal portfolio website. Details terms of use, intellectual property, open-source code attribution, and acceptable use.",
};

export default function TermsOfServicePage() {
  const sections = [
    {
      number: "01",
      title: "Acceptance of Terms",
      icon: Scale,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            By accessing or browsing this personal portfolio website (<strong>ayesha-naaz.vercel.app</strong>), you agree
            to be bound by these Terms of Service and all applicable local, national, and international laws and
            regulations.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            If you do not agree with any of these terms, you are prohibited from using or accessing this site. These
            terms apply to all visitors, recruiters, collaborators, and users who view or interact with this website.
          </p>
        </>
      ),
    },
    {
      number: "02",
      title: "Nature & Purpose of the Website",
      icon: HelpCircle,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            This website is a non-commercial, personal academic and engineering portfolio operated by{" "}
            <strong className="text-on-surface">Ayesha Naaz</strong>, an undergraduate student pursuing a Bachelor of
            Technology (B.Tech) in Information Technology at Narula Institute of Technology.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            The primary intent of this website is to provide an accurate, transparent overview of my current software
            development competencies, academic coursework, verified certifications, and hands-on coding projects for
            internship and career opportunities.
          </p>
        </>
      ),
    },
    {
      number: "03",
      title: "Intellectual Property & Open-Source Code",
      icon: Code2,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            Intellectual property on this website is governed by the following guidelines:
          </p>
          <div className="space-y-3">
            <div className="bg-surface-container-low/70 rounded-xl p-4 border border-surface-container-highest/60">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#d4252c]" />
                <span>Open-Source Repositories</span>
              </h4>
              <p className="text-secondary leading-relaxed text-xs">
                Code repositories linked on GitHub (such as Pathly, NexCure, and other open projects) are subject to
                their respective open-source licenses (such as the MIT License or Apache 2.0). Visitors are free to
                inspect, fork, and study these projects in accordance with their individual repository license terms.
              </p>
            </div>
            <div className="bg-surface-container-low/70 rounded-xl p-4 border border-surface-container-highest/60">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#d4252c]" />
                <span>Original Content &amp; Media</span>
              </h4>
              <p className="text-secondary leading-relaxed text-xs">
                All original portfolio design elements, personal photographs, project writeups, curriculum descriptions,
                and custom branding are the intellectual property of Ayesha Naaz, unless otherwise credited.
                Unauthorized commercial reproduction or impersonation is prohibited.
              </p>
            </div>
            <div className="bg-surface-container-low/70 rounded-xl p-4 border border-surface-container-highest/60">
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#d4252c]" />
                <span>Third-Party Trademarks</span>
              </h4>
              <p className="text-secondary leading-relaxed text-xs">
                All third-party trademarks, technology logos (e.g., React, Next.js, TypeScript, Docker, Figma), and
                institutional emblems displayed belong to their respective copyright holders and are referenced under fair
                nominative use to illustrate technical proficiency.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      number: "04",
      title: "Acceptable Use & Conduct",
      icon: Shield,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            When browsing this website and using the interactive contact form, you agree to:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-secondary mb-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Use the website solely for lawful, professional, and educational purposes.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Submit honest, respectful messages and legitimate inquiries through the contact form.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c] shrink-0 mt-1.5" />
              <span>
                Refrain from sending automated spam, unsolicited commercial advertisements, phishing links, or abusive
                content.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c] shrink-0 mt-1.5" />
              <span>
                Not attempt to compromise site infrastructure, probe endpoints for vulnerabilities, conduct DDoS
                attacks, or bypass security barriers.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      number: "05",
      title: "Disclaimer of Warranties",
      icon: AlertTriangle,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            The software projects, live demonstrations, prototypes, and code samples featured on this website are
            provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranty of any kind, either express or
            implied.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            While I strive to keep all information, project links, and certificate verifications current and accurate, I
            make no warranties regarding the absolute completeness, uninterrupted availability, or total absence of
            technical bugs in personal showcase applications.
          </p>
        </>
      ),
    },
    {
      number: "06",
      title: "External Links & Third-Party Platforms",
      icon: ExternalLink,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            This portfolio provides hyperlinks to external web resources, including GitHub repositories, LinkedIn
            profiles, and cloud storage providers.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            These external links are provided for verification and demonstration purposes only. Ayesha Naaz does not
            exercise editorial control over third-party websites and is not liable for their content, uptime, or privacy
            practices.
          </p>
        </>
      ),
    },
    {
      number: "07",
      title: "Modifications to Terms",
      icon: FileText,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            I reserve the right to revise, modify, or update these Terms of Service at any time as the portfolio
            evolves with new projects, technical credentials, or architecture changes.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            Your continued use of the website following any posted updates constitutes acceptance of the modified terms.
            The date of the most recent revision will always be displayed at the top of this document.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Shared Navbar */}
      <Navbar />

      <main className="flex-1 w-full py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Navigation Back Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-[#d4252c] transition-colors py-1 px-2.5 rounded-full hover:bg-surface-container"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10 pb-6 border-b border-surface-container-highest">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-50 text-[#d4252c] border border-red-200/80 mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
                LEGAL &amp; COMPLIANCE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              Terms of Service
            </h1>
            <p className="text-secondary text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Guidelines and terms governing the use of this personal developer portfolio, open-source code
              repositories, and direct communication channels.
            </p>
            <div className="mt-3 text-[11px] text-secondary font-mono">
              Last Updated: November 2026 • Kolkata, India
            </div>
          </div>

          {/* Quick Summary Pill Box */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 mb-8 shadow-sm">
            <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Terms Summary at a Glance</span>
            </h2>
            <p className="text-secondary text-xs leading-relaxed">
              This website is an educational and professional showcase of my work as an Information Technology student.
              Code repositories on GitHub follow open-source licensing; original site content and photography are
              protected; and visitors agree to interact lawfully and respectfully.
            </p>
          </div>

          {/* Main Sections Stack */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.number}
                  className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-6 sm:p-7 shadow-xs hover:border-[#d4252c]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-[#d4252c] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#d4252c] mr-2">
                        {section.number}
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-on-surface inline">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <div>{section.content}</div>
                </div>
              );
            })}
          </div>

          {/* Contact Box */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-on-background text-surface-container-lowest border border-surface-container-highest/20 shadow-lg">
            <h3 className="text-base sm:text-lg font-bold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Questions Regarding These Terms?</span>
            </h3>
            <p className="text-surface-variant text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
              If you have any questions or inquiries regarding these Terms of Service or my projects, feel free to get in
              touch:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:ayeshait889@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#a60122] text-xs font-bold hover:bg-white/90 transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ayeshait889@gmail.com</span>
              </a>
              <a
                href="https://github.com/ayesha0505-netizen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <span>GitHub Repositories</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
