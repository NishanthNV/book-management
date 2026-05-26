# BookHive - Book Management System

A production-quality Book Management System built with React, Vite, Axios, TailwindCSS, and modern UI patterns. Designed to feel like a polished SaaS admin dashboard for portfolio and interview showcases.

## Features

- View all books
- Add, edit, and delete books
- Search by title or author
- Filter by genre
- Sort by title or year
- Pagination
- Responsive dashboard layout
- Loading states and empty states
- Error handling and retry flow
- Toast notifications
- Dark mode toggle
- Local storage backup
- Confirmation dialog before delete
- Clean, modular component architecture

## Tech Stack

- React 18
- Vite
- Axios
- TailwindCSS
- React Icons

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Copy the example environment file and set your API base URL.

```bash
cp .env.example .env
```

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Set `VITE_API_BASE_URL` to your MockAPI or JSON Server endpoint.

### 3) Run locally

```bash
npm run dev
```

## API Setup

### Option A: MockAPI

Create a MockAPI resource called `books` with this schema:

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "Programming",
  "year": 2008
}
```

Example endpoints:

- `GET /books`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

### Option B: JSON Server

Install JSON Server globally or as a dev dependency.

```bash
npm install -g json-server
```

Create a `db.json` file:

```json
{
  "books": []
}
```

Run the server:

```bash
json-server --watch db.json --port 3001
```

Set `VITE_API_BASE_URL=http://localhost:3001`

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Add `VITE_API_BASE_URL` in environment variables.

### Netlify

1. Push the project to GitHub.
2. Import the repo into Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add `VITE_API_BASE_URL` in environment variables.

## Project Structure

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

## Notes

- The app falls back to local storage if the API is unavailable.
- The UI is fully responsive and optimized for professional presentation.
