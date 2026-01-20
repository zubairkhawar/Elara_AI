import Link from 'next/link';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 py-8 md:py-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-6 items-start">
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Elara AI
            </h3>
            <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-xs">
              AI-powered voice booking platform that transforms how you handle customer communications.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 border-t border-[var(--border)]">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 py-5">
          <p className="text-[var(--text-muted)] text-sm">
            © 2024 Elara AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
