import { Cpu, Globe, Layout, Smartphone, Terminal } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

function renderServiceIcon(key: ServiceItem['iconKey'], colorClass: string) {
  const props = { className: `h-6 w-6 ${colorClass}`, 'aria-hidden': true as const };
  switch (key) {
    case 'globe':
      return <Globe {...props} />;
    case 'layout':
      return <Layout {...props} />;
    case 'smartphone':
      return <Smartphone {...props} />;
    case 'terminal':
      return <Terminal {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
  }
}

export default function ServicesSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-[#8B5CF6]">Services</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
          Creative Solutions &amp; Technical Capabilities
        </h2>
        <p className="mt-3 text-base text-slate-300">
          Combining visual design sensibilities with structured programming across web
          development, responsive layouts, and Python software engineering.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.number}
            className={`group creative-glass creative-card-hover flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br p-6 ${service.gradientBg} ${service.borderGlow}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-[#111827]/80 transition-transform duration-200 group-hover:scale-105">
                  {renderServiceIcon(service.iconKey, service.iconColor)}
                </div>
                <span className="font-mono text-sm font-semibold tabular-nums text-slate-300 group-hover:text-white transition-colors">
                  {service.number}.
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                {service.description}
              </p>
            </div>

            <p className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-slate-200">
              {service.highlights}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
