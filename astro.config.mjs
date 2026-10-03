import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export default defineConfig({
  site: 'https://prammmoe.space',
  integrations: [sitemap({
    filter: (page) => ![
      'https://prammmoe.space/happy-birthday-nana/',
      'https://prammmoe.space/wishes-for-nana/',
      'https://prammmoe.space/matcha-round-the-globe/',
      'https://prammmoe.space/decode-the-puzzle/',
      'https://prammmoe.space/e-voucher/',
    ].includes(page),
  })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
