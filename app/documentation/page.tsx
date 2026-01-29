import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { BookOpen, Code, User, FileText } from 'lucide-react';

const sections = [
  {
    icon: BookOpen,
    title: 'User guide',
    description: 'Learn how to set up your account, manage services, bookings, and customers.',
    href: '/help',
    label: 'Start with Help Center',
  },
  {
    icon: Code,
    title: 'API documentation',
    description: 'REST API reference for accounts, bookings, clients, alerts, call summaries, and support.',
    href: '#',
    label: 'Coming soon',
  },
  {
    icon: User,
    title: 'Getting started',
    description: 'Sign up, connect your backend, and configure your first services and bookings.',
    href: '/signup',
    label: 'Create an account',
  },
  {
    icon: FileText,
    title: 'Developer documentation',
    description: 'Integration guides, webhooks (e.g. Vapi), and customization for developers.',
    href: '#',
    label: 'Coming soon',
  },
];

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Documentation
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-12">
            User guides, API reference, and developer docs for Elara AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {sections.map(({ icon: Icon, title, description, href, label }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {description}
                </p>
                {href === '#' ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[var(--text-muted)] text-sm">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors font-medium text-sm"
                  >
                    {label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="text-[var(--text-muted)] text-sm mb-8">
            API and developer documentation are in progress. For now, use the Help Center and contact us for integration support.
          </p>

          <Link
            href="/"
            className="text-[var(--text-secondary)] hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
