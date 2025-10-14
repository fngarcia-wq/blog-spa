import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <LoginForm onSuccess={handleSuccess} />
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
