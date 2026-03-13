// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ecompvenience.com',

  devToolbar: {
    enabled: false,
  },

  adapter: vercel(),

  integrations: [sitemap()],
});