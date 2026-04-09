# Week 2 — SvelteKit + Tailwind CSS

A modern static site built with **SvelteKit** and **Tailwind CSS v4**, deployed to GitHub Pages via GitHub Actions.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) — full-stack web framework with `@sveltejs/adapter-static` for static export
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS framework
- [Vite](https://vitejs.dev/) — next-generation front-end tooling
- [TypeScript](https://www.typescriptlang.org/)

## Development

This project uses a **VS Code Dev Container** (`mcr.microsoft.com/devcontainers/javascript-node:22`) so the environment is fully reproducible.

```bash
npm install   # install dependencies (auto-runs on container create)
npm run dev   # start dev server at http://localhost:5173
npm run build # production build → ./build
npm run preview # preview the production build
```

## Deployment

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:

1. Installs dependencies with `npm ci`
2. Builds the static site with `npm run build`
3. Publishes the `build/` directory to **GitHub Pages**

Live site: <https://alisonggv26.github.io/week-2>
