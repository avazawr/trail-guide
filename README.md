# Trail Guide

A full-stack web application for browsing and managing walking trails.

### Features

- Public website for browsing trails and their regions
- Admin area with HTML forms for managing the trail catalog
- Public JSON API (`/api`) for reading and writing data
- SQLite database with a one-to-many relationship between regions and trails
- SQL `INNER JOIN` to retrieve related region information
- API write protection using header-based API key authentication
- HTML sanitization to prevent unsafe content
- Responsive styling with Pico.css

### Tech Stack

- TypeScript
- Node.js
- Express
- Nunjucks
- SQLite
- Pico.css
- HTML / CSS

### Getting Started

Install dependencies:

```bash
bun install
```

Create a `.env` file in the project root using `.env.example` as a template.

Initialize the database:

```bash
bun run db:seed
```

Start the development server:

```bash
bun run dev
```

Run TypeScript type checking:

```bash
bun run typecheck
```
