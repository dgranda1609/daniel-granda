import React, { useState, useEffect } from 'react';
// AnimatedGradientBackground removed — card-only design

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setStatus('idle');
    setErrorMsg('');
  };

  const handleClose = () => {
    if (status === 'success') resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: company || undefined, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Could not reach the server. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-[90vw] max-w-[480px] mx-auto"
        style={{
          animation: 'modalIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-brand-primary/60 hover:text-brand-accent transition-colors text-14 uppercase tracking-widest font-medium"
        >
          Close ✕
        </button>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden border border-brand-primary/10"
          style={{
            background: 'rgba(20, 12, 12, 0.85)',
            backdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 40px 100px rgba(255, 56, 49, 0.15), 0 0 0 1px rgba(255, 253, 219, 0.05)',
          }}
        >
          {/* Header accent bar */}
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

          <div className="p-24 md:p-32">
            {status === 'success' ? (
              /* Success state */
              <div className="text-center py-16">
                <div className="w-48 h-48 mx-auto mb-16 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF3831" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-24 md:text-32 font-bold text-brand-primary mb-8">
                  Message sent.
                </h3>
                <p className="text-14 text-brand-primary/60 font-body mb-20">
                  I'll get back to you soon.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-brand-accent text-white px-32 py-12 font-serif font-bold text-16 transition-transform hover:scale-105 active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form */
              <>
                <div className="mb-20">
                  <h2 className="font-serif text-24 md:text-32 font-bold text-brand-primary leading-[0.95] tracking-tight">
                    Let's build<br />something great.
                  </h2>
                  <p className="text-13 text-brand-primary/50 font-body mt-12">
                    Tell me about your project and I'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-14">
                  {/* Name */}
                  <div>
                    <label className="block text-10 uppercase tracking-widest font-bold text-brand-accent mb-8">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-brand-primary/20 focus:border-brand-accent text-brand-primary text-16 font-body py-8 outline-none transition-colors placeholder:text-brand-primary/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-10 uppercase tracking-widest font-bold text-brand-accent mb-8">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-b border-brand-primary/20 focus:border-brand-accent text-brand-primary text-16 font-body py-8 outline-none transition-colors placeholder:text-brand-primary/20"
                    />
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label className="block text-10 uppercase tracking-widest font-bold text-brand-accent mb-8">
                      Company <span className="text-brand-primary/30 normal-case">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company"
                      className="w-full bg-transparent border-b border-brand-primary/20 focus:border-brand-accent text-brand-primary text-16 font-body py-8 outline-none transition-colors placeholder:text-brand-primary/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-10 uppercase tracking-widest font-bold text-brand-accent mb-8">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      minLength={10}
                      rows={3}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border-b border-brand-primary/20 focus:border-brand-accent text-brand-primary text-16 font-body py-8 outline-none transition-colors resize-none placeholder:text-brand-primary/20"
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="text-13 text-brand-accent font-body">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-brand-accent text-white py-12 font-serif font-bold text-16 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,56,49,0.3)] mt-8"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center justify-center gap-8">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
