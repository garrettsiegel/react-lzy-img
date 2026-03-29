import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Examples } from './components/Examples';
import { Installation } from './components/Installation';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-gray-950 dark:text-gray-100">
      <Navigation />
      <main id="main-content" className="pt-16">
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="examples">
          <Examples />
        </section>
        <section id="installation">
          <Installation />
        </section>
      </main>
      <Footer />
    </div>
  );
}
