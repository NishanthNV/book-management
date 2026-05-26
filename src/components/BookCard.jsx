import { FiCalendar, FiEdit2, FiTag, FiTrash2, FiUser } from 'react-icons/fi';

const genreAccent = {
  Programming: 'from-cyan-600 to-blue-600',
  Business: 'from-emerald-600 to-teal-600',
  'Self-Help': 'from-fuchsia-600 to-pink-600',
  Biography: 'from-amber-500 to-orange-600',
  History: 'from-amber-700 to-rose-650',
  'Science Fiction': 'from-violet-600 to-indigo-650',
  Fantasy: 'from-purple-600 to-pink-600',
  Mystery: 'from-slate-700 to-slate-900',
  Classic: 'from-stone-500 to-zinc-700',
  Romance: 'from-rose-500 to-pink-600',
  Design: 'from-sky-500 to-cyan-600',
};

export default function BookCard({ book, onEdit, onDelete }) {
  const accent = genreAccent[book.genre] || 'from-brand-500 to-fuchsia-500';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900">
      {/* Book Cover Design */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${accent} p-5 flex flex-col justify-between text-white overflow-hidden`}>
        {/* Abstract Book texture / page overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/15 backdrop-blur-[1px]" /> {/* Book spine overlay */}
        <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/25" /> {/* Spine crease */}
        
        {/* Genre Pill on Cover */}
        <div className="z-10 self-end">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
            {book.genre}
          </span>
        </div>

        {/* Title & Author on Cover */}
        <div className="z-10 pl-4 pr-2">
          <h4 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white drop-shadow-sm group-hover:underline">
            {book.title}
          </h4>
          <p className="mt-1 line-clamp-1 text-xs text-white/80 font-medium">
            by {book.author}
          </p>
        </div>

        {/* Year Badge at the bottom right of the cover */}
        <div className="z-10 self-end text-[11px] font-bold opacity-75">
          {book.year}
        </div>
      </div>

      {/* Card Details Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-slate-950 dark:text-white">
              {book.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-350">
              <FiUser className="text-slate-400 dark:text-slate-500" />
              <span>{book.author}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FiTag /> {book.genre}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FiCalendar /> Published {book.year}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-800/60">
          <button
            type="button"
            onClick={() => onEdit(book)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-brand-950/50 dark:hover:text-brand-300 dark:hover:border-brand-900"
          >
            <FiEdit2 /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(book)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-450 dark:hover:bg-rose-950/60"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </article>
  );
}
