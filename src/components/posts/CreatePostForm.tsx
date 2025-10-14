import { useState, type FormEvent } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function CreatePostForm() {
  const { createPost, loading } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSuccess(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await createPost(formData);
      setFormData({ title: '', content: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Crear Nuevo Post</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Post creado exitosamente
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contenido</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          className={`w-full px-3 py-2 border rounded-lg ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={loading}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Crear Post'}
      </button>
    </form>
  );
}
