import { useTheme } from '../../hooks/useTheme'

export function ColorSwitcher() {
    const {accent, setAccent} = useTheme()

    return (
        <div className='inline-flex items-center gap-3 px-2 min-w-11 h-11 border-2 border-border rounded-xl bg-bg'>
            <button
                aria-label="Alternar para Azul"
                aria-pressed={accent === 'blue'}
                onClick={() => setAccent('blue')}
                className={accent === 'blue' ? 'ring-2 ring-[#015AFC] ring-offset-2 ring-offset-bg w-5 h-5 rounded-full bg-[#015AFC]' : 'w-5 h-5 rounded-full bg-[#015AFC]'}
            ></button>

            <button
                aria-label="Alternar para Vermelho"
                aria-pressed={accent === 'red'}
                onClick={() => setAccent('red')}
                className={accent === 'red' ? 'ring-2 ring-[#D92D20] ring-offset-2 ring-offset-bg w-5 h-5 rounded-full bg-[#D92D20]' : 'w-5 h-5 rounded-full bg-[#D92D20]'}
            ></button>
        </div>
        
    )
}