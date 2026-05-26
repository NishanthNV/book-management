import { useEffect, useMemo, useState } from 'react';
import { FiAlertCircle, FiDatabase, FiPlus, FiTrash2 } from 'react-icons/fi';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import EmptyState from '../components/EmptyState';
import GenreFilter from '../components/GenreFilter';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import SortSelect from '../components/SortSelect';
import StatsCards from '../components/StatsCards';
import useBooks from '../hooks/useBooks';
import { BOOKS_PER_PAGE, GENRE_OPTIONS, SORT_OPTIONS } from '../utils/constants';
import { useToast } from '../context/ToastContext';

function compareBooks(sortBy) {
  switch (sortBy) {
    case 'oldest':
      return (a, b) => Number(a.year) - Number(b.year) || a.title.localeCompare(b.title);
    case 'title-asc':
      return (a, b) => a.title.localeCompare(b.title) || Number(b.year) - Number(a.year);
    case 'title-desc':
      return (a, b) => b.title.localeCompare(a.title) || Number(b.year) - Number(a.year);
    case 'year-asc':
      return (a, b) => Number(a.year) - Number(b.year) || a.title.localeCompare(b.title);
    case 'year-desc':
      return (a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    case 'newest':
    default:
      return (a, b) => Number(b.year) - Number(a.year) || b.id - a.id;
  }
}

export default function Home() {
  const { books, loading, saving, error, loadBooks, addBook, updateBook, deleteBook } = useBooks();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeBook, setActiveBook] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortBy]);

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const comparator = compareBooks(sortBy);

    return [...books]
      .filter((book) => {
        const matchesSearch =
          !normalizedSearch ||
          book.title.toLowerCase().includes(normalizedSearch) ||
          book.author.toLowerCase().includes(normalizedSearch);

        const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
        return matchesSearch && matchesGenre;
      })
      .sort(comparator);
  }, [books, searchTerm, selectedGenre, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const pageBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setActiveBook(null);
    setIsFormOpen(true);
  };

  const openEditModal = (book) => {
    setActiveBook(book);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setActiveBook(null);
  };

  const handleRefresh = async () => {
    await loadBooks();
    addToast('Books refreshed successfully.', 'info');
  };

  const handleSubmitBook = async (bookData) => {
    try {
      if (activeBook?.id) {
        await updateBook(activeBook.id, bookData);
        addToast('Book updated successfully.');
      } else {
        await addBook(bookData);
        addToast('Book added successfully.');
      }
      closeFormModal();
    } catch (submitError) {
      console.error(submitError);
      addToast('Unable to save the book. Please try again.', 'error');
    }
  };

  const requestDeleteBook = (book) => {
    setPendingDelete(book);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      await deleteBook(pendingDelete.id);
      addToast('Book deleted successfully.');
    } catch (deleteError) {
      console.error(deleteError);
      addToast('Unable to delete the book. Please try again.', 'error');
    } finally {
      setPendingDelete(null);
    }
  };

  const showEmptyState = !loading && !error && filteredBooks.length === 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.08),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] dark:text-white">
      <Navbar onAddBook={openCreateModal} onRefresh={handleRefresh} bookCount={books.length} />

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                <FiDatabase /> Personal Library
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Discover and organize your book collection.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Catalog your favorite titles, browse by genres, search through your catalog, and keep your library list updated in real time.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
              <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-soft dark:bg-slate-800">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Library Sync</p>
                <p className="mt-2 text-sm font-medium">{loading ? 'Syncing catalog...' : 'Connected & Live'}</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-600 px-4 py-3 text-white shadow-glow">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Data Integrity</p>
                <p className="mt-2 text-sm font-medium">Cloud Synced</p>
              </div>
            </div>
          </div>
        </section>

        <StatsCards books={books} />

        <section className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr]">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
              placeholder="Search by title or author"
            />
            <GenreFilter value={selectedGenre} onChange={setSelectedGenre} options={GENRE_OPTIONS} />
            <SortSelect value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Reset filters
            </button>
          </div>
        </section>

        {error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-soft dark:border-rose-900/40 dark:bg-rose-950/60 dark:text-rose-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="mt-0.5 text-2xl" />
                <div>
                  <h3 className="text-lg font-semibold">Connection problem</h3>
                  <p className="mt-1 text-sm leading-6">{error}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Retry loading
              </button>
            </div>
          </div>
        ) : null}

        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Library Catalog</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Showing {filteredBooks.length} of {books.length} {books.length === 1 ? 'book' : 'books'} in your collection.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-250 hover:-translate-y-0.5 hover:bg-brand-600 dark:bg-white dark:text-slate-950 dark:hover:bg-brand-100"
            >
              <FiPlus /> Add new book
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : showEmptyState ? (
            <EmptyState
              title={books.length === 0 ? 'Your library is empty' : 'No matching books found'}
              description={
                books.length === 0
                  ? 'Create a new book record to start building your collection.'
                  : 'Try adjusting the search, genre, or sort settings to find what you need.'
              }
              actionLabel={books.length === 0 ? 'Add your first book' : 'Clear filters'}
              onAction={books.length === 0 ? openCreateModal : clearFilters}
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pageBooks.map((book) => (
                  <BookCard key={book.id} book={book} onEdit={openEditModal} onDelete={requestDeleteBook} />
                ))}
              </div>

              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </section>
      </main>

      <Modal
        isOpen={isFormOpen}
        onClose={saving ? undefined : closeFormModal}
        title={activeBook ? 'Edit book' : 'Add new book'}
      >
        <BookForm initialValues={activeBook} loading={saving} onSubmit={handleSubmitBook} onCancel={closeFormModal} />
      </Modal>

      <Modal
        isOpen={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete book"
        size="sm"
      >
        <div className="space-y-6">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-white">{pendingDelete?.title}</span>? This action cannot be undone.
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setPendingDelete(null)}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiTrash2 /> {saving ? 'Deleting...' : 'Delete book'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
