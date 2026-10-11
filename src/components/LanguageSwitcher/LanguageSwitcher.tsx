import { useLocation, useNavigate } from 'react-router-dom'
import { supportedLanguages, type Language } from '../../i18n/language'
import { localizedRoutes } from '../../i18n/routes'

const languageNames: Record<Language, string> = {
    pt: 'PT-BR',
    en: 'EN',
    es: 'ES',
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
    const location = useLocation()
    const navigate = useNavigate()

    const currentLanguage = location.pathname.split('/')[1]

    function handleLanguageChange(language: Language) {
        const destination = getEquivalentRoute(location.pathname, language)

        navigate(destination)
    }

    return (
        <nav aria-label="Selecionar idioma">
            {supportedLanguages.map((language) => (
                <button
                    key={language}
                    type="button"
                    lang={language}
                    aria-pressed={currentLanguage === language}
                    disabled={currentLanguage === language}
                    onClick={() => handleLanguageChange(language)}
                >
                    {languageNames[language]}
                </button>
            ))}
        </nav>
    )
}