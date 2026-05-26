import { Component } from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
          <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-2xl text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <FiAlertTriangle />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Something went wrong</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              The application hit an unexpected error. Reload the page to recover.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <FiRefreshCw /> Reload application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
