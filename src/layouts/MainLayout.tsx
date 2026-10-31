import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { FloatingActions } from '../components/FloatingActions/FloatingActions'

export function MainLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className="flex min-h-screen flex-col bg-bg text-text">
            <Header
                isMenuOpen={isMenuOpen}
                onMenuToggle={setIsMenuOpen}
            />

            <main className="overflow-x-hidden">
                <Outlet />
            </main>

            <Footer />

            <FloatingActions
                isMenuOpen={isMenuOpen}
            />
        </div>
    )
}