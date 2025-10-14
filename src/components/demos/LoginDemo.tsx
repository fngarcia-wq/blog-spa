import { useState } from 'react';
import axios from 'axios';

interface LoginDemoProps {
  method: 'axios' | 'fetch';
}

export function LoginDemo({ method }: LoginDemoProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginWithAxios = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:80/api/login', {
        email,
        password
      });

      setSuccess(`✅ Login exitoso! Token: ${response.data.access_token?.substring(0, 20)}...`);
    } catch (err: any) {
      if (err.response) {
        setError(`❌ Error ${err.response.status}: ${err.response.data.message || 'Credenciales inválidas'}`);
      } else if (err.request) {
        setError('❌ No se pudo conectar con el servidor');
      } else {
        setError('❌ Error al realizar la petición');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithFetch = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:80/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas');
      }

      const data = await response.json();
      setSuccess(`✅ Login exitoso! Token: ${data.access_token?.substring(0, 20)}...`);
    } catch (err: any) {
      if (err.message) {
        setError(`❌ Error: ${err.message}`);
      } else {
        setError('❌ Error al realizar la petición');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'axios') {
      loginWithAxios();
    } else {
      loginWithFetch();
    }
  };

  const bgColor = method === 'axios' ? 'bg-green-50' : 'bg-orange-50';
  const borderColor = method === 'axios' ? 'border-green-200' : 'border-orange-200';
  const buttonColor = method === 'axios' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700';
  const titleColor = method === 'axios' ? 'text-green-700' : 'text-orange-700';

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-6`}>
      <h4 className={`font-bold ${titleColor} mb-4 flex items-center gap-2`}>
        {method === 'axios' ? '✅ Con Axios' : '⚠️ Con Fetch'}
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="usuario@ejemplo.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${buttonColor} text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}
      </form>

      <div className="mt-4 p-3 bg-white rounded border border-gray-200">
        <p className="text-xs text-gray-600 font-medium mb-1">💡 Características:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          {method === 'axios' ? (
            <>
              <li>• JSON automático</li>
              <li>• Manejo de errores estructurado</li>
              <li>• Sintaxis más limpia</li>
            </>
          ) : (
            <>
              <li>• Parseo manual de JSON</li>
              <li>• Verificación manual de response.ok</li>
              <li>• Más verboso</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
