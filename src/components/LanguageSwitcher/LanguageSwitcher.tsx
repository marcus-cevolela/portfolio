import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLanguages, type Language } from '../../i18n/language'
import { localizedRoutes } from '../../i18n/routes'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'

const languageNames: Record<Language, string> = {
    pt: 'PT',
    en: 'EN',
    es: 'ES',
}

const languageComplete: Record<Language, string> = {
    pt: 'Português',
    en: 'English',
    es: 'Español',
}

const languageFlags: Record<Language, string> = {
    pt: 'https://flagsapi.com/BR/flat/64.png',
    en: 'https://flagsapi.com/US/flat/64.png',
    es: 'https://flagsapi.com/ES/flat/64.png',
}

const languageAlt: Record<Language, string> = {
    pt: 'Bandeira do Brasil',
    en: 'US Flag',
    es: 'Bandera de España',
}

function getEquivalentRoute(pathname: string, language: Language): string {
    const currentLanguage = pathname.split('/')[1] as Language

    const currentPage = Object.entries(localizedRoutes).find(
        ([, routes]) => routes[currentLanguage] === pathname,
    )?.[0] as keyof typeof localizedRoutes | undefined

    if (!currentPage) {
        return localizedRoutes.home[language]
    }

    return localizedRoutes[currentPage][language]
}

type LanguageSwitcherProps = {
    variant?: 'default' | 'mobile'
}

export function LanguageSwitcher({
    variant = 'default',
}: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)

    const languageSwitcherRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        function handleClickOutside(event: MouseEvent) {
            if (
                languageSwitcherRef.current &&
                !languageSwitcherRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const location = useLocation()
    const navigate = useNavigate()

    const currentLanguage = location.pathname.split('/')[1]

    const selectedLanguage = supportedLanguages.find(
        (language) => language === currentLanguage,
    )

    function handleLanguageChange(language: Language) {
        const destination = getEquivalentRoute(location.pathname, language)

        navigate(destination)
        setIsOpen(false)
    }

    return (
        <div ref={languageSwitcherRef} className="relative">
            {variant === 'mobile' ? (
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Selecionar idioma"
                    aria-expanded={isOpen}
                    className="flex w-full h-14 items-center justify-between gap-2 rounded-[14px] border-2 border-border bg-bg px-3 font-mono text-[15px] font-semibold">
                    <span className="flex min-w-0 items-center gap-2">
                        <img
                            src={selectedLanguage ? languageFlags[selectedLanguage] : languageFlags.pt}
                            alt={selectedLanguage ? languageAlt[selectedLanguage] : languageAlt.pt}
                            className="w-8 h-8 shrink-0 rounded-xl"
                        />

                        <span className="flex min-w-0 items-center gap-1">
                            <span className="min-w-0 flex-1 truncate text-left">
                                {selectedLanguage
                                    ? languageComplete[selectedLanguage]
                                    : 'Português'}
                            </span>

                            <span className="shrink-0 text-text-secondary">
                                ({selectedLanguage ? languageNames[selectedLanguage] : 'PT'})
                            </span>
                        </span>
                    </span>

                    {isOpen ? (
                        <ChevronUp size={16} className="shrink-0" />
                    ) : (
                        <ChevronDown size={16} className="shrink-0" />
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Selecionar idioma"
                    aria-expanded={isOpen}
                    className="inline-flex h-11 min-w-[75.5px] items-center gap-1 rounded-xl border-2 border-border bg-bg px-3 py-0 font-mono text-[15px] font-semibold"
                >
                    <img
                        src={selectedLanguage ? languageFlags[selectedLanguage] : languageFlags.pt}
                        alt={selectedLanguage ? languageAlt[selectedLanguage] : languageAlt.pt}
                        className="h-8 w-8 rounded-xl"
                    />

                    {selectedLanguage ? languageNames[selectedLanguage] : 'PT-BR'}

                    {isOpen ? (
                        <ChevronUp size={16} />
                    ) : (
                        <ChevronDown size={16} />
                    )}
                </button>
            )}

            {isOpen && (
                <div
                    className={`absolute top-full left-0 z-50 mt-1 flex flex-col gap-1 rounded-xl border-2 border-border bg-surface px-2 py-2 ${variant === "mobile"
                        ? "w-max min-w-full max-w-[calc(100vw-7rem)]"
                        : "w-60.5"
                        }`}
                >
                    {supportedLanguages.map((language) => (
                        <button
                            key={language}
                            type="button"
                            lang={language}
                            aria-pressed={currentLanguage === language}
                            disabled={currentLanguage === language}
                            onClick={() => handleLanguageChange(language)}
                            className={`flex min-h-12 items-center justify-between gap-1 px-2 ${currentLanguage === language
                                ? 'rounded-xl bg-highlight-bg'
                                : 'bg-transparent transition-all hover:rounded-xl hover:bg-hover'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src={languageFlags[language]}
                                    alt={languageAlt[language]}
                                    className="h-8 w-8 rounded-xl"
                                />

                                <span>{languageComplete[language]}</span>
                            </span>

                            <span className="flex items-center justify-center gap-2">
                                <span className="font-mono text-sm text-text-secondary">
                                    {languageNames[language]}
                                </span>

                                <Check className={currentLanguage === language ? 'text-highlight' : 'invisible'}
                                />
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}