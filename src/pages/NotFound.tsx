import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-sky-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-lg bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 transition"
          >
            Go back home
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-white transition"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}