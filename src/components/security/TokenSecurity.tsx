import React, { useState, useEffect } from 'react';
import './TokenSecurity.css';

interface StorageComparison {
  method: string;
  security: 'Alta' | 'Media' | 'Baja';
  vulnerability: string;
  accessibility: string;
  persistence: string;
  recommendation: 'Recomendado' | 'Condicional' | 'No Recomendado';
}

const TokenSecurity: React.FC = () => {
  const [currentToken, setCurrentToken] = useState<string>('');
  const [tokenInMemory, setTokenInMemory] = useState<string | null>(null);

  const storageComparisons: StorageComparison[] = [
    {
      method: 'localStorage',
      security: 'Baja',
      vulnerability: 'Vulnerable a XSS - JavaScript puede acceder',
      accessibility: 'Accesible por cualquier script en el dominio',
      persistence: 'Persiste hasta ser eliminado manualmente',
      recommendation: 'No Recomendado'
    },
    {
      method: 'sessionStorage',
      security: 'Baja',
      vulnerability: 'Vulnerable a XSS - JavaScript puede acceder',
      accessibility: 'Accesible por cualquier script en la pestaña',
      persistence: 'Se elimina al cerrar la pestaña',
      recommendation: 'No Recomendado'
    },
    {
      method: 'HttpOnly Cookies',
      security: 'Alta',
      vulnerability: 'Protegido contra XSS - JavaScript no puede acceder',
      accessibility: 'Solo accesible por el servidor',
      persistence: 'Configurable con expiración',
      recommendation: 'Recomendado'
    },
    {
      method: 'Memory + Refresh Pattern',
      security: 'Alta',
      vulnerability: 'Token en memoria (se pierde al recargar)',
      accessibility: 'Solo en el contexto de la aplicación',
      persistence: 'Se pierde al recargar - usa refresh token',
      recommendation: 'Recomendado'
    }
  ];

  // Simulación de token en memoria
  useEffect(() => {
    // Simular obtención de token al cargar la app
    const simulateTokenFetch = () => {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      setTokenInMemory(mockToken);
    };

    simulateTokenFetch();
  }, []);

  // Ejemplos de código vulnerable y seguro
  const vulnerableCode = `// ❌ CÓDIGO VULNERABLE - NO HACER ESTO
// Almacenando token en localStorage (INSEGURO)
const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  // ❌ VULNERABLE A XSS
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  
  return data;
};

// ❌ Uso vulnerable del token
const makeAuthenticatedRequest = async (url) => {
  const token = localStorage.getItem('token'); // ❌ Accesible por XSS
  
  return fetch(url, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
};`;

  const secureCode = `// ✅ CÓDIGO SEGURO - PATRÓN RECOMENDADO

// 1. Token en memoria + HttpOnly cookies para refresh
let accessToken = null; // ✅ Solo en memoria

const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include', // ✅ Incluye HttpOnly cookies
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  // ✅ Token de acceso en memoria (NO en storage)
  accessToken = data.accessToken;
  
  // ✅ Refresh token se almacena como HttpOnly cookie (backend)
  // Set-Cookie: refreshToken=xxx; HttpOnly; Secure; SameSite=Strict
  
  return data;
};

// ✅ Uso seguro con refresh automático
const makeAuthenticatedRequest = async (url) => {
  if (!accessToken) {
    // ✅ Si no hay token, intentar renovar
    await refreshAccessToken();
  }
  
  try {
    return await fetch(url, {
      headers: {
        'Authorization': \`Bearer \${accessToken}\`
      }
    });
  } catch (error) {
    if (error.status === 401) {
      // ✅ Token expirado, renovar y reintentar
      await refreshAccessToken();
      return fetch(url, {
        headers: {
          'Authorization': \`Bearer \${accessToken}\`
        }
      });
    }
    throw error;
  }
};

// ✅ Renovación de token usando HttpOnly cookie
const refreshAccessToken = async () => {
  const response = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include' // ✅ Envía HttpOnly cookie automáticamente
  });
  
  if (response.ok) {
    const data = await response.json();
    accessToken = data.accessToken; // ✅ Actualizar token en memoria
  } else {
    // Token refresh expirado, redirigir a login
    accessToken = null;
    window.location.href = '/login';
  }
};`;

  const backendCode = `// ✅ CONFIGURACIÓN BACKEND SEGURA (Express.js)

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// ✅ Login endpoint
app.post('/api/login', async (req, res) => {
  // Validar credenciales...
  const user = await validateCredentials(req.body);
  
  if (user) {
    // ✅ Tokens con diferentes duraciones
    const accessToken = jwt.sign(
      { userId: user.id }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' } // ✅ Corta duración
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id }, 
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // ✅ Mayor duración
    );
    
    // ✅ Refresh token como HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,    // ✅ No accesible por JavaScript
      secure: true,      // ✅ Solo HTTPS
      sameSite: 'strict',// ✅ Protección CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });
    
    // ✅ Access token en respuesta (irá a memoria)
    res.json({ 
      accessToken,
      user: { id: user.id, email: user.email }
    });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// ✅ Refresh endpoint
app.post('/api/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    
    // ✅ Generar nuevo access token
    const accessToken = jwt.sign(
      { userId: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    
    res.json({ accessToken });
  });
});

// ✅ Logout endpoint
app.post('/api/logout', (req, res) => {
  // ✅ Limpiar HttpOnly cookie
  res.clearCookie('refreshToken');
  res.json({ message: 'Logout successful' });
});`;

  const getSecurityBadge = (level: StorageComparison['security']) => {
    const badgeClasses = {
      'Alta': 'security-high',
      'Media': 'security-medium', 
      'Baja': 'security-low'
    };
    
    return <span className={`security-badge ${badgeClasses[level]}`}>{level}</span>;
  };

  const getRecommendationBadge = (rec: StorageComparison['recommendation']) => {
    const badgeClasses = {
      'Recomendado': 'rec-good',
      'Condicional': 'rec-conditional',
      'No Recomendado': 'rec-bad'
    };
    
    return <span className={`recommendation-badge ${badgeClasses[rec]}`}>{rec}</span>;
  };

  // Simulación de XSS vulnerability
  const simulateXSSAttack = () => {
    const storedToken = localStorage.getItem('demoToken');
    if (storedToken) {
      alert(`🚨 XSS Attack Simulation: Token robado: ${storedToken.substring(0, 20)}...`);
    } else {
      alert('❌ No hay token en localStorage para robar');
    }
  };

  return (
    <div className="token-security">
      <h2>🔑 Almacenamiento Seguro de Tokens</h2>

      {/* Tabla Comparativa */}
      <div className="comparison-section">
        <h3>📊 Comparativa de Métodos de Almacenamiento</h3>
        <div className="comparison-table">
          <div className="table-header">
            <div>Método</div>
            <div>Seguridad</div>
            <div>Vulnerabilidad</div>
            <div>Accesibilidad</div>
            <div>Persistencia</div>
            <div>Recomendación</div>
          </div>
          
          {storageComparisons.map((item) => (
            <div key={item.method} className="table-row">
              <div className="method-name">{item.method}</div>
              <div>{getSecurityBadge(item.security)}</div>
              <div className="vulnerability-text">{item.vulnerability}</div>
              <div>{item.accessibility}</div>
              <div>{item.persistence}</div>
              <div>{getRecommendationBadge(item.recommendation)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demostración Interactiva */}
      <div className="interactive-demo">
        <h3>🧪 Demostración Interactiva</h3>
        
        <div className="demo-grid">
          {/* Almacenamiento Vulnerable */}
          <div className="demo-card vulnerable">
            <h4>❌ Método Vulnerable (localStorage)</h4>
            <div className="demo-controls">
              <button 
                onClick={() => {
                  const token = 'demo_token_' + Date.now();
                  localStorage.setItem('demoToken', token);
                  setCurrentToken(token);
                }}
                className="btn-danger"
              >
                Guardar Token en localStorage
              </button>
              
              <button 
                onClick={simulateXSSAttack}
                className="btn-attack"
              >
                🚨 Simular Ataque XSS
              </button>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('demoToken');
                  setCurrentToken('');
                }}
                className="btn-clear"
              >
                Limpiar
              </button>
            </div>
            
            {currentToken && (
              <div className="token-display vulnerable-token">
                <strong>Token en localStorage:</strong>
                <code>{currentToken.substring(0, 30)}...</code>
                <p className="warning">⚠️ Este token es vulnerable a XSS</p>
              </div>
            )}
          </div>

          {/* Almacenamiento Seguro */}
          <div className="demo-card secure">
            <h4>✅ Método Seguro (Memoria + HttpOnly)</h4>
            <div className="demo-controls">
              <button 
                onClick={() => {
                  const newToken = 'secure_token_' + Date.now();
                  setTokenInMemory(newToken);
                }}
                className="btn-success"
              >
                Token en Memoria
              </button>
              
              <button 
                onClick={() => {
                  alert('✅ Los tokens en memoria no son accesibles por XSS');
                }}
                className="btn-safe"
              >
                🛡️ Verificar Seguridad
              </button>
              
              <button 
                onClick={() => setTokenInMemory(null)}
                className="btn-clear"
              >
                Limpiar
              </button>
            </div>
            
            {tokenInMemory && (
              <div className="token-display secure-token">
                <strong>Token en memoria:</strong>
                <code>{tokenInMemory.substring(0, 30)}...</code>
                <p className="success">✅ Protegido contra XSS</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ejemplos de Código */}
      <div className="code-examples">
        <div className="code-comparison">
          <div className="code-section vulnerable-code">
            <h3>❌ Código Vulnerable</h3>
            <pre><code>{vulnerableCode}</code></pre>
          </div>
          
          <div className="code-section secure-code">
            <h3>✅ Código Seguro (Frontend)</h3>
            <pre><code>{secureCode}</code></pre>
          </div>
        </div>
        
        <div className="backend-code-section">
          <h3>🔧 Configuración Backend Segura</h3>
          <pre><code>{backendCode}</code></pre>
        </div>
      </div>

      {/* Mejores Prácticas */}
      <div className="best-practices">
        <h3>🎯 Mejores Prácticas para Tokens</h3>
        
        <div className="practices-grid">
          <div className="practice-card do">
            <h4>✅ SÍ hacer</h4>
            <ul>
              <li>Usar HttpOnly cookies para refresh tokens</li>
              <li>Mantener access tokens en memoria</li>
              <li>Implementar rotación automática de tokens</li>
              <li>Usar tokens de corta duración (15-30 min)</li>
              <li>Configurar cookies con Secure y SameSite</li>
              <li>Implementar logout que limpie todo</li>
              <li>Validar tokens en cada request del backend</li>
            </ul>
          </div>
          
          <div className="practice-card dont">
            <h4>❌ NO hacer</h4>
            <ul>
              <li>Almacenar tokens en localStorage/sessionStorage</li>
              <li>Usar tokens de larga duración en frontend</li>
              <li>Exponer tokens en URLs o logs</li>
              <li>Confiar solo en validación frontend</li>
              <li>Ignorar la rotación de refresh tokens</li>
              <li>Usar cookies sin HttpOnly para datos sensibles</li>
              <li>Manejar tokens en componentes no seguros</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Patrón Access + Refresh Token */}
      <div className="token-pattern">
        <h3>🔄 Patrón Access Token + Refresh Token</h3>
        
        <div className="pattern-diagram">
          <div className="pattern-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Login</h4>
              <p>Usuario se autentica → Recibe Access Token (memoria) + Refresh Token (HttpOnly cookie)</p>
            </div>
          </div>
          
          <div className="pattern-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Requests</h4>
              <p>Usar Access Token en header Authorization para cada request</p>
            </div>
          </div>
          
          <div className="pattern-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Expiración</h4>
              <p>Cuando Access Token expira → Usar Refresh Token para obtener nuevo Access Token</p>
            </div>
          </div>
          
          <div className="pattern-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Renovación</h4>
              <p>Proceso automático y transparente para el usuario</p>
            </div>
          </div>
        </div>
        
        <div className="pattern-benefits">
          <h4>🎯 Beneficios de este patrón:</h4>
          <div className="benefits-grid">
            <div className="benefit">
              <strong>🛡️ Seguridad:</strong> Access tokens de corta duración limitan ventana de ataque
            </div>
            <div className="benefit">
              <strong>🔄 Continuidad:</strong> Refresh automático mantiene sesión sin interrupciones
            </div>
            <div className="benefit">
              <strong>🚪 Control:</strong> Refresh tokens pueden revocarse para cerrar todas las sesiones
            </div>
            <div className="benefit">
              <strong>⚡ Performance:</strong> No need validar en DB en cada request del access token
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSecurity;