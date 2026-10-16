import { useEffect, useState } from "react";
import { Menu, X, ChevronRight, ArrowDownToLine } from "lucide-react"
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { ColorSwitcher } from "../ColorSwitcher/ColorSwitcher";
import { SocialLinks } from "../SocialLinks/SocialLinks"
import { useTheme } from "../../hooks/useTheme"
import logoDarkBlue from "../../assets/logo-dark-blue.svg"
import logoDarkRed from "../../assets/logo-dark-red.svg"
import logoLightBlue from "../../assets/logo-light-blue.svg"
import logoLightRed from "../../assets/logo-light-red.svg"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);
    const { theme, accent } = useTheme()

    const logoMap = {
        "dark-blue": logoDarkBlue,
        "dark-red": logoDarkRed,
        "light-blue": logoLightBlue,
        "light-red": logoLightRed,
    }

    const logo = logoMap[`${theme}-${accent}`] || logoMap["dark-blue"]
    return (
        <header className="relative flex items-center justify-between px-10 py-4 border-b-primary border-b-2 shadow-[0_2px_4px_var(--primary)]">
            <h1><a href="/"><img src={logo} alt="Logo Marcus Cevolela" className="w-15 md:w-20 h-auto inline-block hover:scale-105 transition-all ease-in-out duration-250" /></a></h1>

            <button
                type="button"
                className={`relative z-50 md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors duration-250 hover:border-primary hover:text-primary ${isMenuOpen ? 'invisible' : ''
                    }`}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className="hidden md:block">
                <ul className="flex items-center md:gap-7 lg:gap-12 text-text-secondary text-base font-bold">
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
            <div className="hidden md:flex gap-3">
                <LanguageSwitcher />
                <ColorSwitcher />
                <ThemeSwitcher />
            </div>


            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-30 bg-black/70 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />

                    {/* menu mobile aberto */}
                    <div className="fixed inset-y-0 right-0 z-40 flex w-[min(85%,380px)] flex-col overflow-y-auto rounded-l-3xl border-l-2 border-l-primary bg-bg p-6 shadow-[0_2px_4px_var(--primary)] md:hidden">

                        {/* logo e fechar */}
                        <div className="mb-4 flex items-center justify-between">
                            <a
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Voltar para a página inicial"
                            >
                                <img src={logo} alt="Logo Marcus Cevolela" className="w-16 h-auto" />
                            </a>

                            <button
                                type="button"
                                aria-label="Fechar menu"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors duration-250 hover:border-primary hover:text-primary"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* navbar */}
                        <nav aria-label="Navegação principal">
                            <ul className="flex flex-col text-xl font-bold text-text-secondary">
                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#projects"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        PROJETOS <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>

                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#about"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        SOBRE <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>

                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#contact"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        CONTATO <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* cores */}
                        <div className="mt-4.5">
                            <h2 className="mb-3 font-mono text-highlight">// Personalização do Site</h2>
                            <ColorSwitcher variant="mobile" />
                        </div>

                        {/* idioma e tema */}
                        <div className="mt-3 flex items-center gap-2.5">
                            <div className="min-w-0 flex-1">
                                <LanguageSwitcher variant="mobile" />
                            </div>
                            <div className="shrink-0">
                                <ThemeSwitcher />
                            </div>
                        </div>

                        {/* redes e conato */}
                        <div className="mt-4.5">
                            <h2 className="mb-3 font-mono text-highlight">// Redes e Contato</h2>
                            <SocialLinks variant="mobile" />
                        </div>

                        {/*currículo */}
                        <div className="mt-2">
                            <a
                                href="/files/curriculo-marcus-cevolela.pdf"
                                download
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-lg font-bold text-white transition-all duration-250 hover:scale-103 hover:bg-primary-hover"
                            >
                                Baixar currículo <ArrowDownToLine size={22} strokeWidth={2.5} />
                            </a>
                        </div>

                        {/* copy */}
                        <div className="pt-8 text-center">
                            <p className="text-sm text-text-tertiary">© 2026 Marcus Cevolela</p>
                        </div>
                    </div>
                </>
            )}
        </header >
    )
}