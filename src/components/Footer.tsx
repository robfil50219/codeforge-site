export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
        <p>© {year} CodeForge Studio — All rights reserved.</p>
      </div>
    </footer>
  );
}