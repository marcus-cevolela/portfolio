import { useEffect, useState } from 'react'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'

export function FloatingActions() {
    const [showBackToTop, setShowBackToTop] = useState(false)
    const [hideActions, setHideActions] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > window.innerHeight)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const footer = document.querySelector('footer')

        if (!footer) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setHideActions(entry.isIntersecting)
            },
            {
                threshold: 0.1,
            },
        )

        observer.observe(footer)

        return () => observer.disconnect()
    }, [])
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4 transition-all duration-300 ${hideActions
                    ? 'pointer-events-none translate-y-4 opacity-0'
                    : 'translate-y-0 opacity-100'
                }`}
        >
            <button
                type="button"
                aria-label="Voltar ao topo"
                onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-text-primary shadow-lg transition-all duration-300 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${showBackToTop
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-3 opacity-0'
                    }`}
            >
                <FaArrowUp size={20} />
            </button>

            <a
                href="https://wa.me/5521981213090"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors duration-300 hover:bg-[#20BA5A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
            >
                <span
                    className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl border border-border bg-surface px-4 py-2.5 font-medium text-text-primary opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                    Falar no WhatsApp
                </span>

                <FaWhatsapp size={30} />
            </a>
        </div>
    )
}