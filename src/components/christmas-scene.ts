const sceneColumns = 84
const rows = 64
const cellWidth = 4
const cellHeight = 5
const crownRows = 43
const crownBase = 52
const growthDuration = 2000
const ornamentDuration = 4000
const rotationDuration = 12_000
const turn = Math.PI * 2
export const introDuration = 6000

type Glyph = { char: string; color: string }
type ScenePoint = Glyph & { x: number; y: number; z: number; appears: number; shade?: string }

export function createChristmasScene(context: CanvasRenderingContext2D) {
  let seed = 1225
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const pick = (choices: string) => choices[Math.floor(random() * choices.length)]
  const points: ScenePoint[] = []
  const greens = ['#167044', '#248d4e', '#33a75b', '#59bf6b', '#87cb7f']
  const gold = '#ffcf5d'
  const light = '#ffea91'
  const radiusAt = (level: number) =>
    Math.max(0.65, 1.1 + (crownRows - level) * 0.63 - (level % 7) * 0.39)
  const addBranchPoint = (level: number, angle: number, radius: number, glyph: Glyph, appears: number, shade?: string) => {
    const branch = 1 + 0.1 * Math.sin(angle * 3 + level * 0.16)
    points.push({
      x: Math.cos(angle) * radius * branch,
      y: crownBase - level,
      z: Math.sin(angle) * radius * branch * 0.83,
      ...glyph, appears, shade,
    })
  }

  for (let level = 0; level <= crownRows; level++) {
    const radius = radiusAt(level)
    const count = Math.ceil(radius * 6)
    for (let index = 0; index < count; index++) {
      const angle = (index + random()) / count * turn
      const r = radius * (0.84 + random() * 0.16)
      const char = pick('WVX&%o*+.:')
      const color = greens[Math.floor(random() * greens.length)]
      addBranchPoint(level, angle, r, { char, color }, level / crownRows * growthDuration, '#19573d')
    }
  }

  for (let index = 0; index < 360; index++) {
    const progress = index / 359
    const level = 2 + progress * 36
    const angle = progress * turn * 5
    const radius = radiusAt(Math.round(level)) + 0.9
    const appears = growthDuration + progress * (ornamentDuration - growthDuration)
    addBranchPoint(level, angle, radius, { char: pick('@#=+~'), color: gold }, appears, '#9d7636')
    if (index % 2 === 0) {
      addBranchPoint(level + 1, angle, radius + 0.2, { char: pick('#*+:'), color: light }, appears, '#a67d39')
    }
  }

  for (let index = 0; index < 35; index++) {
    const level = 3 + random() * 33
    const angle = random() * turn
    const radius = radiusAt(Math.round(level)) + 1.2
    const appears = 2100 + level / 36 * 1800
    const color = index % 4 === 0 ? '#f4b652' : '#ff5c50'
    addBranchPoint(level, angle, radius, { char: '@', color }, appears, '#973b36')
    addBranchPoint(level + 1, angle, radius, { char: 'o', color: '#ffac7d' }, appears, '#9c5439')
    addBranchPoint(level, angle + 1 / radius, radius, { char: 'O', color }, appears, '#973b36')
  }

  for (let y = crownBase; y < 57; y++) {
    for (let x = -2; x <= 2; x++) {
      points.push({ x, y, z: 0, char: pick('|:!'), color: '#b88049', appears: 0 })
    }
  }

  const giftColors = [
    ['#ff5d54', '#b83532'], ['#7ba4ff', '#375eae'],
    ['#62d699', '#268a63'], ['#f7ab4d', '#b16c2c'],
    ['#ec8bdf', '#9a407f'], ['#7fdedc', '#388d94'],
    ['#fb7853', '#b44c32'], ['#b6a0ff', '#7152c1'],
  ]
  giftColors.forEach(([bright, shade], index) => {
    const angle = -0.25 + index * turn / giftColors.length
    const x = Math.cos(angle) * 33
    const z = Math.sin(angle) * 25
    const size = [9, 6, 8, 5][index % 4]
    const appears = 4300 + index * 210

    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        const ribbon = row === Math.floor(size / 2) || column === Math.floor(size / 2)
        const color = ribbon ? gold : bright
        const char = ribbon ? pick('#+=') : pick('@#%x.')
        const offset = column - (size - 1) / 2
        const edge = (size - 1) / 2
        const y = 56 - row
        points.push(
          { x: x + offset, y, z: z + edge, char, color, appears, shade },
          { x: x + offset, y, z: z - edge, char, color, appears, shade },
          { x: x + edge, y, z: z + offset, char, color: ribbon ? gold : shade, appears },
          { x: x - edge, y, z: z + offset, char, color: ribbon ? gold : shade, appears },
        )
      }
    }
  })

  const snow = Array.from({ length: 950 }, () => {
    const near = random() < 0.28
    return {
      x: random(), y: random(), phase: random() * turn,
      speed: near ? 6 + random() * 5 : 2.5 + random() * 3,
      char: near ? pick('..+*') : pick('...+'),
      color: near ? pick('001') === '1' ? '#e0efff' : '#9db9d0' : '#66879f',
      near,
    }
  })
  const star = [
    '    #    ',
    '    *    ',
    '   #@#   ',
    '*##@@@##*',
    '  #@@@#  ',
    '  #* *#  ',
    '  *   *  ',
  ]

  const paint = (x: number, y: number, { char, color }: Glyph) => {
    context.fillStyle = color
    context.fillText(char, Math.round(x) * cellWidth, Math.round(y) * cellHeight)
  }

  return (time: number) => {
    const { width, height } = context.canvas
    const scale = Math.min(width / (sceneColumns * cellWidth), height / (rows * cellHeight))
    const columns = width / (cellWidth * scale)
    const canvasRows = height / (cellHeight * scale)
    const top = Math.round((canvasRows - rows) / 2)
    const center = (columns - 1) / 2
    const seconds = time / 1000
    const angle = 0.38 + time / rotationDuration * turn
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, width, height)
    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.font = 'bold 6px ui-monospace, monospace'
    context.textBaseline = 'top'

    for (let row = top + 49; row < canvasRows; row += 2) {
      context.fillStyle = '#243a46'
      for (let x = row % 3; x < columns; x += 3) {
        context.fillText('.', x * cellWidth, row * cellHeight)
      }
    }

    const flakeCount = Math.min(snow.length, Math.round(columns * canvasRows / 21))
    const drawSnow = (near: boolean) => {
      for (let index = 0; index < flakeCount; index++) {
        const flake = snow[index]
        if (flake.near !== near) continue
        const wind = Math.sin(seconds * 1.3 + flake.phase) * 1.4
        const x = (flake.x * columns + wind + columns) % columns
        const y = (flake.y * canvasRows + seconds * flake.speed) % canvasRows
        context.fillStyle = flake.color
        context.fillText(flake.char, x * cellWidth, y * cellHeight)
      }
    }
    drawSnow(false)

    context.translate(0, top * cellHeight)
    // Keep the nearest point in each character cell so ornaments pass behind the branches.
    const cells = new Map<number, { x: number; y: number; depth: number; point: ScenePoint }>()
    const stride = Math.ceil(columns)
    for (const point of points) {
      if (point.appears > time) continue
      const depth = point.x * sin + point.z * cos
      const x = Math.round(center + (point.x * cos - point.z * sin) * (1 + depth / 240))
      const y = Math.round(point.y + depth * 0.16)
      const key = y * stride + x
      if ((cells.get(key)?.depth ?? -Infinity) > depth) continue
      cells.set(key, { x, y, depth, point })
    }
    for (const { x, y, depth, point } of cells.values()) {
      const color = depth < -2 && point.shade ? point.shade : point.color
      paint(x, y, { char: point.char, color })
    }

    if (time >= ornamentDuration) {
      context.shadowColor = '#ffbd39'
      context.shadowBlur = 4 * scale
      star.forEach((line, y) => {
        Array.from(line).forEach((char, x) => {
          if (char !== ' ') paint(center - 4 + x, y + 2, { char, color: char === '@' ? light : gold })
        })
      })
      context.shadowBlur = 0
    }

    context.translate(0, -top * cellHeight)
    drawSnow(true)
  }
}
