export interface Project {
    id: string
    title: string
    description: string
    image: string
    technologies: string[]
    category: string
    caseStudyUrl: string
    demoUrl: string
    githubUrl: string
}

export const projects: Project[] = [
    {
        id: 'web-platform',
        title: 'Plataforma Web',
        description: 'Uma aplicação web para gerenciamento de informações.',
        image: '',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        category: 'personal',
        caseStudyUrl: '/pt/projetos/web-platform',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'rest-api',
        title: 'API REST',
        description: 'Uma API para integração e consulta de dados.',
        image: '',
        technologies: ['Python', 'FastAPI', 'PostgreSQL'],
        category: 'personal',
        caseStudyUrl: '/pt/projetos/rest-api',
        demoUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'analytics-dashboard',
        title: 'Dashboard Analytics',
        description: 'Um painel para visualização de dados e indicadores.',
        image: '',
        technologies: ['React', 'TypeScript', 'Charts'],
        category: 'academic',
        caseStudyUrl: '/pt/projetos/analytics-dashboard',
        demoUrl: '#',
        githubUrl: '#',
    },
]