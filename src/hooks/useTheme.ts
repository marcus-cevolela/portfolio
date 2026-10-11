import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark'

export type AccentColor = 'blue' | 'red'

export type ThemePreferences = {
    theme: Theme;
    accent: AccentColor;
}

function getSystemTheme(): Theme {
    if (typeof window === 'object' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    } else {
        return 'light'
    }
}

function isTheme(theme: unknown): theme is Theme {
    if (theme === 'dark' || theme === 'light') {
        return true
    } else {
        return false
    }
}

function isAccentColor(accent: unknown): accent is AccentColor {
    if (accent === 'blue' || accent === 'red') {
        return true
    } else {
        return false
    }
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
        if (typeof parsedPreference === 'object' && parsedPreference !== null && !Array.isArray(parsedPreference)) {
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

export function useTheme() {
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

    function toggleAccent() {
        setPreferences((previousPreferences) => {
            return {
                ...previousPreferences,
                accent: previousPreferences.accent === 'blue' ? 'red' : 'blue'
            }
        })
    }

    return {
        theme: preferences.theme,
        accent: preferences.accent,
        toggleTheme: toggleTheme,
        toggleAccent: toggleAccent,
    }
}

