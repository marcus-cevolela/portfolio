import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'
import type { Theme, AccentColor, ThemePreferences } from '../hooks/useTheme'

type ThemeProviderProps = {
    children: ReactNode
}

type ThemeContextType = {
    theme: Theme;
    accent: AccentColor;
    toggleTheme: () => void;
    setAccent: (color: AccentColor) => void;
} | undefined;

function getSystemTheme(): Theme {
    if (typeof window === 'object' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    } else {
        return 'light'
    }
}

function isTheme(theme: unknown): theme is Theme {
    return theme === 'dark' || theme === 'light'
}

function isAccentColor(accent: unknown): accent is AccentColor {
    return accent === 'blue' || accent === 'red'
}

function getDefaultPreferences(): ThemePreferences {
    return {
        theme: getSystemTheme(),
        accent: 'blue'
    }
}

function getInitialPreferences(): ThemePreferences {
    if (typeof window === 'undefined') {
        return getDefaultPreferences()
    }

    try {
        const savedPreferences = localStorage.getItem('portfolio-theme')

        if (savedPreferences == null) {
            return getDefaultPreferences()
        }

        const parsedPreference: unknown = JSON.parse(savedPreferences)

        if (
            typeof parsedPreference === 'object' &&
            parsedPreference !== null &&
            !Array.isArray(parsedPreference)
        ) {
            if (!('theme' in parsedPreference) || !('accent' in parsedPreference)) {
                return getDefaultPreferences()
            }

            if (!isTheme(parsedPreference.theme) || !isAccentColor(parsedPreference.accent)) {
                return getDefaultPreferences()
            }

            return {
                theme: parsedPreference.theme,
                accent: parsedPreference.accent
            }
        }
    } catch {
        return getDefaultPreferences()
    }

    return getDefaultPreferences()
}

function applyPreferences(preferences: ThemePreferences) {
    document.documentElement.setAttribute('data-theme', preferences.theme)
    document.documentElement.setAttribute('data-accent', preferences.accent)
}

export const ThemeContext = createContext<ThemeContextType>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [preferences, setPreferences] = useState(() => getInitialPreferences())

    useEffect(() => {
        applyPreferences(preferences)
    }, [preferences])

    useEffect(() => {
        try {
            localStorage.setItem('portfolio-theme', JSON.stringify(preferences));
        } catch {
        }
    }, [preferences])

    function toggleTheme() {
        setPreferences((previousPreferences) => {
            return {
                ...previousPreferences,
                theme: previousPreferences.theme === 'dark' ? 'light' : 'dark'
            }
        })
    }

    function setAccent(color: AccentColor) {
        setPreferences((previousPreferences) => {
            return {
                ...previousPreferences,
                accent: color
            }
        })
    }

    return (
        <ThemeContext.Provider value={{
            theme: preferences.theme,
            accent: preferences.accent,
            toggleTheme: toggleTheme,
            setAccent: setAccent,

        }}>
            {children}
        </ThemeContext.Provider >
    )
}