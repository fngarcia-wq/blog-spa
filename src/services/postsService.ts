import blogApi from '../api/blogApi';
import { handleApiError } from '../utils/errorHandler';
import type { 
  Post, 
  ApiResponse, 
  CreatePostData, 
  UpdatePostData 
} from '../types/api';

export const postsService = {
  /**
   * Listar todos los posts con sus usuarios y comentarios
   * GET /api/posts
   */
  getAll: async (): Promise<ApiResponse<Post[]>> => {
    try {
      const response = await blogApi.get<ApiResponse<Post[]>>('/posts');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Obtener un post específico por ID
   * GET /api/posts/{id}
   */
  getById: async (id: number): Promise<ApiResponse<Post>> => {
    try {
      const response = await blogApi.get<ApiResponse<Post>>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Crear un nuevo post
   * POST /api/posts
   */
  create: async (postData: CreatePostData): Promise<ApiResponse<Post>> => {
    try {
      const response = await blogApi.post<ApiResponse<Post>>('/posts', postData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Actualizar completamente un post
   * PUT /api/posts/{id}
   */
  update: async (id: number, postData: CreatePostData): Promise<ApiResponse<Post>> => {
    try {
      const response = await blogApi.put<ApiResponse<Post>>(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Actualizar parcialmente un post
   * PATCH /api/posts/{id}
   */
  partialUpdate: async (id: number, postData: UpdatePostData): Promise<ApiResponse<Post>> => {
    try {
      const response = await blogApi.patch<ApiResponse<Post>>(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Eliminar un post
   * DELETE /api/posts/{id}
   */
  delete: async (id: number): Promise<ApiResponse<number>> => {
    try {
      const response = await blogApi.delete<ApiResponse<number>>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};
