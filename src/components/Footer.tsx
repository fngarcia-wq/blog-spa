import React from "react";
import "./Footer.css";

// ✅ BUENA PRÁCTICA: Componente simple y reutilizable
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🎓 Aprende React</h3>
            <p>
              Este blog está diseñado para enseñar React Hooks y buenas
              prácticas a través de ejemplos prácticos y comparaciones.
            </p>
          </div>

          <div className="footer-section">
            <h3>📚 Recursos</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="https://react.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Docs
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev/reference/react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Hooks
                </a>
              </li>
              <li>
                <a
                  href="https://typescript-eslint.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </a>
              </li>
              <li>
                <a
                  href="https://vitejs.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vite
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>🛠️ Tecnologías</h3>
            <div className="tech-stack">
              <span className="tech-badge">React 18</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">CSS3</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Blog de React. Hecho con ❤️ para aprender.</p>
          <p className="version">Versión: 1.0.0 | Build: {Date.now()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
