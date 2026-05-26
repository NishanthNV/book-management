export const BOOKS_PER_PAGE = 6;
export const STORAGE_KEY = 'bookhive-books-backup';
export const THEME_KEY = 'bookhive-theme';

export const GENRE_OPTIONS = [
  { label: 'All Genres', value: 'all' },
  { label: 'Programming', value: 'Programming' },
  { label: 'Business', value: 'Business' },
  { label: 'Self-Help', value: 'Self-Help' },
  { label: 'Biography', value: 'Biography' },
  { label: 'History', value: 'History' },
  { label: 'Science Fiction', value: 'Science Fiction' },
  { label: 'Fantasy', value: 'Fantasy' },
  { label: 'Mystery', value: 'Mystery' },
  { label: 'Classic', value: 'Classic' },
  { label: 'Romance', value: 'Romance' },
  { label: 'Design', value: 'Design' },
];

export const SORT_OPTIONS = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Title A → Z', value: 'title-asc' },
  { label: 'Title Z → A', value: 'title-desc' },
  { label: 'Year high → low', value: 'year-desc' },
  { label: 'Year low → high', value: 'year-asc' },
];

export const DEFAULT_BOOKS = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', year: 2008 },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', year: 2018 },
  { id: 3, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Programming', year: 1999 },
  { id: 4, title: 'The Lean Startup', author: 'Eric Ries', genre: 'Business', year: 2011 },
  { id: 5, title: 'Deep Work', author: 'Cal Newport', genre: 'Self-Help', year: 2016 },
  { id: 6, title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', genre: 'Programming', year: 2017 },
  { id: 7, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', year: 2011 },
  { id: 8, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', year: 1965 },
];

export const TOAST_DURATION = 3200;
