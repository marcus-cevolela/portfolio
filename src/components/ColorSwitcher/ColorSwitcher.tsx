import { useTheme } from '../../hooks/useTheme'

export function ColorSwitcher() {
    const {accent, setAccent} = useTheme()

    return (
        <div className='inline-flex items-center gap-0.5 px-1 h-11 border-2 border-border rounded-xl bg-bg'>
            <button
                aria-label="Alternar para Azul"
                aria-pressed={accent === 'blue'}
                onClick={() => setAccent('blue')}
                className={accent === 'blue' ? 'ring-2 ring-white w-5 h-5 rounded-full bg-[#015AFC]' : 'w-5 h-5 rounded-full bg-[#015AFC]'}
            ></button>

            <button
                aria-label="Alternar para Vermelho"
                aria-pressed={accent === 'red'}
                onClick={() => setAccent('red')}
                className={accent === 'red' ? 'ring-2 ring-white w-5 h-5 rounded-full bg-[#D92D20]' : 'w-5 h-5 rounded-full bg-[#D92D20]'}
            ></button>
        </div>
        
    )
}