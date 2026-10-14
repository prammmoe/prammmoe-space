import { test, expect } from '@playwright/test'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const routes = ['/', '/blog/', '/projects/', '/media/', '/musics/',
  '/blog/securing-api-requests-with-hmac-in-swift/',
  '/blog/getting-to-know-server-sent-events-on-ios/',
  '/blog/the-sun-spacetime-and-the-order-of-creation/',
  '/blog/perbedaan-sort-dan-sorted/',
  '/blog/leetcode-two-sum/', '/blog/litkod-fizzbuzz/',
  '/projects/curated-works-2025/', '/projects/old-portfolio/',
  '/projects/erha-buddy/', '/projects/slng/', '/projects/paintee/', '/projects/rooted-dbt/']

test('career comes first and engineering writing is curated', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pramuditha Muhammad Ikhwan')
  await expect(page.locator('main h2')).toHaveText(['Projects', 'Writing', 'Experience', 'Tech stack', 'Education', 'Services', 'Contact me'])
  await expect(page.locator('#writing li')).toHaveCount(3)
  await expect(page.locator('#writing')).not.toContainText('The Sun, Spacetime')
  await expect(page.locator('header nav')).not.toContainText('Media')
  await expect(page.getByRole('link', { name: 'Download resume', exact: true })).toHaveAttribute('href', '/resume.pdf')
  await expect(page.locator('#services dt')).toHaveText(['Native iOS apps & MVPs', 'Features & integrations', 'Bug fixes, maintenance & releases', 'Websites & web applications', 'Data annotation', 'Computer vision & YOLO training'])
  await expect(page.getByRole('link', { name: 'Send email', exact: true })).toHaveAttribute('href', 'mailto:ikhwanpramuditha05@gmail.com?subject=Freelance%20project%20inquiry')
})

test('single theme button defaults to light and persists explicit choices', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.theme-control')).toHaveCount(1)
  const toggle = page.getByRole('button', { name: 'Switch to dark theme' })
  expect(await toggle.evaluate((button) => ({ width: button.getBoundingClientRect().width, height: button.getBoundingClientRect().height }))).toEqual({ width: 44, height: 44 })
  await toggle.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('.theme-moon')).toBeVisible()
  await page.goto('/blog/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.theme-sun')).toBeVisible()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('freelance gradient runs automatically and respects visibility and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const card = page.locator('.freelance-card')
  await expect(card).toHaveAttribute('data-motion', 'paused')
  await card.scrollIntoViewIfNeeded()
  await expect(card).toHaveAttribute('data-motion', 'running')
  const initialTransform = await card.evaluate((element) => getComputedStyle(element, '::before').transform)
  await expect.poll(() => card.evaluate((element) => getComputedStyle(element, '::before').transform)).not.toBe(initialTransform)
  const initialX = await card.evaluate((element) => new DOMMatrix(getComputedStyle(element, '::before').transform).m41)
  await expect.poll(() => card.evaluate((element) => new DOMMatrix(getComputedStyle(element, '::before').transform).m41)).toBeGreaterThan(initialX)
  expect(await card.evaluate((element) => getComputedStyle(element, '::before').animationName)).toBe('card-shimmer')
  await expect(card.getByRole('button')).toHaveCount(0)
  await expect(card.getByRole('link', { name: 'View my Upwork profile' })).toHaveCount(0)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(card).toHaveAttribute('data-motion', 'paused')
  await page.evaluate(() => {
    Reflect.deleteProperty(document, 'hidden')
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(card).toHaveAttribute('data-motion', 'running')
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(card).toHaveAttribute('data-motion', 'paused')
  await card.scrollIntoViewIfNeeded()
  await expect(card).toHaveAttribute('data-motion', 'running')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(card).toHaveAttribute('data-motion', 'paused')
  expect(await card.evaluate((element) => getComputedStyle(element, '::before').animationName)).toBe('none')
})

test('footer connects to real profiles with labelled icon links', async ({ page, request }) => {
  await page.goto('/')
  const links = page.getByRole('navigation', { name: 'Let’s connect' }).getByRole('link')
  await expect(links).toHaveCount(6)
  const profiles = [
    ['LinkedIn', 'https://linkedin.com/in/ikhwanpram', '/social/linkedin.svg'],
    ['GitHub', 'https://github.com/prammmoe', '/tech/github.svg'],
    ['Instagram', 'https://instagram.com/ikhwanpramuditha', '/social/instagram.svg'],
    ['Medium', 'https://medium.com/@prammmoe', '/social/medium.svg'],
    ['LeetCode', 'https://leetcode.com/prammmoe', '/social/leetcode.svg'],
    ['Upwork', 'https://www.upwork.com/freelancers/prammmoe', '/social/upwork.svg'],
  ]
  for (const [name, href, icon] of profiles) {
    const link = page.getByRole('navigation', { name: 'Let’s connect' }).getByRole('link', { name, exact: true })
    await expect(link).toHaveAttribute('href', href)
    await expect(link).toHaveAttribute('title', name)
    expect(await link.evaluate((element) => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height }))).toEqual({ width: 52, height: 52 })
    expect((await request.get(icon)).status()).toBe(200)
  }
  await page.goto('/blog/')
  await expect(page.getByRole('navigation', { name: 'Let’s connect' }).getByRole('link')).toHaveCount(6)
  await expect(page.locator('.freelance-card')).toHaveCount(0)
})

for (const width of [320, 375, 768, 1024, 1440]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${width}px ${theme}: public pages fit and images load`, async ({ page }) => {
      test.setTimeout(120_000)
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme: theme })
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      for (const route of routes) {
        const response = await page.goto(route)
        expect(response?.status()).toBe(200)
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
        expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.hasAttribute('width') && image.hasAttribute('height')))).toBe(true)
        expect(await page.locator('img:not([loading="lazy"])').evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0)), route).toBe(true)
      }
      expect(errors).toEqual([])
    })
  }
}

test('keyboard skip link and navigation work', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.getByRole('link', { name: 'Writing', exact: true }).click()
  await expect(page.locator('header nav a[aria-current="page"]')).toHaveText('Writing')
  await page.getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page.locator('header nav a[aria-current="page"]')).toHaveText('Projects')
  await page.getByRole('link', { name: 'ERHA Buddy: Evolving and Securing a Production iOS App at Scale' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ERHA Buddy: Evolving and Securing a Production iOS App at Scale')
  await page.getByRole('link', { name: 'Back to projects' }).click()
  await expect(page).toHaveURL('/projects/')
})

test('all content images and internal link targets exist in the build', async ({ page, request }) => {
  const targets = new Set<string>()
  for (const route of routes) {
    await page.goto(route)
    const images = await page.locator('img').evaluateAll((elements) => elements.map((element) => (element as HTMLImageElement).src))
    const links = await page.locator('a[href]').evaluateAll((elements) => elements.map((element) => (element as HTMLAnchorElement).href))
    for (const url of [...images, ...links]) if (url.startsWith('http://127.0.0.1:4321/')) targets.add(url.split('#')[0])
  }
  for (const url of targets) {
    const response = await request.get(url)
    expect(response.status(), url).toBe(200)
    if (url.includes('/_astro/') && /\.(webp|jpg|png|jpeg)$/.test(url)) expect(response.headers()['content-type'], url).toMatch(/^image\//)
  }
})

test('capture desktop and mobile previews in both themes', async ({ page }, testInfo) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme })
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
      await page.goto('/')
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('.theme-control').click()
      await page.evaluate(() => (document.activeElement as HTMLElement)?.blur())
      await page.locator('#tech-stack').screenshot({ path: testInfo.outputPath(`tech-stack-${width}-${theme}.png`) })
      await page.locator('.site-header').screenshot({ path: testInfo.outputPath(`header-${width}-${theme}.png`) })
      await page.locator('.freelance-card').screenshot({ path: testInfo.outputPath(`freelance-${width}-${theme}.png`), animations: 'disabled' })
      await page.locator('.site-footer').screenshot({ path: testInfo.outputPath(`footer-${width}-${theme}.png`) })
      await page.screenshot({ path: testInfo.outputPath(`home-${width}-${theme}.png`), fullPage: true })
    }
  }
})

test('blocked storage and disabled JavaScript keep the website usable', async ({ browser }) => {
  const blocked = await browser.newContext({ colorScheme: 'dark' })
  await blocked.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked') } })
  })
  const page = await blocked.newPage()
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('http://127.0.0.1:4321/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(errors).toEqual([])
  await blocked.close()
  const noScript = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' })
  const staticPage = await noScript.newPage()
  await staticPage.goto('http://127.0.0.1:4321/')
  await expect(staticPage.locator('.theme-control')).toBeHidden()
  await expect(staticPage.locator('.motion-control')).toBeHidden()
  expect(await staticPage.locator('body').evaluate((body) => getComputedStyle(body).backgroundColor)).toBe('rgb(250, 250, 250)')
  await staticPage.getByRole('link', { name: 'Writing', exact: true }).click()
  await expect(staticPage.getByRole('heading', { level: 1 })).toHaveText('Writing')
  await noScript.close()
})

test('public pages pass axe in both themes', async ({ page }, testInfo) => {
  test.setTimeout(180_000)
  const source = await readFile(resolve('node_modules/axe-core/axe.min.js'), 'utf8')
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme })
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
    for (const route of routes) {
      await page.goto(route)
      await page.addScriptTag({ content: source })
      const results = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: (options: object) => Promise<{ violations: { id: string; impact: string; nodes: unknown[] }[] }> } }).axe
        return axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } })
      })
      await testInfo.attach(`axe-${theme}-${route.replaceAll('/', '_')}`, { body: JSON.stringify(results), contentType: 'application/json' })
      expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact)).map((violation) => ({ route, theme, id: violation.id, nodes: violation.nodes.length }))).toEqual([])
    }
  }
})

test('SEO, sitemap, draft exclusion, math CSS, and PDF downloads', async ({ page, request }) => {
  for (const route of routes) {
    await page.goto(route)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{20,}/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://prammmoe.space${route}`)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://prammmoe.space/social-card.png')
  }
  await page.goto('/blog/perbedaan-sort-dan-sorted/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'id')
  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText())
  expect(structuredData['@graph'].find((entry: { '@type': string }) => entry['@type'] === 'BlogPosting').inLanguage).toBe('id')
  expect(await page.locator('link[rel="stylesheet"]').evaluateAll((links) => links.some((link) => (link as HTMLLinkElement).href.includes('katex')))).toBe(false)
  await page.goto('/blog/the-sun-spacetime-and-the-order-of-creation/')
  expect(await page.locator('link[rel="stylesheet"]').evaluateAll((links) => links.some((link) => (link as HTMLLinkElement).href.includes('katex')))).toBe(true)
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8')
  for (const slug of ['happy-birthday-nana', 'wishes-for-nana', 'matcha-round-the-globe', 'decode-the-puzzle', 'e-voucher', 'media/media', 'musics/example-music']) expect(sitemap).not.toContain(slug)
  await expect(access('dist/media/media/index.html')).rejects.toThrow()
  await expect(access('dist/musics/example-music/index.html')).rejects.toThrow()
  for (const file of ['resume.pdf', 'portfolio.pdf']) {
    const response = await request.get(`/${file}`)
    expect(response.status()).toBe(200)
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF')
  }
  await page.goto('/')
  const resumeDownload = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download resume', exact: true }).click()
  expect((await resumeDownload).suggestedFilename()).toBe('resume.pdf')
  const portfolioDownload = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download portfolio', exact: true }).click()
  expect((await portfolioDownload).suggestedFilename()).toBe('portfolio.pdf')
})
