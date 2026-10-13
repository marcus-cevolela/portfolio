import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLanguages, type Language } from '../../i18n/language'
import { localizedRoutes } from '../../i18n/routes'
import { useState } from 'react'
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
        <div className='relative'>
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Selecionar idioma"
                aria-expanded={isOpen}
                className="min-w-11 h-11 border-border border-2 rounded-xl px-3 py-0 inline-flex items-center gap-1 bg-bg font-semibold text-[15px]"
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
                <div className='bg-surface flex flex-col w-65 border-border border-2 gap-1 rounded-xl px-2 py-2 absolute top-full z-50'>
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
                            <div className="flex items-center gap-2">
                                <span>
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