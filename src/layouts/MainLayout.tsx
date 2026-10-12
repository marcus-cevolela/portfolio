import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-bg text-text">
            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <footer>

            </footer>
        </div>
    )
}