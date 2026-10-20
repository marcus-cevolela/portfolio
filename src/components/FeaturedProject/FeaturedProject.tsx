import { projects } from '../../data/projects'
import { useTranslation } from 'react-i18next'
import { Image as ImageIcon, BookOpen, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

interface FeaturedProjectProps {
    className?: string
}

export function FeaturedProject({ className }: FeaturedProjectProps) {
    const { t } = useTranslation()

    const randomIndex = Math.floor(Math.random() * projects.length)
    const project = projects[randomIndex]

    return (
        <article
            className={`grid w-full min-w-0 grid-cols-1 gap-3 rounded-2xl border border-border bg-surface/50 p-2.5 min-[400px]:p-3 sm:gap-4 sm:p-4 lg:grid-cols-[220px_minmax(0,1fr)_240px] lg:gap-6 lg:p-6 ${className ?? ''}`}
        >
            {/* Imagem e informações */}
            <div className="grid min-w-0 grid-cols-[2fr_3fr] items-center gap-3 min-[400px]:gap-4 sm:gap-5 lg:col-span-2 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6 ">
                {/* Imagem */}
                <div className="flex aspect-4/3 w-full min-w-0 items-center justify-center rounded-xl border border-border bg-surface">
                    <ImageIcon
                        size={36}
                        strokeWidth={1.5}
                        className="text-text-secondary sm:h-12 sm:w-12"
                    />
                </div>

                {/* Informações */}
                <div className="flex min-w-0 flex-col items-start gap-1.5 sm:gap-2">
                    <span className="max-w-full rounded-full border border-highlight bg-primary/20 px-2 py-1 font-mono text-[9px] leading-tight text-highlight min-[400px]:text-[10px] sm:text-xs md:text-base lg:text-sm">
                        {t('hero.featuredProject.label')}
                    </span>

                    <div className="w-full min-w-0">
                        <h3 className="wrap-break-word text-base font-bold leading-tight min-[400px]:text-lg sm:text-xl md:text-3xl lg:text-2xl">
                            {project.title}
                        </h3>

                        <p className="wrap-break-word text-xs leading-snug text-text-secondary min-[400px]:text-[13px] sm:text-sm md:text-xl lg:text-base">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={tech}
                                className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[8px] font-bold text-text-tertiary min-[400px]:text-[10px] sm:text-xs md:text-base"
                            >
                                {index > 0 && (
                                    <span aria-hidden="true">·</span>
                                )}
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Botões */}
            <div className="grid w-full min-w-0 grid-cols-3 gap-1.5 min-[400px]:gap-2 lg:col-span-1 lg:grid-cols-1">
                <a
                    href={project.caseStudyUrl}
                    className="flex min-w-0 items-center justify-center gap-1 rounded-lg border-2 border-primary bg-primary px-1 py-2 text-center text-[9px] font-semibold leading-tight text-white transition-all duration-250 hover:scale-103 hover:border-primary-hover hover:bg-primary-hover min-[400px]:px-1.5 min-[400px]:text-[10px] sm:gap-2 sm:px-3 sm:text-sm lg:text-base"
                >
                    <span>{t('hero.featuredProject.viewProject')}</span>
                    <BookOpen
                        size={14}
                        strokeWidth={2}
                        className="hidden shrink-0 min-[400px]:block sm:size-5.5 lg:size-7"
                    />
                </a>

                <a
                    href={project.demoUrl}
                    className="flex min-w-0 items-center justify-center gap-1 rounded-lg border-2 border-border bg-transparent px-1 py-2 text-center text-[9px] font-semibold leading-tight text-text-primary hover:border-primary hover:bg-hover min-[400px]:px-1.5 min-[400px]:text-[10px] sm:gap-2 sm:px-3 sm:text-sm lg:text-base transition-all duration-250 hover:scale-103"
                >
                    <span>{t('hero.featuredProject.accessProject')}</span>
                    <ExternalLink
                        size={14}
                        strokeWidth={2}
                        className="hidden shrink-0 min-[400px]:block sm:size-5.5 lg:size-7"
                    />
                </a>

                <a
                    href={project.githubUrl}
                    className="flex min-w-0 items-center justify-center gap-1 rounded-lg border-2 border-border bg-transparent px-1 py-2 text-center text-[9px] font-semibold leading-tight text-text-primary hover:border-primary hover:bg-hover min-[400px]:px-1.5 min-[400px]:text-[10px] sm:gap-2 sm:px-3 sm:text-sm lg:text-base transition-all duration-250 hover:scale-103"
                >
                    <span>{t('hero.featuredProject.viewCode')}</span>
                    <FaGithub
                        size={14}
                        className="hidden shrink-0 min-[400px]:block sm:size-5.5 lg:size-7"
                    />
                </a>
            </div>
        </article>
    )
}