'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="landing-section hero-section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-subtle opacity-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="landing-section-content container relative z-10 flex items-center justify-center">
        <div className="hero-content mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-10 leading-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Let Elara Handle Your Calls
          </h1>
          <p className="text-2xl md:text-[28px] text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered voice booking platform that manages your appointments, 
            schedules meetings, and handles customer inquiries 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/dashboard"
              className="px-20 py-8 rounded-full gradient-primary text-white text-base md:text-lg font-semibold flex items-center gap-3 hover:opacity-90 transition-opacity shadow-xl shadow-purple-500/40"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-20 py-8 rounded-full border border-[var(--border)] text-[var(--text-primary)] text-base md:text-lg font-semibold hover:bg-[var(--hover-background)] transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
