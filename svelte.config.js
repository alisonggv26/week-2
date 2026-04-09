import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      // In production, GitHub Pages serves from /week-2 (the repo name).
      // Locally, the base is empty so dev server works at http://localhost:5173.
      base: dev ? '' : '/week-2'
    }
  }
};

export default config;
