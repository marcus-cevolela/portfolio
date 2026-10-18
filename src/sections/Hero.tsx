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
        <section className="relative mx-auto grid min-h-[95vh] w-full max-w-360 grid-cols-1 items-center gap-x-24 gap-y-8 px-6 py-16 lg:grid-cols-[3fr_2fr] lg:px-8 overflow">
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
            <div className='relative z-10 flex flex-col order-2 lg:order-1'>
                <span className='font-mono text-lg text-highlight'>{t('hero.availability')}</span>
                <h1 className='text-6xl/[0.95] md:text-9xl/[0.95] font-bold'>
                    MARCUS<br />CEVOLELA
                </h1>
                <h2 className='text-xl tracking-[0.4em] font-medium text-primary'>
                    {t('hero.role')}
                </h2>
                <p className='text-[22px] leading-tight text-text-secondary max-w-full mt-4'>
                    <strong>{t('hero.description.headline')}</strong><br />
                    {t('hero.description.supporting')}
                </p>
                <div className='font-semibold flex gap-3 flex-wrap items-center mt-5'>
                    <a
                        href="#projects"
                        className='px-8 py-4 rounded-xl bg-primary border-2 border-primary hover:bg-primary-hover hover:border-primary-hover hover:scale-105 transition-all duration-250'>
                        {t('hero.actions.projects')}
                    </a>
                    <a
                        href="#contact"
                        className='px-8 py-4 border-2 border-border rounded-xl hover:border-primary hover:bg-hover hover:scale-105 transition-all duration-250'>
                        {t('hero.actions.contact')}
                    </a>
                </div>
            </div>
            <div className="relative z-10 w-full order-1 lg:order-2">
                <Logo3D
                    accent={logoAccent}
                    theme={logoTheme}
                    className="w-full lg:w-[150%] lg:relative lg:left-1/2 lg:-translate-x-1/2"
                    fallback={
                        <img
                            src={fallbackLogo}
                            alt="Logo Marcus Cevolela"
                            className="h-full w-full object-contain"
                        />
                    }
                />

                <p className="mt-2 text-center font-mono text-sm text-text-secondary">
                    // clique para girar
                </p>
            </div>

            <FeaturedProject className="relative z-10 order-3 mx-auto w-full lg:col-span-2 lg:max-w-5xl" />
        </section>
    )
}

