export default function Loader() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="animate-pulse space-y-4">
            <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
            <div className="space-y-3 pt-2">
              <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="flex gap-3 pt-3">
              <div className="h-11 flex-1 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-11 flex-1 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
