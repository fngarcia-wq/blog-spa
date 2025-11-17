import { useState } from 'react';
import blogApi from '../../api/blogApi';

interface PostsDemoProps {
  method: 'axios' | 'fetch';
}

export function PostsDemo({ method }: PostsDemoProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const createPostWithAxios = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // ✅ Usa blogApi - el token se agrega automáticamente
      const response = await blogApi.post('/posts', { title, content });

      setSuccess(`✅ Post creado! ID: ${response.data.data?.id}`);
      setTitle('');
      setContent('');
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data.errors;
          const errorMessages = Object.values(errors).flat().join(', ');
          setError(`❌ Validación: ${errorMessages}`);
        } else {
          setError(`❌ Error ${err.response.status}: ${err.response.data.message || 'Error al crear'}`);
        }
      } else {
        setError('❌ Error de conexión');
      }
    } finally {
      setLoading(false);
    }
  };

  const createPostWithFetch = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // ✅ Usa la URL base de blogApi y obtén el token de Auth0
      const auth0Token = localStorage.getItem('auth0_token');
      const legacyToken = localStorage.getItem('access_token');
      const token = auth0Token || legacyToken;
      
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80/api';
      const response = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ title, content })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          const errors = errorData.errors;
          const errorMessages = Object.values(errors).flat().join(', ');
          throw new Error(`Validación: ${errorMessages}`);
        }
        throw new Error(errorData.message || 'Error al crear');
      }

      const data = await response.json();
      setSuccess(`✅ Post creado! ID: ${data.data?.id}`);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'axios') {
      createPostWithAxios();
    } else {
      createPostWithFetch();
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
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Título del post"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenido
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Contenido del post"
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
              Creando post...
            </>
          ) : (
            'Crear Post'
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
        <p className="text-xs text-gray-600 font-medium mb-1">💡 Manejo de Errores:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          {method === 'axios' ? (
            <>
              <li>• error.response.status</li>
              <li>• error.response.data</li>
              <li>• Estructura clara</li>
            </>
          ) : (
            <>
              <li>• Verificar response.ok</li>
              <li>• Parsear error manualmente</li>
              <li>• Try-catch manual</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
