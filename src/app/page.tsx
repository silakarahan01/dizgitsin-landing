import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Screenshots from '@/components/sections/Screenshots';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main id="main" className="relative bg-ink-900">
      <Hero />
      <Features />
      <Screenshots />
      <About />
      <Footer />
    </main>
  );
}
