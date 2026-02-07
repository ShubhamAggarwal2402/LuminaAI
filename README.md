# LuminaAI

AI-powered learning platform frontend — login, signup, and student dashboard.

## Stack

- **React 19** + **TypeScript** + **Vite 7**
- **React Router** for auth and dashboard routes

## Features

- **Login** — Sample user: `alex@example.com` / `lumina2024`
- **Signup** — Create account form with validation
- **Dashboard** — Student learning dashboard (welcome, knowledge trend, continue learning, available courses)
- **Protected routes** — Dashboard requires login; redirects to login when not authenticated

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Project structure

```
src/
  auth.ts              # Sample user + login/logout (replace with real API)
  App.tsx              # Routes: /, /signup, /dashboard
  components/
    LoginScreen.tsx
    SignupScreen.tsx
    Dashboard.tsx      # Student dashboard UI
    ProtectedRoute.tsx
```
