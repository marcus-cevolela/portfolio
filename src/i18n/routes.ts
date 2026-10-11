import type { Language } from './language'

export const localizedRoutes = {
    home: {
        pt: '/pt',
        en: '/en',
        es: '/es',
    },
    projects: {
        pt: '/pt/projetos',
        en: '/en/projects',
        es: '/es/proyectos',
    },
    certificates: {
        pt: '/pt/certificados',
        en: '/en/certificates',
        es: '/es/certificados',
    },
} as const satisfies Record<string, Record<Language, string>>