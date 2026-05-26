import axios from 'axios';
import { DEFAULT_BOOKS, STORAGE_KEY } from '../utils/constants';

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || '';
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const hasRemoteApi = Boolean(baseURL);

const readLocalBooks = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_BOOKS;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKS));
    return DEFAULT_BOOKS;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : DEFAULT_BOOKS;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BOOKS));
    return DEFAULT_BOOKS;
  }
};

const writeLocalBooks = (books) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }
};

const createLocalBook = (book) => ({
  ...book,
  id: Date.now(),
});

const simulateLatency = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchBooks() {
  if (hasRemoteApi) {
    try {
      const response = await api.get('/books');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.warn('Remote API unavailable, using local backup.', error);
    }
  }

  await simulateLatency();
  return readLocalBooks();
}

export async function addBook(book) {
  if (hasRemoteApi) {
    try {
      const response = await api.post('/books', book);
      return response.data;
    } catch (error) {
      console.warn('POST failed, saving locally.', error);
    }
  }

  await simulateLatency();
  const books = readLocalBooks();
  const nextBook = createLocalBook(book);
  const updatedBooks = [nextBook, ...books];
  writeLocalBooks(updatedBooks);
  return nextBook;
}

export async function editBook(bookId, updates) {
  const payload = { ...updates, id: Number(bookId) };

  if (hasRemoteApi) {
    try {
      const response = await api.put(`/books/${bookId}`, payload);
      return response.data;
    } catch (error) {
      console.warn('PUT failed, updating locally.', error);
    }
  }

  await simulateLatency();
  const books = readLocalBooks();
  const updatedBooks = books.map((book) => (String(book.id) === String(bookId) ? { ...book, ...payload } : book));
  writeLocalBooks(updatedBooks);
  return payload;
}

export async function removeBook(bookId) {
  if (hasRemoteApi) {
    try {
      await api.delete(`/books/${bookId}`);
      return true;
    } catch (error) {
      console.warn('DELETE failed, removing locally.', error);
    }
  }

  await simulateLatency();
  const books = readLocalBooks();
  const updatedBooks = books.filter((book) => String(book.id) !== String(bookId));
  writeLocalBooks(updatedBooks);
  return true;
}
