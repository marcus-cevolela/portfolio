import { useTheme } from '../../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            aria-label={theme === 'dark' ? "Alternar para tema claro" : "Alternar para tema escuro"}
            onClick={toggleTheme}
            className="group inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-border bg-bg p-2 transition-colors duration-300 hover:border-primary md:h-11 md:w-11"
        >
            <span className="relative flex h-7 w-7 items-center justify-center">
                <Sun
                    className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-in-out ${theme === 'dark'
                            ? 'rotate-0 scale-100 opacity-100 group-hover:rotate-20 group-hover:scale-115 group-hover:text-primary'
                            : 'rotate-90 scale-0 opacity-0'
                        }`}
                />

                <Moon
                    className={`absolute inset-0 h-7 w-7 transition-all duration-300 ease-in-out ${theme === 'light'
                        ? 'rotate-0 scale-100 opacity-100 group-hover:rotate-20 group-hover:scale-115 group-hover:text-primary'
                            : 'rotate-90 scale-0 opacity-0'
                        }`}
                />
            </span>
        </button>
    )
}