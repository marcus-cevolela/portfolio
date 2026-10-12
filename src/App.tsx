import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from './hooks/useTheme'
import { supportedLanguages, type Language } from './i18n/language'
import { localizedRoutes } from './i18n/routes'
import i18n from './i18n'
import { MainLayout } from './layouts/MainLayout'

function HomePage() {
  const { theme, accent, toggleTheme} = useTheme()
  const { t } = useTranslation()

  return (
    <div className="p-8">
      <h1>Marcus Cevolela</h1>

      <p>{t('test.greeting')}</p>

      <p>Tema atual: {theme}</p>
      <p>Cor atual: {accent}</p>

      <button onClick={toggleTheme}>Trocar Tema</button>

    </div>
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

    element: <MainLayout />,

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