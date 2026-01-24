import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Examples } from './components/Examples';
import { Installation } from './components/Installation';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <Features />
      <Examples />
      <Installation />
      <Footer />
    </div>
  );
}
