import { useTheme } from '../../hooks/useTheme'
import { Sun, Moon} from 'lucide-react'

export function ThemeSwitcher() {
    const { theme, toggleTheme} = useTheme()

    return (
        <button 
            aria-label={theme === 'dark' ? "Alternar para tema claro" : "Alternar para tema escuro"} 
            onClick={toggleTheme}
            className='border-2 border-border p-2 rounded-xl bg-bg inline-flex items-center justify-center h-11'
        >
                {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    )
}