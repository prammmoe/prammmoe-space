import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'

const pagePath = new URL('../src/pages/e-voucher.astro', import.meta.url)
const configPath = new URL('../astro.config.mjs', import.meta.url)

test('e-voucher page exposes three redeemable downloadable vouchers', async () => {
  const page = await readFile(pagePath, 'utf8')

  for (const number of ['001', '002', '003']) {
    assert.match(page, new RegExp(`number: '${number}'`))
    assert.match(page, new RegExp(`image: '/images/e-vouchers/${number}\\.png'`))
  }

  assert.match(page, /https:\/\/wa\.me\/6281247016022/)
  assert.match(page, /Voucher \$\{selectedVoucher\.number\} Redeemed/)
  assert.match(page, /download=/)
  assert.match(page, /aria-label="Reveal a hidden note"/)
  assert.match(page, /prefers-reduced-motion/)
})

test('e-voucher stays hidden from search and the generated sitemap', async () => {
  const [page, config] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(configPath, 'utf8'),
  ])

  assert.match(page, /name="robots" content="noindex, nofollow, noarchive"/)
  assert.match(config, /https:\/\/prammmoe\.space\/e-voucher\//)
})

test('e-voucher renders a clipped envelope flap and a dedicated star hotspot', async () => {
  const page = await readFile(pagePath, 'utf8')

  assert.match(page, /clip-path: polygon\(0 0, 100% 0, 50% 55%\)/)
  assert.match(page, /\.star-surprise \{[^}]*height: 49%[^}]*width: 29%/s)
})

test('e-voucher keeps the reward secret until an envelope opens', async () => {
  const page = await readFile(pagePath, 'utf8')
  const landing = page.slice(0, page.indexOf('<dialog'))

  assert.doesNotMatch(landing, /matcha/i)
  assert.match(landing, /sealed note/i)
})

test('e-voucher animates one selected envelope before revealing its voucher', async () => {
  const page = await readFile(pagePath, 'utf8')

  assert.match(page, /const openingDuration = 500/)
  assert.match(page, /if \(opening\) return/)
  assert.match(page, /button\.classList\.add\('is-opening'\)/)
  assert.match(page, /if \(reduceMotion\) \{\s*showVoucher\(voucher\)\s*return\s*\}/)
  assert.match(page, /window\.setTimeout\(\(\) => \{\s*showVoucher\(voucher\)/s)
})
