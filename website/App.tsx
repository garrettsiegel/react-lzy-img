import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Examples } from './components/Examples';
import { Installation } from './components/Installation';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="examples">
          <Examples />
        </div>
        <div id="installation">
          <Installation />
        </div>
      </main>
      <Footer />
    </div>
  );
}
