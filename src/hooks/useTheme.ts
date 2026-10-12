import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'


export type Theme = 'light' | 'dark'

export type AccentColor = 'blue' | 'red'

export type ThemePreferences = {
    theme: Theme;
    accent: AccentColor;
}

export function useTheme() {
    const context = useContext(ThemeContext)

    if (context === undefined ) {
        throw new Error ("O hook precisa ser usado dentro do ThemeProvider")
    }

    return context
}

