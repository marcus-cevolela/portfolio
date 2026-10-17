export type Logo3DTheme = 'light' | 'dark'

export type Logo3DAccentName = 'azul' | 'vermelho'

export interface Logo3DColors {
  primary: string
  mDark: string
  mLight: string
}

export type Logo3DAccent = Logo3DAccentName | Logo3DColors

export interface Logo3DOptions {
  accent?: Logo3DAccent
  theme?: Logo3DTheme
  speed?: number
  glow?: number
  tilt?: number
  spinOnClick?: boolean
  pixelRatio?: number
  label?: string
  onReady?: (() => void) | null
}

export interface Logo3DInstance {
  canvas: HTMLCanvasElement
  spin(): void
  setTheme(theme: Logo3DTheme): void
  setAccent(accent: Logo3DAccent): void
  destroy(): void
}

export const LOGO3D_ACCENTS: Record<Logo3DAccentName, Logo3DColors>

export function mountLogo3D(
  container: HTMLElement,
  THREE: typeof import('three'),
  options?: Logo3DOptions,
): Logo3DInstance | null

export default mountLogo3D