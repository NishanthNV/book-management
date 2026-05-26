import { FiBookOpen, FiMoon, FiPlus, FiRefreshCw, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onAddBook, onRefresh, bookCount = 0 }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-500 text-white shadow-glow">
            <FiBookOpen className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400">
              BookHive
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                My Library Catalog
              </h1>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {bookCount} {bookCount === 1 ? 'book' : 'books'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onRefresh}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <FiRefreshCw className="transition-transform duration-500 group-hover:rotate-180" /> Sync
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {isDark ? <FiSun className="text-amber-500" /> : <FiMoon className="text-indigo-500" />}
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={onAddBook}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:from-brand-700 hover:to-fuchsia-700"
          >
            <FiPlus /> Add Book
          </button>
        </div>
      </div>
    </header>
  );
}
