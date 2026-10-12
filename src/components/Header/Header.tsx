import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { ColorSwitcher } from "../ColorSwitcher/ColorSwitcher";

export function Header() {
    return (
        <header>
            <h1><a href="/">MINHA LOGO</a></h1>
            <nav>
                <ul>
                    <li><a href="">Projetos</a></li>
                    <li><a href="">Sobre</a></li>
                    <li><a href="">Contato</a></li>
                </ul>
            </nav>
            <LanguageSwitcher />
            <ThemeSwitcher />
            <ColorSwitcher />
            
        </header>
    )
}