import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { localizedRoutes } from '../i18n/routes'
import type { Language } from '../i18n/language'
import { ProjectCard } from '../components/ProjectCard/ProjectCard'

interface ProjectsProps {
    projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
    const { t, i18n } = useTranslation()

    const currentLanguage = i18n.language as Language

    return (
        <section className="relative mx-auto w-full max-w-360 px-5 py-12 sm:px-8 sm:py-16 lg:px-8 lg:py-20 [@media(min-width:1024px)_and_(max-width:1399px)]:px-22">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1 min-w-0">
                    <span className="whitespace-nowrap font-mono text-xs text-highlight sm:text-sm">
                        {t('projects.eyebrow')}
                    </span>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:whitespace-nowrap">
                        {t('projects.title')}
                    </h2>
                </div>

                <Link
                    to={localizedRoutes.projects[currentLanguage]}
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-border px-6 py-3 text-center transition-all duration-250 hover:scale-105 hover:border-primary hover:bg-hover sm:w-auto"
                >
                    {t('projects.viewAll')}
                    <ArrowUpRight size={18} />
                </Link>
            </div>

            {/* Lista de projetos */}
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    )
}