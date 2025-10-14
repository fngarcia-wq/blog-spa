import { usePosts } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';

export function PostsList() {
  const { posts, loading, error, deletePost, fetchPosts } = usePosts();
  const { user } = useAuth();

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este post?')) {
      try {
        await deletePost(id);
        alert('Post eliminado exitosamente');
      } catch (err) {
        alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Cargando posts..." />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={fetchPosts} />;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay posts disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.content}</p>

            {post.user && (
              <p className="text-sm text-gray-500 mt-2">
                Por: <span className="font-medium">{post.user.name}</span>
              </p>
            )}

            {post.comments && post.comments.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {post.comments.length} comentario(s)
              </p>
            )}

            <div className="text-xs text-gray-400 mt-2">
              Creado: {new Date(post.created_at).toLocaleDateString()}
            </div>

            {user && user.id === post.user_id && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
