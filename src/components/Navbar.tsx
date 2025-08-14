import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="text-lg font-extrabold tracking-tight text-slate-900">
          CodeForge Studio
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="text-slate-600 hover:text-slate-900">Services</a>
          <a href="#work" className="text-slate-600 hover:text-slate-900">Work</a>
          <a href="#about" className="text-slate-600 hover:text-slate-900">About</a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">Contact</a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden rounded-lg p-2 hover:bg-slate-100"
          aria-label="Toggle menu"
          type="button"
        >
          <div className="w-6 h-0.5 bg-slate-900 mb-1.5" />
          <div className="w-6 h-0.5 bg-slate-900 mb-1.5" />
          <div className="w-6 h-0.5 bg-slate-900" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
            <a onClick={() => setOpen(false)} href="#services" className="py-1 text-slate-700">Services</a>
            <a onClick={() => setOpen(false)} href="#work" className="py-1 text-slate-700">Work</a>
            <a onClick={() => setOpen(false)} href="#about" className="py-1 text-slate-700">About</a>
            <a onClick={() => setOpen(false)} href="#contact" className="py-1 text-slate-700">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}