import { useState } from 'react'
import { projects, type Project } from '../data/projects'

interface ProjectSelection {
    featuredProject: Project
    projectsSection: Project[]
}

function selectProjects(): ProjectSelection {
    const shuffledProjects = [...projects]

    for (let index = shuffledProjects.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        ;[shuffledProjects[index], shuffledProjects[randomIndex]] = [
            shuffledProjects[randomIndex],
            shuffledProjects[index],
        ]
    }

    const [featuredProject, ...projectsSection] = shuffledProjects

    if (!featuredProject || projectsSection.length < 3) {
        throw new Error('É necessário cadastrar pelo menos quatro projetos.')
    }

    return {
        featuredProject,
        projectsSection: projectsSection.slice(0, 3),
    }
}

export function useProjectSelection(): ProjectSelection {
    const [selection] = useState(selectProjects)

    return selection
}
