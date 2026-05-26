import { useEffect, useMemo, useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { GENRE_OPTIONS } from '../utils/constants';

const initialForm = {
  title: '',
  author: '',
  genre: 'Programming',
  year: '',
};

export default function BookForm({ initialValues, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        author: initialValues.author || '',
        genre: initialValues.genre || 'Programming',
        year: initialValues.year?.toString() || '',
      });
    } else {
      setFormData(initialForm);
    }
    setErrors({});
  }, [initialValues]);

  const isEditing = useMemo(() => Boolean(initialValues?.id), [initialValues]);

  const validate = () => {
    const nextErrors = {};
    const trimmedTitle = formData.title.trim();
    const trimmedAuthor = formData.author.trim();
    const yearValue = Number(formData.year);

    if (!trimmedTitle) {
      nextErrors.title = 'Title is required.';
    } else if (trimmedTitle.length > 100) {
      nextErrors.title = 'Title must be 100 characters or less.';
    }

    if (!trimmedAuthor) {
      nextErrors.author = 'Author is required.';
    } else if (trimmedAuthor.length > 80) {
      nextErrors.author = 'Author name must be 80 characters or less.';
    }

    if (!formData.genre) {
      nextErrors.genre = 'Genre is required.';
    }

    if (!formData.year) {
      nextErrors.year = 'Publication year is required.';
    } else if (
      Number.isNaN(yearValue) ||
      !Number.isInteger(yearValue) ||
      yearValue < 1000 ||
      yearValue > new Date().getFullYear() + 5
    ) {
      nextErrors.year = `Enter a valid four-digit year between 1000 and ${new Date().getFullYear() + 5}.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre,
      year: Math.floor(Number(formData.year)),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Book title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-brand-950"
          />
          {errors.title && <p className="text-sm text-rose-500">{errors.title}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Author</span>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-brand-950"
          />
          {errors.author && <p className="text-sm text-rose-500">{errors.author}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Genre</span>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-brand-950"
          >
            {GENRE_OPTIONS.filter((option) => option.value !== 'all').map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-sm text-rose-500">{errors.genre}</p>}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Publication year</span>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-brand-950"
          />
          {errors.year && <p className="text-sm text-rose-500">{errors.year}</p>}
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          <FiX /> Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:from-brand-700 hover:to-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FiSave /> {loading ? 'Saving...' : isEditing ? 'Update Book' : 'Create Book'}
        </button>
      </div>
    </form>
  );
}
