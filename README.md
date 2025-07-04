# PostsTCIT

A full-stack web application for managing posts, built with React, Express, Drizzle ORM, and PostgreSQL. The app allows users to create, filter, and delete posts, with a modern UI powered by Tailwind CSS.

## Features
- View all posts
- Create new posts
- Filter posts by name
- Delete posts
- Responsive, modern UI

## Tech Stack
- **Frontend:** React, Redux Toolkit, Wouter, TanStack React Query, Tailwind CSS, Vite
- **Backend:** Express, Drizzle ORM, PostgreSQL, Neon serverless
- **Shared:** TypeScript types and Zod validation

## Project Structure
```
client/   # Frontend React app
server/   # Express backend API
shared/   # Shared types and schema
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database (Neon or local)

### Environment Variables
Create a `.env` file in the project root with:
```
DATABASE_URL=your_postgres_connection_string
```

### Install Dependencies
```
npm install
```

### Database Setup
Run migrations using Drizzle Kit:
```
npm run db:push
```

### Development
Start the backend and frontend in development mode:
```
npm run dev
```
- http://localhost:5001

### Build for Production
```
npm run build
npm start
```

## API Endpoints
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create a new post (JSON: `{ name, description }`)
- `DELETE /api/posts/:id` - Delete a post by ID

## Scripts
- `npm run dev` - Start dev server (backend + Vite frontend)
- `npm run build` - Build frontend and backend
- `npm start` - Start production server
- `npm run check` - Type-check the codebase
- `npm run db:push` - Run Drizzle migrations

## License
MIT 