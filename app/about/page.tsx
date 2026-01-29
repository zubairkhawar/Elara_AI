import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Target, Heart, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            About <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">Elara AI</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-12">
            We’re on a mission to make every business reachable 24/7. Elara is an AI-powered voice platform
            that answers calls, books appointments, and captures leads so you never miss an opportunity.
          </p>

          <div className="space-y-10 mb-16">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Our mission</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  To give every business a professional, always-on voice presence—without the cost and complexity
                  of a full reception team.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">What we care about</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We focus on reliability, clarity, and respect for your brand. Every call is an opportunity
                  to impress your customers and grow your business.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Who we serve</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Salons, clinics, agencies, and any business that runs on appointments and phone calls.
                  If you care about never missing a call, Elara is for you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">The future</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We’re constantly improving our AI, integrations, and analytics so you can focus on what you do
                  best while Elara handles the phones.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Get in touch
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-[var(--text-secondary)] hover:text-white hover:border-white/20 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
