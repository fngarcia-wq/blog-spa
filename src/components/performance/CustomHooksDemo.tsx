import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PerformanceApiService,
  type Post,
  type User,
} from "../../services/performanceApi";
import "./CustomHooksDemo.css";

// Hook personalizado para posts con cache y filtros
const usePosts = (
  filters: { search?: string; category?: string; status?: string } = {}
) => {
  return useQuery({
    queryKey: ["posts", filters],
    queryFn: () => PerformanceApiService.getPosts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Hook personalizado para usuarios con funcionalidades extendidas
const useUsers = (enabled = true) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => PerformanceApiService.getUsers(),
    enabled,
    staleTime: 10 * 60 * 1000,
    select: (data) => ({
      ...data,
      activeUsers: data.data.filter((user: User) => user.isActive),
      adminUsers: data.data.filter((user: User) => user.role === "admin"),
    }),
  });
};

// Hook personalizado para post específico con datos relacionados
const usePostDetails = (postId: number | null) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => PerformanceApiService.getPost(postId!),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};

// Hook personalizado para mutaciones de posts
const usePostMutations = () => {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: PerformanceApiService.createPost,
    onSuccess: (newPost) => {
      // Actualizar cache de posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Agregar optimísticamente el nuevo post
      queryClient.setQueryData(["post", newPost.id], newPost);

      // Mostrar notificación de éxito
      console.log("✅ Post creado exitosamente:", newPost.title);
    },
    onError: (error) => {
      console.error("❌ Error al crear post:", error.message);
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Post> }) =>
      PerformanceApiService.updatePost(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancelar queries en vuelo
      await queryClient.cancelQueries({ queryKey: ["post", id] });

      // Obtener snapshot del estado anterior
      const previousPost = queryClient.getQueryData(["post", id]);

      // Actualización optimista
      queryClient.setQueryData(["post", id], (old: Post | undefined) =>
        old ? { ...old, ...updates } : undefined
      );

      return { previousPost };
    },
    onError: (error, variables, context) => {
      // Revertir en caso de error
      if (context?.previousPost) {
        queryClient.setQueryData(["post", variables.id], context.previousPost);
      }
      console.error("❌ Error al actualizar post:", error.message);
    },
    onSettled: (data, error, variables) => {
      // Refrescar datos
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePost = useMutation({
    mutationFn: PerformanceApiService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("✅ Post eliminado exitosamente");
    },
    onError: (error) => {
      console.error("❌ Error al eliminar post:", error.message);
    },
  });

  return { createPost, updatePost, deletePost };
};

// Hook personalizado para búsqueda con debounce
const useSearch = (initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => PerformanceApiService.searchAll(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 30 * 1000, // 30 segundos
  });

  return {
    query,
    setQuery,
    debouncedQuery,
    results: searchResults.data,
    isSearching: searchResults.isFetching,
    error: searchResults.error,
  };
};

// Hook personalizado para analíticas
const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: PerformanceApiService.getAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 60 * 1000, // Refrescar cada minuto
    refetchIntervalInBackground: false,
  });
};

const CustomHooksDemo: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "hooks" | "examples" | "patterns"
  >("hooks");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [postFilters, setPostFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  // Usando nuestros hooks personalizados
  const postsQuery = usePosts(postFilters);
  const usersQuery = useUsers();
  const postDetailsQuery = usePostDetails(selectedPostId);
  const { createPost, updatePost } = usePostMutations();
  const { query, setQuery, results, isSearching } = useSearch();
  const analyticsQuery = useAnalytics();

  const getPostsStatus = () => {
    if (postsQuery.isLoading) return "🔄 Cargando...";
    if (postsQuery.isError) return "❌ Error";
    return "✅ Listo";
  };

  const getAnalyticsStatus = () => {
    if (analyticsQuery.isLoading) return "🔄";
    if (analyticsQuery.isFetching) return "🔄";
    return "✅";
  };

  const handleCreatePost = () => {
    createPost.mutate({
      title: "Nuevo Post desde Hook",
      content: "Este post fue creado usando un hook personalizado",
      author: "Usuario Demo",
      category: "Tecnología",
      status: "published" as const,
    });
  };

  const handleUpdatePost = (postId: number) => {
    updatePost.mutate({
      id: postId,
      updates: { title: `Post Actualizado ${Date.now()}` },
    });
  };

  const hooksContent = (
    <div className="hooks-section">
      <h4>🪝 Hooks Personalizados</h4>

      <div className="hooks-grid">
        <div className="hook-card">
          <h5>📚 usePosts Hook</h5>
          <p>Hook reutilizable para cargar posts con filtros avanzados</p>
          <div className="code-example">
            <pre>
              <code>{`const usePosts = (filters = {}) => {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => PerformanceApiService.getPosts(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// Uso del hook
const { data, isLoading, error } = usePosts({
  search: 'react',
  category: 'tecnología'
});`}</code>
            </pre>
          </div>
          <div className="hook-benefits">
            <h6>Beneficios:</h6>
            <ul>
              <li>Reutilización en múltiples componentes</li>
              <li>Configuración de cache centralizada</li>
              <li>Filtros tipados y seguros</li>
              <li>Manejo automático de errores</li>
            </ul>
          </div>
        </div>

        <div className="hook-card">
          <h5>👥 useUsers Hook</h5>
          <p>Hook con transformación de datos y filtros computados</p>
          <div className="code-example">
            <pre>
              <code>{`const useUsers = (enabled = true) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => PerformanceApiService.getUsers(),
    enabled,
    staleTime: 10 * 60 * 1000,
    select: (data) => ({
      ...data,
      activeUsers: data.data.filter(user => user.isActive),
      adminUsers: data.data.filter(user => user.role === 'admin'),
    }),
  });
};

// Los datos ya vienen transformados
const { data } = useUsers();
console.log(data.activeUsers); // Solo usuarios activos
console.log(data.adminUsers);  // Solo administradores`}</code>
            </pre>
          </div>
          <div className="hook-benefits">
            <h6>Características:</h6>
            <ul>
              <li>Transformación automática de datos</li>
              <li>Cálculos memoizados en el select</li>
              <li>Control de habilitación condicional</li>
              <li>Datos pre-procesados listos para usar</li>
            </ul>
          </div>
        </div>

        <div className="hook-card">
          <h5>🔍 useSearch Hook</h5>
          <p>Hook de búsqueda con debounce y cache inteligente</p>
          <div className="code-example">
            <pre>
              <code>{`const useSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchResults = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => PerformanceApiService.searchAll(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 30 * 1000,
  });

  return { query, setQuery, results, isSearching };
};`}</code>
            </pre>
          </div>
          <div className="hook-benefits">
            <h6>Optimizaciones:</h6>
            <ul>
              <li>Debounce automático de 300ms</li>
              <li>Búsqueda solo con 3+ caracteres</li>
              <li>Cache de resultados por 30 segundos</li>
              <li>Estados de carga claros</li>
            </ul>
          </div>
        </div>

        <div className="hook-card">
          <h5>✏️ usePostMutations Hook</h5>
          <p>
            Hook para todas las mutaciones de posts con actualizaciones
            optimistas
          </p>
          <div className="code-example">
            <pre>
              <code>{`const usePostMutations = () => {
  const queryClient = useQueryClient();

  const updatePost = useMutation({
    mutationFn: ({ id, updates }) => 
      PerformanceApiService.updatePost(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancelar queries en vuelo
      await queryClient.cancelQueries(['post', id]);
      
      // Snapshot del estado anterior
      const previousPost = queryClient.getQueryData(['post', id]);
      
      // Actualización optimista
      queryClient.setQueryData(['post', id], old => 
        old ? { ...old, ...updates } : undefined
      );
      
      return { previousPost };
    },
    onError: (error, variables, context) => {
      // Revertir en caso de error
      if (context?.previousPost) {
        queryClient.setQueryData(['post', variables.id], context.previousPost);
      }
    },
  });

  return { createPost, updatePost, deletePost };
};`}</code>
            </pre>
          </div>
          <div className="hook-benefits">
            <h6>Características Avanzadas:</h6>
            <ul>
              <li>Actualizaciones optimistas</li>
              <li>Rollback automático en errores</li>
              <li>Invalidación inteligente de cache</li>
              <li>Notificaciones integradas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const examplesContent = (
    <div className="examples-section">
      <h4>🎮 Ejemplos Interactivos</h4>

      <div className="examples-grid">
        <div className="example-panel">
          <h5>📊 Control de Posts</h5>
          <div className="controls">
            <input
              type="text"
              placeholder="Buscar posts..."
              value={postFilters.search}
              onChange={(e) =>
                setPostFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
            <select
              value={postFilters.category}
              onChange={(e) =>
                setPostFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Todas las categorías</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Diseño">Diseño</option>
              <option value="Negocios">Negocios</option>
            </select>
          </div>

          <div className="query-status">
            <p>Estado: {getPostsStatus()}</p>
            <p>Posts encontrados: {postsQuery.data?.total || 0}</p>
            <p>
              Cache válido:{" "}
              {postsQuery.isStale ? "❌ Desactualizado" : "✅ Fresco"}
            </p>
          </div>

          <button onClick={handleCreatePost} disabled={createPost.isPending}>
            {createPost.isPending ? "⏳ Creando..." : "➕ Crear Post"}
          </button>
        </div>

        <div className="example-panel">
          <h5>👤 Información de Usuarios</h5>
          {usersQuery.data && (
            <div className="users-stats">
              <div className="stat-item">
                <span>Total usuarios:</span>
                <span>{usersQuery.data.data.length}</span>
              </div>
              <div className="stat-item">
                <span>Usuarios activos:</span>
                <span>{usersQuery.data.activeUsers.length}</span>
              </div>
              <div className="stat-item">
                <span>Administradores:</span>
                <span>{usersQuery.data.adminUsers.length}</span>
              </div>
            </div>
          )}

          <div className="query-status">
            <p>
              Estado: {usersQuery.isLoading ? "🔄 Cargando..." : "✅ Listo"}
            </p>
            <p>Datos transformados automáticamente</p>
          </div>
        </div>

        <div className="example-panel">
          <h5>🔍 Búsqueda en Tiempo Real</h5>
          <input
            type="text"
            placeholder="Buscar contenido..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />

          {isSearching && <p>🔄 Buscando...</p>}

          {results && (
            <div className="search-results">
              <p>Posts encontrados: {results.posts.length}</p>
              <p>Usuarios encontrados: {results.users.length}</p>
              {results.posts.slice(0, 3).map((post: Post) => (
                <div key={post.id} className="search-item">
                  <strong>{post.title}</strong>
                  <p>{post.content.substring(0, 80)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="example-panel">
          <h5>📈 Analíticas en Tiempo Real</h5>
          {analyticsQuery.data && (
            <div className="analytics-display">
              <div className="analytics-grid">
                <div className="metric">
                  <span className="metric-value">
                    {analyticsQuery.data.totalPosts}
                  </span>
                  <span className="metric-label">Total Posts</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {analyticsQuery.data.totalUsers}
                  </span>
                  <span className="metric-label">Total Usuarios</span>
                </div>
              </div>

              <div className="categories">
                <h6>Categorías Populares:</h6>
                {analyticsQuery.data.popularCategories
                  .slice(0, 3)
                  .map((cat, index) => (
                    <div
                      key={`category-${cat.name}-${index}`}
                      className="category-item"
                    >
                      <span>{cat.name}</span>
                      <span className="count">{cat.count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="query-status">
            <p>Actualización: cada 60 segundos</p>
            <p>Estado: {getAnalyticsStatus()}</p>
          </div>
        </div>
      </div>

      {postsQuery.data && (
        <div className="posts-preview">
          <h5>Posts Disponibles (usando usePosts hook)</h5>
          <div className="posts-grid">
            {postsQuery.data.data.slice(0, 6).map((post: Post) => (
              <button
                key={post.id}
                className={`post-card ${
                  selectedPostId === post.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPostId(post.id)}
              >
                <h6>{post.title}</h6>
                <p>{post.content.substring(0, 60)}...</p>
                <div className="post-meta">
                  <span>👤 {post.author}</span>
                  <span>📂 {post.category}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdatePost(post.id);
                  }}
                >
                  Actualizar
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPostId && postDetailsQuery.data && (
        <div className="post-details">
          <h5>Detalles del Post (usando usePostDetails hook)</h5>
          <div className="details-content">
            <h6>{postDetailsQuery.data.title}</h6>
            <p>
              <strong>Autor:</strong> {postDetailsQuery.data.author}
            </p>
            <p>
              <strong>Categoría:</strong> {postDetailsQuery.data.category}
            </p>
            <p>
              <strong>Estado:</strong> {postDetailsQuery.data.status}
            </p>
            <p>
              <strong>Contenido:</strong> {postDetailsQuery.data.content}
            </p>
            <p>
              <strong>Creado:</strong>{" "}
              {new Date(postDetailsQuery.data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const patternsContent = (
    <div className="patterns-section">
      <h4>🎯 Patrones Avanzados</h4>

      <div className="patterns-grid">
        <div className="pattern-card">
          <h5>🔄 Hooks Compositivos</h5>
          <p>Combinar múltiples hooks para funcionalidades complejas</p>
          <div className="code-example">
            <pre>
              <code>{`// Hook que combina posts y usuarios
const useDashboard = () => {
  const posts = usePosts();
  const users = useUsers();
  const analytics = useAnalytics();
  
  const isLoading = posts.isLoading || users.isLoading || analytics.isLoading;
  
  const dashboardData = useMemo(() => {
    if (!posts.data || !users.data || !analytics.data) return null;
    
    return {
      recentPosts: posts.data.data.slice(0, 5),
      activeUsers: users.data.activeUsers,
      totalViews: analytics.data.totalViews,
      conversionRate: calculateConversion(posts.data, analytics.data),
    };
  }, [posts.data, users.data, analytics.data]);
  
  return { dashboardData, isLoading };
};`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🎛️ Hooks Configurables</h5>
          <p>Hooks con opciones avanzadas y comportamientos personalizables</p>
          <div className="code-example">
            <pre>
              <code>{`const useConfigurableData = (options = {}) => {
  const {
    autoRefresh = false,
    refreshInterval = 30000,
    enabledTabs = ['posts', 'users'],
    cacheTime = 5 * 60 * 1000,
  } = options;
  
  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: PerformanceApiService.getPosts,
    enabled: enabledTabs.includes('posts'),
    refetchInterval: autoRefresh ? refreshInterval : false,
    gcTime: cacheTime,
  });
  
  const users = useQuery({
    queryKey: ['users'],
    queryFn: PerformanceApiService.getUsers,
    enabled: enabledTabs.includes('users'),
    refetchInterval: autoRefresh ? refreshInterval : false,
    gcTime: cacheTime,
  });
  
  return { posts, users };
};

// Uso con configuración personalizada
const { posts, users } = useConfigurableData({
  autoRefresh: true,
  refreshInterval: 60000, // 1 minuto
  enabledTabs: ['posts'],
  cacheTime: 10 * 60 * 1000, // 10 minutos
});`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🏪 Hooks de Estado Global</h5>
          <p>Gestión de estado compartido entre componentes</p>
          <div className="code-example">
            <pre>
              <code>{`// Hook para estado global de filtros
const useGlobalFilters = () => {
  const queryClient = useQueryClient();
  
  const setFilters = useCallback((newFilters) => {
    // Actualizar cache de filtros
    queryClient.setQueryData(['globalFilters'], newFilters);
    
    // Invalidar queries relacionadas
    queryClient.invalidateQueries(['posts']);
    queryClient.invalidateQueries(['search']);
  }, [queryClient]);
  
  const filters = queryClient.getQueryData(['globalFilters']) || {};
  
  return { filters, setFilters };
};

// Hook para preferencias de usuario
const useUserPreferences = () => {
  const queryClient = useQueryClient();
  
  const preferences = useQuery({
    queryKey: ['userPreferences'],
    queryFn: () => {
      const saved = localStorage.getItem('userPrefs');
      return saved ? JSON.parse(saved) : defaultPreferences;
    },
    staleTime: Infinity, // No expirar nunca
  });
  
  const updatePreferences = useMutation({
    mutationFn: (newPrefs) => {
      localStorage.setItem('userPrefs', JSON.stringify(newPrefs));
      return Promise.resolve(newPrefs);
    },
    onSuccess: (newPrefs) => {
      queryClient.setQueryData(['userPreferences'], newPrefs);
    },
  });
  
  return { preferences: preferences.data, updatePreferences };
};`}</code>
            </pre>
          </div>
        </div>

        <div className="pattern-card">
          <h5>🚦 Hooks de Control de Estado</h5>
          <p>Gestión avanzada del ciclo de vida de queries</p>
          <div className="code-example">
            <pre>
              <code>{`const useDataWithStates = (queryKey, queryFn, options = {}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState(null);
  
  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
    retry: (failureCount, error) => {
      setRetryCount(failureCount);
      setLastError(error);
      
      // Lógica de retry personalizada
      if (error.code === 500) return failureCount < 3;
      if (error.code === 401) return false;
      return failureCount < 1;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  
  const refresh = useCallback(() => {
    setRetryCount(0);
    setLastError(null);
    query.refetch();
  }, [query]);
  
  return {
    ...query,
    retryCount,
    lastError,
    refresh,
    hasRetried: retryCount > 0,
  };
};`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="best-practices">
        <h5>🎯 Mejores Prácticas para Hooks Personalizados</h5>
        <div className="practices-list">
          <div className="practice">
            <h6>1. Nombrado Consistente</h6>
            <p>
              Usa el prefijo "use" y nombres descriptivos como{" "}
              <code>usePostsWithFilters</code>
            </p>
          </div>
          <div className="practice">
            <h6>2. Parámetros Tipados</h6>
            <p>
              Define interfaces TypeScript para los parámetros de configuración
            </p>
          </div>
          <div className="practice">
            <h6>3. Valores por Defecto</h6>
            <p>
              Proporciona configuraciones sensatas por defecto para mayor
              usabilidad
            </p>
          </div>
          <div className="practice">
            <h6>4. Memoización</h6>
            <p>
              Usa <code>useMemo</code> y <code>useCallback</code> para optimizar
              re-renders
            </p>
          </div>
          <div className="practice">
            <h6>5. Manejo de Errores</h6>
            <p>Incluye estrategias de error handling y recovery en tus hooks</p>
          </div>
          <div className="practice">
            <h6>6. Documentación</h6>
            <p>
              Documenta el propósito, parámetros y valor de retorno de cada hook
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="custom-hooks-demo">
      <h2>🪝 Hooks Personalizados con React Query</h2>
      <p className="intro-text">
        Descubre cómo crear hooks personalizados poderosos que encapsulan lógica
        compleja, mejoran la reutilización de código y proporcionan APIs limpias
        para tus componentes.
      </p>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={selectedTab === "hooks" ? "active" : ""}
            onClick={() => setSelectedTab("hooks")}
          >
            🪝 Hooks Básicos
          </button>
          <button
            className={selectedTab === "examples" ? "active" : ""}
            onClick={() => setSelectedTab("examples")}
          >
            🎮 Ejemplos Interactivos
          </button>
          <button
            className={selectedTab === "patterns" ? "active" : ""}
            onClick={() => setSelectedTab("patterns")}
          >
            🎯 Patrones Avanzados
          </button>
        </div>

        <div className="tab-content">
          {selectedTab === "hooks" && hooksContent}
          {selectedTab === "examples" && examplesContent}
          {selectedTab === "patterns" && patternsContent}
        </div>
      </div>
    </div>
  );
};

export default CustomHooksDemo;
