const sceneColumns = 108
const rows = 112
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

  const snow = Array.from({ length: 1500 }, () => {
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

  const sprite = (lines: string[], x: number, y: number, colors: string[]) => {
    lines.forEach((line, row) => {
      for (let column = 0; column < line.length; column++) {
        if (line[column] !== ' ') paint(x + column, y + row, { char: line[column], color: colors[row % colors.length] })
      }
    })
  }
  const bulbs = ['#ff8075', '#ffdf83', '#83deb5', '#a8c9ff', '#edafff']
  const lettering: Record<string, string[]> = {
    t: ['#####', '  #  ', '  #  ', '  #  ', '  #  '],
    i: [' ### ', '  #  ', '  #  ', '  #  ', ' ### '],
    s: [' ####', '#    ', ' ### ', '    #', '#### '],
    h: ['#   #', '#   #', '#####', '#   #', '#   #'],
    e: ['#####', '#    ', '#### ', '#    ', '#####'],
    a: [' ### ', '#   #', '#####', '#   #', '#   #'],
    o: [' ### ', '#   #', '#   #', '#   #', ' ### '],
    n: ['#   #', '##  #', '# # #', '#  ##', '#   #'],
  }

  const ellipse = (cx: number, cy: number, rx: number, ry: number, colors: string[], glyphs = '@%#xo') => {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) {
      for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
        const nx = (x - cx) / rx
        const ny = (y - cy) / ry
        if (nx * nx + ny * ny > 1) continue
        const shade = Math.min(colors.length - 1, Math.floor((ny + 1) / 2 * colors.length))
        const index = Math.abs(x * 7 + y * 11) % glyphs.length
        paint(x, y, { char: glyphs[index], color: colors[shade] })
      }
    }
  }
  const thread = (x1: number, y1: number, x2: number, y2: number, color: string, char = '~') => {
    const steps = Math.ceil(Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 1.5)
    for (let i = 0; i <= steps; i++) {
      const p = steps ? i / steps : 0
      paint(x1 + (x2 - x1) * p, y1 + (y2 - y1) * p, { char, color })
    }
  }

  const drawHouse = (x: number, base: number, index: number, seconds: number, distant: boolean) => {
    const size = distant ? 0.64 : 0.9 + (index % 3) * 0.05
    const wall = ['#839aaf', '#b87870', '#b7a17c', '#759f91'][index % 4]
    const side = ['#4f697f', '#774a51', '#776b56', '#486e65'][index % 4]
    const height = 26 + (index % 2) * 3
    context.save()
    context.translate(x * cellWidth, (base - height * size) * cellHeight)
    context.scale(size, size)
    context.globalAlpha = distant ? 0.55 : 1

    // Front and side walls give each house a little depth beneath the snow roof.
    for (let row = 9; row < height; row++) {
      for (let column = 2; column <= 27; column++) {
        const edge = column === 2 || column === 22 || column === 27
        const char = edge ? '|' : row % 4 === 0 ? '=' : (column + row) % 3 === 0 ? ':' : '.'
        paint(column, row, { char, color: column > 22 ? side : wall })
      }
    }
    for (let row = 0; row <= 9; row++) {
      const left = Math.round(12 - row * 1.25)
      const right = Math.round(12 + row * 1.1)
      for (let column = left; column <= right + 5; column++) {
        const edge = column === left || column === right + 5
        paint(column, row, { char: edge ? '/' : '.:*='[(row + column) % 4], color: edge || row % 3 === 0 ? '#deecea' : '#9db8c2' })
      }
    }
    thread(0, 10, 23, 10, '#e4efec', '=')
    thread(23, 10, 28, 8, '#afc6cf', '/')
    for (let icicle = 1; icicle < 23; icicle += 3) paint(icicle, 11 + icicle % 2, { char: '|', color: '#bad7df' })

    // A brick chimney and slowly drifting puffs sit above the roof line.
    for (let row = -2; row <= 4; row++) {
      for (let column = 20; column <= 23; column++) paint(column, row, { char: row % 2 ? '#' : '=', color: row === -2 ? '#e5f0eb' : '#b38278' })
    }
    for (let puff = 0; puff < 5; puff++) {
      const rise = (seconds * 1.8 + puff * 1.7 + index) % 9
      paint(21 + Math.sin(rise * 0.5 + index) * 1.5 + rise * 0.3, -3 - rise, { char: puff % 2 ? '~' : ':', color: distant ? '#516a7b' : '#8fa6b4' })
    }

    const window = (wx: number, wy: number, narrow = false) => {
      const width = narrow ? 3 : 5
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < width; column++) {
          const frame = row === 0 || row === 4 || column === 0 || column === width - 1
          const mullion = row === 2 || (!narrow && column === 2)
          const color = frame || mullion ? '#ba9260' : (column + row + index) % 2 ? '#ffe7a3' : '#ffd16e'
          paint(wx + column, wy + row, { char: frame ? '+' : mullion ? '|' : '#', color })
        }
      }
      thread(wx - 1, wy + 5, wx + width, wy + 5, '#d7e5df', '=')
    }
    window(10, 5, true)
    window(5, 13)
    window(15, 13)
    window(5, height - 7)
    window(23, 13, true)
    window(23, height - 7, true)
    for (let row = height - 7; row < height; row++) {
      for (let column = 14; column <= 19; column++) paint(column, row, { char: column === 14 || column === 19 ? '|' : row === height - 7 ? '_' : ':', color: '#b88d65' })
    }
    sprite(['(@)', ' v '], 15, height - 6, ['#81c28e', '#f08d7c'])
    paint(18, height - 2, { char: 'o', color: gold })
    thread(12, height - 8, 21, height - 8, '#dfebe5', '=')
    thread(11, height, 22, height, '#b7ccce', '=')
    thread(10, height + 1, 23, height + 1, '#8daab6', '_')
    for (let bulb = 0; bulb < 6; bulb++) paint(3 + bulb * 4, 11, { char: 'o', color: bulbs[(index + bulb) % bulbs.length] })
    for (let fence = -1; fence < 11; fence += 3) {
      thread(fence, height - 2, fence, height + 1, '#b5c4bd', '|')
      paint(fence, height - 3, { char: '*', color: '#e6eeea' })
    }
    thread(-1, height - 1, 10, height - 1, '#94a99f', '-')
    context.restore()
    context.globalAlpha = 1
  }

  const drawSanta = (seconds: number) => {
    const red = ['#ff9b86', '#f66c67', '#bc434e']
    const white = ['#fff5dd', '#d8e4e5']
    ellipse(10, 16, 8, 8, ['#80b899', '#3e8164', '#285b4d'], '$%#')
    sprite([' \\|/ ', '--*--', ' /|\\ '], 7, 5, [gold])
    // Hat, face, moustache, and beard are separate silhouettes so Santa reads at small sizes.
    ellipse(24, 6, 5, 4, red)
    thread(22, 3, 30, 0, '#ff8e7c', '#')
    thread(30, 0, 32, 5, '#ff8e7c', '#')
    ellipse(32, 5, 1.5, 1.5, white, '*o')
    thread(19, 8, 29, 8, '#fff5dd', '=')
    ellipse(25, 10, 4.5, 3, ['#ffdcad', '#edb792'], 'o:')
    paint(27, 9, { char: '.', color: '#34262c' })
    ellipse(29, 11, 1.7, 1, ['#f7aa92'], 'o')
    ellipse(24, 13, 4.5, 4, white, 'wW@')
    thread(24, 12, 29, 12, '#fff5dd', '~')
    ellipse(23, 19, 7, 6, red)
    thread(18, 22, 29, 22, '#352f3d', '=')
    paint(25, 22, { char: '@', color: gold })
    thread(28, 17, 34, 19 + Math.sin(seconds * 2) * 0.5, '#f68673', '#')
    ellipse(35, 19, 2, 1.5, white, 'o')
    ellipse(31, 25, 4, 2, ['#313944', '#46505b'], '#')

    // Deep sleigh bowl, brass trim, and two curled runners.
    ellipse(20, 28, 17, 5, ['#f48170', '#bb404b', '#843640'])
    thread(2, 24, 35, 24, gold, '=')
    thread(35, 24, 40, 21, '#f9d387', '#')
    ellipse(40, 21, 2, 2, ['#ffdc91'], '@')
    paint(40, 21, { char: 'o', color: '#93444b' })
    for (let i = 0; i < 5; i++) paint(8 + i * 6, 28, { char: '*', color: '#ffc581' })
    thread(10, 32, 8, 36, '#b89871', '/')
    thread(31, 32, 29, 36, '#b89871', '/')
    for (let x = 2; x < 39; x++) paint(x, 36 - Math.sin(x / 39 * Math.PI), { char: '=', color: '#ffe2a1' })
    thread(38, 36, 43, 32, '#ffe2a1', '/')
    sprite([' _@', '(_/'], 41, 30, ['#ffe2a1'])
  }

  const drawDeer = (x: number, y: number, phase: number, leader: boolean) => {
    context.save()
    context.translate(x * cellWidth, y * cellHeight)
    const fur = ['#e4ba83', '#c28a59', '#886044']
    ellipse(10, 12, 9, 3.5, fur)
    thread(1, 11, -2, 8, '#d6ae81', '~')
    ellipse(17, 8, 3.5, 6, fur)
    ellipse(20, 3.5, 4, 2.5, fur)
    ellipse(24, 4, 2, 1.5, ['#eac59b', '#bc8d67'])
    thread(18, 2, 15, -1, '#ebc698', '/')
    thread(21, 2, 23, -1, '#ebc698', '\\')
    paint(22, 3, { char: '*', color: '#1b2430' })
    if (leader) paint(26, 4, { char: '@', color: '#ff736d' })
    for (const antler of [17, 21]) {
      thread(antler, 1, antler - 3, -6, '#e9cc9e', '|')
      thread(antler - 2, -3, antler - 6, -5, '#e9cc9e', '\\')
      thread(antler - 4, -4, antler - 5, -8, '#e9cc9e', '|')
      thread(antler - 2, -4, antler, -8, '#e9cc9e', '/')
      thread(antler - 3, -6, antler - 3, -10, '#e9cc9e', '|')
    }
    for (let leg = 0; leg < 4; leg++) {
      const hip = leg < 2 ? 4 : 15
      const stride = Math.sin(phase + leg * Math.PI * 0.75)
      const knee = hip + stride * 4
      const hoof = knee + Math.cos(phase + leg) * 4
      thread(hip, 14, knee, 18, leg % 2 ? '#bd956f' : '#e1b384', '/')
      thread(knee, 18, hoof, 20 - Math.abs(stride) * 3, '#c7a27c', '\\')
      paint(hoof, 20 - Math.abs(stride) * 3, { char: '=', color: '#f1d5a5' })
    }
    thread(13, 9, 15, 15, '#e96765', '/')
    for (let bell = 0; bell < 3; bell++) paint(14 + bell, 12 + bell, { char: 'o', color: gold })
    context.restore()
  }

  const drawParade = (columns: number, seconds: number, still: boolean) => {
    const size = still ? Math.min(1.1, (columns - 8) / 262) : columns < 150 ? 1 : 1.1
    const paradeWidth = 262 * size
    const travel = columns + paradeWidth + 24
    const x = still ? 4 : ((seconds * 20 + 34) % travel) - paradeWidth - 12
    const y = 15 + Math.sin(seconds * 1.4) * 0.6
    context.save()
    context.translate(x * cellWidth, y * cellHeight)
    context.scale(size, size)

    // The banner trails from the sleigh; each column follows the same travelling wave.
    const flutter = (column: number) => Math.sin(seconds * 2 - column * 0.09) * 0.8
    for (let column = 0; column < 86; column++) {
      paint(column, 15 + flutter(column), { char: column % 2 ? '=' : '~', color: '#ed8d86' })
      paint(column, 28 + flutter(column), { char: column % 2 ? '=' : '~', color: '#ed8d86' })
    }
    for (let row = 16; row < 28; row++) {
      paint(0, row + flutter(0), { char: '|', color: '#ed8d86' })
      paint(85, row + flutter(85), { char: '|', color: '#ed8d86' })
    }
    let letterX = 5
    for (const letter of 'tis the season') {
      if (letter === ' ') { letterX += 4; continue }
      const glyph = lettering[letter]
      glyph.forEach((line, row) => {
        for (let column = 0; column < line.length; column++) {
          if (line[column] === '#') paint(letterX + column, 19 + row + flutter(letterX + column), { char: row % 2 ? '@' : '#', color: row < 2 ? '#fff1be' : '#ffd274' })
        }
      })
      letterX += 6
    }
    thread(86, 20 + flutter(85), 98, 23, gold)
    thread(86, 26 + flutter(85), 98, 23, gold)
    context.save()
    context.translate(96 * cellWidth, 0)
    drawSanta(seconds)
    context.restore()

    // A continuous bowed harness joins Santa's mitten to the rising line of deer.
    for (let i = 131; i < 251; i++) {
      const p = (i - 131) / 120
      const reinY = 19 - p * 16 - Math.sin(p * Math.PI * 4) * 2
      paint(i, reinY, { char: '~', color: '#dbc7a1' })
    }
    for (let deer = 0; deer < 4; deer++) drawDeer(144 + deer * 28, 13 - deer * 4 + Math.sin(seconds * 6 - deer) * 0.6, seconds * 6 - deer, deer === 3)
    for (let i = 0; i < 14; i++) {
      const sparkleX = 96 - ((seconds * 9 + i * 4.3) % 38)
      paint(sparkleX, 32 + Math.sin(i * 2 + seconds) * 2, { char: i % 3 ? '.' : '+', color: i % 2 ? '#ddaf67' : '#fff1ae' })
    }
    context.restore()
  }

  return (time: number, still = false) => {
    const { width, height } = context.canvas
    const scale = Math.min(width / (sceneColumns * cellWidth), height / (rows * cellHeight))
    const columns = width / (cellWidth * scale)
    const canvasRows = height / (cellHeight * scale)
    const top = Math.round(canvasRows - 66)
    const center = columns - 42
    const seconds = time / 1000
    const angle = 0.38 + time / rotationDuration * turn
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, width, height)
    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.font = 'bold 6px ui-monospace, monospace'
    context.textBaseline = 'top'

    for (let x = 0; x < columns; x += 2) {
      const sag = 1 + Math.sin(x / 19) ** 2 * 3
      paint(x, sag, { char: '_', color: '#687f83' })
      if (x % 6 === 0) {
        const index = Math.floor(x / 6)
        const pulse = 0.78 + Math.sin(seconds * 1.5 + index) * 0.22
        context.globalAlpha = pulse
        paint(x, sag + 1, { char: 'o', color: bulbs[index % bulbs.length] })
        context.globalAlpha = 1
      }
    }

    const villageWidth = Math.max(34, columns - 80)
    const houseCount = Math.max(1, Math.floor(villageWidth / 31))
    for (let house = 0; house < houseCount; house++) drawHouse(12 + house * 29, canvasRows - 20 - (house % 2) * 3, house + 2, seconds, true)
    for (let house = 0; house < houseCount; house++) drawHouse(3 + house * 31, canvasRows - 5 - (house % 2) * 2, house, seconds, false)

    sprite([' _===_', ' (o.o)', ' /( : )>', '(  :  )', ' `---\''], 5, canvasRows - 7, ['#f1c876', '#d8e9ee', '#ff9b7b', '#d8e9ee', '#a6bdcb'])
    for (let x = 0; x < columns; x += 2) {
      paint(x, canvasRows - 1 - Math.sin(x * 0.13) ** 2, { char: x % 6 ? '_' : '*', color: '#91aeba' })
    }

    for (let i = 0; i < 30; i++) {
      const x = (i * 23.7 + 8) % columns
      const y = 22 + (i * 13.3) % Math.max(1, canvasRows - 30)
      context.globalAlpha = 0.45 + (Math.sin(seconds * 1.6 + i * 1.7) + 1) * 0.25
      paint(x, y, { char: i % 4 ? '+' : '*', color: i % 3 ? '#b5cbd9' : '#ffe4a1' })
    }
    context.globalAlpha = 1

    for (let row = top + 49; row < canvasRows; row += 2) {
      context.fillStyle = '#243a46'
      for (let x = row % 3; x < columns; x += 3) {
        context.fillText('.', x * cellWidth, row * cellHeight)
      }
    }

    const flakeCount = Math.min(snow.length, Math.round(columns * canvasRows / 16))
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
      let color = depth < -2 && point.shade ? point.shade : point.color
      if (point.char === '@' && depth > 0 && Math.sin(seconds * 2 + point.y) > 0.65) color = '#ffe5ac'
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
    drawParade(columns, seconds, still)
    drawSnow(true)
  }
}
