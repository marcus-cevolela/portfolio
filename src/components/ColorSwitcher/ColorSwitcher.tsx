import { useTheme } from '../../hooks/useTheme'

type ColorSwitcherProps = {
    variant?: "default" | "mobile"
}

export function ColorSwitcher({
    variant = "default",
}: ColorSwitcherProps) {
    const { accent, setAccent } = useTheme()

    return variant === "mobile" ? (
        <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
                type="button"
                aria-label="Alternar para Azul"
                aria-pressed={accent === "blue"}
                onClick={() => setAccent("blue")}
                className={`w-full flex items-center gap-2.5 min-h-14 px-3.5 rounded-[14px] border-2 bg-bg text-text text-[15px] font-semibold text-3xl text-left transition-colors ${accent === "blue"
                    ? "border-highlight bg-highlight-bg"
                    : "border-border"
                    }`}
            >
                <span className="flex items-center gap-2">
                    <span className={`w-5 h-5 shrink-0 rounded-full bg-[#015AFC]  ${accent === "blue"
                        ? "ring-2 ring-[#015AFC] ring-offset-2 ring-offset-bg"
                        : ""
                        }`}
                    />
                    <span>Azul</span>
                </span>
            </button>

            <button
                type="button"
                aria-label="Alternar para Vermelho"
                aria-pressed={accent === "red"}
                onClick={() => setAccent("red")}
                className={`w-full flex items-center gap-2.5 min-h-14 px-3.5 rounded-[14px] border-2 bg-bg text-text text-[15px] font-semibold text-left transition-colors ${accent === "red"
                    ? "border-highlight bg-highlight-bg"
                    : "border-border"
                    }`}
            >
                <span className={`w-5 h-5 shrink-0 rounded-full bg-[#D92D20]  ${accent === "red"
                    ? "ring-2 ring-[#D92D20] ring-offset-2 ring-offset-bg"
                    : ""
                    }`}
                />
                <span>Vermelho</span>
            </button>
        </div>
    ) : (
        <div className="inline-flex items-center gap-3 px-2 min-w-11 h-11 border-2 border-border rounded-xl bg-bg">
            <button
                type="button"
                aria-label="Alternar para Azul"
                aria-pressed={accent === "blue"}
                onClick={() => setAccent("blue")}
                className={
                    accent === "blue"
                        ? "ring-2 ring-[#015AFC] ring-offset-2 ring-offset-bg w-5 h-5 rounded-full bg-[#015AFC]"
                        : "w-5 h-5 rounded-full bg-[#015AFC]"
                }
            />

            <button
                type="button"
                aria-label="Alternar para Vermelho"
                aria-pressed={accent === "red"}
                onClick={() => setAccent("red")}
                className={
                    accent === "red"
                        ? "ring-2 ring-[#D92D20] ring-offset-2 ring-offset-bg w-5 h-5 rounded-full bg-[#D92D20]"
                        : "w-5 h-5 rounded-full bg-[#D92D20]"
                }
            />
        </div>
    )

}