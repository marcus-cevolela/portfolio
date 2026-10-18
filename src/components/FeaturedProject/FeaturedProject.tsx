import { projects } from '../../data/projects'
import { Image as ImageIcon, BookOpen, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

interface FeaturedProjectProps {
    className?: string
}

export function FeaturedProject({ className }: FeaturedProjectProps) {
    const randomIndex = Math.floor(Math.random() * projects.length)
    const project = projects[randomIndex]

    return (
        <article className={`flex items-center gap-6 rounded-2xl border border-border bg-surface/50 p-6 ${className ?? ''}`}>

            {/* imagem do projeto */}
            <div className="flex h-40 w-64 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                <ImageIcon
                    size={48}
                    strokeWidth={1.5}
                    className="text-text-secondary"
                />
            </div>

            {/* infos do projeto */}
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                <span className="whitespace-nowrap rounded-full bg-primary/20 border border-highlight px-2.5 py-1 font-mono text-sm text-highlight">
                    Projeto em destaque
                </span>
                <div>
                    <h3 className="text-2xl font-bold leading-tight">
                        {project.title}
                    </h3>
                    <p className='text-lg text-text-secondary leading-normal'>{project.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {project.technologies.map((tech, index) => (
                        <span key={tech} className="inline-flex items-center gap-2 text-text-tertiary font-mono text-sm font-bold">
                            {index > 0 && (
                                <span aria-hidden="true" className="text-text-tertiary">
                                    •
                                </span>
                            )}
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* botoes do projeto */}
            <div className="flex w-60 shrink-0 flex-col justify-center gap-2">
                <a
                    href={project.caseStudyUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary px-3 py-2 font-semibold text-white transition-all hover:scale-102 hover:bg-primary-hover hover:border-primary-hover"
                >
                    Ver estudo de caso
                    <BookOpen size={22} strokeWidth={2} />
                </a>

                <a
                    href={project.demoUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border bg-transparent px-3 py-2 font-semibold text-text-primary transition-all hover:scale-102 hover:border-primary hover:bg-hover"
                >
                    Acessar Projeto
                    <ExternalLink size={22} strokeWidth={2} />
                </a>

                <a
                    href={project.githubUrl}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border bg-transparent px-3 py-2 font-semibold text-text-primary transition-all hover:scale-102 hover:border-primary hover:bg-hover"
                >
                    Ver Código
                    <FaGithub size={22} />
                </a>
            </div>
        </article >
    )
}