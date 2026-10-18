import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { FloatingActions } from '../components/FloatingActions/FloatingActions'

export function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-bg text-text">
            <Header />

            <main className="overflow-x-hidden">
                <Outlet />
            </main>

            <Footer />

            <FloatingActions />
        </div>
    )
}1