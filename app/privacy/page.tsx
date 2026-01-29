import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-3xl mx-auto">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">
            Last updated: January 2026
          </p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
              <p>
                Elara AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, website, and related services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Information we collect</h2>
              <p className="mb-3">We may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (email, name, business name, phone number)</li>
                <li>Booking and appointment data</li>
                <li>Call summaries, transcripts, and related metadata when you use our voice AI features</li>
                <li>Usage data (e.g. how you use the dashboard and API)</li>
                <li>Technical data (IP address, browser type, device information)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. How we use your information</h2>
              <p>
                We use your information to provide, operate, and improve our services; to process bookings and manage your account; to send you service-related communications; and to comply with legal obligations. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Data sharing and disclosure</h2>
              <p>
                We may share your information with service providers who assist us in operating our platform (e.g. hosting, analytics), and when required by law or to protect our rights. We require such providers to protect your data in line with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data retention and security</h2>
              <p>
                We retain your data for as long as your account is active or as needed to provide services and comply with legal obligations. We implement appropriate technical and organizational measures to protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your rights</h2>
              <p>
                Depending on your location, you may have the right to access, correct, delete, or port your personal data, and to object to or restrict certain processing. Contact us using the details on our Contact page to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
              <p>
                For questions about this Privacy Policy or our data practices, please contact us via the{' '}
                <Link href="/contact" className="text-purple-400 hover:underline">Contact</Link> page.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
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
