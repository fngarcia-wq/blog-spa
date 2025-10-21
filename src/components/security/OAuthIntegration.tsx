import React, { useState } from "react";
import "./OAuthIntegration.css";

interface OAuthProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  useCases: string[];
}

interface OAuthFlow {
  step: number;
  title: string;
  description: string;
  code?: string;
  security?: string;
}

const OAuthIntegration: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("google");

  const providers: OAuthProvider[] = [
    {
      id: "google",
      name: "Google OAuth 2.0",
      icon: "🔍",
      color: "#4285f4",
      description: "Autenticación con cuentas de Google",
      useCases: [
        "Single Sign-On",
        "Acceso a Google APIs",
        "Verificación de identidad",
      ],
    },
    {
      id: "github",
      name: "GitHub OAuth",
      icon: "🐙",
      color: "#333",
      description: "Autenticación con cuentas de GitHub",
      useCases: ["Apps de desarrollo", "Code reviews", "Repository access"],
    },
    {
      id: "microsoft",
      name: "Microsoft Identity",
      icon: "🏢",
      color: "#0078d4",
      description: "Azure AD y Microsoft 365",
      useCases: ["Enterprise SSO", "Office 365 integration", "Azure services"],
    },
    {
      id: "facebook",
      name: "Facebook Login",
      icon: "📘",
      color: "#1877f2",
      description: "Autenticación con Facebook",
      useCases: ["Social login", "User profiles", "Social features"],
    },
  ];

  const oauthFlows: OAuthFlow[] = [
    {
      step: 1,
      title: "Registro de Aplicación",
      description: "Registrar tu aplicación en el proveedor OAuth",
      security: "Obtén Client ID y Client Secret (mantén el secret seguro)",
    },
    {
      step: 2,
      title: "Redirección a Proveedor",
      description: "Usuario es redirigido al proveedor para autenticarse",
      security: "Incluye state parameter para prevenir CSRF",
    },
    {
      step: 3,
      title: "Autorización del Usuario",
      description: "Usuario autoriza permisos solicitados",
      security: "Scope determina qué datos puede acceder tu app",
    },
    {
      step: 4,
      title: "Callback con Authorization Code",
      description: "Proveedor redirige de vuelta con código temporal",
      security: "Código expira rápidamente (5-10 minutos)",
    },
    {
      step: 5,
      title: "Intercambio por Access Token",
      description: "Backend intercambia code por access token",
      security: "Requiere Client Secret - solo en backend",
    },
    {
      step: 6,
      title: "Acceso a Recursos",
      description: "Usar access token para acceder a APIs del proveedor",
      security: "Token tiene tiempo de vida limitado",
    },
  ];

  // Configuración Google OAuth
  const googleSetup = `// 1. ✅ Google Cloud Console Setup
// - Ir a https://console.cloud.google.com/
// - Crear proyecto o seleccionar existente
// - Habilitar Google+ API
// - Crear credenciales OAuth 2.0
// - Agregar dominios autorizados

// 2. ✅ Instalación
npm install @react-oauth/google

// 3. ✅ Configuración del Cliente
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "tu-client-id.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h1>Mi App con Google OAuth</h1>
        <GoogleAuthComponent />
      </div>
    </GoogleOAuthProvider>
  );
}

// 4. ✅ Componente de Login
function GoogleAuthComponent() {
  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    
    // ✅ Enviar JWT token al backend para verificación
    verifyGoogleToken(credentialResponse.credential);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const verifyGoogleToken = async (token) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // ✅ Usuario autenticado, guardar token de tu app
        localStorage.setItem('authToken', data.authToken);
        // Redirigir a dashboard
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap // ✅ Habilita One Tap para mejor UX
        auto_select // ✅ Selección automática si solo hay una cuenta
        theme="outline" // o "filled_blue"
        size="large"
        text="signin_with" // Texto del botón
        shape="rectangular"
      />
    </div>
  );
}`;

  const googleBackend = `// ✅ Backend - Verificación del Token Google (Node.js)
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Endpoint para verificar token de Google
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    // ✅ Verificar token con Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified
    } = payload;

    // ✅ Verificar que el email está verificado
    if (!email_verified) {
      return res.status(400).json({
        success: false,
        error: 'Email no verificado'
      });
    }

    // ✅ Buscar o crear usuario en tu base de datos
    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        picture,
        provider: 'google'
      });
    }

    // ✅ Generar JWT token de tu aplicación
    const authToken = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      authToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });

  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.status(400).json({
      success: false,
      error: 'Token inválido'
    });
  }
});`;

  const githubSetup = `// 1. ✅ GitHub App Setup
// - Ir a GitHub Settings > Developer settings > OAuth Apps
// - New OAuth App
// - Authorization callback URL: http://localhost:3000/auth/github/callback

// 2. ✅ Frontend - Redirección a GitHub
const GITHUB_CLIENT_ID = "tu_github_client_id";
const REDIRECT_URI = "http://localhost:3000/auth/github/callback";

const GitHubLoginButton = () => {
  const handleGitHubLogin = () => {
    const state = generateRandomString(); // ✅ CSRF protection
    sessionStorage.setItem('oauth_state', state);
    
    const githubAuthUrl = \`https://github.com/login/oauth/authorize?\` +
      \`client_id=\${GITHUB_CLIENT_ID}&\` +
      \`redirect_uri=\${encodeURIComponent(REDIRECT_URI)}&\` +
      \`scope=user:email&\` +
      \`state=\${state}\`;
    
    window.location.href = githubAuthUrl;
  };

  return (
    <button onClick={handleGitHubLogin} className="github-login-btn">
      🐙 Login with GitHub
    </button>
  );
};

// 3. ✅ Callback Handler
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const GitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const storedState = sessionStorage.getItem('oauth_state');

      // ✅ Verificar state para prevenir CSRF
      if (!state || state !== storedState) {
        console.error('Invalid state parameter');
        navigate('/login?error=invalid_state');
        return;
      }

      if (code) {
        try {
          // ✅ Enviar code al backend
          const response = await fetch('/api/auth/github', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (data.success) {
            sessionStorage.removeItem('oauth_state');
            localStorage.setItem('authToken', data.authToken);
            navigate('/dashboard');
          } else {
            navigate('/login?error=auth_failed');
          }
        } catch (error) {
          console.error('GitHub OAuth Error:', error);
          navigate('/login?error=network_error');
        }
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return <div>Procesando autenticación con GitHub...</div>;
};

// 4. ✅ Utility function
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};`;

  const githubBackend = `// ✅ Backend - GitHub OAuth (Node.js)
const axios = require('axios');

app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;

    // ✅ Step 1: Intercambiar code por access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET, // ✅ Solo en backend
        code: code,
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        error: 'Failed to get access token'
      });
    }

    // ✅ Step 2: Obtener información del usuario
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': \`Bearer \${access_token}\`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    // ✅ Step 3: Obtener emails del usuario
    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: {
        'Authorization': \`Bearer \${access_token}\`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = userResponse.data;
    const emails = emailResponse.data;
    const primaryEmail = emails.find(email => email.primary && email.verified);

    if (!primaryEmail) {
      return res.status(400).json({
        success: false,
        error: 'No verified primary email found'
      });
    }

    // ✅ Step 4: Buscar o crear usuario
    let user = await User.findOne({ githubId: userData.id });

    if (!user) {
      user = await User.create({
        githubId: userData.id,
        username: userData.login,
        email: primaryEmail.email,
        name: userData.name,
        avatar: userData.avatar_url,
        provider: 'github'
      });
    }

    // ✅ Step 5: Generar JWT token
    const authToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      authToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});`;

  const securityBestPractices = [
    {
      title: "🔐 Client Secret Seguro",
      description: "Nunca expongas el client secret en el frontend",
      implementation:
        "Mantén todos los secrets en variables de entorno del backend",
    },
    {
      title: "🛡️ State Parameter",
      description: "Previene ataques CSRF en el flujo OAuth",
      implementation: "Genera valor random, guárdalo y verifica en callback",
    },
    {
      title: "⏰ Token Expiration",
      description: "Tokens deben tener tiempo de vida limitado",
      implementation: "Access tokens: 1-2 horas, Refresh tokens: días/semanas",
    },
    {
      title: "📋 Scope Mínimo",
      description: "Solicita solo los permisos necesarios",
      implementation: "Principio de menor privilegio en scopes",
    },
    {
      title: "🔍 Validación de Tokens",
      description: "Verifica siempre los tokens en el backend",
      implementation: "Valida signature, audience, issuer, expiration",
    },
    {
      title: "🌐 HTTPS Obligatorio",
      description: "Todas las comunicaciones deben usar HTTPS",
      implementation: "Especialmente crítico en producción",
    },
  ];

  const commonErrors = [
    {
      error: "redirect_uri_mismatch",
      cause: "URL de callback no coincide con la registrada",
      solution: "Verificar configuración en console del proveedor",
    },
    {
      error: "invalid_client",
      cause: "Client ID o Client Secret incorrectos",
      solution: "Revisar variables de entorno y configuración",
    },
    {
      error: "access_denied",
      cause: "Usuario rechazó autorización",
      solution: "Manejar este caso con mensaje amigable",
    },
    {
      error: "invalid_grant",
      cause: "Authorization code expirado o ya usado",
      solution: "Reiniciar flujo OAuth desde el inicio",
    },
    {
      error: "invalid_scope",
      cause: "Scope solicitado no existe o no está permitido",
      solution: "Verificar scopes disponibles en documentación",
    },
  ];

  const getCurrentProvider = () => {
    return providers.find((p) => p.id === selectedProvider) || providers[0];
  };

  return (
    <div className="oauth-integration">
      <h2>🔐 Integración OAuth 2.0</h2>

      {/* ¿Qué es OAuth? */}
      <div className="oauth-intro">
        <h3>🤔 ¿Qué es OAuth 2.0?</h3>

        <div className="oauth-explanation">
          <div className="explanation-section">
            <h4>📋 Definición</h4>
            <p>
              OAuth 2.0 es un estándar de autorización que permite a las
              aplicaciones obtener acceso limitado a cuentas de usuario sin
              exponer credenciales. Actúa como un "valet key" digital.
            </p>
          </div>

          <div className="explanation-section">
            <h4>🎯 Casos de Uso</h4>
            <ul>
              <li>
                🔑 <strong>Single Sign-On (SSO):</strong> Login con Google,
                GitHub, Facebook
              </li>
              <li>
                🔗 <strong>Integración de APIs:</strong> Acceso a Google Drive,
                GitHub repos
              </li>
              <li>
                📱 <strong>Apps de terceros:</strong> Conectar servicios sin
                passwords
              </li>
              <li>
                🏢 <strong>Enterprise:</strong> Acceso a sistemas corporativos
              </li>
            </ul>
          </div>

          <div className="explanation-section">
            <h4>✅ Beneficios</h4>
            <ul>
              <li>
                🛡️ <strong>Seguridad:</strong> Sin compartir passwords
              </li>
              <li>
                🎛️ <strong>Control granular:</strong> Permisos específicos
                (scopes)
              </li>
              <li>
                👤 <strong>Mejor UX:</strong> Login rápido y familiar
              </li>
              <li>
                ⏰ <strong>Tokens temporales:</strong> Acceso limitado en tiempo
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Proveedores Populares */}
      <div className="providers-section">
        <h3>🌐 Proveedores OAuth Populares</h3>

        <div className="providers-grid">
          {providers.map((provider) => (
            <button
              key={provider.id}
              className={`provider-card ${
                selectedProvider === provider.id ? "selected" : ""
              }`}
              onClick={() => setSelectedProvider(provider.id)}
              type="button"
            >
              <div className="provider-header">
                <span className="provider-icon">{provider.icon}</span>
                <h4>{provider.name}</h4>
              </div>
              <p>{provider.description}</p>
              <div className="use-cases">
                <strong>Casos de uso:</strong>
                <ul>
                  {provider.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flujo OAuth */}
      <div className="oauth-flow">
        <h3>🔄 Flujo Authorization Code (Recomendado)</h3>
        <p>El flujo más seguro para aplicaciones web con backend:</p>

        <div className="flow-diagram">
          {oauthFlows.map((flow) => (
            <div key={flow.step} className="flow-step">
              <div className="step-number">{flow.step}</div>
              <div className="step-content">
                <h4>{flow.title}</h4>
                <p>{flow.description}</p>
                {flow.security && (
                  <div className="security-note">
                    🔒 <strong>Seguridad:</strong> {flow.security}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementación por Proveedor */}
      <div className="provider-implementation">
        <h3>💻 Implementación: {getCurrentProvider().name}</h3>

        <div className="implementation-tabs">
          {selectedProvider === "google" && (
            <div className="implementation-content">
              <div className="code-section">
                <h4>⚛️ Frontend React + Google OAuth</h4>
                <pre>
                  <code>{googleSetup}</code>
                </pre>
              </div>

              <div className="code-section">
                <h4>🔧 Backend Verification</h4>
                <pre>
                  <code>{googleBackend}</code>
                </pre>
              </div>
            </div>
          )}

          {selectedProvider === "github" && (
            <div className="implementation-content">
              <div className="code-section">
                <h4>⚛️ Frontend React + GitHub OAuth</h4>
                <pre>
                  <code>{githubSetup}</code>
                </pre>
              </div>

              <div className="code-section">
                <h4>🔧 Backend GitHub OAuth</h4>
                <pre>
                  <code>{githubBackend}</code>
                </pre>
              </div>
            </div>
          )}

          {(selectedProvider === "microsoft" ||
            selectedProvider === "facebook") && (
            <div className="implementation-placeholder">
              <div className="placeholder-content">
                <h4>🚧 Implementación en desarrollo</h4>
                <p>
                  Los ejemplos para {getCurrentProvider().name} serán agregados
                  próximamente.
                </p>
                <div className="placeholder-info">
                  <strong>Recursos útiles:</strong>
                  <ul>
                    <li>📚 Documentación oficial del proveedor</li>
                    <li>🔧 SDKs y librerías disponibles</li>
                    <li>💡 Ejemplos en GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mejores Prácticas de Seguridad */}
      <div className="security-practices">
        <h3>🛡️ Mejores Prácticas de Seguridad OAuth</h3>

        <div className="practices-grid">
          {securityBestPractices.map((practice) => (
            <div key={practice.title} className="practice-card">
              <h4>{practice.title}</h4>
              <p>
                <strong>Problema:</strong> {practice.description}
              </p>
              <div className="implementation">
                <strong>✅ Implementación:</strong> {practice.implementation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Errores Comunes */}
      <div className="common-errors">
        <h3>🐛 Errores Comunes y Soluciones</h3>

        <div className="errors-list">
          {commonErrors.map((item) => (
            <div key={item.error} className="error-item">
              <div className="error-header">
                <code>{item.error}</code>
              </div>
              <div className="error-details">
                <div className="error-cause">
                  <strong>🔍 Causa:</strong> {item.cause}
                </div>
                <div className="error-solution">
                  <strong>✅ Solución:</strong> {item.solution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testing OAuth */}
      <div className="oauth-testing">
        <h3>🧪 Testing y Debugging OAuth</h3>

        <div className="testing-grid">
          <div className="testing-card">
            <h4>🔍 Debug Tools</h4>
            <ul>
              <li>
                <strong>Browser DevTools:</strong> Network tab para requests
              </li>
              <li>
                <strong>JWT.io:</strong> Decodificar JWT tokens
              </li>
              <li>
                <strong>Postman:</strong> Probar endpoints OAuth
              </li>
              <li>
                <strong>OAuth Playground:</strong> Google, GitHub tienen
                herramientas
              </li>
            </ul>
          </div>

          <div className="testing-card">
            <h4>📋 Checklist de Testing</h4>
            <ul>
              <li>✅ Flujo completo funciona</li>
              <li>✅ Manejo de errores (usuario rechaza)</li>
              <li>✅ State parameter previene CSRF</li>
              <li>✅ Tokens expiran correctamente</li>
              <li>✅ Scopes limitados funcionan</li>
              <li>✅ HTTPS en producción</li>
            </ul>
          </div>

          <div className="testing-card">
            <h4>🚨 Casos Edge</h4>
            <ul>
              <li>Usuario cambia de cuenta durante login</li>
              <li>Token expira durante uso</li>
              <li>Network errors en callback</li>
              <li>Usuario cierra ventana de OAuth</li>
              <li>Proveedor está temporalmente down</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="environment-config">
        <h3>🔧 Configuración por Entorno</h3>

        <div className="env-grid">
          <div className="env-card development">
            <h4>🛠️ Desarrollo</h4>
            <pre>
              <code>{`# .env.development
GOOGLE_CLIENT_ID=dev-client-id
GOOGLE_CLIENT_SECRET=dev-secret
GITHUB_CLIENT_ID=dev-github-id
GITHUB_CLIENT_SECRET=dev-github-secret

# URLs de callback
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000`}</code>
            </pre>
          </div>

          <div className="env-card production">
            <h4>🚀 Producción</h4>
            <pre>
              <code>{`# .env.production
GOOGLE_CLIENT_ID=prod-client-id
GOOGLE_CLIENT_SECRET=prod-secret
GITHUB_CLIENT_ID=prod-github-id
GITHUB_CLIENT_SECRET=prod-github-secret

# URLs de callback
FRONTEND_URL=https://myapp.com
BACKEND_URL=https://api.myapp.com

# Adicionales de seguridad
JWT_SECRET=super-secure-random-string
OAUTH_ENCRYPTION_KEY=another-secure-key`}</code>
            </pre>
          </div>
        </div>

        <div className="config-notes">
          <h4>📝 Notas Importantes:</h4>
          <ul>
            <li>
              🔒 <strong>Secrets separados:</strong> Usa diferentes secrets por
              entorno
            </li>
            <li>
              🌐 <strong>URLs correctas:</strong> Configura callbacks exactos en
              provider console
            </li>
            <li>
              🔐 <strong>Variables seguras:</strong> Nunca commitees secrets al
              repo
            </li>
            <li>
              🔄 <strong>Rotación:</strong> Rota secrets regularmente en
              producción
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OAuthIntegration;
