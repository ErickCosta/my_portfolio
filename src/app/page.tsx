import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Expertise from '@/components/sections/Expertise';
import Experience from '@/components/sections/Experience';
import Work from '@/components/sections/Work';
import Research from '@/components/sections/Research';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Work />
        <Research />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
