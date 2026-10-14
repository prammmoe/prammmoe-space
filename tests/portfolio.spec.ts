import { test, expect } from '@playwright/test'

test('portfolio index connects the PDF narrative to readable case studies', async ({ page }) => {
  await page.goto('/projects/curated-works-2025/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('iOS Engineering Portfolio')
  for (const title of ['ERHA Buddy', 'SLNG', 'Paintee', 'Rooted DBT']) {
    await expect(page.locator('main').getByRole('link', { name: new RegExp(title) })).toBeVisible()
  }
  for (const text of ['Dialogua', 'Miruu', 'FreeUtang', 'Infinite Learning', 'August 2021', 'February 2026', '+62 812 4701 6022']) {
    await expect(page.locator('main')).toContainText(text)
  }
})

test('ERHA contribution preserves outcomes and their qualifications', async ({ page }) => {
  await page.goto('/projects/erha-buddy/')
  for (const text of ['40,000', 'two-person', '98.1%', 'quarter-over-quarter', 'contributed', '7–9', '1–3', '89%', 'quoteId', 'idempotency', 'registration time']) {
    await expect(page.locator('main')).toContainText(text)
  }
  await expect(page.locator('main h2')).toHaveCount(10)
})

test('SLNG historical metrics and remaining case studies render as text', async ({ page }) => {
  await page.goto('/projects/slng/')
  for (const text of ['1.25K', '584', '21.4%', '117', '3.02', 'Opt-in only', 'September 24', 'December 22', 'Not enough data', '1.5 seconds', 'Share Extension', 'Speech-to-Text']) {
    await expect(page.locator('main')).toContainText(text)
  }
  await page.goto('/projects/paintee/')
  for (const text of ['continuous AR session', 'voice', 'previewing', 'dotting', 'outlining', 'painting', 'RealityKit']) {
    await expect(page.locator('main')).toContainText(text)
  }
  await page.goto('/projects/rooted-dbt/')
  for (const text of ['LessonContent', 'LessonRoute', 'LessonItemCellView', 'MindfulnessLessonRoute', 'DistressLessonRoute', 'small, well-scoped']) {
    await expect(page.locator('main')).toContainText(text)
  }
})

test('case study section navigation supports keyboard and anchors', async ({ page }) => {
  await page.goto('/projects/erha-buddy/')
  const contents = page.locator('details.article-contents')
  await contents.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(contents).toHaveAttribute('open', '')
  await contents.getByRole('link', { name: 'App Attest: handling verification failures' }).click()
  await expect(page).toHaveURL(/#app-attest-handling-verification-failures$/)
  await expect(page.locator('#app-attest-handling-verification-failures')).toBeInViewport()
})

test('capture readable portfolio previews', async ({ page }, testInfo) => {
  test.setTimeout(120_000)
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme })
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme)
      for (const slug of ['erha-buddy', 'slng', 'rooted-dbt', 'paintee', 'curated-works-2025']) {
        await page.goto(`/projects/${slug}/`)
        for (const image of await page.locator('img:visible').all()) {
          await image.scrollIntoViewIfNeeded()
          await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
        }
        await page.evaluate(() => { document.querySelectorAll('.project-screens').forEach((track) => { track.scrollLeft = 0 }); window.scrollTo(0, 0) })
        await page.screenshot({ path: testInfo.outputPath(`${slug}-${width}-${theme}.png`), fullPage: true })
      }
    }
  }
})

test('every project has a cover and ERHA screenshots stay in their relevant sections', async ({ page }) => {
  await page.goto('/projects/')
  await expect(page.locator('.project-row img')).toHaveCount(5)
  await expect(page.locator('.project-list').getByRole('link', { name: 'iOS Engineering Portfolio', exact: true })).toHaveCount(0)
  for (const slug of ['erha-buddy', 'slng', 'paintee', 'rooted-dbt', 'curated-works-2025', 'old-portfolio']) {
    await page.goto(`/projects/${slug}/`)
    await expect(page.locator('.cover img')).toBeVisible()
    expect(await page.locator('.cover img').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  await page.goto('/projects/erha-buddy/')
  await expect(page.locator('.project-screens img')).toHaveCount(21)
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.locator('.project-screens').last().scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  const images = await page.locator('.project-screens img').evaluateAll((elements) => elements.map((image) => ({ src: (image as HTMLImageElement).src, loading: image.getAttribute('loading'), alt: image.getAttribute('alt') })))
  expect(images.every((image) => image.src.includes('/_astro/') && image.loading === 'lazy' && image.alt)).toBe(true)
})

test('screenshot galleries keep keyboard and native touch swipe without visible controls', async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/projects/erha-buddy/')
  const gallery = page.getByRole('region', { name: 'Registration and guest checkout' })
  const track = gallery.locator('.project-screens')
  await expect(gallery.getByRole('button')).toHaveCount(0)
  await expect(gallery.locator('.gallery-count')).toHaveCount(0)
  await track.focus()
  await page.keyboard.press('End')
  await expect.poll(() => track.evaluate((element) => element.scrollWidth - element.clientWidth - element.scrollLeft)).toBeLessThan(3)
  await page.keyboard.press('Home')
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeLessThan(3)
  await page.keyboard.press('ArrowRight')
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100)
  await expect(gallery.locator('.screen-caption')).toHaveCount(4)
  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })
  const touchPage = await mobile.newPage()
  await touchPage.goto('http://127.0.0.1:4321/projects/erha-buddy/')
  const touchTrack = touchPage.locator('.project-screens').first()
  await touchTrack.scrollIntoViewIfNeeded()
  const box = (await touchTrack.boundingBox())!
  const client = await mobile.newCDPSession(touchPage)
  const y = box.y + 160
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + 240, y }] })
  for (const x of [200, 160, 120, 80, 40]) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box.x + x, y }] })
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect.poll(() => touchTrack.evaluate((element) => element.scrollLeft)).toBeGreaterThan(50)
  expect(await touchPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await mobile.close()
})

test('SLNG screenshots follow their engineering narrative without gallery controls', async ({ page }) => {
  await page.goto('/projects/slng/')
  await expect(page.locator('.project-screens img')).toHaveCount(14)
  const groups = [['Understanding slang', 2], ['Meaning and context', 3], ['Keyboard extension', 2], ['Expressive translation', 1], ['Voice input and processing', 2], ['Backend load test', 1], ['Feature usage analytics', 1], ['SLNG technology stack', 1], ['App Store Connect metrics', 1]] as const
  for (const [name, count] of groups) {
    const gallery = page.getByRole('region', { name, exact: true })
    await expect(gallery.locator('img')).toHaveCount(count)
    await expect(gallery.locator('.screen-caption')).toHaveCount(count)
    await expect(gallery.getByRole('button')).toHaveCount(0)
    for (const image of await gallery.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      await expect(image).toHaveAttribute('loading', 'lazy')
      await expect(image).toHaveAttribute('src', /\/_astro\/.*\.webp/)
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const track = page.getByRole('region', { name: 'Meaning and context', exact: true }).locator('.project-screens')
  await track.focus()
  await page.keyboard.press('End')
  await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(100)
})

test('one and two screenshots use balanced layouts with full-size image access', async ({ page, request }) => {
  await page.goto('/projects/slng/')
  const single = page.getByRole('region', { name: 'Expressive translation', exact: true })
  const pair = page.getByRole('region', { name: 'Voice input and processing', exact: true })
  await page.setViewportSize({ width: 1440, height: 900 })
  const singleItem = single.locator('.project-screens > p')
  expect(await singleItem.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(2)
  expect(await pair.locator('.project-screens').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(2)
  for (const group of [single, pair]) {
    await expect(group.locator('.project-screens')).not.toHaveAttribute('tabindex')
    const link = group.locator('.project-screens > p > a').first()
    await expect(link).toHaveAttribute('aria-haspopup', 'dialog')
    expect((await request.get((await link.getAttribute('href'))!)).ok()).toBe(true)
    await expect(link).toHaveAccessibleName(/View full-size screenshot:/)
  }
  await expect(single.locator('.screen-full-size')).toHaveCount(1)
  await expect(pair.locator('.screen-full-size')).toHaveCount(0)
  await page.setViewportSize({ width: 375, height: 900 })
  expect(await singleItem.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1)
  expect(await pair.locator('.project-screens').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1)
  for (const group of [single, pair]) {
    expect(await group.locator('.project-screens').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  }
})


test('full-size screenshots open an accessible popup and restore focus', async ({ page }, testInfo) => {
  await page.goto('/projects/slng/')
  const trigger = page.getByRole('region', { name: 'Expressive translation', exact: true }).locator('.screen-full-size')
  const dialog = page.getByRole('dialog', { name: 'Full-size screenshot' })
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await trigger.click()
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('button')).toHaveCount(0)
    await expect(dialog).toBeFocused()
    await expect.poll(() => dialog.locator('img').evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    await page.screenshot({ path: testInfo.outputPath(`popup-${width}.png`) })
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  }
  const preview = page.getByRole('region', { name: 'Expressive translation', exact: true }).locator('.project-screens > p > a')
  await preview.click()
  await expect(dialog).toBeVisible()
  await page.mouse.click(2, 2)
  await expect(dialog).not.toBeVisible()
})
