import { useAuth } from '../hooks/useAuth';
import { PostsList } from '../components/posts/PostsList';
import { CreatePostForm } from '../components/posts/CreatePostForm';
import { useNavigate } from 'react-router-dom';

export function PostsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Blog SPA</h1>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Hola, <span className="font-medium">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Post Form */}
          <div className="lg:col-span-1">
            <CreatePostForm />
          </div>

          {/* Posts List */}
          <div className="lg:col-span-2">
            <PostsList />
          </div>
        </div>
      </main>
    </div>
  );
}
