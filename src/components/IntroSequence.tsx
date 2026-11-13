import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface IntroSequenceProps {
  visible: boolean;
  onComplete: () => void;
}

export default function IntroSequence({ visible, onComplete }: IntroSequenceProps) {
  useEffect(() => {
    if (!visible) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      onComplete();
    }, 1350);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-curtain"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.68, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#111827] px-6"
          aria-label="Portfolio introduction sequence"
        >
          {/* Ambient radial glow */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 0.45, scale: 1.15 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.75) 0%, rgba(236,72,153,0.45) 45%, rgba(6,182,212,0.2) 75%, transparent 100%)',
            }}
          />

          {/* Subtle geometric framing rings */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 0.25, scale: 1, rotate: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute h-72 w-72 rounded-3xl border border-white/20 sm:h-96 sm:w-96"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs font-medium tracking-[0.28em] text-[#06B6D4] sm:text-sm"
              >
                KOPPULA TEJESH
              </motion.p>
            </div>

            <div className="mt-2 overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl"
              >
                <span>TEJESH</span>
                <span className="animated-gradient-text">.</span>
              </motion.div>
            </div>

            <div className="mt-2 overflow-hidden">
              <motion.p
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-medium text-slate-300 sm:text-base"
              >
                Software Developer · Web Developer · Python Programmer
              </motion.p>
            </div>

            {/* Expanding multicolor light-beam progress line */}
            <div className="mt-7 h-0.5 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onComplete}
            className="absolute right-6 bottom-6 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-md transition-colors hover:border-[#EC4899]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
