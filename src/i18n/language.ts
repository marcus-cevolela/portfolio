export const supportedLanguages = ['pt', 'en', 'es'] as const

export type Language = (typeof supportedLanguages)[number]

export function isSupportedLanguage(
    language: string | undefined,
): language is Language {
    return (
        language !== undefined &&
        supportedLanguages.some((supportedLanguage) => supportedLanguage === language)
    )
}