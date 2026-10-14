import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { ColorSwitcher } from "../ColorSwitcher/ColorSwitcher";
import { useTheme } from "../../hooks/useTheme"
import logoDarkBlue from "../../assets/logo-dark-blue.svg"
import logoDarkRed from "../../assets/logo-dark-red.svg"
import logoLightBlue from "../../assets/logo-light-blue.svg"
import logoLightRed from "../../assets/logo-light-red.svg"

export function Header() {

    const { theme, accent } = useTheme()

    const logoMap = {
        "dark-blue": logoDarkBlue,
        "dark-red": logoDarkRed,
        "light-blue": logoLightBlue,
        "light-red": logoLightRed,
    }

    const logo = logoMap[`${theme}-${accent}`] || logoMap["dark-blue"]
    return (
        <header className="flex items-center justify-between px-10 py-4 border-b-primary border-b-2 shadow-[0_2px_4px_var(--primary)]">
            <h1><a href="/"><img src={logo} alt="Logo Marcus Cevolela" className="w-20 h-auto inline-block hover:scale-105 transition-all ease-in-out duration-250" /></a></h1>
            <nav>
                <ul className="flex items-center gap-10 text-text-secondary text-base font-bold">
                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#projects">
                            PROJETOS
                        </a>
                    </li>

                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#about">
                            SOBRE
                        </a>
                    </li>

                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#contact">
                            CONTATO
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-3">
                <LanguageSwitcher />
                <ColorSwitcher />
                <ThemeSwitcher />
            </div>
        </header>
    )
}