// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Update this to your production domain before deploying — it is used for
  // canonical URLs and sitemap-style metadata.
  site: 'https://harrisonfry.com',

  // Static output: `astro build` emits plain HTML/CSS/JS into ./dist
  output: 'static',

  build: {
    inlineStylesheets: 'auto',
  },

  devToolbar: {
    enabled: false,
  },
});
