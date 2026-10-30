// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.CI && process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : 'https://CyanFroste.github.io',
  base: process.env.CI && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '/scrap-shop',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
