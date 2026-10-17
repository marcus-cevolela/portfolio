import { createBrowserRouter, Navigate } from 'react-router-dom'
import { supportedLanguages, type Language } from './i18n/language'
import { localizedRoutes } from './i18n/routes'
import i18n from './i18n'
import { MainLayout } from './layouts/MainLayout'
import { Hero } from './sections/Hero'

function HomePage() {


return (
  <Hero />
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