import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export default defineConfig({
  site: 'https://prammmoe.com',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => ![
      '/happy-birthday-nana/',
      '/wishes-for-nana/',
      '/matcha-round-the-globe/',
      '/decode-the-puzzle/',
      '/e-voucher/',
      '/404/',
    ].includes(new URL(page).pathname),
  })],
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-high-contrast' } },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
