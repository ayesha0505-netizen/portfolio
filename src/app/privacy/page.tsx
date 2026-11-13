import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import {
  ShieldCheck,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  Server,
  FileText,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Ayesha Naaz | Aspiring Software Developer",
  description:
    "Privacy Policy for Ayesha Naaz's personal portfolio website. Learn how information provided through the contact form is handled with care and transparency.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      number: "01",
      title: "Overview & Purpose",
      icon: ShieldCheck,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            This personal portfolio website (<strong>ayesha-naaz.vercel.app</strong>) is owned and operated by{" "}
            <strong className="text-on-surface">Ayesha Naaz</strong>, an undergraduate Information Technology student
            at Narula Institute of Technology. The primary purpose of this website is to showcase software engineering
            projects, technical competencies, verified certifications, and learning milestones to recruiters,
            collaborators, and peers.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            I am committed to respecting your privacy. This policy outlines what minimal information is collected when
            you visit or interact with this portfolio, and how that information is handled with complete transparency.
          </p>
        </>
      ),
    },
    {
      number: "02",
      title: "Information Collected & Contact Submissions",
      icon: Eye,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            This portfolio is primarily an informational, static showcase. You can explore all projects, skill
            matrices, and credentials without creating an account or providing any personal information.
          </p>
          <div className="bg-surface-container-low/70 rounded-xl p-4 border border-surface-container-highest/60 mb-3">
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#d4252c]" />
              <span>Contact Form Submissions</span>
            </h4>
            <p className="text-secondary leading-relaxed text-xs">
              When you voluntarily submit a message through the &ldquo;Get in Touch&rdquo; form, the following details
              are collected:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-secondary">
              <li>
                <strong className="text-on-surface">Your Name:</strong> To address you personally in my reply.
              </li>
              <li>
                <strong className="text-on-surface">Your Email Address:</strong> To respond directly to your inquiry or
                collaboration offer.
              </li>
              <li>
                <strong className="text-on-surface">Your Message Content:</strong> To review your question, project
                opportunity, or feedback.
              </li>
            </ul>
          </div>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            I do not collect sensitive personal data, payment information, or precise geolocation.
          </p>
        </>
      ),
    },
    {
      number: "03",
      title: "How Your Information Is Used",
      icon: Server,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            Any information you provide via the contact form is used strictly and exclusively for:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            {[
              "Direct correspondence regarding work or internship opportunities",
              "Discussing collaborative software development projects",
              "Responding to technical questions or portfolio inquiries",
              "Never used for advertising, spam, or promotional newsletters",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest/50 text-xs text-on-surface"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            <strong className="text-on-surface">Zero Sale of Data:</strong> I will never sell, rent, monetize, or trade
            your personal details to third parties, brokers, or marketing organizations under any circumstances.
          </p>
        </>
      ),
    },
    {
      number: "04",
      title: "Cookies, Analytics & Local Storage",
      icon: Lock,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            I prioritize a lightweight, privacy-first browsing experience:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-secondary">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c] shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">No Tracking Cookies:</strong> This website does not place third-party
                advertising cookies, behavioral trackers, or remarketing scripts on your device.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c] shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">Client-Side Local Storage:</strong> The website may utilize browser
                local storage exclusively to cache public certificates or maintain UI preferences across sessions. No
                personally identifiable tracking occurs through this storage.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4252c] shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">Hosting Telemetry:</strong> Like most web hosting platforms, our
                hosting provider (Vercel) may log standard technical connection metadata (such as IP addresses and user
                agents) for system diagnostics, server performance, and DDoS prevention.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      number: "05",
      title: "Third-Party Links & Services",
      icon: ExternalLink,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            My portfolio includes links to external third-party platforms to verify code repositories, social profiles,
            and credentials:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-secondary mb-3">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">GitHub:</strong> Links to open-source project repositories and
                source code (
                <a
                  href="https://github.com/ayesha0505-netizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4252c] hover:underline inline-flex items-center gap-0.5"
                >
                  github.com/ayesha0505-netizen
                </a>
                ).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">LinkedIn:</strong> Professional networking and career profile (
                <a
                  href="https://www.linkedin.com/in/ayesha-naaz-11296333a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4252c] hover:underline inline-flex items-center gap-0.5"
                >
                  linkedin.com/in/ayesha-naaz-11296333a
                </a>
                ).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
              <span>
                <strong className="text-on-surface">Google Drive / Cloud Platforms:</strong> Used for hosting verified
                certificate images.
              </span>
            </li>
          </ul>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            Please note that these external websites operate under their own independent privacy policies and terms. I
            encourage you to review their policies when visiting them.
          </p>
        </>
      ),
    },
    {
      number: "06",
      title: "Data Retention & Security",
      icon: FileText,
      content: (
        <>
          <p className="text-secondary leading-relaxed mb-3 text-xs sm:text-sm">
            I implement reasonable administrative and technical safeguards to protect any correspondence sent through
            this website against unauthorized access or disclosure.
          </p>
          <p className="text-secondary leading-relaxed text-xs sm:text-sm">
            Inquiry emails are retained only for as long as necessary to conduct ongoing professional communication,
            complete collaborative work, or meet standard administrative requirements. You may request the deletion of
            past email correspondence at any time by sending a message to{" "}
            <a href="mailto:ayeshait889@gmail.com" className="text-[#d4252c] font-semibold hover:underline">
              ayeshait889@gmail.com
            </a>
            .
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
                LEGAL &amp; PRIVACY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
              Privacy Policy
            </h1>
            <p className="text-secondary text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Transparency regarding how your information is handled when visiting this developer portfolio and
              interacting via direct contact channels.
            </p>
            <div className="mt-3 text-[11px] text-secondary font-mono">
              Last Updated: November 2026 • Kolkata, India
            </div>
          </div>

          {/* Quick Summary Pill Box */}
          <div className="bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-5 mb-8 shadow-sm">
            <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Privacy Summary at a Glance</span>
            </h2>
            <p className="text-secondary text-xs leading-relaxed">
              This is a personal developer portfolio. I do not track you across the web, run ads, or sell your data.
              Information you submit in the contact form is solely used to reply to your messages and discuss
              professional opportunities.
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
              <span>Questions or Privacy Requests?</span>
            </h3>
            <p className="text-surface-variant text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
              If you have any questions about this Privacy Policy, your data, or would like your correspondence removed,
              please reach out directly:
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
                href="https://www.linkedin.com/in/ayesha-naaz-11296333a"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <span>LinkedIn Profile</span>
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
