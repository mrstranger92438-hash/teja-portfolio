import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  Share2,
  User,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
        referenceId?: string;
      };

      if (!response.ok) {
        setStatus('error');
        setFeedback(data.error || 'Please check your input fields and try again.');
        return;
      }

      setStatus('success');
      setReferenceId(data.referenceId || '');
      setFeedback(
        data.message || 'Your message has been submitted to the server successfully.'
      );
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
      setFeedback(
        'Could not reach the server. Please try again or email mr.stranger92438@gmail.com directly.'
      );
    }
  };

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    form.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    form.message ? `Hi Tejesh,\n\n${form.message}\n\nBest regards,\n${form.fullName}` : ''
  )}`;

  return (
    <section
      id="contact"
      ref={ref}
      data-visible={isVisible}
      className="reveal-section relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="creative-glass rounded-3xl border border-white/15 bg-gradient-to-br from-[#8B5CF6]/20 via-[#111827]/85 to-[#EC4899]/20 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#F97316]">Let&apos;s Connect</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Get In Touch With <span className="animated-gradient-text">Koppula Tejesh</span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Open to software developer internships, web projects, and collaborative learning
            opportunities. Send a message below or connect through direct channels.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/15 bg-[#111827]/75 p-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40">
                  <User className="h-5 w-5 text-[#8B5CF6]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="text-sm font-bold text-white">{PROFILE.name}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#111827]/75 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EC4899]/20 border border-[#EC4899]/40">
                    <Mail className="h-5 w-5 text-[#EC4899]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Email</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="mt-0.5 block break-all text-sm font-semibold text-white hover:text-[#06B6D4] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-[#06B6D4]/60 hover:text-white"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#06B6D4]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#111827]/75 p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40">
                  <Github className="h-5 w-5 text-[#3B82F6]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">GitHub</p>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#3B82F6] transition-colors"
                  >
                    <span>https://github.com/dashboard</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#111827]/75 p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06B6D4]/20 border border-[#06B6D4]/40">
                  <Linkedin className="h-5 w-5 text-[#06B6D4]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">LinkedIn</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    LinkedIn profile placeholder
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Public profile URL will be linked once supplied.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[#111827]/75 p-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F97316]/20 border border-[#F97316]/40">
                  <Share2 className="h-5 w-5 text-[#F97316]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Other Social Links</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Additional social profiles pending
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Social links will appear here once shared.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/15 bg-[#111827]/80 p-6 sm:p-8"
              noValidate
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-fullName"
                    className="block text-sm font-medium text-white"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1120]/85 px-4 py-3 text-sm text-white placeholder-slate-400 transition-all duration-150 focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/25 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-white"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1120]/85 px-4 py-3 text-sm text-white placeholder-slate-400 transition-all duration-150 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/25 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-white"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="How can we collaborate?"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1120]/85 px-4 py-3 text-sm text-white placeholder-slate-400 transition-all duration-150 focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/25 focus:outline-none"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Share details about your project, opportunity, or question..."
                  className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-[#0b1120]/85 px-4 py-3 text-sm text-white placeholder-slate-400 transition-all duration-150 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/25 focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-sm text-rose-200"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-rose-400"
                    aria-hidden="true"
                  />
                  <span>{feedback}</span>
                </div>
              )}

              {status === 'success' && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium">{feedback}</p>
                    {referenceId && (
                      <p className="mt-0.5 font-mono text-xs text-emerald-300/90">
                        Server Reference ID: {referenceId}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_26px_rgba(236,72,153,0.38)] transition-all duration-150 hover:shadow-[0_12px_34px_rgba(139,92,246,0.55)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>

                <a
                  href={mailtoHref}
                  className="text-xs font-medium text-slate-300 underline-offset-4 transition-colors hover:text-[#06B6D4] hover:underline"
                >
                  Or compose via email client
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
