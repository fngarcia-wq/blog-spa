import { useState, useEffect, useCallback } from 'react';
import { postsService } from '../services/postsService';
import type { Post, CreatePostData, UpdatePostData } from '../types/api';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todos los posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postsService.getAll();
      setPosts(response.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear post
  const createPost = useCallback(async (postData: CreatePostData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postsService.create(postData);
      setPosts(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar post
  const updatePost = useCallback(async (id: number, postData: CreatePostData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postsService.update(id, postData);
      setPosts(prev =>
        prev.map(post => (post.id === id ? response.data : post))
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualización parcial
  const patchPost = useCallback(async (id: number, postData: UpdatePostData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postsService.partialUpdate(id, postData);
      setPosts(prev =>
        prev.map(post => (post.id === id ? response.data : post))
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar post
  const deletePost = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await postsService.delete(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar posts al montar
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    patchPost,
    deletePost
  };
}
