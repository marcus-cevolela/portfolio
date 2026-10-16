import { FaLinkedin, FaGithub, FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

type SocialLinksProps = {
    variant?: 'default' | 'mobile'
}

const socialLinks = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/marcus-cevolela/',
        icon: <FaLinkedin />,
    },
    {
        name: 'GitHub',
        href: 'https://github.com/marcus-cevolela',
        icon: <FaGithub />,
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/5521981213090',
        icon: <FaWhatsapp />,
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/cevolela.dev/',
        icon: <FaInstagram />,
    },
    {
        name: 'Email',
        href: 'mailto:marcus.cevolela@gmail.com',
        icon: <FaEnvelope />,
    },
]

export function SocialLinks({ variant = 'default' }: SocialLinksProps) {
    return variant === 'mobile' ? (
        <div>
            <div className="grid grid-cols-4 gap-3 min-[400px]:gap-5">
                {socialLinks.slice(0, 4).map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        aria-label={social.name}
                        className="group flex flex-col items-center gap-0 transition-all duration-250 hover:scale-103">
                        <span className="flex h-13 w-13 min-[400px]:h-15 min-[400px]:w-15 items-center justify-center rounded-xl border-2 border-border bg-surface text-text transition-colors duration-250 group-hover:border-primary group-hover:text-primary">
                            <span className="text-[30px] min-[400px]:text-[35px]">
                                {social.icon}
                            </span>
                        </span>
                    </a>
                ))}
            </div>
            <a
                href="mailto:marcus.cevolela@gmail.com"
                aria-label="Enviar e-mail para Marcus Cevolela"
                className="group mt-2 min-[400px]:mt-3 flex w-full items-center justify-center gap-2 min-[400px]:gap-3 rounded-xl border-2 border-border bg-surface px-3 min-[400px]:px-4 py-3 min-[400px]:py-4 transition-all duration-250 hover:border-primary hover:scale-103"
            >
                <FaEnvelope className="shrink-0 text-2xl min-[400px]:text-3xl text-text transition-colors duration-250 group-hover:text-primary" />

                <span className="truncate font-mono text-xs min-[400px]:text-sm font-semibold text-text-secondary transition-colors duration-250 group-hover:text-primary">
                    marcus.cevolela@gmail.com
                </span>
            </a>
        </div>

    ) : (
        <div className="grid grid-cols-2 gap-2 max-w-lg md:max-w-3xl lg:max-w-md">
            {socialLinks.map((social) => (
                <a
                    href={social.href}
                    rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    key={social.name}
                    target={social.name !== 'Email' ? '_blank' : undefined}
                    className={`flex items-center gap-2 border-2 border-border hover:border-primary hover:text-primary rounded-xl transition-all hover:scale-103 ease-in-out duration-250 px-6 py-3 justify-center bg-surface font-mono font-semibold ${social.name === 'Email' ? 'col-span-2' : ''
                        }`}>
                    <span className="shrink-0 [&>svg]:h-6.25 [&>svg]:w-6.25">
                        {social.icon}
                    </span>
                    {social.name}
                </a>
            ))}
        </div>
    )
}