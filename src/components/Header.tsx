import React from "react";
import "./Header.css";

interface HeaderProps {
  title?: string;
}

// ✅ BUENA PRÁCTICA: Componente funcional con TypeScript
const Header: React.FC<HeaderProps> = ({
  title = "Blog de React - Hooks y Buenas Prácticas",
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <img
              src="/src/assets/logo.svg"
              alt="Blog Logo"
              className="logo"
              width="40"
              height="40"
            />
            <h1 className="site-title">{title}</h1>
          </div>

          <nav className="navigation">
            <a href="#home" className="nav-link active">
              🏠 Inicio
            </a>
            <a href="#hooks" className="nav-link">
              🪝 Hooks
            </a>
            <a href="#components" className="nav-link">
              🧩 Componentes
            </a>
            <a href="#practices" className="nav-link">
              ✨ Buenas Prácticas
            </a>
            <a href="#about" className="nav-link">
              ℹ️ Acerca de
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
