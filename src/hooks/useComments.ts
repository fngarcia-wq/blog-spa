import { useState, useCallback } from 'react';
import { commentsService } from '../services/commentsService';
import type { Comment, CreateCommentData } from '../types/api';

export function useComments(postId?: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await commentsService.getAll();
      let allComments = response.data || [];
      
      // Filtrar por post si se especifica
      if (postId) {
        allComments = allComments.filter(c => c.post_id === postId);
      }
      
      setComments(allComments);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const createComment = useCallback(async (commentData: CreateCommentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await commentsService.create(commentData);
      setComments(prev => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (id: number, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await commentsService.update(id, content);
      setComments(prev =>
        prev.map(comment => (comment.id === id ? response.data : comment))
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await commentsService.delete(id);
      setComments(prev => prev.filter(comment => comment.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment,
    updateComment,
    deleteComment
  };
}
