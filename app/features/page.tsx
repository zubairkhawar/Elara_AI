import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import {
  Phone,
  Calendar,
  Zap,
  Clock,
  Shield,
  BarChart3,
  MessageSquare,
  HeadphonesIcon,
} from 'lucide-react';

const features = [
  {
    icon: Phone,
    title: '24/7 Voice AI',
    description:
      'Elara answers every call, day or night. No more missed leads or voicemails piling up.',
  },
  {
    icon: Calendar,
    title: 'Smart Booking',
    description:
      'Automatically books appointments that fit your calendar and syncs with your existing tools.',
  },
  {
    icon: Zap,
    title: 'Human-Like Conversations',
    description:
      'Natural voice and tone that matches your brand. Callers feel they’re talking to your best receptionist.',
  },
  {
    icon: Clock,
    title: 'No More After-Hours Gaps',
    description:
      'Capture leads and bookings around the clock without hiring extra staff.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description:
      'Your data and call recordings are protected with enterprise-grade security practices.',
  },
  {
    icon: BarChart3,
    title: 'Insights & Analytics',
    description:
      'Dashboard with call summaries, booking trends, and revenue insights so you stay in control.',
  },
  {
    icon: MessageSquare,
    title: 'Call Summaries & Transcripts',
    description:
      'Review every call with AI-generated summaries and full transcripts linked to bookings.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Multi-Channel Ready',
    description:
      'Designed to work with your phone system, CRM, and calendar for a seamless workflow.',
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-6xl mx-auto">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Everything you need to
            <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent"> scale your calls</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            AI-powered voice booking, insights, and integrations built for modern businesses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1E1E5F] to-[#7B4FFF] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
