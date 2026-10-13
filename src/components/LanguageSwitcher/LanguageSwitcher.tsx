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

export function LanguageSwitcher() {
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
        (language) => language === currentLanguage
    )

    function handleLanguageChange(language: Language) {
        const destination = getEquivalentRoute(location.pathname, language)

        navigate(destination)
        setIsOpen(false)
    }

    return (
        <div ref={languageSwitcherRef} className="relative">
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Selecionar idioma"
                aria-expanded={isOpen}
                className="min-w-[75.5px] h-11 border-border border-2 rounded-xl px-3 py-0 inline-flex items-center gap-1 bg-bg font-mono font-semibold text-[15px]"
            >
                <img
                    src={selectedLanguage ? languageFlags[selectedLanguage] : 'https://flagsapi.com/BR/flat/64.png'}
                    alt={selectedLanguage ? languageAlt[selectedLanguage] : 'Bandeira do Brasil'}
                    className='w-8 h-8 rounded-xl'
                />
                {selectedLanguage ? languageNames[selectedLanguage] : 'PT-BR'}
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className='bg-surface flex flex-col w-60.5 border-border border-2 gap-1 rounded-xl px-2 py-2 absolute top-full z-50 mt-1'>
                    {supportedLanguages.map((language) => (
                        <button
                            key={language}
                            type="button"
                            lang={language}
                            aria-pressed={currentLanguage === language}
                            disabled={currentLanguage === language}
                            onClick={() => handleLanguageChange(language)}
                            className={`flex items-center px-2 min-h-12 gap-1 justify-between ${currentLanguage === language ? 'bg-highlight-bg rounded-xl' : 'bg-transparent transition-all hover:bg-hover hover:rounded-xl '}`}
                        >
                            <div className="flex items-center gap-2">
                                <span>
                                    <img
                                        src={languageFlags[language]}
                                        alt={languageAlt[language]}
                                        className='w-8 h-8 rounded-xl'
                                    />
                                </span>
                                <span>
                                    {languageComplete[language]}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <span className='font-mono text-text-secondary text-sm'>
                                    {languageNames[language]}
                                </span>
                                {<Check className={currentLanguage === language ? 'block text-highlight' : 'invisible'} />}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}