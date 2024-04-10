import Cta from './components/cta';
import { Features } from './components/features';
import Hero from './components/hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Cta />
    </main>
  );
}
