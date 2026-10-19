import { useTheme } from '../hooks/useTheme'
import { FeaturedProject } from '../components/FeaturedProject/FeaturedProject'
import { useTranslation } from 'react-i18next'
import Logo3D from '../components/Logo3D/Logo3D'
import logoLightBlue from '../assets/logo-light-blue.svg'
import logoLightRed from '../assets/logo-light-red.svg'
import logoDarkBlue from '../assets/logo-dark-blue.svg'
import logoDarkRed from '../assets/logo-dark-red.svg'
import backgroundLightBlue from '../assets/background-light-blue.svg'
import backgroundLightRed from '../assets/background-light-red.svg'
import backgroundDarkBlue from '../assets/background-dark-blue.svg'
import backgroundDarkRed from '../assets/background-dark-red.svg'

const logos = {
    light: {
        blue: logoLightBlue,
        red: logoLightRed,
    },
    dark: {
        blue: logoDarkBlue,
        red: logoDarkRed,
    },
}

const background = {
    light: {
        blue: backgroundLightBlue,
        red: backgroundLightRed,
    },
    dark: {
        blue: backgroundDarkBlue,
        red: backgroundDarkRed,
    },
}

export function Hero() {
    const { t } = useTranslation()
    const { theme, accent } = useTheme()

    const fallbackLogo = logos[theme][accent]

    const logoAccent = accent === 'blue' ? 'azul' : 'vermelho'
    const logoTheme = theme === 'dark' ? 'dark' : 'light'
    const backgroundTheme = background[theme][accent]

    return (
        <section className="relative mx-auto grid min-h-[95svh] w-full max-w-360 grid-cols-1 items-center gap-x-24 gap-y-3 px-5 py-8 sm:gap-y-6 sm:px-8 sm:py-10 lg:grid-cols-[3fr_2fr] lg:gap-x-16 lg:gap-y-8 lg:px-8 lg:py-12 [@media(min-width:1024px)_and_(max-width:1399px)]:px-22 overflow-visible">
            <div className="pointer-events-none absolute inset-0 z-0 w-screen left-1/2 -translate-x-1/2">
                <img
                    src={backgroundTheme}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, var(--bg) 100%)',
                }}
            />
            <div className="relative z-10 order-2 flex w-full flex-col lg:order-1">
                <span className="whitespace-nowrap font-mono text-[11px] leading-relaxed text-highlight min-[400px]:text-sm sm:text-base md:text-lg">{t('hero.availability')}</span>
                <h1 className="mt-1 text-5xl/[0.95] min-[400px]:text-5xl/[0.95] md:text-7xl/[0.95] lg:text-9xl/[0.95] [@media(min-width:1024px)_and_(max-width:1399px)_and_(max-height:800px)]:text-6xl/[0.95] font-bold">
                    MARCUS<br />CEVOLELA
                </h1>
                <h2 className="mt-1 text-sm font-medium tracking-[0.12em] text-primary min-[400px]:text-base min-[400px]:tracking-[0.2em] sm:text-lg md:text-xl md:tracking-[0.25em] lg:tracking-[0.3em] [@media(min-width:1024px)_and_(max-width:1399px)_and_(max-height:800px)]:text-base [@media(min-width:1024px)_and_(max-width:1399px)_and_(max-height:800px)]:tracking-[0.2em]">
                    {t('hero.role')}
                </h2>
                <p className="mt-3 max-w-full text-[15px] leading-relaxed text-text-secondary min-[400px]:text-base sm:mt-4 sm:text-lg md:text-xl lg:mt-4 [@media(min-width:1024px)_and_(max-width:1399px)_and_(max-height:800px)]:mt-2 [@media(min-width:1024px)_and_(max-width:1399px)_and_(max-height:800px)]:text-base">
                    <strong>{t('hero.description.headline')}</strong><br />
                    {t('hero.description.supporting')}
                </p>
                <div className="mt-5 flex w-full flex-col items-center gap-3 font-semibold sm:w-fit sm:flex-row">
                    <a
                        href="#projects"
                        className="w-full rounded-xl border-2 border-primary bg-primary px-8 py-4 text-center transition-all duration-250 hover:scale-105 hover:border-primary-hover hover:bg-primary-hover sm:w-auto">
                        {t('hero.actions.projects')}
                    </a>
                    <a
                        href="#contact"
                        className="w-full rounded-xl border-2 border-border px-8 py-4 text-center transition-all duration-250 hover:scale-105 hover:border-primary hover:bg-hover sm:w-auto">
                        {t('hero.actions.contact')}
                    </a>
                </div>
            </div>
            <div className="relative z-10 w-full order-1 lg:order-2">
                <Logo3D
                    accent={logoAccent}
                    theme={logoTheme}
                    className="mx-auto w-[95%] max-w-90 min-[400px]:w-[85%] min-[400px]:max-w-90 sm:w-[95%] sm:max-w-105 md:max-w-120 lg:relative lg:left-1/2 lg:w-[150%] lg:max-w-none lg:-translate-x-1/2 [@media(min-width:1024px)_and_(max-width:1399px)]:w-[110%]"
                    fallback={
                        <img
                            src={fallbackLogo}
                            alt="Logo Marcus Cevolela"
                            className="h-full w-full object-contain"
                        />
                    }
                />
            </div>

            <FeaturedProject className="relative z-10 order-3 mx-auto w-full lg:col-span-2 lg:max-w-5xl" />
        </section>
    )
}

