// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react'
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react(), mdx()],
  adapter: netlify(),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
})