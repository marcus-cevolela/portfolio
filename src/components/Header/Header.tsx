import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

interface HeaderProps {
    isMenuOpen: boolean
    onMenuToggle: (isOpen: boolean) => void
}

export function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
    const { t } = useTranslation();

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
            <h1><a href="/"><img src={logo} alt="Logo Marcus Cevolela" className="w-15 md:w-20 h-auto inline-block hover:scale-105 transition-all ease-in-out duration-250" aria-label={t('header.accessibility.home')} /></a></h1>

            <button
                type="button"
                className={`relative z-50 md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors duration-250 hover:border-primary hover:text-primary ${isMenuOpen ? 'invisible' : ''
                    }`}
                aria-label={
                    isMenuOpen
                        ? t('header.accessibility.closeMenu')
                        : t('header.accessibility.openMenu')
                }
                aria-expanded={isMenuOpen}
                onClick={() => onMenuToggle(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className="hidden md:block" aria-label={t('header.accessibility.mainNavigation')}>
                <ul className="flex items-center md:gap-7 lg:gap-12 text-text-secondary text-base font-bold">
                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#projects">
                            {t('header.navigation.projects')}
                        </a>
                    </li>

                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#about">
                            {t('header.navigation.about')}
                        </a>
                    </li>

                    <li>
                        <a
                            className="inline-block hover:scale-105 relative transition-all ease-in-out duration-250 hover:text-primary after:content-[''] after:bg-primary after:w-0 after:h-0.5 hover:after:w-full after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-250" href="#contact">
                            {t('header.navigation.contact')}
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
                        onClick={() => onMenuToggle(false)}
                        aria-hidden="true"
                    />

                    {/* menu mobile aberto */}
                    <div className="fixed inset-y-0 right-0 z-40 flex w-[min(85%,380px)] flex-col overflow-y-auto rounded-l-3xl border-l-2 border-l-primary bg-bg p-6 shadow-[0_2px_4px_var(--primary)] md:hidden" >

                        {/* logo e fechar */}
                        <div className="mb-4 flex items-center justify-between">
                            <a
                                href="/"
                                onClick={() => onMenuToggle(false)}
                                aria-label={t('header.accessibility.home')}
                            >
                                <img src={logo} alt="Logo Marcus Cevolela" className="w-16 h-auto" />
                            </a>

                            <button
                                type="button"
                                aria-label={t('header.accessibility.closeMenu')}
                                onClick={() => onMenuToggle(false)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors duration-250 hover:border-primary hover:text-primary"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* navbar */}
                        <nav aria-label={t('header.accessibility.mainNavigation')}>
                            <ul className="flex flex-col text-xl font-bold text-text-secondary">
                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#projects"
                                        onClick={() => onMenuToggle(false)}
                                    >
                                        {t('header.navigation.projects')} <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>

                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#about"
                                        onClick={() => onMenuToggle(false)}
                                    >
                                        {t('header.navigation.about')} <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>

                                <li className="border-b-2 border-border py-2">
                                    <a
                                        className="relative flex items-center justify-between transition-all duration-250 hover:scale-102 hover:text-primary"
                                        href="#contact"
                                        onClick={() => onMenuToggle(false)}
                                    >
                                        {t('header.navigation.contact')} <ChevronRight size={20} strokeWidth={3} aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* cores */}
                        <div className="mt-4.5">
                            <h2 className="mb-3 font-mono text-highlight">{t('header.customization')}</h2>
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
                            <h2 className="mb-3 font-mono text-highlight">{t('header.social')}</h2>
                            <SocialLinks variant="mobile" />
                        </div>

                        {/*currículo */}
                        <div className="mt-2">
                            <a
                                href="/files/curriculo-marcus-cevolela.pdf"
                                download
                                className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl bg-primary px-4 py-4 text-base font-semibold text-white transition-all duration-250 hover:bg-primary-hover"
                            >
                                <span className="min-w-0 flex-1 text-center">
                                    {t("header.resume")}
                                </span>

                                <ArrowDownToLine
                                    size={22}
                                    className="shrink-0"
                                />
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