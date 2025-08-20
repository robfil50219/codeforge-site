import React from "react";
import { Link } from "react-router-dom";

type State = { hasError: boolean };
export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Optional: send to your logging/analytics here
    console.error("ErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    // Optional: force reload to reset app state
    // window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-red-600">Something went wrong</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              We’re on it.
            </h1>
            <p className="mt-2 text-slate-600">
              An unexpected error occurred. Try again or go back home.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 transition"
              >
                Try again
              </button>
              <Link
                to="/"
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-white transition"
              >
                Go home
              </Link>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}