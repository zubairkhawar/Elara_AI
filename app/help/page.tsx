'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { ChevronDown, HelpCircle, BookOpen, Phone } from 'lucide-react';

const faqs = [
  {
    q: 'How do I connect my backend to the dashboard?',
    a: 'Set the NEXT_PUBLIC_API_BASE_URL environment variable to your Django backend URL (e.g. http://localhost:8000). After redeploying or restarting the Next.js app, the dashboard will use that API for all data.',
  },
  {
    q: 'How are bookings created?',
    a: 'Bookings can be created manually from the Bookings page in the dashboard or automatically via the Elara AI voice agent when a caller books an appointment. All bookings appear in the same list and calendar view.',
  },
  {
    q: 'What is the Help Center vs in-app Support?',
    a: 'The Help Center (this page) has FAQs and general guidance. Once you’re logged in, the Support page in the dashboard lets you send a support ticket linked to your account for faster, personalized help.',
  },
  {
    q: 'How do I add or edit services?',
    a: 'Go to Dashboard → Services. You can add new services with name, price, and category. Use the edit and delete actions on each row to update or remove services. These are the same services your AI agent can offer on calls.',
  },
  {
    q: 'Where do call summaries come from?',
    a: 'Call summaries are created when your Vapi (or compatible) integration sends an end-of-call webhook to our backend. Configure your voice AI to post to the Elara webhook URL so summaries and transcripts appear in the Call Summaries page.',
  },
  {
    q: 'Can I get help setting everything up?',
    a: 'Yes. Use the Contact page to reach us by email or WhatsApp, or sign in and use the Support form in the dashboard. We can walk you through connecting your business, services, and calendars.',
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-3xl mx-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Help Center
            </h1>
          </div>
          <p className="text-lg text-[var(--text-secondary)] mb-12">
            Find answers to common questions and learn how to get the most out of Elara AI.
          </p>

          <div className="space-y-3 mb-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.04] transition-colors"
                >
                  <span className="font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-muted)] flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              More resources
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              Check our Documentation for API details, user guides, and developer docs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors font-medium"
              >
                Documentation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-[var(--text-secondary)] hover:text-white hover:border-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact us
              </Link>
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
