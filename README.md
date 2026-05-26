# BookHive - Book Management System

BookHive is a modern Book Management System built using React and Vite.  
The application allows users to manage books with full CRUD functionality, search, filtering, sorting, pagination, and responsive UI support.

---

# Features

- View all books
- Add new books
- Edit existing books
- Delete books
- Search books by title or author
- Filter books by genre
- Sort books by title and year
- Pagination support
- Responsive modern UI
- Dark mode support
- Toast notifications
- Loading and error handling
- Confirmation before delete

---

# Tech Stack

- React
- Vite
- Axios
- TailwindCSS
- React Icons

---

# Project Structure

```bash
src/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

---

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/book-management.git
```

---

## 2. Navigate to Project Folder

```bash
cd book-management
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Start Development Server

```bash
npm run dev
```

The application will start running locally.

Example:

```bash
http://localhost:5173
```

---

# API Configuration

This project uses MockAPI / JSON Server for backend API integration.

Create a `books` resource with the following fields:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "year": 2008
}
```

Required API Endpoints:

- GET /books
- POST /books
- PUT /books/:id
- DELETE /books/:id

---

# Build for Production

```bash
npm run build
```

---

# Deployment

This project can be deployed easily using:

- Vercel
- Netlify

---

# Future Improvements

- User Authentication
- Book Categories Dashboard
- Advanced Analytics
- Export Books Feature
- Cloud Database Integration

---

# Author

Nishanth NV
