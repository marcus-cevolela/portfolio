function buildLogo3D(THREE) {
  const CX = 519, CY = 285, K = 0.01
  const pt = (x, y) => new THREE.Vector2((x - CX) * K, -(y - CY) * K)

  function roundedShape(raw, r) {
    const v = raw.map(([x, y]) => pt(x, y))
    const n = v.length, a = [], b = []

    for (let i = 0; i < n; i++) {
      const p = v[(i + n - 1) % n], c = v[i], q = v[(i + 1) % n]
      const dp = p.clone().sub(c), dq = q.clone().sub(c)
      const rr = Math.min(r * K, dp.length() / 2, dq.length() / 2)

      a.push(c.clone().add(dp.normalize().multiplyScalar(rr)))
      b.push(c.clone().add(dq.normalize().multiplyScalar(rr)))
    }

    const shape = new THREE.Shape()
    shape.moveTo(b[0].x, b[0].y)

    for (let i = 1; i < n; i++) {
      shape.lineTo(a[i].x, a[i].y)
      shape.quadraticCurveTo(v[i].x, v[i].y, b[i].x, b[i].y)
    }

    shape.lineTo(a[0].x, a[0].y)
    shape.quadraticCurveTo(v[0].x, v[0].y, b[0].x, b[0].y)

    return shape
  }

  function strokeOutline(pts, w) {
    const h = w / 2, n = pts.length, left = [], right = []

    const dir = (a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy)
      return [dx / l, dy / l]
    }

    for (let i = 0; i < n; i++) {
      const p = pts[i]
      const dp = i > 0 ? dir(pts[i - 1], p) : null
      const dn = i < n - 1 ? dir(p, pts[i + 1]) : null
      let nx, ny, k = 1

      if (!dp) {
        nx = -dn[1]
        ny = dn[0]
      } else if (!dn) {
        nx = -dp[1]
        ny = dp[0]
      } else {
        const n1 = [-dp[1], dp[0]], n2 = [-dn[1], dn[0]]
        let mx = n1[0] + n2[0], my = n1[1] + n2[1]
        const ml = Math.hypot(mx, my)
        mx /= ml
        my /= ml
        k = 1 / (mx * n1[0] + my * n1[1])
        nx = mx
        ny = my
      }

      left.push([p[0] + nx * h * k, p[1] + ny * h * k])
      right.push([p[0] - nx * h * k, p[1] - ny * h * k])
    }

    return left.concat(right.reverse())
  }

  const M_POLY = [
    [192, 9], [346, 110], [503, 222], [655, 127], [667, 136],
    [667, 446], [658, 450], [590, 412], [588, 268], [503, 326],
    [272, 163], [272, 517], [190, 517],
  ]

  const TOP_POLY = [
    [443, 127], [632, 6], [660, 3], [698, 12], [838, 92],
    [843, 104], [842, 168], [832, 177], [690, 94], [660, 79], [504, 177],
  ]

  const BOTTOM_POLY = [
    [403, 310], [412, 308], [476, 358], [482, 368], [482, 392],
    [492, 410], [512, 420], [642, 488], [662, 488], [832, 372],
    [841, 380], [841, 446], [832, 458], [656, 569], [630, 569],
    [414, 450], [403, 428],
  ]

  const LT_POLY = strokeOutline([[103, 208], [26, 270], [103, 336]], 31)
  const SLASH_POLY = strokeOutline([[936, 196], [866, 356]], 25)
  const GT_POLY = strokeOutline([[964, 232], [1016, 278], [964, 324]], 26)

  const matDark = new THREE.MeshPhysicalMaterial({
    color: 0x141b33,
    metalness: 0.55,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
    emissive: 0x0a1f66,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.94,
  })

  matDark.name = 'Vidro_Escuro'

  const matBlue = new THREE.MeshPhysicalMaterial({
    color: 0x0a5cff,
    metalness: 0,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.2,
    emissive: 0x0a4fff,
    emissiveIntensity: 0.85,
    transparent: true,
    opacity: 0.88,
  })

  matBlue.name = 'Neon_Azul'

  const matSymbol = matBlue.clone()
  matSymbol.name = 'Neon_Simbolos'
  matSymbol.emissiveIntensity = 1
  matSymbol.opacity = 0.9

  const lineOpts = {
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  }

  const lineBlue = new THREE.LineBasicMaterial({
    color: 0x8fc2ff,
    opacity: 0.95,
    ...lineOpts,
  })

  const lineDark = new THREE.LineBasicMaterial({
    color: 0x4d86ff,
    opacity: 0.85,
    ...lineOpts,
  })

  function loopOf(shape, z, mat) {
    const pts = shape.getPoints(14).map(p => new THREE.Vector3(p.x, p.y, z))
    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      mat,
    )
    line.renderOrder = 5
    line.name = 'Contorno'
    return line
  }

  function piece(name, shape, depth, bevel, body, lineMat, baseZ) {
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelOffset: -bevel,
      bevelSegments: 6,
      curveSegments: 12,
    })

    geo.translate(0, 0, -depth / 2)

    const mesh = new THREE.Mesh(geo, body)
    mesh.name = name

    const group = new THREE.Group()
    group.name = name
    group.add(
      mesh,
      loopOf(shape, depth / 2, lineMat),
      loopOf(shape, -depth / 2, lineMat),
    )

    group.position.z = baseZ
    group.userData.baseZ = baseZ

    return group
  }

  const pieces = [
    piece('Letra_M', roundedShape(M_POLY, 7), 0.9, 0.04, matDark, lineDark, 0),
    piece('Arco_Superior', roundedShape(TOP_POLY, 9), 0.6, 0.04, matBlue, lineBlue, 0.15),
    piece('Arco_Inferior', roundedShape(BOTTOM_POLY, 9), 0.6, 0.04, matBlue, lineBlue, 0.15),
    piece('Simbolo_Menor', roundedShape(LT_POLY, 11), 0.28, 0.025, matSymbol, lineBlue, 0.5),
    piece('Simbolo_Barra', roundedShape(SLASH_POLY, 10), 0.28, 0.025, matSymbol, lineBlue, 0.5),
    piece('Simbolo_Maior', roundedShape(GT_POLY, 10), 0.28, 0.025, matSymbol, lineBlue, 0.5),
  ]

  const group = new THREE.Group()
  group.name = 'Logo_3D'
  pieces.forEach((p, i) => {
    p.userData.phase = i * 1.15
    group.add(p)
  })

  return {
    group,
    pieces,
    materials: { dark: matDark, blue: matBlue, symbol: matSymbol },
  }
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

export const LOGO3D_ACCENTS = {
  azul: { primary: '#015AFC', mDark: '#191D26', mLight: '#F6F7FB' },
  vermelho: { primary: '#D92D20', mDark: '#261919', mLight: '#FBF6F6' },
}

export function mountLogo3D(container, THREE, options) {
  const o = {
    accent: 'azul',
    theme: 'light',
    speed: 1.5,
    glow: 0.28,
    tilt: 0.45,
    spinOnClick: true,
    pixelRatio: 2,
    label: 'Logo em 3D',
    onReady: null,
    ...options,
  }

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  const resolveAccent = value =>
    (typeof value === 'string' ? LOGO3D_ACCENTS[value] : value) ||
    LOGO3D_ACCENTS.azul

  let accent = resolveAccent(o.accent)

  if (THREE.ColorManagement) {
    if ('legacyMode' in THREE.ColorManagement) THREE.ColorManagement.legacyMode = false
    else THREE.ColorManagement.enabled = true
  }

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:relative;display:block;width:100%;height:100%'
  canvas.setAttribute('role', 'img')
  canvas.setAttribute('aria-label', o.label)

  let renderer

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
  } catch {
    return null
  }

  if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace
  else renderer.outputEncoding = THREE.sRGBEncoding

  renderer.setClearColor(0x000000, 0)
  container.appendChild(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)

  const env = new THREE.Scene()
  env.background = new THREE.Color(0x3c3c42)

  const panel = (w, h, x, y, z, color, power) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(power),
        side: THREE.DoubleSide,
      }),
    )

    mesh.position.set(x, y, z)
    mesh.lookAt(0, 0, 0)
    env.add(mesh)
  }

  panel(24, 4, 0, 12, 6, 0xffffff, 9)
  panel(4, 20, -12, 0, 6, 0xf0f0f6, 5)
  panel(4, 20, 12, 0, 6, 0xffffff, 4)
  panel(18, 3, 0, -10, 8, 0xe6e6ee, 3)

  const pm = new THREE.PMREMGenerator(renderer)
  const envRT = pm.fromScene(env, 0.04)
  pm.dispose()

  const legacyLights = renderer.useLegacyLights !== undefined
    ? renderer.useLegacyLights
    : (renderer.physicallyCorrectLights === undefined
        ? false
        : !renderer.physicallyCorrectLights)

  const lightScale = legacyLights ? 1 : Math.PI

  scene.add(new THREE.AmbientLight(0xffffff, 0.5 * lightScale))

  const key = new THREE.DirectionalLight(0xffffff, 1.4 * lightScale)
  key.position.set(-3, 5, 8)
  scene.add(key)

  const built = buildLogo3D(THREE)
  const group = built.group
  const lines = []

  group.traverse(node => {
    if (node.isLine) lines.push(node)
  })

  lines.forEach(line => {
    line.geometry.dispose()
    line.parent.remove(line)
  })

  const materials = built.materials

  Object.values(materials).forEach(material => {
    material.envMap = envRT.texture
    material.transparent = false
    material.opacity = 1
    material.needsUpdate = true
  })

  const capM = new THREE.MeshBasicMaterial()
  const capA = new THREE.MeshBasicMaterial()

  built.pieces.forEach(part => {
    const mesh = part.children.find(child => child.isMesh)
    if (!mesh) return

    if (part.name === 'Letra_M') mesh.material = [capM, materials.dark]
    else if (part.name.startsWith('Simbolo')) mesh.material = [capA, materials.symbol]
    else mesh.material = [capA, materials.blue]
  })

  scene.add(group)

  function rgba(hex, alpha) {
    const match = /^#?([0-9a-f]{6})$/i.exec(hex)
    if (!match) return `rgba(1,90,252,${alpha})`

    const value = parseInt(match[1], 16)
    const r = value >> 16
    const g = (value >> 8) & 255
    const b = value & 255

    return `rgba(${r},${g},${b},${alpha})`
  }

  function applyLook() {
    const dark = o.theme === 'dark'
    const mColor = dark ? accent.mLight : accent.mDark

    capM.color.set(mColor)
    capA.color.set(accent.primary)

    const material = materials.dark
    material.color.set(mColor)
    material.emissive.set(dark ? mColor : '#000000')
    material.emissiveIntensity = dark ? 0.2 : 1
    material.metalness = dark ? 0.15 : 0.4
    material.roughness = dark ? 0.32 : 0.26
    material.envMapIntensity = dark ? 0.7 : 1.1

    ;[materials.blue, materials.symbol].forEach(item => {
      item.color.set(accent.primary)
      item.emissive.set(accent.primary)
      item.emissiveIntensity = 0.3
      item.envMapIntensity = 0.9
    })

    canvas.style.filter = o.glow > 0
      ? `drop-shadow(0 10px 30px ${rgba(accent.primary, o.glow)})`
      : ''
  }

  applyLook()

  function fit(width, height) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
    const distance = Math.max(3.25 / t, 5.9 / (t * camera.aspect)) + 0.8

    camera.position.set(0, 0, distance)
    camera.lookAt(0, 0, 0)
  }

  const target = { x: 0, y: 0 }
  const current = { x: 0, y: 0 }

  let time = 0
  let last = 0
  let raf = 0
  let visible = true
  let spinStart = -1
  let spinAngle = 0

  function onMove(event) {
    if (event.pointerType === 'touch') return

    const rect = container.getBoundingClientRect()

    target.x = clamp(
      (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth * 0.5),
      -1,
      1,
    )

    target.y = clamp(
      (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight * 0.5),
      -1,
      1,
    )
  }

  function spin() {
    if (!reduce && spinStart < 0) spinStart = time
  }

  function update(dt) {
    const factor = Math.min(1, dt * 5 * o.speed)
    const motion = reduce ? 0 : 1

    current.x += (target.x - current.x) * factor
    current.y += (target.y - current.y) * factor

    if (spinStart >= 0) {
      const progress = clamp((time - spinStart) / 1.1, 0, 1)

      spinAngle = (
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
      ) * Math.PI * 2

      if (progress >= 1) {
        spinStart = -1
        spinAngle = 0
      }
    }

    group.rotation.y =
      (reduce ? -0.22 : 0) +
      current.x * o.tilt +
      Math.sin(time * 0.5) * 0.1 * motion +
      spinAngle

    group.rotation.x =
      current.y * o.tilt * 0.55 +
      Math.sin(time * 0.37 + 1) * 0.035 * motion

    built.pieces.forEach(part => {
      part.position.y = Math.sin(time * 0.9 + part.userData.phase) * 0.05 * motion
      part.position.z =
        part.userData.baseZ +
        Math.sin(time * 0.7 + part.userData.phase * 1.7) * 0.08 * motion
    })
  }

  function renderOnce() {
    update(0)
    renderer.render(scene, camera)
  }

  function tick(now) {
    raf = requestAnimationFrame(tick)

    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    time += dt * o.speed

    update(dt)
    renderer.render(scene, camera)
  }

  function sync() {
    const run = visible && !document.hidden && !reduce

    if (run && !raf) {
      last = performance.now()
      raf = requestAnimationFrame(tick)
    } else if (!run && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  function requestRender() {
    if (!raf) renderOnce()
  }

  function resize() {
    const width = container.clientWidth
    const height = container.clientHeight

    if (!width || !height) return

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, o.pixelRatio))
    renderer.setSize(width, height, false)
    fit(width, height)
    requestRender()
  }

  const resizeObserver = window.ResizeObserver
    ? new ResizeObserver(resize)
    : null

  if (resizeObserver) resizeObserver.observe(container)
  else window.addEventListener('resize', resize)

  const intersectionObserver = window.IntersectionObserver
    ? new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting
        sync()
      })
    : null

  if (intersectionObserver) intersectionObserver.observe(container)

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('visibilitychange', sync)

  if (o.spinOnClick) container.addEventListener('click', spin)

  resize()
  renderOnce()
  sync()

  requestAnimationFrame(() => {
    if (o.onReady) o.onReady()
  })

  return {
    canvas,
    spin,

    setTheme(theme) {
      o.theme = theme
      applyLook()
      requestRender()
    },

    setAccent(value) {
      accent = resolveAccent(value)
      applyLook()
      requestRender()
    },

    destroy() {
      cancelAnimationFrame(raf)

      if (resizeObserver) resizeObserver.disconnect()
      else window.removeEventListener('resize', resize)

      intersectionObserver?.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', sync)
      container.removeEventListener('click', spin)

      group.traverse(node => {
        if (node.geometry) node.geometry.dispose()
      })

      Object.values(materials).forEach(material => material.dispose())

      capM.dispose()
      capA.dispose()
      envRT.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}

export default mountLogo3D