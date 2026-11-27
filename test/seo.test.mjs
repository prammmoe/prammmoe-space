import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (path) => readFileSync(`dist/${path}`, 'utf8')
const graph = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph']
const privatePaths = ['happy-birthday-nana', 'wishes-for-nana', 'matcha-round-the-globe', 'decode-the-puzzle', 'e-voucher']
const sitemap = read('sitemap-0.xml')
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]))

test('every sitemap URL has indexable HTML and a matching canonical on .com', () => {
  assert.ok(urls.length >= 20)
  for (const url of urls) {
    assert.equal(url.origin, 'https://prammmoe.com')
    assert.equal(url.pathname.endsWith('/'), true)
    const html = read(`${url.pathname.slice(1)}index.html`)
    assert.ok(html.includes(`rel="canonical" href="${url.href}"`), url.href)
    assert.doesNotMatch(html, /content="[^"]*noindex/)
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, url.href)
    assert.match(html, /<meta name="description" content="[^"]{20,}"/)
    assert.match(html, /<meta name="twitter:image" content="https:\/\/prammmoe.com\//)
    const nodes = graph(html)
    assert.ok(nodes.every((node) => node['@type']))
    assert.ok(nodes.every((node) => node['@id'].startsWith('https://prammmoe.com/')))
    assert.doesNotMatch(JSON.stringify(nodes), /prammmoe\.space/)
  }
})

test('private pages and 404 stay out of the sitemap and retain noindex', () => {
  for (const path of privatePaths) {
    assert.ok(!urls.some((url) => url.pathname === `/${path}/`))
    assert.match(read(`${path}/index.html`), /content="[^"]*noindex/)
  }
  assert.ok(!sitemap.includes('/404'))
  assert.match(read('404.html'), /content="noindex, follow"/)
  assert.match(read('robots.txt'), /Sitemap: https:\/\/prammmoe\.com\/sitemap-index\.xml/)
  assert.match(read('sitemap-index.xml'), /https:\/\/prammmoe\.com\/sitemap-0\.xml/)
})

test('profile connects the real name, aliases and social identities', () => {
  const html = read('index.html')
  const nodes = graph(html)
  const person = nodes.find((node) => node['@type'] === 'Person')
  assert.equal(person.name, 'Pramuditha Muhammad Ikhwan')
  assert.deepEqual(person.alternateName, ['Prammmoe', 'prammmoe', 'Ikhwan Pramuditha', 'Pram'])
  assert.equal(person.sameAs.length, 6)
  assert.equal(nodes.find((node) => node['@type'] === 'ProfilePage').mainEntity['@id'], person['@id'])
  assert.ok(existsSync(`dist${new URL(person.image).pathname}`))
  assert.match(html, /<p class="intro-copy"[^>]*>[^<]*Prammmoe and Ikhwan Pramuditha/)
  assert.match(html, /<title>Pramuditha Muhammad Ikhwan \(Prammmoe\) \| iOS Developer<\/title>/)
})

test('all published blog articles identify the visible author and preserve dates and language', () => {
  for (const url of urls.filter((url) => url.pathname.startsWith('/blog/') && url.pathname !== '/blog/')) {
    const html = read(`${url.pathname.slice(1)}index.html`)
    const nodes = graph(html)
    const article = nodes.find((node) => node['@type'] === 'BlogPosting')
    assert.equal(article.author['@id'], 'https://prammmoe.com/#person')
    assert.equal(article.mainEntityOfPage['@id'], `${url.href}#webpage`)
    assert.ok(Number.isFinite(Date.parse(article.datePublished)))
    assert.ok(Number.isFinite(Date.parse(article.dateModified)))
    assert.match(html, /href="\/" rel="author">Pramuditha Muhammad Ikhwan \(Prammmoe\)<\/a>/)
    assert.ok(html.includes(`<html lang="${article.inLanguage}"`))
  }
})
