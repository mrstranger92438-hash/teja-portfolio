import { Github, Globe, Linkedin, Mail, RotateCcw } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

interface FooterProps {
  onReplayIntro?: () => void;
}

export default function Footer({ onReplayIntro }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/15 bg-[#0b1120]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="#home"
              className="font-display text-2xl font-extrabold tracking-tight text-white"
            >
              <span>{PROFILE.brandLogo.slice(0, -1)}</span>
              <span className="animated-gradient-text">.</span>
            </a>
            <p className="mt-1.5 text-sm text-slate-300">
              {PROFILE.name} · B.Tech CSE, JOY University
            </p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-1 inline-block text-xs text-[#06B6D4] hover:underline"
            >
              {PROFILE.email}
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer Navigation">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 transition-all hover:border-[#8B5CF6]/70 hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              aria-label="LinkedIn profile details"
              title="LinkedIn profile placeholder"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 transition-all hover:border-[#3B82F6]/70 hover:text-white"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email Koppula Tejesh"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 transition-all hover:border-[#EC4899]/70 hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              aria-label="Other social links"
              title="Social links placeholder"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 transition-all hover:border-[#06B6D4]/70 hover:text-white"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>&copy; {year} Koppula Tejesh. All rights reserved.</p>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-[#06B6D4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Replay Intro</span>
              </button>
            )}
          </div>
          <p className="font-medium text-white">
            Designed &amp; Developed with ❤️ by Koppula Tejesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
