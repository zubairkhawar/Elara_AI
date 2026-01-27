import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import HowItWorks from '@/components/landing/HowItWorks';
import Businesses from '@/components/landing/Businesses';
import Pricing from '@/components/landing/Pricing';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="landing">
      <Navbar />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="businesses">
        <Businesses />
      </div>
      {/* Temporarily hidden */}
      {/* <div id="pricing">
        <Pricing />
      </div> */}
      <CTA />
      <Footer />
    </main>
  );
}
