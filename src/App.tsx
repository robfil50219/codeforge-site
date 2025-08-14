import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />   {/* <— new section */}

        {/* keep About / Contact placeholders */}
        <section id="about" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold">About</h2>
          <p className="mt-2 text-slate-600">A short intro will go here.</p>
        </section>

        <section id="contact" className="scroll-mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="mt-2 text-slate-600">Email / links coming soon.</p>
        </section>
      </main>
    </div>
  );
}