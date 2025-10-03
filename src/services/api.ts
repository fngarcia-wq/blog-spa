// ✅ BUENA PRÁCTICA: Simulación de API para propósitos educativos
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export interface HookExample {
  id: number;
  name: string;
  description: string;
  category: 'basic' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// ✅ BUENA PRÁCTICA: Datos simulados para la demostración
const MOCK_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Introducción a React Hooks",
    excerpt: "Aprende los conceptos básicos de React Hooks",
    content: "Los hooks son funciones que te permiten usar estado y otras características de React...",
    author: "React Team",
    date: "2024-01-15",
    tags: ["react", "hooks", "básico"]
  },
  {
    id: 2,
    title: "useState vs useReducer",
    excerpt: "Cuándo usar cada uno para manejar estado",
    content: "useState es perfecto para estado simple, mientras que useReducer...",
    author: "Dan Abramov",
    date: "2024-01-20",
    tags: ["react", "hooks", "estado"]
  }
];

const MOCK_EXAMPLES: HookExample[] = [
  {
    id: 1,
    name: "useState",
    description: "Hook para manejar estado local en componentes funcionales",
    category: "basic",
    difficulty: "beginner"
  },
  {
    id: 2,
    name: "useEffect",
    description: "Hook para manejar efectos secundarios y ciclo de vida",
    category: "basic",
    difficulty: "beginner"
  },
  {
    id: 3,
    name: "useContext",
    description: "Hook para consumir contexto de React",
    category: "basic",
    difficulty: "intermediate"
  },
  {
    id: 4,
    name: "useReducer",
    description: "Hook para manejar estado complejo con acciones",
    category: "advanced",
    difficulty: "intermediate"
  }
];

// ✅ BUENA PRÁCTICA: Simulación de delays de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ✅ BUENA PRÁCTICA: Funciones API simuladas
export const api = {
  // Obtener todos los posts del blog
  async getPosts(): Promise<ApiResponse<BlogPost[]>> {
    await delay(500); // Simular latencia de red
    
    return {
      data: MOCK_POSTS,
      status: 'success',
      message: 'Posts obtenidos correctamente'
    };
  },

  // Obtener un post específico
  async getPost(id: number): Promise<ApiResponse<BlogPost | null>> {
    await delay(300);
    
    const post = MOCK_POSTS.find(p => p.id === id);
    
    if (post) {
      return {
        data: post,
        status: 'success',
        message: 'Post encontrado'
      };
    } else {
      return {
        data: null,
        status: 'error',
        message: 'Post no encontrado'
      };
    }
  },

  // Obtener ejemplos de hooks
  async getHookExamples(): Promise<ApiResponse<HookExample[]>> {
    await delay(400);
    
    return {
      data: MOCK_EXAMPLES,
      status: 'success',
      message: 'Ejemplos obtenidos correctamente'
    };
  },

  // Filtrar ejemplos por categoría
  async getHookExamplesByCategory(category: 'basic' | 'advanced'): Promise<ApiResponse<HookExample[]>> {
    await delay(350);
    
    const filtered = MOCK_EXAMPLES.filter(example => example.category === category);
    
    return {
      data: filtered,
      status: 'success',
      message: `Ejemplos de categoría ${category} obtenidos`
    };
  },

  // Simular creación de post (solo para demostración)
  async createPost(postData: Omit<BlogPost, 'id' | 'date'>): Promise<ApiResponse<BlogPost>> {
    await delay(600);
    
    // Simular validación
    if (!postData.title || !postData.content) {
      return {
        data: {} as BlogPost,
        status: 'error',
        message: 'Título y contenido son requeridos'
      };
    }

    const newPost: BlogPost = {
      ...postData,
      id: MOCK_POSTS.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    MOCK_POSTS.push(newPost);
    
    return {
      data: newPost,
      status: 'success',
      message: 'Post creado correctamente'
    };
  },

  // Simular error de red
  async simulateNetworkError(): Promise<ApiResponse<never>> {
    await delay(2000);
    
    return {
      data: null as never,
      status: 'error',
      message: 'Error de conexión simulado'
    };
  }
};

// ✅ BUENA PRÁCTICA: Hook personalizado para hacer requests
export const useApi = () => {
  return api;
};

export default api;