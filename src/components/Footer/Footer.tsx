import { ArrowDownToLine, ArrowUp } from 'lucide-react'
import { SocialLinks } from "../SocialLinks/SocialLinks"
import { useTheme } from "../../hooks/useTheme"
import logoDarkBlue from "../../assets/logo-dark-blue.svg"
import logoDarkRed from "../../assets/logo-dark-red.svg"
import logoLightBlue from "../../assets/logo-light-blue.svg"
import logoLightRed from "../../assets/logo-light-red.svg"

export function Footer() {
    const { theme, accent } = useTheme()

    const logoMap = {
        "dark-blue": logoDarkBlue,
        "dark-red": logoDarkRed,
        "light-blue": logoLightBlue,
        "light-red": logoLightRed,
    }

    const logo = logoMap[`${theme}-${accent}`] || logoMap["dark-blue"]

    const navigationLinks = [
        { name: 'Projetos', href: '#projects' },
        { name: 'Sobre', href: '#about' },
        { name: 'Contato', href: '#contact' },
    ]

    const usedTechs = [
        { name: 'React' },
        { name: 'TypeScript' },
        { name: 'Tailwind CSS' },
    ]

    return (
        <footer className="border-t-primary border-t-2 shadow-[0_-2px_4px_var(--primary)] px-4 sm:px-6 md:px-8 lg:px-10 pt-6 pb-4">
            <div className="grid grid-cols-1 gap-8 lg:gap-12 items-start mb-6 lg:grid-cols-3">
                {/* contato e redes */}
                <div className="flex flex-col gap-1 order-2 lg:order-1">
                    <h2 className="text-highlight font-mono font-semibold">// Vamos Conversar</h2>
                    <p className="text-text-secondary">Aberto para estágio ou freelancer</p>

                    <a
                        href="/files/curriculo-marcus-cevolela.pdf" download
                        className="font-black flex items-center gap-2 mb-1 border-2 border-primary text-primary rounded-xl transition-all hover:bg-primary hover:text-text hover:scale-103 ease-in-out duration-250 w-full max-w-lg md:max-w-3xl lg:max-w-md px-6 py-3 justify-center text-lg font-mono">
                        <ArrowDownToLine size={28} strokeWidth={3} />
                        Baixar Currículo
                    </a>

                <SocialLinks />
                </div>
                
                {/* logo */}
                <div className="flex flex-col items-center justify-center self-center text-center order-1 lg:order-2">
                    <img src={logo} alt="Logo Marcus Cevolela" className="w-40 lg:w-50 h-auto"/>

                    <h2 className="text-text font-semibold text-xl">Marcus Cevolela</h2>

                    <p className="text-primary font-mono text-sm font-medium tracking-widest">DESENVOLVEDOR FULLSTACK</p>
                </div>
                
                {/* links rapidos techs e atualização */}
                <div className="flex flex-col items-start lg:items-end text-left lg:text-right gap-4 order-3 lg:order-3">
                    <div>
                        <h2 className="text-highlight font-mono font-semibold">// Links Rápidos</h2>

                        <ul className="flex flex-col items-start lg:items-end gap-2 mt-3">
                            {navigationLinks.map((navigation) => (
                                <li key={navigation.name}>
                                    <a
                                        href={navigation.href}
                                        className="text-text-secondary transition-colors duration-200 hover:text-primary before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-primary before:mr-2 before:align-middle underline hover:decoration-primary">
                                        {navigation.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-highlight font-mono font-semibold">// Desenvolvido com</h2>

                        <ul className="flex flex-col items-start lg:items-end gap-2 mt-3">
                            {usedTechs.map((tech) => (
                                <li key={tech.name}>
                                    <p className="text-text-secondary font-mono before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-primary before:mr-2 before:align-middle">
                                        {tech.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-2 text-text-tertiary font-mono text-xs">
                        <span>Última atualização: DD/MM/AAAA</span>
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                        </span>
                    </div>
                </div>
            </div>

            {/* copyright */}
            <hr className="border-t-2 border-border -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10" />
            <div className="flex justify-between flex-col sm:flex-row sm:gap-5 text-text-secondary text-sm pt-4">
                <span>© 2026 Marcus Cevolela — Todos os direitos reservados</span>

                <a href="#top" className="flex items-center gap-1 mt-2 sm:mt-0 whitespace-nowrap underline hover:text-text">
                    <ArrowUp size={20} />
                    Voltar ao topo
                </a>
            </div>
        </footer>
    )
}