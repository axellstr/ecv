// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ecompvenience.com',

  security: {
    // Allow POST to API routes when Origin header is missing or differs (e.g. behind Vercel proxy)
    checkOrigin: false,
  },

  devToolbar: {
    enabled: false,
  },

  adapter: vercel(),

  integrations: [sitemap()],
});