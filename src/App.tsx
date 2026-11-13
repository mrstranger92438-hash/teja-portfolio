import { useCallback, useState } from 'react';
import AboutSection from './components/AboutSection';
import BackToTop from './components/BackToTop';
import ContactSection from './components/ContactSection';
import EducationSection from './components/EducationSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import IntroSequence from './components/IntroSequence';
import Navbar from './components/Navbar';
import ParticleBackdrop from './components/ParticleBackdrop';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import SkillsSection from './components/SkillsSection';

export default function App() {
  const [introVisible, setIntroVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const handleIntroComplete = useCallback(() => {
    setIntroVisible(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIntroVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#111827] text-white">
      <IntroSequence visible={introVisible} onComplete={handleIntroComplete} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-[#8B5CF6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <ParticleBackdrop introReady={!introVisible} />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection introReady={!introVisible} />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer onReplayIntro={handleReplayIntro} />
      <BackToTop />
    </div>
  );
}
