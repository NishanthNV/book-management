import { useCallback, useEffect, useState } from 'react';
import { addBook as createBookRequest, editBook as updateBookRequest, fetchBooks, removeBook as removeBookRequest } from '../services/api';

export default function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError('Unable to load books. Please check the API connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const addBook = useCallback(async (bookData) => {
    setSaving(true);
    try {
      const createdBook = await createBookRequest(bookData);
      setBooks((currentBooks) => [createdBook, ...currentBooks]);
      return createdBook;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateBook = useCallback(async (bookId, bookData) => {
    setSaving(true);
    try {
      const updatedBook = await updateBookRequest(bookId, bookData);
      setBooks((currentBooks) =>
        currentBooks.map((book) => (String(book.id) === String(bookId) ? updatedBook : book)),
      );
      return updatedBook;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteBook = useCallback(async (bookId) => {
    setSaving(true);
    try {
      await removeBookRequest(bookId);
      setBooks((currentBooks) => currentBooks.filter((book) => String(book.id) !== String(bookId)));
      return true;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    books,
    loading,
    saving,
    error,
    loadBooks,
    addBook,
    updateBook,
    deleteBook,
    setBooks,
  };
}
