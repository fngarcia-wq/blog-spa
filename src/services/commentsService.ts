import blogApi from '../api/blogApi';
import { handleApiError } from '../utils/errorHandler';
import type { 
  Comment, 
  ApiResponse, 
  CreateCommentData 
} from '../types/api';

export const commentsService = {
  /**
   * Listar todos los comentarios
   * GET /api/comments
   */
  getAll: async (): Promise<ApiResponse<Comment[]>> => {
    try {
      const response = await blogApi.get<ApiResponse<Comment[]>>('/comments');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Obtener un comentario específico por ID
   * GET /api/comments/{id}
   */
  getById: async (id: number): Promise<ApiResponse<Comment>> => {
    try {
      const response = await blogApi.get<ApiResponse<Comment>>(`/comments/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Crear un nuevo comentario
   * POST /api/comments
   */
  create: async (commentData: CreateCommentData): Promise<ApiResponse<Comment>> => {
    try {
      const response = await blogApi.post<ApiResponse<Comment>>('/comments', commentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Actualizar un comentario
   * PUT /api/comments/{id}
   */
  update: async (id: number, content: string): Promise<ApiResponse<Comment>> => {
    try {
      const response = await blogApi.put<ApiResponse<Comment>>(`/comments/${id}`, { content });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Actualizar parcialmente un comentario
   * PATCH /api/comments/{id}
   */
  partialUpdate: async (id: number, content: string): Promise<ApiResponse<Comment>> => {
    try {
      const response = await blogApi.patch<ApiResponse<Comment>>(`/comments/${id}`, { content });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Eliminar un comentario
   * DELETE /api/comments/{id}
   */
  delete: async (id: number): Promise<ApiResponse<number>> => {
    try {
      const response = await blogApi.delete<ApiResponse<number>>(`/comments/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
