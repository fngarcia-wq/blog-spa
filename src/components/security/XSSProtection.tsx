import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./XSSProtection.css";

interface XSSExample {
  id: string;
  name: string;
  type: "Stored" | "Reflected" | "DOM-based";
  severity: "Crítica" | "Alta" | "Media";
  description: string;
  maliciousCode: string;
  impact: string;
}

const XSSProtection: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [sanitizedInput, setSanitizedInput] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

  const xssExamples: XSSExample[] = [
    {
      id: "stored",
      name: "Stored XSS",
      type: "Stored",
      severity: "Crítica",
      description:
        "Script malicioso almacenado en la base de datos que se ejecuta para todos los usuarios",
      maliciousCode: '<script>alert("XSS Stored!");</script>',
      impact: "Alto - Afecta a todos los usuarios que vean el contenido",
    },
    {
      id: "reflected",
      name: "Reflected XSS",
      type: "Reflected",
      severity: "Alta",
      description: "Script malicioso reflejado desde la URL o form data",
      maliciousCode: '<img src="x" onerror="alert(\'XSS Reflected!\')">',
      impact:
        "Medio - Requiere que la víctima haga clic en un enlace malicioso",
    },
    {
      id: "dom",
      name: "DOM-based XSS",
      type: "DOM-based",
      severity: "Alta",
      description: "Script que modifica el DOM en el lado del cliente",
      maliciousCode:
        "document.body.innerHTML = \"<script>alert('DOM XSS!')</script>\";",
      impact: "Medio-Alto - Ejecutado completamente en el cliente",
    },
  ];

  // Función para sanitizar HTML
  const sanitizeHTML = (html: string): string => {
    return DOMPurify.sanitize(html);
  };

  // Validación de URLs
  const validateURL = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Solo permitir protocolos seguros
      return ["http:", "https:"].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  const handleSanitize = () => {
    const sanitized = sanitizeHTML(userInput);
    setSanitizedInput(sanitized);
  };

  const handleUrlValidation = (url: string) => {
    setUrlInput(url);
    setIsValidUrl(validateURL(url));
  };

  // Código vulnerable vs seguro
  const vulnerableCode = `// ❌ CÓDIGO VULNERABLE - NO HACER ESTO

// 1. Inserción directa de HTML sin sanitizar
const renderUserComment = (comment) => {
  return \`<div class="comment">\${comment}</div>\`; // ❌ XSS vulnerable
};

// 2. Uso peligroso de dangerouslySetInnerHTML
const CommentComponent = ({ comment }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: comment // ❌ Sin sanitizar - muy peligroso
      }} 
    />
  );
};

// 3. Uso directo de innerHTML
const displayMessage = (message) => {
  document.getElementById('output').innerHTML = message; // ❌ XSS vulnerable
};

// 4. Construcción de URLs sin validación
const redirectUser = (userProvidedUrl) => {
  window.location.href = userProvidedUrl; // ❌ Puede ser javascript:alert('XSS')
};

// 5. Eval de contenido del usuario
const executeUserCode = (userCode) => {
  eval(userCode); // ❌ ¡Nunca hagas esto!
};`;

  const secureCode = `// ✅ CÓDIGO SEGURO - MEJORES PRÁCTICAS

import DOMPurify from 'dompurify';

// 1. ✅ React automáticamente escapa contenido
const SafeCommentComponent = ({ comment }) => {
  return (
    <div className="comment">
      {comment} {/* ✅ React escapa automáticamente */}
    </div>
  );
};

// 2. ✅ Sanitización antes de usar dangerouslySetInnerHTML
const SafeHTMLComponent = ({ htmlContent }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);
  
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: sanitizedHTML // ✅ Sanitizado con DOMPurify
      }} 
    />
  );
};

// 3. ✅ Uso seguro de textContent en lugar de innerHTML
const displayMessage = (message) => {
  const element = document.getElementById('output');
  if (element) {
    element.textContent = message; // ✅ Seguro - no interpreta HTML
  }
};

// 4. ✅ Validación y whitelist de URLs
const isValidURL = (url) => {
  try {
    const urlObj = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    const allowedDomains = ['example.com', 'trusted-site.com'];
    
    return allowedProtocols.includes(urlObj.protocol) &&
           allowedDomains.includes(urlObj.hostname);
  } catch {
    return false;
  }
};

const safeRedirect = (userProvidedUrl) => {
  if (isValidURL(userProvidedUrl)) {
    window.location.href = userProvidedUrl; // ✅ Solo URLs validadas
  } else {
    console.error('URL no válida o no permitida');
  }
};

// 5. ✅ Sanitización de inputs de usuario
const sanitizeUserInput = (input) => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'], // ✅ Whitelist de tags
    ALLOWED_ATTR: ['class'] // ✅ Whitelist de atributos
  });
};`;

  const cspConfiguration = `<!-- ✅ CONTENT SECURITY POLICY (CSP) -->
<!-- Agregar en el <head> de tu HTML -->

<meta 
  http-equiv="Content-Security-Policy" 
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://trusted-cdn.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.example.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  "
>

<!-- CSP también se puede configurar en el servidor -->`;

  const serverCSP = `// ✅ Configuración CSP en Express.js
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'", 
      "'unsafe-inline'", // ❌ Evitar en producción si es posible
      "https://trusted-cdn.com"
    ],
    styleSrc: [
      "'self'", 
      "'unsafe-inline'",
      "https://fonts.googleapis.com"
    ],
    imgSrc: ["'self'", "data:", "https:"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'", "https://api.example.com"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"]
  },
  reportOnly: false // ✅ false = enforce, true = solo reportar
}));`;

  const getSeverityBadge = (severity: XSSExample["severity"]) => {
    const severityClasses = {
      Crítica: "severity-critical",
      Alta: "severity-high",
      Media: "severity-medium",
    };

    return (
      <span className={`severity-badge ${severityClasses[severity]}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="xss-protection">
      <h2>💉 Protección contra XSS (Cross-Site Scripting)</h2>

      {/* Tipos de XSS */}
      <div className="xss-types">
        <h3>🎯 Tipos de Ataques XSS</h3>
        <div className="xss-grid">
          {xssExamples.map((example) => (
            <div key={example.id} className="xss-card">
              <div className="xss-header">
                <h4>{example.name}</h4>
                {getSeverityBadge(example.severity)}
              </div>
              <p className="xss-description">{example.description}</p>
              <div className="malicious-code">
                <strong>Código malicioso:</strong>
                <code>{example.maliciousCode}</code>
              </div>
              <div className="xss-impact">
                <strong>Impacto:</strong> {example.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Interactivo */}
      <div className="interactive-section">
        <h3>🧪 Demostración de Sanitización</h3>

        <div className="demo-container">
          <div className="input-section">
            <h4>Ingresa contenido HTML (intenta con scripts maliciosos):</h4>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ejemplo: <script>alert('XSS')</script><p>Contenido normal</p>"
              className="demo-textarea"
            />
            <button onClick={handleSanitize} className="sanitize-btn">
              🛡️ Sanitizar con DOMPurify
            </button>
          </div>

          <div className="output-grid">
            <div className="output-section vulnerable">
              <h4>❌ Sin Sanitizar (Vulnerable)</h4>
              <div className="output-box">
                <strong>Renderizado peligroso:</strong>
                <div className="dangerous-output">
                  {/* Solo mostramos el código, no lo ejecutamos */}
                  <code>{userInput}</code>
                </div>
                <p className="warning">⚠️ Esto ejecutaría scripts maliciosos</p>
              </div>
            </div>

            <div className="output-section secure">
              <h4>✅ Sanitizado (Seguro)</h4>
              <div className="output-box">
                <strong>Renderizado seguro:</strong>
                <div
                  className="safe-output"
                  dangerouslySetInnerHTML={{ __html: sanitizedInput }}
                />
                <p className="success">
                  ✅ Scripts removidos, contenido seguro preservado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Validación de URLs */}
      <div className="url-validation">
        <h3>🔗 Validación Segura de URLs</h3>

        <div className="url-demo">
          <h4>Prueba validación de URLs:</h4>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => handleUrlValidation(e.target.value)}
            placeholder="Ejemplo: javascript:alert('XSS') o https://example.com"
            className="url-input"
          />

          {urlInput && (
            <div className={`url-result ${isValidUrl ? "valid" : "invalid"}`}>
              {isValidUrl ? (
                <>
                  <span className="success">✅ URL válida y segura</span>
                  <p>Esta URL usa un protocolo seguro (http/https)</p>
                </>
              ) : (
                <>
                  <span className="error">❌ URL inválida o insegura</span>
                  <p>URLs con protocolos como 'javascript:' son peligrosas</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="url-examples">
          <h4>Ejemplos de URLs:</h4>
          <div className="url-examples-grid">
            <div className="url-example safe">
              <strong>✅ Seguras:</strong>
              <ul>
                <li>https://example.com</li>
                <li>http://localhost:3000</li>
                <li>https://api.mysite.com/data</li>
              </ul>
            </div>
            <div className="url-example dangerous">
              <strong>❌ Peligrosas:</strong>
              <ul>
                <li>javascript:alert('XSS')</li>
                <li>
                  data:text/html,&lt;script&gt;alert('XSS')&lt;/script&gt;
                </li>
                <li>vbscript:msgbox("XSS")</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Código Comparativo */}
      <div className="code-examples">
        <div className="code-comparison">
          <div className="code-section vulnerable-code">
            <h3>❌ Código Vulnerable</h3>
            <pre>
              <code>{vulnerableCode}</code>
            </pre>
          </div>

          <div className="code-section secure-code">
            <h3>✅ Código Seguro</h3>
            <pre>
              <code>{secureCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Content Security Policy */}
      <div className="csp-section">
        <h3>🛡️ Content Security Policy (CSP)</h3>

        <div className="csp-info">
          <p>
            CSP es una capa adicional de seguridad que ayuda a prevenir XSS
            especificando qué fuentes de contenido son confiables.
          </p>
        </div>

        <div className="csp-examples">
          <div className="csp-example">
            <h4>📄 CSP en HTML</h4>
            <pre>
              <code>{cspConfiguration}</code>
            </pre>
          </div>

          <div className="csp-example">
            <h4>⚙️ CSP en Servidor (Node.js)</h4>
            <pre>
              <code>{serverCSP}</code>
            </pre>
          </div>
        </div>

        <div className="csp-benefits">
          <h4>🎯 Beneficios de CSP:</h4>
          <div className="benefits-list">
            <div className="benefit-item">
              <strong>🚫 Bloquea scripts inline:</strong> Previene ejecución de
              scripts maliciosos inyectados
            </div>
            <div className="benefit-item">
              <strong>📋 Whitelist de fuentes:</strong> Solo permite recursos de
              dominios confiables
            </div>
            <div className="benefit-item">
              <strong>📊 Reportes:</strong> Envía reportes de violaciones para
              monitoreo
            </div>
            <div className="benefit-item">
              <strong>🔒 Defensa en profundidad:</strong> Protección adicional
              aunque haya vulnerabilidades
            </div>
          </div>
        </div>
      </div>

      {/* Checklist de Protección */}
      <div className="protection-checklist">
        <h3>✅ Checklist de Protección XSS</h3>

        <div className="checklist-grid">
          <div className="checklist-section input-validation">
            <h4>📥 Validación de Entrada</h4>
            <ul>
              <li>✅ Validar todos los inputs del usuario</li>
              <li>✅ Usar whitelist de caracteres permitidos</li>
              <li>✅ Validar longitud y formato de datos</li>
              <li>✅ Rechazar contenido sospechoso</li>
            </ul>
          </div>

          <div className="checklist-section output-encoding">
            <h4>📤 Codificación de Salida</h4>
            <ul>
              <li>✅ Usar React (escape automático)</li>
              <li>✅ Sanitizar HTML con DOMPurify</li>
              <li>✅ Evitar dangerouslySetInnerHTML sin sanitizar</li>
              <li>✅ Usar textContent en lugar de innerHTML</li>
            </ul>
          </div>

          <div className="checklist-section security-headers">
            <h4>🔒 Headers de Seguridad</h4>
            <ul>
              <li>✅ Implementar Content Security Policy</li>
              <li>✅ Usar X-Content-Type-Options: nosniff</li>
              <li>✅ Configurar X-Frame-Options</li>
              <li>✅ Habilitar X-XSS-Protection (legacy browsers)</li>
            </ul>
          </div>

          <div className="checklist-section best-practices">
            <h4>🎯 Mejores Prácticas</h4>
            <ul>
              <li>✅ Nunca usar eval() con datos del usuario</li>
              <li>✅ Validar URLs antes de redirecciones</li>
              <li>✅ Usar HTTPS para evitar MITM</li>
              <li>✅ Mantener librerías actualizadas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XSSProtection;
