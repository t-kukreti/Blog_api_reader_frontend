# Blog Reader Frontend

The public-facing frontend for the Blog API — where readers browse posts, read full articles, comment, and optionally register/log in and become an author.

## Tech Stack

- React 19 + Vite
- React Router DOM v7
- Plain `fetch` for API calls (no axios/query library)
- Auth state via React Context (`AuthContext` / `AuthProvider`), JWT stored in `localStorage`

## Features

- Browse published posts on the home page
- Read a single post with its comments
- Comment on posts, including threaded replies
- Register / log in as a reader
- "Become an Author" upgrade flow, which then links out to the separate Author Dashboard app
- Logout, with auth state (`isLoggedIn`, `isAuthor`, `currentUser`) shared app-wide via context

## Project Structure

```
src/
├── components/
│   ├── BecomeAuthor.jsx      # Upgrades current user to author
│   ├── CommentForm.jsx       # Post a comment / reply
│   ├── CommentItem.jsx       # Single comment (supports nested replies)
│   ├── CommentList.jsx       # Renders comment tree
│   ├── Footer.jsx
│   ├── Navbar.jsx            # Auth-aware nav (login/register vs author dashboard/logout)
│   ├── PostCard.jsx
│   ├── ReaderPostCard.jsx    # Post preview card on Home
│   └── protectedRoute.jsx    # Route guard (checks for token)
├── context/
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx      # Fetches /auth/me on load, exposes auth state
├── pages/
│   ├── Home.jsx               # Lists published posts
│   ├── Login.jsx
│   ├── Register.jsx
│   └── ReaderViewPost.jsx     # Single post + comments
├── App.jsx
└── main.jsx
```

## Prerequisites

- Node.js (LTS recommended)
- The [Blog_API](https://github.com/t-kukreti/Blog_API) backend running locally on `http://localhost:8000`

## Installation

```bash
npm install
npm run dev
```

Runs on **`http://localhost:5173`** by default (Vite's default port — matches the origin already whitelisted in the backend's CORS config).

