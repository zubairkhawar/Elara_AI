'use client';

import { useState } from 'react';
import { Mail, MessageCircle, ArrowUpRight, HelpCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { authenticatedFetch } from '@/utils/api';

const SUPPORT_EMAIL = 'zubairkhawer@gmail.com';
const WHATSAPP_NUMBER_E164 = '923213211177'; // without leading +

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export default function SupportPage() {
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    'Elara AI Support',
  )}&body=${encodeURIComponent(
    'Hi Zubair,\n\nI need help with Elara AI.\n\nDetails:\n',
  )}`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
    'Hi Zubair, I need help with Elara AI.',
  )}`;

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError('Please fill in both subject and message.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await authenticatedFetch(`${API_BASE_URL}/api/v1/support/requests/`, {
        method: 'POST',
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim(),
          contact_email: contactEmail.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Failed to submit support request');
      }

      setSuccess('Your message has been sent. We will get back to you soon.');
      setSubject('');
      setMessage('');
      // keep contactEmail so they don't have to retype it
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit support request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Support
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          Get help with onboarding, issues, or feature requests. Send us a message
          or reach out directly via email or WhatsApp.
        </p>
      </div>

      {/* Main layout: Contact form + direct contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Contact form */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="p-2 rounded-lg bg-purple-50">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Send us a message
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                This form creates a support ticket linked to your account.
              </p>
            </div>
          </div>

          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>{success}</span>
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact email (optional)
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  If left blank, we&apos;ll use your account email.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your question or issue"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-sm"
                placeholder="Please include as many details as possible: what you were trying to do, what happened, and any error messages."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !subject.trim() || !message.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Direct contact options */}
        <div className="space-y-4 sm:space-y-5">
          {/* Email card */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-7 flex flex-col justify-between">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] flex items-center justify-center text-white flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  Email support
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Prefer your own email client? Reach out directly.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 flex items-center justify-between">
                <span className="font-mono truncate">{SUPPORT_EMAIL}</span>
              </div>
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] hover:opacity-90 transition-opacity"
              >
                Email Zubair
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* WhatsApp card */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-7 flex flex-col justify-between">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white flex-shrink-0">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  WhatsApp
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Start a direct WhatsApp chat for quick questions and support.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-700 flex items-center justify-between">
                <span className="font-mono truncate">+92 321 3211177</span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
              >
                Message on WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ / Help section */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          Frequently asked questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              How do I connect my backend?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Your dashboard is connected to your Django backend via the
              <span className="font-mono"> NEXT_PUBLIC_API_BASE_URL </span>
              environment variable. If you change your backend URL, update that
              variable and redeploy.
            </p>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              How are bookings created?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Bookings can be created manually from the Bookings page or
              automatically via your AI agent integration. All bookings appear
              in the same timeline and power your dashboard analytics.
            </p>
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Can you help me set this up?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Yes. Send a message via the form above or WhatsApp and we&apos;ll
              walk you through connecting your business, services, and calendars.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


