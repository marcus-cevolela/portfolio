import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, accent, toggleTheme, toggleAccent } = useTheme()

  return (
    <main className="min-h-screen bg-bg p-8 text-text">
      <h1>Marcus Cevolela</h1>
      <p>Tema atual: {theme}</p>
      <p>Cor atual: {accent}</p>
      <button onClick={toggleTheme}>Trocar Tema</button>
      <button onClick={toggleAccent}>Trocar Cor</button>
    </main>
  )
}

export default App