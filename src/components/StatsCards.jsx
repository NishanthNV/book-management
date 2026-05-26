import { FiBookOpen, FiCalendar, FiLayers, FiTrendingUp } from 'react-icons/fi';

const formatNumber = new Intl.NumberFormat();

export default function StatsCards({ books }) {
  const totalBooks = books.length;
  const totalGenres = new Set(books.map((book) => book.genre)).size;
  const newestYear = books.length ? Math.max(...books.map((book) => Number(book.year))) : 0;
  const oldestYear = books.length ? Math.min(...books.map((book) => Number(book.year))) : 0;

  const stats = [
    {
      title: 'Total Books',
      value: formatNumber.format(totalBooks),
      icon: FiBookOpen,
      gradient: 'from-brand-600 to-fuchsia-600',
    },
    {
      title: 'Active Genres',
      value: formatNumber.format(totalGenres),
      icon: FiLayers,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Newest Release',
      value: newestYear || '—',
      icon: FiTrendingUp,
      gradient: 'from-sky-500 to-cyan-500',
    },
    {
      title: 'Oldest Classic',
      value: oldestYear || '—',
      icon: FiCalendar,
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-glow dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-glow`}>
                <Icon className="text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
