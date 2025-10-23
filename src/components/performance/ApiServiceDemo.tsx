import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PerformanceApiService,
  type Post,
} from "../../services/performanceApi";
import "./ApiServiceDemo.css";

const ApiServiceDemo: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "architecture" | "patterns" | "demo"
  >("architecture");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const queryClient = useQueryClient();

  // Consulta para obtener posts
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => PerformanceApiService.getPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Consulta para obtener usuarios
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => PerformanceApiService.getUsers(),
    staleTime: 10 * 60 * 1000, // 10 minutos
  });

  // Mutación para crear post
  const createPostMutation = useMutation({
    mutationFn: (
      postData: Omit<Post, "id" | "createdAt" | "likes" | "comments">
    ) => PerformanceApiService.createPost(postData),
    onSuccess: () => {
      // Invalidar y refrescar la lista de posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPostTitle("");
      setNewPostContent("");
    },
  });

  // Mutación para eliminar post
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => PerformanceApiService.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostTitle.trim() && newPostContent.trim()) {
      createPostMutation.mutate({
        title: newPostTitle,
        content: newPostContent,
        author: "Usuario Demo",
        category: "Tecnología",
        status: "published" as const,
      });
    }
  };

  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  const getPostsStatus = () => {
    if (postsQuery.isLoading) return "Cargando...";
    if (postsQuery.isError) return "Error";
    return "Listo";
  };

  const getUsersStatus = () => {
    if (usersQuery.isLoading) return "Cargando...";
    if (usersQuery.isError) return "Error";
    return "Listo";
  };

  const getActiveRequests = () => {
    const postsActive = postsQuery.fetchStatus === "fetching" ? 1 : 0;
    const usersActive = usersQuery.fetchStatus === "fetching" ? 1 : 0;
    return postsActive + usersActive;
  };

  const architectureContent = (
    <div className="architecture-section">
      <h4>🏗️ Arquitectura de Servicios API</h4>

      <div className="architecture-grid">
        <div className="arch-card">
          <h5>📦 Capa de Servicio</h5>
          <p>Abstrae las llamadas HTTP y maneja la lógica de negocio</p>
          <div className="code-example">
            <pre>
              <code>{`class ApiService {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    return response.json();
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="arch-card">
          <h5>🔄 Interceptores y Middleware</h5>
          <p>Manejo automático de autenticación, errores y transformaciones</p>
          <div className="code-example">
            <pre>
              <code>{`// Interceptor de autenticación
const authInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
};

// Interceptor de errores
const errorInterceptor = (error) => {
  if (error.response?.status === 401) {
    // Redirigir a login
    window.location.href = '/login';
  }
  return Promise.reject(error);
};`}</code>
            </pre>
          </div>
        </div>

        <div className="arch-card">
          <h5>🎯 Tipado TypeScript</h5>
          <p>Tipos seguros para requests y responses</p>
          <div className="code-example">
            <pre>
              <code>{`interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
}`}</code>
            </pre>
          </div>
        </div>

        <div className="arch-card">
          <h5>⚡ Optimizaciones</h5>
          <p>Cache, retry logic y cancelación de requests</p>
          <div className="code-example">
            <pre>
              <code>{`// Cache con TTL
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

async function getCachedData(key: string, fetcher: () => Promise<any>) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const patternsContent = (
    <div className="patterns-section">
      <h4>🎨 Patrones de Diseño API</h4>

      <div className="patterns-grid">
        <div className="pattern-card">
          <h5>🏭 Factory Pattern</h5>
          <p>Crear servicios específicos para diferentes recursos</p>
          <div className="code-example">
            <pre>
              <code>{`class ApiServiceFactory {
  static createPostsService() {
    return new PostsService('/api/posts');
  }
  
  static createUsersService() {
    return new UsersService('/api/users');
  }
  
  static createCommentsService() {
    return new CommentsService('/api/comments');
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🎭 Adapter Pattern</h5>
          <p>Adaptar diferentes APIs a una interfaz común</p>
          <div className="code-example">
            <pre>
              <code>{`interface DataAdapter<T> {
  normalize(data: any): T;
  denormalize(data: T): any;
}

class PostAdapter implements DataAdapter<Post> {
  normalize(apiPost: any): Post {
    return {
      id: apiPost.id,
      title: apiPost.title,
      body: apiPost.content, // Mapeo de campo
      userId: apiPost.author_id,
      createdAt: new Date(apiPost.created_at).toISOString(),
    };
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🚀 Singleton Pattern</h5>
          <p>Instancia única del cliente API</p>
          <div className="code-example">
            <pre>
              <code>{`class ApiClient {
  private static instance: ApiClient;
  private baseURL: string;
  
  private constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || '';
  }
  
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🔄 Observer Pattern</h5>
          <p>Notificaciones de cambios en datos</p>
          <div className="code-example">
            <pre>
              <code>{`class DataStore {
  private observers: ((data: any) => void)[] = [];
  
  subscribe(callback: (data: any) => void) {
    this.observers.push(callback);
  }
  
  notify(data: any) {
    this.observers.forEach(callback => callback(data));
  }
  
  updateData(newData: any) {
    this.data = newData;
    this.notify(newData);
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const demoContent = (
    <div className="demo-section">
      <h4>🚀 Demo Interactivo</h4>

      <div className="demo-controls">
        <div className="query-status">
          <h5>Estado de Consultas</h5>
          <div className="status-grid">
            <div className="status-item">
              <span>Posts:</span>
              <span>{getPostsStatus()}</span>
            </div>
            <div className="status-item">
              <span>Usuarios:</span>
              <span>{getUsersStatus()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="create-form">
          <h5>Crear Nuevo Post</h5>
          <input
            type="text"
            placeholder="Título del post"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenido del post"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={3}
          />
          <button type="submit" disabled={createPostMutation.isPending}>
            {createPostMutation.isPending ? "Creando..." : "Crear Post"}
          </button>
        </form>
      </div>

      <div className="demo-content">
        {postsQuery.isLoading && (
          <div className="loading">Cargando posts...</div>
        )}
        {postsQuery.isError && (
          <div className="error">
            Error al cargar posts: {postsQuery.error.message}
          </div>
        )}

        {postsQuery.data && (
          <div className="posts-list">
            <h5>Posts Disponibles ({postsQuery.data.data.length})</h5>
            <div className="posts-grid">
              {postsQuery.data.data.map((post: Post) => (
                <div key={post.id} className="post-item">
                  <h6>{post.title}</h6>
                  <p>{post.content.substring(0, 100)}...</p>
                  <div className="post-actions">
                    <span className="post-id">ID: {post.id}</span>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      disabled={deletePostMutation.isPending}
                      className="delete-btn"
                    >
                      {deletePostMutation.isPending ? "🔄" : "🗑️"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="api-metrics">
        <h5>📊 Métricas de API</h5>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Requests Totales:</span>
            <span className="metric-value">{getActiveRequests()}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Cache Hits:</span>
            <span className="metric-value">{postsQuery.isStale ? 0 : 1}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Tiempo de Respuesta:</span>
            <span className="metric-value">~500ms</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Estado de Red:</span>
            <span className="metric-value">Conectado</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="api-service-demo">
      <h2>🔗 Servicios API y Arquitectura</h2>
      <p className="intro-text">
        Explora patrones avanzados para el diseño de servicios API,
        arquitecturas escalables y mejores prácticas para la gestión de datos en
        aplicaciones React.
      </p>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={selectedTab === "architecture" ? "active" : ""}
            onClick={() => setSelectedTab("architecture")}
          >
            🏗️ Arquitectura
          </button>
          <button
            className={selectedTab === "patterns" ? "active" : ""}
            onClick={() => setSelectedTab("patterns")}
          >
            🎨 Patrones
          </button>
          <button
            className={selectedTab === "demo" ? "active" : ""}
            onClick={() => setSelectedTab("demo")}
          >
            🚀 Demo
          </button>
        </div>

        <div className="tab-content">
          {selectedTab === "architecture" && architectureContent}
          {selectedTab === "patterns" && patternsContent}
          {selectedTab === "demo" && demoContent}
        </div>
      </div>

      <div className="best-practices">
        <h4>💡 Mejores Prácticas</h4>
        <div className="practices-grid">
          <div className="practice-item">
            <h5>🔒 Seguridad</h5>
            <ul>
              <li>Validación de entrada en cliente y servidor</li>
              <li>Autenticación con tokens JWT</li>
              <li>HTTPS para todas las comunicaciones</li>
              <li>Rate limiting y throttling</li>
            </ul>
          </div>
          <div className="practice-item">
            <h5>⚡ Performance</h5>
            <ul>
              <li>Cache estratégico con TTL</li>
              <li>Paginación para grandes datasets</li>
              <li>Compresión gzip/brotli</li>
              <li>Lazy loading de recursos</li>
            </ul>
          </div>
          <div className="practice-item">
            <h5>🛠️ Mantenibilidad</h5>
            <ul>
              <li>Separación de responsabilidades</li>
              <li>Interfaces y tipos TypeScript</li>
              <li>Documentación con OpenAPI/Swagger</li>
              <li>Testing unitario y de integración</li>
            </ul>
          </div>
          <div className="practice-item">
            <h5>🔄 Escalabilidad</h5>
            <ul>
              <li>Microservicios vs monolito</li>
              <li>Load balancing</li>
              <li>Database pooling</li>
              <li>CDN para assets estáticos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiServiceDemo;
