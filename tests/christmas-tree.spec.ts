import { expect, test } from '@playwright/test'

const start = Date.parse('2026-11-17T00:00:00+07:00')
const end = Date.parse('2027-02-01T00:00:00+07:00')

test.use({ timezoneId: 'America/Los_Angeles' })

test('the tree appears only on the homepage during the Jakarta season', async ({ page }) => {
  for (const [time, visible] of [[start - 1, false], [start, true], [end - 1, true], [end, false]] as const) {
    await page.clock.setFixedTime(time)
    await page.goto('/')
    const tree = page.locator('christmas-tree')
    await expect(tree).toHaveCount(1)
    await expect(tree).toBeHidden()
    await page.evaluate(() => window.scrollBy(0, 60))
    if (visible) await expect(tree).toHaveAttribute('data-reveal', 'shown')
    else await expect(tree).toHaveAttribute('hidden', /.*/)
  }

  await page.clock.setFixedTime(start)
  await page.goto('/projects/')
  await expect(page.locator('christmas-tree')).toHaveCount(0)
})

test('the tree spans the viewport and pauses for visibility and reduced motion', async ({ page }) => {
  await page.clock.setFixedTime(start)
  await page.goto('/')
  const tree = page.locator('christmas-tree')
  const canvas = tree.locator('canvas')
  const frame = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())
  await expect(tree).toHaveAttribute('aria-hidden', 'true')
  await expect(tree).toBeHidden()
  await page.evaluate(() => window.scrollBy(0, 60))
  await expect(tree).toHaveAttribute('data-reveal', 'shown')
  const toggle = page.getByRole('button', { name: 'Switch to light theme' })

  for (const width of [320, 375, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await expect(tree).toBeVisible()
    const panel = (await tree.boundingBox())!
    expect(panel.y).toBeGreaterThanOrEqual((await toggle.boundingBox())!.y + (await toggle.boundingBox())!.height)
    expect(panel.y + panel.height).toBeLessThanOrEqual((await page.locator('#profile').boundingBox())!.y)
    expect(panel.x).toBeCloseTo(0)
    expect(panel.width).toBeCloseTo(width)
    expect(panel.height).toBeGreaterThanOrEqual(340)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
  }

  const darkBackground = 'rgb(13, 23, 34)'
  await expect(page.locator('body')).toHaveCSS('background-color', darkBackground)
  await expect(tree.locator('.scene')).toHaveCSS('background-color', darkBackground)
  await toggle.click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(tree.getByRole('button')).toHaveCount(0)
  const initial = await frame()
  await expect.poll(frame).not.toBe(initial)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  const hidden = await frame()
  await page.waitForTimeout(150)
  expect((await frame()) === hidden).toBe(true)
  await page.evaluate(() => {
    Reflect.deleteProperty(document, 'hidden')
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(frame).not.toBe(hidden)

  await page.locator('footer').scrollIntoViewIfNeeded()
  await expect.poll(async () => {
    const before = await frame()
    await page.waitForTimeout(150)
    return (await frame()) === before
  }).toBe(true)

  const offscreen = await frame()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await tree.scrollIntoViewIfNeeded()
  await expect(canvas).toBeVisible()
  await expect.poll(async () => (await frame()) !== offscreen).toBe(true)
  const still = await frame()
  await page.waitForTimeout(150)
  expect((await frame()) === still).toBe(true)
})

test('the colored ornaments change position as the tree rotates', async ({ page }) => {
  await page.clock.install({ time: new Date(start) })
  await page.goto('/')
  const tree = page.locator('christmas-tree')
  const canvas = tree.locator('canvas')
  const ornaments = () => canvas.evaluate((element: HTMLCanvasElement) => {
    const width = Math.floor(element.width / 3)
    const height = Math.floor(element.height * 0.7)
    const pixels = element.getContext('2d')!.getImageData(width, 0, width, height).data
    const positions: number[] = []
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i] > 200 && pixels[i + 1] < 110 && pixels[i + 2] < 100 && pixels[i + 3] > 150) positions.push(i)
    }
    return positions.join(',')
  })

  await page.evaluate(() => window.scrollBy(0, 60))
  await expect(tree).toHaveAttribute('data-reveal', 'shown')
  await expect.poll(() => canvas.evaluate((element: HTMLCanvasElement) => element.width)).toBeGreaterThan(300)
  await page.clock.runFor(6500)
  const snowfall = () => canvas.evaluate((element: HTMLCanvasElement) => {
    const { data } = element.getContext('2d')!.getImageData(0, 0, Math.floor(element.width / 4), 160)
    let signature = 0
    for (let i = 3; i < data.length; i += 4) signature = (Math.imul(signature, 31) + data[i]) | 0
    return signature
  })
  const first = await ornaments()
  expect(first).not.toBe('')
  const firstSnow = await snowfall()
  await page.clock.runFor(3000)
  const second = await ornaments()
  expect(second).not.toBe('')
  expect(second === first).toBe(false)
  expect(await snowfall()).not.toBe(firstSnow)
})
