import { useTheme } from '../../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            aria-label={theme === 'dark' ? "Alternar para tema claro" : "Alternar para tema escuro"}
            onClick={toggleTheme}
            className='border-2 border-border p-2 rounded-xl bg-bg inline-flex items-center justify-center w-14 h-14 md:w-11 md:h-11'
        >
            <span className="relative flex h-7 w-7 items-center justify-center">
                <Sun
                    className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-in-out ${theme === 'dark'
                            ? 'rotate-0 scale-100 opacity-100'
                            : 'rotate-90 scale-0 opacity-0'
                        }`}
                />

                <Moon
                    className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-in-out ${theme === 'dark'
                            ? '-rotate-90 scale-0 opacity-0'
                            : 'rotate-0 scale-100 opacity-100'
                        }`}
                />
            </span>
        </button>
    )
}