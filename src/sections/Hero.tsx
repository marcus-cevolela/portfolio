import { useTheme } from '../hooks/useTheme'
import Logo3D from '../components/Logo3D/Logo3D'

import logoLightBlue from '../assets/logo-light-blue.svg'
import logoLightRed from '../assets/logo-light-red.svg'
import logoDarkBlue from '../assets/logo-dark-blue.svg'
import logoDarkRed from '../assets/logo-dark-red.svg'

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

export function Hero() {
    const { theme, accent } = useTheme()

    const fallbackLogo = logos[theme][accent]

    const logoAccent = accent === 'blue' ? 'azul' : 'vermelho'
    const logoTheme = theme === 'dark' ? 'dark' : 'light'

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">
            <div className="w-full max-w-2xl">
                <Logo3D
                    accent={logoAccent}
                    theme={logoTheme}
                    className="w-full"
                    fallback={
                        <img
                            src={fallbackLogo}
                            alt="Logo Marcus Cevolela"
                            className="h-full w-full object-contain"
                        />
                    }
                />
            </div>
        </section>
    )
}