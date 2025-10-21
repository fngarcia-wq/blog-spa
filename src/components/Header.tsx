import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  title?: string;
}

// ✅ BUENA PRÁCTICA: Componente funcional con TypeScript
const Header: React.FC<HeaderProps> = ({
  title = "Blog de React - Hooks y Buenas Prácticas",
}) => {
  const location = useLocation();
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
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              🏠 Dashboard
            </Link>
            <Link 
              to="/posts" 
              className={`nav-link ${location.pathname === '/posts' ? 'active' : ''}`}
            >
              📝 Posts
            </Link>
            <Link 
              to="/learning" 
              className={`nav-link ${location.pathname === '/learning' ? 'active' : ''}`}
            >
              🎓 Learning
            </Link>
            <Link 
              to="/security" 
              className={`nav-link ${location.pathname === '/security' ? 'active' : ''}`}
            >
              🛡️ Seguridad
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
