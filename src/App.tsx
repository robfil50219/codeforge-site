import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
//import Work from "./components/Work";
import About from "./components/About";      
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        {/* <Work /> */}
        <Pricing />
        <About />       
        <Contact />
      </main>
      <Footer />
    </div>
  );
}