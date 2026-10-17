import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  mountLogo3D,
  type Logo3DInstance,
  type Logo3DOptions,
  type Logo3DAccent,
  type Logo3DTheme,
} from './logo-3d.js'

type Logo3DProps = {
  accent?: Logo3DAccent
  theme?: Logo3DTheme
  className?: string
  fallback?: ReactNode
  label?: string
} & Omit<Logo3DOptions, 'accent' | 'theme' | 'label' | 'onReady'>

function useSiteTheme(): Logo3DTheme {
  const [theme, setTheme] = useState<Logo3DTheme>('light')

  useEffect(() => {
    const root = document.documentElement

    const updateTheme = () => {
      setTheme(
        root.classList.contains('dark') || root.dataset.theme === 'dark'
          ? 'dark'
          : 'light',
      )
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return theme
}

export default function Logo3D({
  accent = 'azul',
  theme,
  className = '',
  fallback = null,
  label = 'Logo em 3D',
  ...options
}: Logo3DProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<Logo3DInstance | null>(null)
  const [ready, setReady] = useState(false)

  const siteTheme = useSiteTheme()
  const activeTheme = theme ?? siteTheme

  const latest = useRef({ accent, activeTheme, options, label })
  latest.current = { accent, activeTheme, options, label }

  useEffect(() => {
    let cancelled = false

    import('three').then((THREE) => {
      const host = hostRef.current

      if (cancelled || !host) return

      const {
        accent: currentAccent,
        activeTheme,
        options,
        label,
      } = latest.current

      const logo = mountLogo3D(host, THREE, {
        ...options,
        accent: currentAccent,
        theme: activeTheme,
        label,
        onReady: () => {
          if (!cancelled) setReady(true)
        },
      })

      if (!logo) return

      if (cancelled) {
        logo.destroy()
        return
      }

      logoRef.current = logo
    })

    return () => {
      cancelled = true
      logoRef.current?.destroy()
      logoRef.current = null
      setReady(false)
    }
  }, [])

  useEffect(() => {
    logoRef.current?.setAccent(accent)
  }, [accent])

  useEffect(() => {
    logoRef.current?.setTheme(activeTheme)
  }, [activeTheme])

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: '1038 / 571' }}
    >
      <div ref={hostRef} className="absolute inset-0" />

      {fallback && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            ready ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {fallback}
        </div>
      )}
    </div>
  )
}