import React, { useState } from 'react';
import './CORSConfiguration.css';

interface CORSExample {
  id: string;
  name: string;
  description: string;
  level: 'Permisivo' | 'Restrictivo' | 'Balanceado';
  security: 'Baja' | 'Media' | 'Alta';
  configuration: string;
}

const CORSConfiguration: React.FC = () => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('*');
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['GET', 'POST']);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(['Content-Type']);
  const [allowCredentials, setAllowCredentials] = useState<boolean>(false);
  const [corsResult, setCorsResult] = useState<string>('');

  const corsExamples: CORSExample[] = [
    {
      id: 'permissive',
      name: 'Configuración Permisiva (Desarrollo)',
      description: 'Permite todos los orígenes - SOLO para desarrollo',
      level: 'Permisivo',
      security: 'Baja',
      configuration: `app.use(cors({
  origin: '*', // ❌ Permite cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  credentials: true // ❌ Peligroso con origin: '*'
}));`
    },
    {
      id: 'restrictive',
      name: 'Configuración Restrictiva (Producción)',
      description: 'Solo orígenes específicos y métodos necesarios',
      level: 'Restrictivo',
      security: 'Alta',
      configuration: `app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight por 24 horas
}));`
    },
    {
      id: 'balanced',
      name: 'Configuración Balanceada',
      description: 'Balance entre seguridad y funcionalidad',
      level: 'Balanceado',
      security: 'Media',
      configuration: `app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://myapp.com',
      'https://admin.myapp.com',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
}));`
    }
  ];

  const preflightFlow = [
    {
      step: 1,
      title: 'Cliente envía Preflight',
      description: 'OPTIONS request para verificar permisos',
      request: `OPTIONS /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization`
    },
    {
      step: 2,
      title: 'Servidor evalúa',
      description: 'Verifica origen, método y headers contra configuración CORS',
      response: `// Servidor verifica:
// - ¿Está 'https://myapp.com' en orígenes permitidos?
// - ¿Está 'POST' en métodos permitidos?
// - ¿Están los headers solicitados permitidos?`
    },
    {
      step: 3,
      title: 'Servidor responde',
      description: 'Indica si la request real está permitida',
      response: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: POST, GET, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400`
    },
    {
      step: 4,
      title: 'Cliente envía request real',
      description: 'Solo si preflight fue exitoso',
      request: `POST /api/users HTTP/1.1
Host: api.example.com
Origin: https://myapp.com
Content-Type: application/json
Authorization: Bearer token123

{"name": "Juan", "email": "juan@example.com"}`
    }
  ];

  // Código de configuraciones
  const expressConfig = `// ✅ Express.js - Configuración completa
const express = require('express');
const cors = require('cors');

const app = express();

// Configuración CORS específica por entorno
const corsOptions = {
  origin: (origin, callback) => {
    // Lista de orígenes permitidos
    const allowedOrigins = [
      'https://myapp.com',
      'https://www.myapp.com',
      'https://admin.myapp.com'
    ];
    
    // Permitir requests sin origin (apps móviles, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Desarrollo local
    if (process.env.NODE_ENV === 'development' && 
        origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`Origin \${origin} no permitido por CORS\`));
    }
  },
  
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  
  // Headers permitidos en requests
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-Key',
    'X-Requested-With'
  ],
  
  // Headers que el cliente puede leer
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  
  // Permitir cookies y credenciales
  credentials: true,
  
  // Cache del preflight (segundos)
  maxAge: 86400, // 24 horas
  
  // Permitir preflight para todos los requests
  preflightContinue: false,
  
  // Status code para preflight exitoso
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware de manejo de errores CORS
app.use((err, req, res, next) => {
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      error: 'CORS Error',
      message: 'Origin no permitido'
    });
  }
  next(err);
});`;

  const laravelConfig = `<?php
// ✅ Laravel - config/cors.php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // o específicos: ['GET', 'POST', 'PUT', 'DELETE']

    'allowed_origins' => [
        'https://myapp.com',
        'https://www.myapp.com',
        'https://admin.myapp.com',
    ],

    'allowed_origins_patterns' => [
        // Patrones para subdominios dinámicos
        '/^https:\\/\\/([a-z0-9\\-]+\\.)?myapp\\.com$/',
    ],

    'allowed_headers' => [
        'Accept',
        'Authorization',
        'Content-Type',
        'X-Requested-With',
        'X-API-Key',
    ],

    'exposed_headers' => [
        'X-Total-Count',
        'X-Page-Count',
    ],

    'max_age' => 86400, // 24 horas

    'supports_credentials' => true, // Para cookies/auth

];

// En .env para diferentes entornos:
// CORS_ALLOWED_ORIGINS=https://myapp.com,https://www.myapp.com`;

  const frontendCode = `// ✅ Frontend - Configuración de requests

// Axios con credenciales
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.myapp.com',
  withCredentials: true, // ✅ Incluir cookies/credenciales
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores CORS
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' && 
        error.message.includes('CORS')) {
      console.error('Error CORS:', error.message);
      // Mostrar mensaje amigable al usuario
      toast.error('Error de conexión. Verifica tu conexión.');
    }
    return Promise.reject(error);
  }
);

// Fetch con credenciales
const fetchWithCORS = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // ✅ Incluir cookies
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && 
        error.message.includes('CORS')) {
      console.error('Error CORS en fetch:', error);
      throw new Error('Error de CORS - verifica configuración del servidor');
    }
    throw error;
  }
};

// Uso con manejo de errores
const loginUser = async (credentials) => {
  try {
    const data = await fetchWithCORS('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    return data;
  } catch (error) {
    console.error('Error en login:', error.message);
    throw error;
  }
};`;

  const troubleshootingSteps = [
    {
      error: 'Access to fetch blocked by CORS policy',
      cause: 'Origen no está en la lista de permitidos',
      solution: 'Agregar el origen del frontend a allowedOrigins en el servidor'
    },
    {
      error: 'CORS header Access-Control-Allow-Origin missing',
      cause: 'Servidor no tiene CORS configurado',
      solution: 'Instalar y configurar middleware CORS en el servidor'
    },
    {
      error: 'Credentials flag is true, but Access-Control-Allow-Credentials header is false',
      cause: 'Credentials habilitados en cliente pero no en servidor',
      solution: 'Establecer credentials: true en configuración CORS del servidor'
    },
    {
      error: 'Method not allowed by Access-Control-Allow-Methods',
      cause: 'Método HTTP no está permitido',
      solution: 'Agregar el método (PUT, DELETE, etc.) a allowedMethods'
    },
    {
      error: 'Header not allowed by Access-Control-Allow-Headers',
      cause: 'Header personalizado no está permitido',
      solution: 'Agregar el header a allowedHeaders en configuración CORS'
    }
  ];

  const simulateCORSRequest = () => {
    const origin = selectedOrigin === '*' ? 'cualquier origen' : selectedOrigin;
    const methods = selectedMethods.join(', ');
    const headers = selectedHeaders.join(', ');
    const creds = allowCredentials ? 'Sí' : 'No';
    
    const result = `Configuración CORS simulada:
    
🌐 Origin permitido: ${origin}
🔧 Métodos: ${methods}
📋 Headers: ${headers}
🔐 Credenciales: ${creds}

${selectedOrigin === '*' && allowCredentials ? 
  '⚠️ ADVERTENCIA: origin "*" con credentials true es inseguro!' : 
  '✅ Configuración válida'}`;
    
    setCorsResult(result);
  };

  const getSecurityBadge = (level: CORSExample['security']) => {
    const badgeClasses = {
      'Alta': 'security-high',
      'Media': 'security-medium',
      'Baja': 'security-low'
    };
    
    return <span className={`security-badge ${badgeClasses[level]}`}>{level}</span>;
  };

  return (
    <div className="cors-configuration">
      <h2>🌐 Configuración CORS (Cross-Origin Resource Sharing)</h2>

      {/* ¿Qué es CORS? */}
      <div className="cors-intro">
        <h3>🤔 ¿Qué es CORS y por qué existe?</h3>
        
        <div className="cors-explanation">
          <div className="explanation-card">
            <h4>🛡️ Same-Origin Policy</h4>
            <p>
              Los navegadores implementan la <strong>Same-Origin Policy</strong> por seguridad. 
              Esta política bloquea requests JavaScript a diferentes orígenes (diferente protocolo, dominio o puerto).
            </p>
            <div className="origin-examples">
              <div className="same-origin">
                <strong>✅ Mismo origen (permitido):</strong>
                <ul>
                  <li>https://myapp.com/page1 → https://myapp.com/api</li>
                  <li>http://localhost:3000/app → http://localhost:3000/api</li>
                </ul>
              </div>
              <div className="cross-origin">
                <strong>❌ Cross-origin (bloqueado sin CORS):</strong>
                <ul>
                  <li>https://myapp.com → https://api.myapp.com</li>
                  <li>http://localhost:3000 → https://api.example.com</li>
                  <li>https://myapp.com → https://myapp.com:8080</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="explanation-card">
            <h4>🔓 CORS al rescate</h4>
            <p>
              CORS permite que los servidores especifiquen qué orígenes pueden acceder a sus recursos, 
              relajando selectivamente la Same-Origin Policy.
            </p>
            <div className="cors-benefits">
              <ul>
                <li>✅ Permite arquitecturas de microservicios</li>
                <li>✅ Habilita SPAs para consumir APIs externas</li>
                <li>✅ Mantiene seguridad mediante whitelist de orígenes</li>
                <li>✅ Controla qué métodos y headers están permitidos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flujo Preflight */}
      <div className="preflight-section">
        <h3>🔄 Flujo de Peticiones Preflight</h3>
        <p>Para requests "complejas", el navegador envía primero una petición OPTIONS (preflight) para verificar permisos.</p>
        
        <div className="preflight-flow">
          {preflightFlow.map((item) => (
            <div key={item.step} className="preflight-step">
              <div className="step-number">{item.step}</div>
              <div className="step-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <pre><code>{item.request || item.response}</code></pre>
              </div>
            </div>
          ))}
        </div>
        
        <div className="preflight-triggers">
          <h4>⚡ ¿Cuándo se activa Preflight?</h4>
          <div className="triggers-grid">
            <div className="trigger-card">
              <strong>Métodos:</strong>
              <p>PUT, DELETE, PATCH, u otros que no sean GET/POST/HEAD</p>
            </div>
            <div className="trigger-card">
              <strong>Headers:</strong>
              <p>Authorization, Content-Type (excepto algunos valores), headers personalizados</p>
            </div>
            <div className="trigger-card">
              <strong>Credenciales:</strong>
              <p>Cuando se incluyen cookies o headers de autenticación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulador CORS */}
      <div className="cors-simulator">
        <h3>🧪 Simulador de Configuración CORS</h3>
        
        <div className="simulator-controls">
          <div className="control-group">
            <label htmlFor="origin-select">🌐 Origins permitidos:</label>
            <select 
              id="origin-select"
              value={selectedOrigin} 
              onChange={(e) => setSelectedOrigin(e.target.value)}
            >
              <option value="*">* (todos los orígenes)</option>
              <option value="https://myapp.com">https://myapp.com</option>
              <option value="http://localhost:3000">http://localhost:3000</option>
            </select>
          </div>
          
          <div className="control-group">
            <div className="group-label">🔧 Métodos permitidos:</div>
            <div className="checkbox-group">
              {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(method => (
                <label key={method} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(method)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMethods([...selectedMethods, method]);
                      } else {
                        setSelectedMethods(selectedMethods.filter(m => m !== method));
                      }
                    }}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <div className="group-label">📋 Headers permitidos:</div>
            <div className="checkbox-group">
              {['Content-Type', 'Authorization', 'X-API-Key', 'X-Requested-With'].map(header => (
                <label key={header} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedHeaders.includes(header)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedHeaders([...selectedHeaders, header]);
                      } else {
                        setSelectedHeaders(selectedHeaders.filter(h => h !== header));
                      }
                    }}
                  />
                  {header}
                </label>
              ))}
            </div>
          </div>
          
          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={allowCredentials}
                onChange={(e) => setAllowCredentials(e.target.checked)}
              />{' '}
              🔐 Permitir credenciales (cookies, auth headers)
            </label>
          </div>
          
          <button onClick={simulateCORSRequest} className="simulate-btn">
            🚀 Simular Configuración
          </button>
        </div>
        
        {corsResult && (
          <div className="simulation-result">
            <h4>Resultado de la Simulación:</h4>
            <pre>{corsResult}</pre>
          </div>
        )}
      </div>

      {/* Ejemplos de Configuración */}
      <div className="configuration-examples">
        <h3>⚙️ Ejemplos de Configuración</h3>
        
        <div className="examples-grid">
          {corsExamples.map((example) => (
            <div key={example.id} className="example-card">
              <div className="example-header">
                <h4>{example.name}</h4>
                {getSecurityBadge(example.security)}
              </div>
              <p>{example.description}</p>
              <pre><code>{example.configuration}</code></pre>
            </div>
          ))}
        </div>
      </div>

      {/* Configuraciones por Framework */}
      <div className="framework-configs">
        <h3>🔧 Configuración por Framework</h3>
        
        <div className="config-tabs">
          <div className="config-section">
            <h4>🟢 Express.js (Node.js)</h4>
            <pre><code>{expressConfig}</code></pre>
          </div>
          
          <div className="config-section">
            <h4>🔴 Laravel (PHP)</h4>
            <pre><code>{laravelConfig}</code></pre>
          </div>
          
          <div className="config-section">
            <h4>⚛️ Frontend (JavaScript)</h4>
            <pre><code>{frontendCode}</code></pre>
          </div>
        </div>
      </div>

      {/* Problemas Comunes */}
      <div className="troubleshooting">
        <h3>🐛 Errores Comunes y Soluciones</h3>
        
        <div className="error-list">
          {troubleshootingSteps.map((item) => (
            <div key={item.error} className="error-item">
              <div className="error-header">
                <strong>❌ Error:</strong> {item.error}
              </div>
              <div className="error-cause">
                <strong>🔍 Causa:</strong> {item.cause}
              </div>
              <div className="error-solution">
                <strong>✅ Solución:</strong> {item.solution}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mejores Prácticas */}
      <div className="best-practices">
        <h3>🎯 Mejores Prácticas CORS</h3>
        
        <div className="practices-grid">
          <div className="practice-section do">
            <h4>✅ SÍ hacer</h4>
            <ul>
              <li>Especificar orígenes exactos en producción</li>
              <li>Usar HTTPS para orígenes en producción</li>
              <li>Limitar métodos a los necesarios</li>
              <li>Whitelist solo headers requeridos</li>
              <li>Configurar maxAge para cache de preflight</li>
              <li>Manejar errores CORS en el frontend</li>
              <li>Usar diferentes configs por entorno</li>
              <li>Revisar logs de errores CORS regularmente</li>
            </ul>
          </div>
          
          <div className="practice-section dont">
            <h4>❌ NO hacer</h4>
            <ul>
              <li>Usar origin: '*' con credentials: true</li>
              <li>Permitir todos los orígenes en producción</li>
              <li>Exponer headers sensibles innecesariamente</li>
              <li>Ignorar errores CORS en el frontend</li>
              <li>Usar la misma config para dev y producción</li>
              <li>Permitir métodos no utilizados</li>
              <li>Confiar solo en CORS para seguridad</li>
              <li>Hardcodear URLs en configuración</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing de CORS */}
      <div className="cors-testing">
        <h3>🧪 Probar Configuración CORS</h3>
        
        <div className="testing-tools">
          <div className="test-card">
            <h4>🌍 Browser DevTools</h4>
            <p>La forma más fácil de probar CORS:</p>
            <pre><code>{`// En la consola del navegador:
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  credentials: 'include',
  body: JSON.stringify({test: 'data'})
})
.then(r => r.json())
.then(console.log)
.catch(console.error);`}</code></pre>
          </div>
          
          <div className="test-card">
            <h4>📡 cURL para Preflight</h4>
            <pre><code>{`# Simular preflight request
curl -X OPTIONS https://api.example.com/users \\
  -H "Origin: https://myapp.com" \\
  -H "Access-Control-Request-Method: POST" \\
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \\
  -v`}</code></pre>
          </div>
          
          <div className="test-card">
            <h4>🔧 Herramientas Online</h4>
            <ul>
              <li><strong>CORS Tester:</strong> test-cors.org</li>
              <li><strong>Postman:</strong> Para probar APIs</li>
              <li><strong>Browser Extensions:</strong> CORS Unblock (solo desarrollo)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CORSConfiguration;