# Medium Clone

A basic blog application built as a learning project to explore **Cloudflare Workers** and **Serverless Backend** architectures. This project demonstrates a full-stack implementation with a focus on high-performance edge computing.

## 🚀 Overview

This application is a simplified clone of Medium, allowing users to sign up, log in, and read blog posts. The primary objective of this project was to master serverless backend concepts using the Cloudflare ecosystem.

## 🛠️ Technology Stack

### Backend
- **Cloudflare Workers**: Serverless execution environment at the edge.
- **Hono**: A small, simple, and ultrafast web framework for the Edges.
- **Prisma (with Accelerate)**: Type-safe ORM with serverless-friendly connection pooling.
- **JWT (JSON Web Tokens)**: Secure authentication and route protection.

### Frontend
- **React (Vite)**: Fast and modern frontend library and build tool.
- **Tailwind CSS**: Elegant and responsive UI design.
- **Axios**: Promised-based HTTP client for API requests.
- **Lucide React**: For beautiful iconography.

### Shared Logic
- **Zod**: TypeScript-first schema validation used across both frontend and backend to ensure data integrity.

## 📂 Project Structure

- `frontend/`: The React application.
- `backend/`: The Cloudflare Workers server using Hono and Prisma.
- `common/`: Shared TypeScript types and Zod schemas (published as a local module).

## ✨ Features

- [x] **User Authentication**: Secure Signup and Login functionality.
- [x] **Blog Feed**: A clean layout to browse through multiple blog posts.
- [x] **Detailed View**: Read the full content of any blog post.
- [ ] **Publish Feature** (Coming Soon): Ability for authenticated users to create and publish their own stories.

## 🛠️ Development

### Backend Setup
1. Navigate to `backend/`.
2. Run `npm install`.
3. Configure your `.env` or `.dev.vars` with `DATABASE_URL` and `JWT_SECRET`.
4. Run `npm run dev` to start the local wrangler server.

### Frontend Setup
1. Navigate to `frontend/`.
2. Run `npm install`.
3. Create a `config.ts` or update the API endpoint to point to your backend.
4. Run `npm run dev` to start the Vite development server.

## 📝 License

This project was created for educational purposes.
