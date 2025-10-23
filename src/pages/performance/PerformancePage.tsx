import React, { useState } from "react";
import "./PerformancePage.css";

// Importamos todos los componentes de performance
import PerformanceIntro from "../../components/performance/PerformanceIntro";
import LazyLoadingDemo from "../../components/performance/LazyLoadingDemo";
import MemoizationDemo from "../../components/performance/MemoizationDemo";
import CodeSplittingDemo from "../../components/performance/CodeSplittingDemo";
import ReactQuerySetup from "../../components/performance/ReactQuerySetup";
import UseQueryDemo from "../../components/performance/UseQueryDemo";
import ApiServiceDemo from "../../components/performance/ApiServiceDemo";
import CustomHooksDemo from "../../components/performance/CustomHooksDemo";

const PerformancePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("intro");

  const sections = [
    { id: "intro", title: "📊 Introducción", icon: "🎯" },
    { id: "lazy-loading", title: "Lazy Loading", icon: "⚡" },
    { id: "memoization", title: "Memoization", icon: "🧠" },
    { id: "code-splitting", title: "Code Splitting", icon: "📦" },
    { id: "react-query-setup", title: "React Query Setup", icon: "🔧" },
    { id: "use-query", title: "useQuery", icon: "📡" },
    { id: "api-service", title: "API Service", icon: "🌐" },
    { id: "custom-hooks", title: "Custom Hooks", icon: "🪝" },
    { id: "prefetching", title: "Prefetching", icon: "🚀" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "intro":
        return <PerformanceIntro />;
      case "lazy-loading":
        return <LazyLoadingDemo />;
      case "memoization":
        return <MemoizationDemo />;
      case "code-splitting":
        return <CodeSplittingDemo />;
      case "react-query-setup":
        return <ReactQuerySetup />;
      case "use-query":
        return <UseQueryDemo />;
      case "api-service":
        return <ApiServiceDemo />;
      case "custom-hooks":
        return <CustomHooksDemo />;
      case "listing-component":
        return (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>🚧 ListingComponent - En Desarrollo</h2>
            <p>
              Este componente estará disponible próximamente con CRUD completo,
              paginación y optimizaciones.
            </p>
          </div>
        );
      case "prefetching":
        return (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>🚧 PrefetchingDemo - En Desarrollo</h2>
            <p>
              Este componente mostrará técnicas de prefetching e infinite
              scroll.
            </p>
          </div>
        );
      case "checklist":
        return (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>🚧 PerformanceChecklist - En Desarrollo</h2>
            <p>
              Checklist interactivo de optimización estará disponible
              próximamente.
            </p>
          </div>
        );
      default:
        return <PerformanceIntro />;
    }
  };

  return (
    <div className="performance-page">
      <div className="performance-header">
        <h1>⚡ Performance y Optimización</h1>
        <p>Técnicas avanzadas para optimizar aplicaciones React</p>
      </div>

      <div className="performance-container">
        {/* Sidebar de navegación */}
        <aside className="performance-sidebar">
          <nav className="performance-nav">
            <h3>📚 Contenido de la Clase</h3>
            <ul className="nav-list">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`nav-button ${
                      activeSection === section.id ? "active" : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="nav-icon">{section.icon}</span>
                    <span className="nav-title">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resumen de beneficios */}
          <div className="benefits-summary">
            <h4>🎯 Beneficios del Performance</h4>
            <ul>
              <li>⚡ Carga más rápida</li>
              <li>💰 Menor costo de servidor</li>
              <li>😊 Mejor experiencia de usuario</li>
              <li>📈 Mayor conversión</li>
              <li>🔍 Mejor SEO</li>
            </ul>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="performance-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default PerformancePage;
