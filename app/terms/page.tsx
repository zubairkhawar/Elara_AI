import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--scaffold-color)]">
      <Navbar />
      <div className="relative px-4 py-16 md:py-24 lg:py-32 max-w-3xl mx-auto">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-12">
            Last updated: January 2026
          </p>

          <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Agreement to terms</h2>
              <p>
                By accessing or using Elara AI (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Description of service</h2>
              <p>
                Elara AI provides an AI-powered voice booking platform and related dashboard, API, and integrations. We reserve the right to modify, suspend, or discontinue any part of the Service with reasonable notice where practicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Account and eligibility</h2>
              <p>
                You must provide accurate account information and keep it up to date. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal purpose or in violation of applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                <li>Transmit malware, spam, or content that infringes others&apos; rights</li>
                <li>Resell or sublicense the Service without our prior written consent</li>
                <li>Use the Service in a way that could harm, overburden, or impair our infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual property</h2>
              <p>
                We own or license all rights in the Service, including software, design, and content. You may not copy, modify, distribute, or create derivative works from our Service except as expressly permitted by us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Data and privacy</h2>
              <p>
                Your use of the Service is also governed by our{' '}
                <Link href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>. You are responsible for ensuring that your use of the Service (including any data you input or any calls you process) complies with applicable privacy and data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimers</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available.&quot; We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose. We do not guarantee uninterrupted or error-free operation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill, arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any time for breach of these Terms or for any other reason. You may stop using the Service at any time. Provisions that by their nature should survive (e.g. disclaimers, limitation of liability) will survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">10. Changes</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
              <p>
                For questions about these Terms, please contact us via the{' '}
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
