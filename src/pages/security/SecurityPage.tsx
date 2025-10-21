import React, { useState } from "react";
import "./SecurityPage.css";
import TokenSecurity from "../../components/security/TokenSecurity";
import XSSProtection from "../../components/security/XSSProtection";
import CORSConfiguration from "../../components/security/CORSConfiguration";
import OAuthIntegration from "../../components/security/OAuthIntegration";
import SecurityChecklist from "../../components/security/SecurityChecklist";

interface SecurityThreat {
  id: string;
  name: string;
  severity: "Crítica" | "Alta" | "Media" | "Baja";
  description: string;
  impact: string;
}

const SecurityPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("intro");

  const securityThreats: SecurityThreat[] = [
    {
      id: "xss",
      name: "Cross-Site Scripting (XSS)",
      severity: "Crítica",
      description: "Inyección de scripts maliciosos en páginas web",
      impact: "Robo de cookies, tokens, y ejecución de código malicioso",
    },
    {
      id: "csrf",
      name: "Cross-Site Request Forgery (CSRF)",
      severity: "Alta",
      description: "Ejecución no autorizada de acciones en nombre del usuario",
      impact: "Cambios no autorizados en datos del usuario",
    },
    {
      id: "token-theft",
      name: "Robo de Tokens",
      severity: "Crítica",
      description: "Acceso no autorizado a tokens de autenticación",
      impact: "Suplantación de identidad y acceso no autorizado",
    },
    {
      id: "cors-misconfiguration",
      name: "Configuración CORS Incorrecta",
      severity: "Media",
      description: "Política CORS permisiva o mal configurada",
      impact: "Exposición de datos a dominios no autorizados",
    },
    {
      id: "insecure-storage",
      name: "Almacenamiento Inseguro",
      severity: "Alta",
      description: "Datos sensibles en localStorage o cookies inseguras",
      impact: "Exposición de información confidencial",
    },
  ];

  const getSeverityBadge = (severity: SecurityThreat["severity"]) => {
    const severityClasses = {
      Crítica: "severity-critical",
      Alta: "severity-high",
      Media: "severity-medium",
      Baja: "severity-low",
    };

    return (
      <span className={`severity-badge ${severityClasses[severity]}`}>
        {severity}
      </span>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "intro":
        return (
          <div className="security-intro">
            <h2>🛡️ Introducción a Seguridad Frontend</h2>

            <div className="golden-rule">
              <h3>🏆 Regla de Oro de Seguridad Frontend</h3>
              <blockquote>
                "Nunca confíes en el frontend. Toda validación y seguridad debe
                existir también en el backend. El frontend es solo la primera
                línea de defensa, no la única."
              </blockquote>
            </div>

            <div className="why-important">
              <h3>¿Por qué es importante la seguridad frontend?</h3>
              <ul>
                <li>
                  🎯 <strong>Primera línea de defensa:</strong> El frontend es
                  el punto de entrada visible para atacantes
                </li>
                <li>
                  🔐 <strong>Datos sensibles:</strong> Maneja tokens,
                  información personal y sesiones de usuario
                </li>
                <li>
                  🌐 <strong>Superficie de ataque amplia:</strong> Múltiples
                  vectores de ataque (XSS, CSRF, etc.)
                </li>
                <li>
                  📱 <strong>Confianza del usuario:</strong> La seguridad afecta
                  directamente la experiencia del usuario
                </li>
                <li>
                  💰 <strong>Impacto en el negocio:</strong> Las brechas de
                  seguridad pueden ser costosas
                </li>
              </ul>
            </div>

            <div className="threats-overview">
              <h3>🚨 Principales Amenazas de Seguridad</h3>
              <div className="threats-grid">
                {securityThreats.map((threat) => (
                  <div key={threat.id} className="threat-card">
                    <div className="threat-header">
                      <h4>{threat.name}</h4>
                      {getSeverityBadge(threat.severity)}
                    </div>
                    <p className="threat-description">{threat.description}</p>
                    <div className="threat-impact">
                      <strong>Impacto:</strong> {threat.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="security-principles">
              <h3>🔒 Principios Fundamentales</h3>
              <div className="principles-grid">
                <div className="principle-card">
                  <h4>🛡️ Defensa en Profundidad</h4>
                  <p>
                    Múltiples capas de seguridad: frontend, backend, red,
                    infraestructura
                  </p>
                </div>
                <div className="principle-card">
                  <h4>🔐 Principio de Menor Privilegio</h4>
                  <p>Conceder solo los permisos mínimos necesarios</p>
                </div>
                <div className="principle-card">
                  <h4>❌ Fallar de Forma Segura</h4>
                  <p>Cuando algo falla, debe fallar en un estado seguro</p>
                </div>
                <div className="principle-card">
                  <h4>🔍 Validación en Ambos Lados</h4>
                  <p>Validar datos tanto en frontend como en backend</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "tokens":
        return <TokenSecurity />;

      case "xss":
        return <XSSProtection />;

      case "cors":
        return <CORSConfiguration />;

      case "oauth":
        return <OAuthIntegration />;

      case "checklist":
        return <SecurityChecklist threats={securityThreats} />;

      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="security-page">
      <div className="security-sidebar">
        <h2>🛡️ Seguridad Frontend</h2>
        <nav className="security-nav">
          <button
            className={activeSection === "intro" ? "active" : ""}
            onClick={() => setActiveSection("intro")}
          >
            📚 Introducción
          </button>
          <button
            className={activeSection === "tokens" ? "active" : ""}
            onClick={() => setActiveSection("tokens")}
          >
            🔑 Tokens Seguros
          </button>
          <button
            className={activeSection === "xss" ? "active" : ""}
            onClick={() => setActiveSection("xss")}
          >
            💉 Protección XSS
          </button>
          <button
            className={activeSection === "cors" ? "active" : ""}
            onClick={() => setActiveSection("cors")}
          >
            🌐 Configuración CORS
          </button>
          <button
            className={activeSection === "oauth" ? "active" : ""}
            onClick={() => setActiveSection("oauth")}
          >
            🔐 Integración OAuth
          </button>
          <button
            className={activeSection === "checklist" ? "active" : ""}
            onClick={() => setActiveSection("checklist")}
          >
            ✅ Checklist Final
          </button>
        </nav>
      </div>

      <div className="security-content">{renderContent()}</div>
    </div>
  );
};

export default SecurityPage;
