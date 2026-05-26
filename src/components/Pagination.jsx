import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Page <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> of{' '}
        <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
        >
          <FiChevronLeft /> Prev
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`min-w-10 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
              page === currentPage
                ? 'bg-brand-600 text-white shadow-glow'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
        >
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
