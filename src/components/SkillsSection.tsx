import { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Globe,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

function renderCategoryIcon(id: string, colorClass: string) {
  const cls = `h-5 w-5 ${colorClass}`;
  switch (id) {
    case 'languages':
      return <Code2 className={cls} aria-hidden="true" />;
    case 'web':
      return <Globe className={cls} aria-hidden="true" />;
    case 'database':
      return <Database className={cls} aria-hidden="true" />;
    case 'tools':
      return <Wrench className={cls} aria-hidden="true" />;
    case 'concepts':
      return <Cpu className={cls} aria-hidden="true" />;
    default:
      return <Sparkles className={cls} aria-hidden="true" />;
  }
}

export default function SkillsSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section
      id="skills"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#F97316]">Technical &amp; Soft Skills</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Languages, Web Stack &amp; Core Computer Science
          </h2>
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/15 bg-[#111827]/75 p-1.5"
          role="tablist"
          aria-label="Filter skill categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[38px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All Skills
          </button>
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`min-h-[38px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {category.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <article
            key={category.id}
            className={`creative-glass creative-card-hover flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br p-6 ${category.gradient}`}
          >
            <div>
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${category.iconBg}`}
                >
                  {renderCategoryIcon(category.id, category.accentColor)}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-slate-300">{category.subtitle}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {category.skills.map((skill) => (
                  <li key={skill.name} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`mt-0.5 h-4 w-4 shrink-0 ${category.accentColor}`}
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{skill.name}</p>
                      <p className="text-xs text-slate-300">{skill.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
