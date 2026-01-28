'use client';

import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

const SUPPORT_EMAIL = 'zubairkhawer@gmail.com';
const WHATSAPP_NUMBER_E164 = '923213211177'; // without leading +

export default function SupportPage() {
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    'Elara AI Support',
  )}&body=${encodeURIComponent(
    'Hi Zubair,\n\nI need help with Elara AI.\n\nDetails:\n',
  )}`;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(
    'Hi Zubair, I need help with Elara AI.',
  )}`;

  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Support
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
          Reach out directly if you need help with onboarding, issues, or
          feature requests.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Email card */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1E1E5F] to-[#7B4FFF] flex items-center justify-center text-white flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                Email support
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Send a detailed message and we&apos;ll get back to you as soon
                as possible.
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
        <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6 md:p-8 flex flex-col justify-between">
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
  );
}

