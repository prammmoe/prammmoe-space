import { test, expect } from '@playwright/test'

const states = ['default', 'pointer', 'text', 'help', 'progress', 'wait', 'crosshair', 'cell', 'alias', 'move', 'ew-resize', 'ns-resize', 'nwse-resize', 'nesw-resize', 'not-allowed']

test('Zelda cursor states use native frames and preserve semantic controls', async ({ page, request }) => {
  await page.goto('/')
  for (const state of states) {
    const response = await request.get(`/cursors/zelda/${state}-0.cur`)
    expect(response.ok()).toBe(true)
    const frame = await response.body()
    expect(frame.readUInt16LE(2)).toBe(2)
    expect(frame[6]).toBe(32)
    expect(frame[7]).toBe(32)
    await page.evaluate((value) => {
      const element = document.createElement('div')
      element.id = 'cursor-probe'
      element.dataset.cursor = value
      element.textContent = value
      element.style.cssText = 'position:fixed;top:200px;left:20px;width:100px;height:44px;z-index:10'
      document.querySelector('#cursor-probe')?.remove()
      document.body.append(element)
    }, state)
    const probe = page.locator('#cursor-probe')
    await probe.hover()
    expect(await probe.evaluate((element) => getComputedStyle(element).cursor)).toContain(`/cursors/zelda/${state}-`)
    expect(await probe.evaluate((element) => getComputedStyle(element).animationName)).toBe(`zelda-${state}`)
  }
  await page.locator('#cursor-probe').evaluate((element) => element.remove())
  await page.locator('.theme-control').hover()
  expect(await page.locator('.theme-control').evaluate((element) => getComputedStyle(element).cursor)).toContain('/pointer-')
  expect(await page.locator('.theme-control svg').first().evaluate((element) => getComputedStyle(element).cursor)).toContain('/pointer-')
  await page.locator('.profile-intro p').first().hover()
  expect(await page.locator('.profile-intro p').first().evaluate((element) => getComputedStyle(element).cursor)).toContain('/text-')
})

test('cursor frames animate without a pointer overlay and respect reduced motion', async ({ page }) => {
  await page.goto('/')
  await page.locator('main').evaluate((element) => element.setAttribute('data-cursor', 'wait'))
  await page.locator('main').hover({ position: { x: 2, y: 2 } })
  const frames = await page.locator('main').evaluate(async (element) => {
    const values = new Set<string>()
    for (let index = 0; index < 10; index++) {
      values.add(getComputedStyle(element).cursor)
      await new Promise((resolve) => setTimeout(resolve, 40))
    }
    return [...values]
  })
  expect(frames.length).toBeGreaterThan(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('main')).toHaveCSS('animation-name', 'none')
  expect(await page.locator('main').evaluate((element) => getComputedStyle(element).cursor)).toContain('/wait-0.cur')
  await page.emulateMedia({ forcedColors: 'active' })
  expect(await page.locator('main').evaluate((element) => getComputedStyle(element).cursor)).not.toContain('/cursors/zelda/')
})
