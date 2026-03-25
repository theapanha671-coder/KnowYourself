# KnowYourself (FindYourPath)

Self-discovery + career guidance platform for students in Cambodia.

## Tech

- Frontend: React + Tailwind (Vite) in `client/`
- Backend: Node.js + Express + MongoDB (Mongoose) in `server/`

## Pages (frontend routes)

- `/` Home
- `/about` About
- `/test` Self Discovery Test
- `/test/result` Test Result (requires login)
- `/majors` Major Explorer
- `/majors/:slug` Major Detail
- `/roadmaps` Career Roadmaps
- `/roadmaps/:slug` Roadmap Detail
- `/experiences` Student Experiences (posting requires login)
- `/blog` Advice Blog
- `/blog/:slug` Blog Post
- `/login` / `/register`
- `/dashboard` User Dashboard (requires login)

## API (backend routes)

Base URL: `/api`

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me` (Bearer token)
- `GET /majors`, `GET /majors/:slug`
- `GET /careers`, `GET /careers/:slug`
- `GET /posts`, `GET /posts/:slug`
- `GET /experiences`, `POST /experiences` (Bearer token)
- `GET /test/questions`
- `POST /test/submit` (Bearer token)
- `GET /test/me/latest` (Bearer token)
- Admin (Bearer token + admin role):
  - `GET /admin/majors` `POST /admin/majors` `PUT /admin/majors/:id` `DELETE /admin/majors/:id`
  - `GET /admin/careers` `POST /admin/careers` `PUT /admin/careers/:id` `DELETE /admin/careers/:id`
  - `GET /admin/posts` `POST /admin/posts` `PUT /admin/posts/:id` `DELETE /admin/posts/:id`
  - `GET /admin/videos` `POST /admin/videos` `PUT /admin/videos/:id` `DELETE /admin/videos/:id`
  - `GET /admin/experiences` `DELETE /admin/experiences/:id`

## Local setup

### Windows PowerShell note (npm.ps1 blocked)

If PowerShell shows `running scripts is disabled on this system` when you run `npm`, use `npm.cmd` instead:

- `npm.cmd install`
- `npm.cmd run dev`

Or change PowerShell execution policy for your user (optional): `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Poster (A4)

An editable A4 marketing poster template is included:

- `marketing/poster-a4.html:1`

Open it in a browser and print/save as PDF. Replace the “QR CODE” box with a real QR that points to your deployed site.

### 1) Start MongoDB

Option A (Docker):

- `docker compose up -d`

Option B (local install):

- Ensure MongoDB runs on `mongodb://127.0.0.1:27017`

### 2) Start the API server

- `cd server`
- Copy env: `copy .env.example .env`
- Install deps: `npm install`
- Seed sample data: `npm run seed`
- Create an admin user:
  - Set env vars (in `server/.env` or your shell): `ADMIN_EMAIL`, `ADMIN_PASSWORD`, optional `ADMIN_NAME`
  - Run: `npm run create-admin`
- Run dev: `npm run dev`

API runs on `https://knowyourself-3x1r.onrender.com`.

### 3) Start the web app

- `cd client`
- Copy env: `copy .env.example .env`
- Install deps: `npm install`
- Run dev: `npm run dev`

Web runs on `http://localhost:5173`.

## Admin panel

- URL: `/admin` (requires login as an admin user)
- Manage: majors, careers/roadmaps, blog posts, videos, experiences

## Using your own images (Majors)

Option A (upload via Admin):

- Install server deps first: `cd server; npm.cmd install`
- Go to `/admin/majors` and use “Upload image”
- The server will store it under `server/uploads/majors/` and return a URL like `/uploads/majors/<file>`

Option B (static images in client):

- Put files in `client/public/images/majors/`
- Set major `imageUrl` to `/images/majors/your-file.jpg`
