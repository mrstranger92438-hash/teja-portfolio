import { MouseEvent, useEffect, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Braces,
  Code2,
  Cpu,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Printer,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { EDUCATION, PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

interface HeroSectionProps {
  introReady: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ORBIT_NODES = [
  {
    id: 'orb-code',
    label: 'Web Dev',
    icon: Code2,
    color: 'text-[#06B6D4]',
    border: 'border-[#06B6D4]/55',
    glow: 'shadow-[0_0_24px_rgba(6,182,212,0.4)]',
    restPos: '-top-3 -left-3',
    launchFrom: { x: 110, y: 110, scale: 0.2, opacity: 0 },
    driftX: [0, 12, -8, 10, 0],
    driftY: [0, -18, -6, -22, 0],
    driftRotate: [0, 10, -8, 6, 0],
    duration: 10,
    delay: 0.35,
  },
  {
    id: 'orb-python',
    label: 'Python',
    icon: Terminal,
    color: 'text-[#F97316]',
    border: 'border-[#F97316]/55',
    glow: 'shadow-[0_0_24px_rgba(249,115,22,0.4)]',
    restPos: 'top-4 -right-4',
    launchFrom: { x: -110, y: 90, scale: 0.2, opacity: 0 },
    driftX: [0, -10, 12, -6, 0],
    driftY: [0, -14, 10, -18, 0],
    driftRotate: [0, -12, 8, -6, 0],
    duration: 12,
    delay: 0.45,
  },
  {
    id: 'orb-logic',
    label: 'DSA & OOP',
    icon: Cpu,
    color: 'text-[#8B5CF6]',
    border: 'border-[#8B5CF6]/55',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.45)]',
    restPos: 'bottom-6 -left-4',
    launchFrom: { x: 110, y: -90, scale: 0.2, opacity: 0 },
    driftX: [0, 10, -12, 8, 0],
    driftY: [0, 14, -12, 10, 0],
    driftRotate: [0, -8, 12, -4, 0],
    duration: 11.5,
    delay: 0.55,
  },
  {
    id: 'orb-stack',
    label: 'Full Stack',
    icon: Braces,
    color: 'text-[#EC4899]',
    border: 'border-[#EC4899]/55',
    glow: 'shadow-[0_0_24px_rgba(236,72,153,0.45)]',
    restPos: '-bottom-2 -right-3',
    launchFrom: { x: -110, y: -110, scale: 0.2, opacity: 0 },
    driftX: [0, -14, 8, -10, 0],
    driftY: [0, 16, -10, 12, 0],
    driftRotate: [0, 12, -10, 8, 0],
    duration: 13,
    delay: 0.65,
  },
];

export default function HeroSection({ introReady }: HeroSectionProps) {
  const prefersReduced = useReducedMotion();
  const shouldFloat = introReady && !prefersReduced;
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState(PROFILE.typingRoles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [linkedinNotice, setLinkedinNotice] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Interactive 3D tilt & prismatic light coordinates for the portrait stage
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(rawTiltX, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(rawTiltY, { stiffness: 160, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.28) 0%, rgba(236,72,153,0.14) 28%, transparent 62%)`;

  const handleStageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawTiltY.set((px - 0.5) * 18);
    rawTiltX.set((0.5 - py) * 18);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleStageMouseLeave = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTypedText(PROFILE.typingRoles[0]);
      return;
    }

    const currentRole = PROFILE.typingRoles[roleIndex];
    let timeoutId: number;

    if (!isDeleting && typedText === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % PROFILE.typingRoles.length);
    } else {
      const speed = isDeleting ? 36 : 70;
      timeoutId = window.setTimeout(() => {
        const nextLength = typedText.length + (isDeleting ? -1 : 1);
        setTypedText(currentRole.slice(0, nextLength));
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    if (!resumeOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResumeOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resumeOpen]);

  const handleDownloadTextResume = () => {
    const resumeText = [
      'KOPPULA TEJESH',
      PROFILE.titleLine,
      `Email: ${PROFILE.email}`,
      `GitHub: ${PROFILE.githubUrl}`,
      '',
      'PROFILE SUMMARY',
      PROFILE.bio,
      '',
      'EDUCATION',
      `${EDUCATION.degree} — ${EDUCATION.institution} (Expected Graduation: ${EDUCATION.expectedGraduation})`,
      '',
      'TECHNICAL & SOFT SKILLS',
      ...SKILL_CATEGORIES.map(
        (cat) => `${cat.title}: ${cat.skills.map((s) => s.name).join(', ')}`
      ),
    ].join('\n');

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Koppula_Tejesh_Resume.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="home"
      className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE_OUT_EXPO }}
            className="text-sm font-semibold tracking-[0.18em] text-[#06B6D4]"
          >
            HELLO, I&apos;M
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE_OUT_EXPO }}
            className="mt-3 font-display text-[clamp(2.5rem,5vw,4.35rem)] font-extrabold leading-[1.08] tracking-tight text-white text-balance"
          >
            <span className="animated-gradient-text">KOPPULA TEJESH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT_EXPO }}
            className="mt-3 font-display text-lg font-semibold text-white/95 sm:text-xl"
          >
            {PROFILE.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="mt-2 flex min-h-[2.25rem] items-center"
          >
            <span className="sr-only">{PROFILE.typingRoles.join(', ')}</span>
            <p
              aria-hidden="true"
              className="font-display text-xl font-semibold text-[#EC4899] sm:text-2xl"
            >
              <span>{typedText}</span>
              <span className="typing-cursor ml-1 inline-block h-6 w-0.5 align-middle bg-[#F97316]" />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.34, ease: EASE_OUT_EXPO }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {PROFILE.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.42, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(59,130,246,0.38)] transition-all duration-150 hover:shadow-[0_12px_36px_rgba(139,92,246,0.55)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] whitespace-nowrap shrink-0"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-150 hover:border-[#EC4899]/70 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(236,72,153,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] whitespace-nowrap shrink-0"
            >
              <Download className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
              <span>Download Resume</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.5, ease: EASE_OUT_EXPO }}
            className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/15 pt-6 w-full max-w-lg"
          >
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4 text-[#8B5CF6]" aria-hidden="true" />
              <span>GitHub</span>
            </a>

            <span className="text-white/20" aria-hidden="true">
              ·
            </span>

            <button
              type="button"
              onClick={() => setLinkedinNotice((prev) => !prev)}
              aria-expanded={linkedinNotice}
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
              <span>LinkedIn</span>
            </button>

            <span className="text-white/20" aria-hidden="true">
              ·
            </span>

            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-[#06B6D4]"
            >
              <Mail className="h-4 w-4 text-[#EC4899]" aria-hidden="true" />
              <span>Email</span>
            </a>
          </motion.div>

          {linkedinNotice && (
            <p className="mt-2 text-xs text-slate-300" role="status">
              LinkedIn link will be added once the public profile URL is provided. You can connect
              directly via{' '}
              <a href="#contact" className="text-[#06B6D4] underline underline-offset-2">
                the contact section
              </a>
              .
            </p>
          )}
        </div>

        <motion.div
          initial={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.84, rotateY: -22, rotateX: 12 }
          }
          animate={
            introReady
              ? { opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }
              : prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.84, rotateY: -22, rotateX: 12 }
          }
          transition={{ duration: 0.9, delay: 0.16, ease: EASE_OUT_EXPO }}
          style={{ perspective: 1100 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="relative p-6"
          >
            {/* Expanding concentric shockwave halo right when intro completes */}
            {shouldFloat && (
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0.65, opacity: 0.75 }}
                animate={{ scale: 1.55, opacity: 0 }}
                transition={{ duration: 1.4, delay: 0.12, ease: EASE_OUT_EXPO }}
                className="pointer-events-none absolute inset-4 rounded-3xl border-2 border-[#06B6D4]/70"
              />
            )}

            {/* Weightless orbital tech nodes bursting out from center and hovering free in air */}
            {ORBIT_NODES.map((orb) => {
              const IconComp = orb.icon;
              return (
                <motion.div
                  key={orb.id}
                  aria-hidden="true"
                  title={orb.label}
                  initial={orb.launchFrom}
                  animate={
                    shouldFloat
                      ? {
                          x: orb.driftX,
                          y: orb.driftY,
                          rotate: orb.driftRotate,
                          scale: 1,
                          opacity: 1,
                        }
                      : introReady
                        ? { x: 0, y: 0, scale: 1, opacity: 1 }
                        : orb.launchFrom
                  }
                  transition={
                    shouldFloat
                      ? {
                          opacity: { duration: 0.55, delay: orb.delay },
                          scale: { duration: 0.7, delay: orb.delay, ease: EASE_OUT_EXPO },
                          x: {
                            duration: orb.duration,
                            delay: orb.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          y: {
                            duration: orb.duration * 1.08,
                            delay: orb.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                          rotate: {
                            duration: orb.duration * 1.15,
                            delay: orb.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          },
                        }
                      : { duration: 0.4 }
                  }
                  className={`pointer-events-none absolute z-20 flex h-12 w-12 items-center justify-center rounded-2xl border bg-[#111827]/85 backdrop-blur-xl ${orb.restPos} ${orb.border} ${orb.glow}`}
                >
                  <IconComp className={`h-5 w-5 ${orb.color}`} />
                </motion.div>
              );
            })}

            {/* Interactive 3D tilt + zero-gravity floating portrait frame */}
            <motion.div
              style={
                prefersReduced
                  ? undefined
                  : {
                      rotateX,
                      rotateY,
                      transformStyle: 'preserve-3d',
                    }
              }
              animate={
                shouldFloat
                  ? {
                      y: [0, -14, -5, -18, 0],
                      x: [0, 6, -5, 4, 0],
                    }
                  : undefined
              }
              transition={{
                duration: 12,
                delay: 0.75,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="animated-gradient-border rounded-3xl p-1.5 shadow-[0_26px_70px_-14px_rgba(139,92,246,0.6)]"
            >
              <div className="relative h-72 w-72 overflow-hidden rounded-[20px] bg-[#111827] sm:h-88 sm:w-88">
                {!imgError ? (
                  <img
                    src={PROFILE.avatar}
                    alt="Koppula Tejesh, Software Developer and B.Tech CSE Student"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#8B5CF6]/30 via-[#111827] to-[#EC4899]/30 p-6 text-center">
                    <User className="h-14 w-14 text-[#06B6D4]" aria-hidden="true" />
                    <span className="mt-3 font-display text-lg font-semibold text-white">
                      Koppula Tejesh
                    </span>
                  </div>
                )}

                {/* Dynamic interactive holographic glare following pointer */}
                {!prefersReduced && (
                  <motion.div
                    aria-hidden="true"
                    style={{ background: glareBackground }}
                    className="pointer-events-none absolute inset-0 mix-blend-screen"
                  />
                )}

                {/* Diagonal prism sweep on initial reveal */}
                {introReady && !prefersReduced && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: '-120%', opacity: 0.55 }}
                    animate={{ x: '220%', opacity: 0 }}
                    transition={{ duration: 1.05, delay: 0.35, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={
          shouldFloat
            ? {
                opacity: 1,
                y: [0, -6, 0],
              }
            : introReady
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
        }
        transition={{
          opacity: { duration: 0.5, delay: 0.6 },
          y: { duration: 4.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="mt-14 flex justify-center"
      >
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-[#06B6D4]/60 hover:text-white"
        >
          <span>Scroll Down to Explore</span>
          <ArrowDown className="h-3.5 w-3.5 text-[#06B6D4]" aria-hidden="true" />
        </a>
      </motion.div>

      {resumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={() => setResumeOpen(false)}
        >
          <div
            className="creative-glass relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/20 bg-[#111827] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setResumeOpen(false)}
              aria-label="Close resume dialog"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:border-[#EC4899]/60"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899]">
                <FileText className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 id="resume-modal-title" className="font-display text-xl font-bold text-white">
                  Koppula Tejesh — Resume Summary
                </h2>
                <p className="text-xs text-slate-300">{PROFILE.titleLine}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-y border-white/10 py-5 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-white">Education</p>
                <p className="mt-1">
                  {EDUCATION.degree} · {EDUCATION.institution} · Expected {EDUCATION.expectedGraduation}
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">Profile</p>
                <p className="mt-1 leading-relaxed">{PROFILE.bio}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Key Skills</p>
                <p className="mt-1">
                  C, C++, Java, Python, HTML, CSS, JavaScript, MySQL, MongoDB, Git, GitHub, VS Code,
                  Data Structures, Algorithms, OOP
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadTextResume}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume (.txt)</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#06B6D4]/60"
              >
                <Printer className="h-4 w-4 text-[#06B6D4]" aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
