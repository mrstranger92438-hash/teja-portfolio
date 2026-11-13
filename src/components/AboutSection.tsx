import {
  BookOpen,
  Code2,
  Compass,
  Globe,
  Layers,
  Lightbulb,
} from 'lucide-react';
import { ABOUT_HIGHLIGHTS, PROFILE } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const HIGHLIGHT_ICONS = [
  <Code2 key="0" className="h-5 w-5 text-[#8B5CF6]" aria-hidden="true" />,
  <Globe key="1" className="h-5 w-5 text-[#3B82F6]" aria-hidden="true" />,
  <Layers key="2" className="h-5 w-5 text-[#EC4899]" aria-hidden="true" />,
  <Lightbulb key="3" className="h-5 w-5 text-[#F97316]" aria-hidden="true" />,
  <BookOpen key="4" className="h-5 w-5 text-[#06B6D4]" aria-hidden="true" />,
  <Compass key="5" className="h-5 w-5 text-[#F97316]" aria-hidden="true" />,
];

export default function AboutSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold text-[#EC4899]">About Me</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Blending <span className="animated-gradient-text">Creativity</span> &amp; Software
            Engineering
          </h2>

          <div className="creative-glass mt-6 rounded-2xl border border-white/15 bg-gradient-to-br from-[#8B5CF6]/15 via-[#111827]/75 to-[#06B6D4]/15 p-6">
            <p className="text-base leading-relaxed text-slate-200">{PROFILE.bio}</p>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ABOUT_HIGHLIGHTS.map((item, idx) => (
            <article
              key={item.number}
              className={`creative-glass creative-card-hover rounded-2xl border bg-gradient-to-br p-5 ${item.accent}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#111827]/80">
                  {HIGHLIGHT_ICONS[idx]}
                </div>
                <span className={`font-mono text-xs font-semibold tabular-nums ${item.numberColor}`}>
                  {item.number}.
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
