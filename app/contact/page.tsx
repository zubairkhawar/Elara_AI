'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Mail, MessageCircle, Send, Loader2 } from 'lucide-react';

const SUPPORT_EMAIL = 'zubairkhawer@gmail.com';
const WHATSAPP_NUMBER = '+92 321 3211177';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    try {
      // For unauthenticated contact form we could POST to a public endpoint or use mailto
      const subject = encodeURIComponent(`Contact from ${name} (${email})`);
      const body = encodeURIComponent(message);
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Contact <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">us</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-12">
            Have a question or want to get started? Reach out and we’ll get back to you soon.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                {sent && (
                  <p className="text-sm text-emerald-400">
                    Your email client will open. Send the message to complete your request.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Opening…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">Email</h3>
                </div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors break-all"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white">WhatsApp</h3>
                </div>
                <a
                  href={`https://wa.me/923213211177`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-purple-400 transition-colors"
                >
                  {WHATSAPP_NUMBER}
                </a>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:underline">
                  Sign in
                </Link>{' '}
                to use the in-app support form.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-white transition-colors inline-flex items-center gap-2"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
