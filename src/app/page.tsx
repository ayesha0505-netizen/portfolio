import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Top Shared Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 3. Technical Stack / Skills Bento Matrix */}
        <Skills />

        {/* 4. System Logs & Other Repositories (Projects) */}
        <Projects />

        {/* 5. Verified Certifications & Credentials */}
        <Certifications />

        {/* 6. Statement Contact Section */}
        <Contact />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
