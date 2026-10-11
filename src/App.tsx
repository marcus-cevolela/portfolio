import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { supportedLanguages, type Language } from './i18n/language'
import { localizedRoutes } from './i18n/routes'
import i18n from './i18n'
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher'

function HomePage() {
  const { theme, accent, toggleTheme, toggleAccent } = useTheme()
  const { t } = useTranslation()

  return (
    <main className="min-h-screen bg-bg p-8 text-text">
      <h1>Marcus Cevolela</h1>

      <p>{t('test.greeting')}</p>

      <p>Tema atual: {theme}</p>
      <p>Cor atual: {accent}</p>

      <button onClick={toggleTheme}>Trocar Tema</button>
      <button onClick={toggleAccent}>Trocar Cor</button>
      <LanguageSwitcher />
    </main>
  )
}

function getNestedPath(path: string, language: Language) {
  return path.slice(`/${language}/`.length)
}

function createLanguageRoute(language: Language) {
  return {
    path: `/${language}`,

    loader: async () => {
      await i18n.changeLanguage(language)
      return null
    },

    element: <Outlet />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: getNestedPath(localizedRoutes.projects[language], language),
        element: <p>Projetos</p>,
      },
      {
        path: getNestedPath(localizedRoutes.certificates[language], language),
        element: <p>Certificados</p>,
      },
    ],
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/pt" replace />,
  },

  ...supportedLanguages.map(createLanguageRoute),

  {
    path: '*',
    element: <Navigate to="/pt" replace />,
  },
])