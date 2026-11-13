import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed right-5 bottom-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white shadow-[0_8px_24px_rgba(236,72,153,0.45)] transition-all duration-150 hover:scale-105 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
