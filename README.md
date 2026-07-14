# NutriLog

NutriLog is a full-stack nutrition tracking application built with the MERN stack. It allows users to create an account, calculate personal nutrition targets, record meals by date, and monitor daily calories and macronutrients from a responsive dashboard.

## Links

- [Frontend project on Vercel](https://vercel.com/danielglopinas-projects/nutrilog-frontend)
- [Backend project on Vercel](https://vercel.com/danielglopinas-projects/nutrilog-api)
- [Public API](https://nutrilog-api.vercel.app)
- [API health check](https://nutrilog-api.vercel.app/api/health)

> The Vercel project links open the project dashboards and require access to the owner's Vercel account. Add the public frontend domain from **Vercel > Project > Settings > Domains** here when it is confirmed.

## Features

- JWT-based registration, login, session verification, and logout
- Protected application routes
- Meal creation, editing, and deletion
- Meal filtering and grouping by date and meal type
- Daily calorie and macronutrient totals
- Personal nutrition target calculation based on body data, activity level, and goal
- Responsive tables and mobile-friendly layouts
- Form validation with user-friendly error messages
- Loading states, notifications, and centralized API error handling

## Tech Stack

### Frontend

- React 19 and TypeScript
- Vite
- React Router
- TanStack Query
- Zustand with persisted authentication state
- React Hook Form and Zod
- Material UI, Radix UI, Tailwind CSS, and Lucide icons
- Axios

### Backend

- Node.js and Express 5
- MongoDB Atlas and Mongoose
- JSON Web Tokens
- bcrypt.js
- express-validator

### Testing and Quality

- Vitest
- React Testing Library
- Mock Service Worker
- ESLint
- TypeScript compiler checks

### Deployment

- Vercel Static Deployment for the Vite frontend
- Vercel Function for the Express API
- MongoDB Atlas for persistent data

## Architecture

```text
Browser
  |
  v
Vercel frontend (React + Vite)
  |
  | /api/* rewrite
  v
Vercel Function (Express)
  |
  v
MongoDB Atlas
```

The frontend uses relative `/api` URLs. In production, `frontend/vercel.json` proxies these requests to the deployed Express API and provides an SPA fallback for React Router routes.

## Project Structure

```text
nutrilog-MERN/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers and business logic
│   ├── middleware/      # Authentication and error handling
│   ├── models/          # Mongoose models
│   ├── routes/api/      # Express API routes
│   ├── validators/      # Request validation rules
│   └── server.js        # Local backend entry point
├── frontend/
│   ├── src/
│   │   ├── api/         # Shared Axios client
│   │   ├── components/  # UI and feature components
│   │   ├── hooks/       # Authentication and server-state hooks
│   │   ├── layouts/     # Shared and protected layouts
│   │   ├── lib/         # Calculations and utility functions
│   │   ├── pages/       # Route-level components
│   │   ├── store/       # Zustand state
│   │   ├── tests/       # Unit, component, and hook tests
│   │   └── validation/  # Zod schemas
│   └── vercel.json      # API proxy and SPA fallback
├── index.js             # Vercel Express entry point
└── package.json
```

## Local Development

### Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB Atlas cluster or local MongoDB instance

### Installation

Clone the repository and install backend and frontend dependencies:

```bash
git clone https://github.com/DanielGlopina/nutrilog-mern.git
cd nutrilog-mern
npm install
npm --prefix frontend install
```

### Environment Variables

Create a `.env` file in the repository root:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/nutrilog
JWTSECRET=<long-random-secret>
PORT=8000
NODE_ENV=development
```

Never commit the real `.env` file or expose production credentials in frontend code.

### Start the Application

Run the backend and frontend together:

```bash
npm run dev
```

Default local URLs:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
Health:   http://localhost:8000/api/health
```

Vite proxies local `/api` requests to the Express backend.

## Available Scripts

From the repository root:

```bash
npm run dev              # Run frontend and backend concurrently
npm run server           # Run only the backend with Nodemon
npm run client           # Run only the Vite frontend
npm test                 # Run the frontend test suite once
npm run lint             # Run ESLint
npm run build:frontend   # Install frontend dependencies and build production assets
```

From the `frontend` directory:

```bash
npm run dev
npm run build
npm run test:run
npm run test:ui
npm run lint
```

## Tests

The current suite covers utility functions, validation schemas, authentication state, forms, and API mutation hooks.

Run all tests:

```bash
npm test
```

Current baseline:

```text
13 test files
43 tests
```

## API Overview

```text
GET    /api/health
POST   /api/users
POST   /api/auth
GET    /api/auth/me
GET    /api/meals/:dateOrId
POST   /api/meals/create
PUT    /api/meals/update/:mealId
DELETE /api/meals/delete/:mealId
GET    /api/nutritions
POST   /api/nutritions/update
```

Protected endpoints expect the JWT in the `x-auth-token` header.

## Deployment Notes

The repository is deployed as two Vercel projects:

1. The backend project uses the repository root and the Express preset.
2. The frontend project uses `frontend` as its root directory and builds to `dist`.
3. Backend secrets are configured in Vercel as `MONGO_URI`, `JWTSECRET`, and `NODE_ENV`.
4. MongoDB Atlas Network Access must allow requests from the deployment environment. Vercel Hobby deployments use dynamic outbound addresses, so the project currently requires an appropriate Atlas access-list strategy.

## Security

- Passwords are hashed with bcrypt before storage.
- Protected routes verify JWTs on the server.
- Database credentials and signing secrets are server-only environment variables.
- The MongoDB application user should have access only to the `nutrilog` database.
- Any secret exposed in Git history, logs, screenshots, or messages must be rotated immediately.

## Author

Created by [DanielGlopina](https://github.com/DanielGlopina).

## License

This project is licensed under the ISC License.
