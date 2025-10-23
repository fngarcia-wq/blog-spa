// Tipos para nuestros datos simulados
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
  category: string;
  status: 'draft' | 'published' | 'archived';
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
}

export interface ApiError {
  message: string;
  code: number;
  details?: string;
}

// Datos simulados
const simulatedPosts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Post Increíble ${i + 1}`,
  content: `Este es el contenido del post ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  author: ['Ana García', 'Luis Rodríguez', 'María López', 'Carlos Ruiz', 'Sofia Chen'][i % 5],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
  category: ['Tecnología', 'Diseño', 'Negocios', 'Marketing', 'Desarrollo'][i % 5],
  status: ['published', 'draft', 'archived'][Math.floor(Math.random() * 3)] as Post['status'],
}));

const simulatedUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@ejemplo.com`,
  avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  role: ['admin', 'editor', 'viewer'][Math.floor(Math.random() * 3)] as User['role'],
  isActive: Math.random() > 0.3,
  lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

// Simulador de latencia de red
const simulateDelay = (min = 500, max = 1500) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Simulador de errores aleatorios
const simulateError = (errorRate = 0.1) => {
  if (Math.random() < errorRate) {
    throw new Error('Error simulado de red');
  }
};

// API Service Class
export class PerformanceApiService {
  // Posts API
  static async getPosts(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    status?: string;
  } = {}): Promise<ApiResponse<Post[]>> {
    await simulateDelay();
    simulateError(0.05); // 5% error rate

    const { page = 1, limit = 10, search = '', category = '', status = '' } = params;
    
    let filteredPosts = simulatedPosts;

    // Filtrar por búsqueda
    if (search) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // Filtrar por estado
    if (status) {
      filteredPosts = filteredPosts.filter(post => post.status === status);
    }

    // Ordenar por fecha (más recientes primero)
    filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      data: paginatedPosts,
      total: filteredPosts.length,
      page,
      limit,
      hasMore: endIndex < filteredPosts.length,
    };
  }

  static async getPost(id: number): Promise<Post> {
    await simulateDelay(300, 800);
    simulateError(0.03);

    const post = simulatedPosts.find(p => p.id === id);
    if (!post) {
      throw new Error(`Post con ID ${id} no encontrado`);
    }
    return post;
  }

  static async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>): Promise<Post> {
    await simulateDelay(800, 1200);
    simulateError(0.08);

    const newPost: Post = {
      ...postData,
      id: Math.max(...simulatedPosts.map(p => p.id)) + 1,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
    };

    simulatedPosts.unshift(newPost);
    return newPost;
  }

  static async updatePost(id: number, updates: Partial<Post>): Promise<Post> {
    await simulateDelay(600, 1000);
    simulateError(0.06);

    const postIndex = simulatedPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error(`Post con ID ${id} no encontrado`);
    }

    simulatedPosts[postIndex] = { ...simulatedPosts[postIndex], ...updates };
    return simulatedPosts[postIndex];
  }

  static async deletePost(id: number): Promise<void> {
    await simulateDelay(400, 800);
    simulateError(0.04);

    const postIndex = simulatedPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error(`Post con ID ${id} no encontrado`);
    }

    simulatedPosts.splice(postIndex, 1);
  }

  static async likePost(id: number): Promise<Post> {
    await simulateDelay(200, 400);
    simulateError(0.02);

    const post = simulatedPosts.find(p => p.id === id);
    if (!post) {
      throw new Error(`Post con ID ${id} no encontrado`);
    }

    post.likes += 1;
    return post;
  }

  // Users API
  static async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  } = {}): Promise<ApiResponse<User[]>> {
    await simulateDelay();
    simulateError(0.05);

    const { page = 1, limit = 10, search = '', role = '', isActive } = params;
    
    let filteredUsers = simulatedUsers;

    // Filtros
    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (isActive !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.isActive === isActive);
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      hasMore: endIndex < filteredUsers.length,
    };
  }

  static async getUser(id: number): Promise<User> {
    await simulateDelay(300, 600);
    simulateError(0.03);

    const user = simulatedUsers.find(u => u.id === id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Analytics API
  static async getAnalytics(): Promise<{
    totalPosts: number;
    totalUsers: number;
    popularCategories: { name: string; count: number }[];
    recentActivity: { type: string; description: string; timestamp: string }[];
  }> {
    await simulateDelay(800, 1500);
    simulateError(0.04);

    const categories = simulatedPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularCategories = Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentActivity = [
      { type: 'post_created', description: 'Nuevo post creado: "Tips de React"', timestamp: new Date().toISOString() },
      { type: 'user_registered', description: 'Nuevo usuario registrado: Ana García', timestamp: new Date(Date.now() - 300000).toISOString() },
      { type: 'post_liked', description: 'Post "Redux vs Zustand" recibió 50 likes', timestamp: new Date(Date.now() - 600000).toISOString() },
    ];

    return {
      totalPosts: simulatedPosts.length,
      totalUsers: simulatedUsers.length,
      popularCategories,
      recentActivity,
    };
  }

  // Search API con debounce simulation
  static async searchAll(query: string): Promise<{
    posts: Post[];
    users: User[];
  }> {
    await simulateDelay(200, 500);
    simulateError(0.02);

    const posts = simulatedPosts
      .filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);

    const users = simulatedUsers
      .filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);

    return { posts, users };
  }

  // Infinite scroll simulation
  static async getInfinitePosts(params: {
    pageParam?: number;
    limit?: number;
    category?: string;
  } = {}): Promise<{
    posts: Post[];
    nextCursor: number | null;
    hasNextPage: boolean;
  }> {
    const { pageParam = 0, limit = 10, category = '' } = params;
    
    await simulateDelay(300, 800);
    simulateError(0.03);

    let filteredPosts = simulatedPosts;
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    const startIndex = pageParam * limit;
    const endIndex = startIndex + limit;
    const posts = filteredPosts.slice(startIndex, endIndex);
    
    const hasNextPage = endIndex < filteredPosts.length;
    const nextCursor = hasNextPage ? pageParam + 1 : null;

    return {
      posts,
      nextCursor,
      hasNextPage,
    };
  }
}