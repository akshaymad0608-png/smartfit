import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * App-level error boundary. Catches render errors in the routed tree and shows
 * a friendly recovery screen instead of a blank page.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Hook a real monitoring service (e.g. Sentry) in here later.
    console.error('FitSmart render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
        <div className="max-w-md">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-50 text-accent dark:bg-accent/15">
            <TriangleAlert size={26} />
          </span>
          <h1 className="mt-5 text-section font-extrabold text-heading">Something went wrong</h1>
          <p className="mt-3 text-body">
            An unexpected error interrupted this page. Reloading usually fixes it — your data is
            safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600"
          >
            <RefreshCw size={16} /> Reload page
          </button>
        </div>
      </div>
    );
  }
}
