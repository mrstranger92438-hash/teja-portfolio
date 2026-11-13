import { Calendar, GraduationCap } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

export default function EducationSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="education"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-[#06B6D4]">Education</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
          Academic Journey &amp; Timeline
        </h2>
      </div>

      <div className="mt-10 creative-glass rounded-3xl border border-white/15 bg-gradient-to-br from-[#8B5CF6]/20 via-[#111827]/80 to-[#EC4899]/15 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] shadow-lg shadow-[#3B82F6]/30">
              <GraduationCap className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#06B6D4]">
                Undergraduate Engineering Program
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {EDUCATION.degree}
              </h3>
              <p className="mt-1 text-lg font-semibold text-[#EC4899]">{EDUCATION.institution}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#111827]/75 px-5 py-3.5 shrink-0">
            <Calendar className="h-5 w-5 text-[#F97316]" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-300">Expected Graduation</p>
              <p className="font-mono text-2xl font-bold tabular-nums text-white">
                {EDUCATION.expectedGraduation}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {EDUCATION.timelineMilestones.map((milestone, index) => (
            <div
              key={milestone.title}
              className="relative rounded-2xl border border-white/10 bg-[#111827]/65 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#F97316]">
                  {milestone.period}
                </span>
                <span className="font-mono text-xs tabular-nums text-slate-400">
                  0{index + 1}
                </span>
              </div>
              <h4 className="mt-2.5 font-display text-base font-bold text-white">
                {milestone.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{milestone.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
