import { FiBookOpen, FiPlus } from 'react-icons/fi';

export default function EmptyState({
  title = 'No books found',
  description = 'Add your first book or adjust the search and filter settings to continue.',
  actionLabel = 'Add Book',
  onAction,
}) {
  return (
    <div className="flex min-h-[28rem] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-fuchsia-100 text-3xl text-brand-600 dark:from-brand-950 dark:to-fuchsia-950 dark:text-brand-300">
          <FiBookOpen />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <FiPlus /> {actionLabel}
        </button>
      </div>
    </div>
  );
}
