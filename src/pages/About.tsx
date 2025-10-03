import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="about-hero">
        <h1>📚 Acerca de este Blog Educativo</h1>
        <p className="subtitle">
          Una guía interactiva para aprender React Hooks y buenas prácticas de
          desarrollo
        </p>
      </div>

      <div className="content-grid">
        <section className="card">
          <h2>🎯 Propósito</h2>
          <p>
            Este blog SPA (Single Page Application) fue creado específicamente
            para fines educativos, diseñado para enseñar React Hooks,
            componentes JSX/TSX y las mejores prácticas de desarrollo.
          </p>
          <p>
            Cada ejemplo muestra tanto implementaciones{" "}
            <strong>correctas</strong> como <strong>incorrectas</strong>,
            permitiendo a los estudiantes aprender de forma comparativa y
            entender los conceptos fundamentales.
          </p>
        </section>

        <section className="card">
          <h2>🛠️ Tecnologías Utilizadas</h2>
          <ul className="tech-list">
            <li>
              <strong>React 18</strong> - Biblioteca principal para la interfaz
              de usuario
            </li>
            <li>
              <strong>TypeScript</strong> - Tipado estático para mejor
              desarrollo
            </li>
            <li>
              <strong>Vite</strong> - Herramienta de construcción rápida
            </li>
            <li>
              <strong>CSS3</strong> - Estilos modernos y responsivos
            </li>
            <li>
              <strong>ESLint</strong> - Análisis de código y mejores prácticas
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>📖 Contenido Educativo</h2>
          <div className="learning-topics">
            <div className="topic">
              <h3>🔗 React Hooks</h3>
              <ul>
                <li>useState - Manejo de estado local</li>
                <li>useEffect - Efectos y ciclo de vida</li>
                <li>useContext - Contexto global</li>
                <li>useReducer - Estado complejo</li>
                <li>useRef - Referencias DOM</li>
                <li>useMemo - Optimización de cálculos</li>
                <li>useCallback - Optimización de funciones</li>
              </ul>
            </div>

            <div className="topic">
              <h3>✨ Buenas Prácticas</h3>
              <ul>
                <li>Tipado con TypeScript</li>
                <li>Componentización efectiva</li>
                <li>Manejo correcto de dependencias</li>
                <li>Optimización de rendimiento</li>
                <li>Cleanup de recursos</li>
                <li>Patrones de diseño en React</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>🎓 Metodología de Enseñanza</h2>
          <div className="methodology">
            <div className="method good-practice">
              <h4>✅ Ejemplos Correctos</h4>
              <p>
                Implementaciones que siguen las mejores prácticas, con
                explicaciones detalladas de por qué son la forma recomendada de
                hacer las cosas.
              </p>
            </div>

            <div className="method bad-practice">
              <h4>❌ Ejemplos Incorrectos</h4>
              <p>
                Implementaciones que muestran errores comunes y anti-patrones,
                con explicaciones de por qué deben evitarse y qué problemas
                causan.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>🔄 Estructura del Proyecto</h2>
          <div className="code-block">
            <pre>{`src/
├── components/     # Componentes reutilizables
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/          # Hooks personalizados
│   ├── useCounter.ts
│   └── examples/   # Ejemplos educativos
├── pages/          # Páginas principales
│   ├── Home.tsx
│   └── About.tsx
├── layouts/        # Layouts de página
├── context/        # Contextos de React
├── services/       # Servicios API
└── tests/          # Pruebas unitarias`}</pre>
          </div>
        </section>

        <section className="card">
          <h2>🚀 Objetivos de Aprendizaje</h2>
          <div className="objectives">
            <div className="objective">
              <span className="objective-icon">🎯</span>
              <div>
                <h4>Dominar React Hooks</h4>
                <p>Entender cuándo y cómo usar cada hook correctamente</p>
              </div>
            </div>

            <div className="objective">
              <span className="objective-icon">🛡️</span>
              <div>
                <h4>Escribir Código Seguro</h4>
                <p>
                  Usar TypeScript para prevenir errores en tiempo de compilación
                </p>
              </div>
            </div>

            <div className="objective">
              <span className="objective-icon">⚡</span>
              <div>
                <h4>Optimizar Rendimiento</h4>
                <p>
                  Aplicar técnicas de optimización para aplicaciones rápidas
                </p>
              </div>
            </div>

            <div className="objective">
              <span className="objective-icon">🔧</span>
              <div>
                <h4>Mejores Prácticas</h4>
                <p>Adoptar patrones y convenciones de la industria</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="cta-section">
        <div className="card">
          <h2>💡 ¿Listo para Comenzar?</h2>
          <p>
            Explora los ejemplos interactivos en la página principal y comienza
            tu viaje de aprendizaje con React Hooks y las mejores prácticas de
            desarrollo.
          </p>
          <a href="#home" className="cta-button">
            🏠 Ir a los Ejemplos
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
