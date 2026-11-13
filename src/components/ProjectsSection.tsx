import { useEffect, useState } from 'react';
import { Code2, ExternalLink, Eye, Github, X } from 'lucide-react';
import { PROJECTS, ProjectCategory, ProjectItem } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'systems', label: 'Software Systems' },
  { id: 'python', label: 'Python' },
];

export default function ProjectsSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#06B6D4]">Projects</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Featured Showcase &amp; Software Concepts
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Web interfaces, management system designs, and Python problem-solving builds. Placeholder
            repository links are included until public repositories are published.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/15 bg-[#111827]/75 p-1.5"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`min-h-[38px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="group creative-glass creative-card-hover flex flex-col overflow-hidden rounded-2xl border border-white/15"
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.accentGradient}`} />

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b1120]">
              {!failedImages[project.id] ? (
                <img
                  src={project.image}
                  alt={`${project.title} preview thumbnail`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                  }
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#8B5CF6]/25 via-[#111827] to-[#EC4899]/25 p-6 text-center">
                  <Code2 className="h-10 w-10 text-[#06B6D4]" aria-hidden="true" />
                  <p className="mt-3 font-display text-sm font-semibold text-white">
                    {project.title}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-semibold text-[#06B6D4]">{project.categoryLabel}</p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>
                <p className="mt-4 font-mono text-xs text-slate-200">
                  {project.technologies.join(' · ')}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-[#EC4899]/70 hover:text-[#EC4899] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] whitespace-nowrap"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>View Project</span>
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={project.repoNote}
                  className={`inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${project.accentGradient} px-3.5 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] whitespace-nowrap`}
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="creative-glass relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-[#111827] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:border-[#EC4899]/60"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold text-[#06B6D4]">
              {selectedProject.categoryLabel}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 pr-10 font-display text-2xl font-bold text-white"
            >
              {selectedProject.title}
            </h3>

            <div className="mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#0b1120]">
              {!failedImages[selectedProject.id] ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Code2 className="h-12 w-12 text-[#06B6D4]" aria-hidden="true" />
                </div>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              {selectedProject.fullDescription}
            </p>

            <div className="mt-6">
              <p className="text-xs font-semibold text-white">Project Highlights</p>
              <ul className="mt-2.5 space-y-2 text-sm text-slate-300">
                {selectedProject.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EC4899]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs text-slate-400">Technologies Used</p>
              <p className="mt-1 font-mono text-sm text-white">
                {selectedProject.technologies.join(' · ')}
              </p>
              <p className="mt-3 text-xs text-slate-300">{selectedProject.repoNote}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r ${selectedProject.accentGradient} px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub Placeholder</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex min-h-[42px] items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
