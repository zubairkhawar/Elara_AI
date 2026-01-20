'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="landing-section cta-section relative overflow-hidden gradient-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="landing-section-content container relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center cta-content">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to Let Elara Handle Your Calls?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses that trust Elara to manage their bookings 
              and provide exceptional customer service around the clock.
            </p>
            <div className="flex flex-col sm:flex-row justify-center mb-8 cta-buttons">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-lg bg-white text-[var(--deep-blue)] font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors">
                Schedule Demo
              </button>
            </div>
            <p className="text-white/70 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
