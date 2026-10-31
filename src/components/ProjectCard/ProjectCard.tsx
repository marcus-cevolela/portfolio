import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../data/projects'
import { BookOpen, ArrowRight, Image as ImageIcon } from 'lucide-react'
interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const { t } = useTranslation()

    return (
        <article className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-border bg-surface/50 p-2.5 min-[400px]:p-3 sm:p-4 lg:p-6">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex aspect-video w-full min-w-0 items-center justify-center rounded-xl border border-border bg-surface">
                    <ImageIcon
                        size={36}
                        strokeWidth={1.5}
                        className="text-text-secondary sm:h-12 sm:w-12"
                    />
                </div>

                <div className='flex flex-col gap-2.5'>
                    <div>
                        <h3>{project.title}</h3>
                        <p className='text-text-secondary'>{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <Link
                    to={project.caseStudyUrl}
                    className="group mt-auto inline-flex w-fit items-center gap-2 font-bold text-primary transition-colors duration-200 hover:text-highlight"
                >
                    <BookOpen size={20} />

                    {t('projects.caseStudy')}

                    <ArrowRight
                        size={18}
                        strokeWidth={2.5}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </article>
    )
}