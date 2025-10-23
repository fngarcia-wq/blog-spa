import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PerformanceApiService,
  type Post,
  type User,
} from "../../services/performanceApi";
import "./UseQueryDemo.css";

const UseQueryDemo: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState({
    category: "",
    status: "",
  });

  const queryClient = useQueryClient();

  // Query básico para posts
  const postsQuery = useQuery({
    queryKey: ["posts", searchParams],
    queryFn: () =>
      PerformanceApiService.getPosts({
        page: 1,
        limit: 6,
        category: searchParams.category,
        status: searchParams.status,
      }),
    staleTime: 1000 * 60, // 1 minuto
  });

  // Query individual para post seleccionado
  const postQuery = useQuery({
    queryKey: ["post", selectedPostId],
    queryFn: () => PerformanceApiService.getPost(selectedPostId!),
    enabled: !!selectedPostId, // Solo ejecutar si hay ID seleccionado
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Query para usuarios
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => PerformanceApiService.getUsers({ limit: 5 }),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });

  // Query individual para usuario seleccionado
  const userQuery = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => PerformanceApiService.getUser(selectedUserId!),
    enabled: !!selectedUserId,
    staleTime: 1000 * 60 * 5,
  });

  // Query con refetch manual para analytics
  const analyticsQuery = useQuery({
    queryKey: ["analytics"],
    queryFn: () => PerformanceApiService.getAnalytics(),
    staleTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });

  const handleInvalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handlePrefetchPost = async (postId: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["post", postId],
      queryFn: () => PerformanceApiService.getPost(postId),
      staleTime: 1000 * 60 * 5,
    });
  };

  return (
    <div className="use-query-demo">
      <div className="demo-header">
        <h2>📡 useQuery Demo</h2>
        <p>
          Fetching de datos con cache automático y gestión inteligente de
          estados
        </p>
      </div>

      {/* Conceptos Clave */}
      <section className="concepts-section">
        <h3>🎯 Conceptos Clave de useQuery</h3>
        <div className="concepts-grid">
          <div className="concept-card">
            <div className="concept-icon">🔑</div>
            <h4>Query Key</h4>
            <p>Identificador único para el cache. Incluye dependencias.</p>
            <code>['posts', filters]</code>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h4>Stale Time</h4>
            <p>Tiempo que los datos se consideran "frescos"</p>
            <code>staleTime: 5 * 60 * 1000</code>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🗑️</div>
            <h4>Garbage Collection</h4>
            <p>Tiempo antes de eliminar datos del cache</p>
            <code>gcTime: 10 * 60 * 1000</code>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔄</div>
            <h4>Background Refetch</h4>
            <p>Actualización automática en segundo plano</p>
            <code>refetchOnWindowFocus: true</code>
          </div>
        </div>
      </section>

      {/* Query States Demo */}
      <section className="query-states">
        <h3>📊 Estados de Query en Tiempo Real</h3>
        <div className="states-grid">
          <div className="state-card">
            <h4>📋 Posts Query</h4>
            <div className="state-indicators">
              <span
                className={`indicator ${postsQuery.isPending ? "active" : ""}`}
              >
                🔄 Loading: {postsQuery.isPending ? "true" : "false"}
              </span>
              <span
                className={`indicator ${postsQuery.isError ? "error" : ""}`}
              >
                ❌ Error: {postsQuery.isError ? "true" : "false"}
              </span>
              <span
                className={`indicator ${postsQuery.isSuccess ? "success" : ""}`}
              >
                ✅ Success: {postsQuery.isSuccess ? "true" : "false"}
              </span>
              <span
                className={`indicator ${
                  postsQuery.isFetching ? "fetching" : ""
                }`}
              >
                📡 Fetching: {postsQuery.isFetching ? "true" : "false"}
              </span>
              <span
                className={`indicator ${
                  postsQuery.isStale ? "stale" : "fresh"
                }`}
              >
                ⏰ Status: {postsQuery.isStale ? "stale" : "fresh"}
              </span>
            </div>
            {postsQuery.error && (
              <div className="error-message">
                Error: {postsQuery.error.message}
              </div>
            )}
          </div>

          <div className="state-card">
            <h4>👥 Users Query</h4>
            <div className="state-indicators">
              <span
                className={`indicator ${usersQuery.isPending ? "active" : ""}`}
              >
                🔄 Loading: {usersQuery.isPending ? "true" : "false"}
              </span>
              <span
                className={`indicator ${usersQuery.isError ? "error" : ""}`}
              >
                ❌ Error: {usersQuery.isError ? "true" : "false"}
              </span>
              <span
                className={`indicator ${usersQuery.isSuccess ? "success" : ""}`}
              >
                ✅ Success: {usersQuery.isSuccess ? "true" : "false"}
              </span>
              <span
                className={`indicator ${
                  usersQuery.isFetching ? "fetching" : ""
                }`}
              >
                📡 Fetching: {usersQuery.isFetching ? "true" : "false"}
              </span>
              <span
                className={`indicator ${
                  usersQuery.isStale ? "stale" : "fresh"
                }`}
              >
                ⏰ Status: {usersQuery.isStale ? "stale" : "fresh"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="interactive-demo">
        <h3>🎮 Demo Interactivo</h3>

        {/* Filtros para demostrar re-fetching */}
        <div className="filters-section">
          <h4>🔍 Filtros (triggers new query)</h4>
          <div className="filters">
            <select
              value={searchParams.category}
              onChange={(e) =>
                setSearchParams((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Todas las categorías</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Diseño">Diseño</option>
              <option value="Negocios">Negocios</option>
              <option value="Marketing">Marketing</option>
              <option value="Desarrollo">Desarrollo</option>
            </select>

            <select
              value={searchParams.status}
              onChange={(e) =>
                setSearchParams((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="">Todos los estados</option>
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-section">
          <h4>📋 Posts (click para ver detalles)</h4>
          {postsQuery.isPending && (
            <div className="loading">Cargando posts...</div>
          )}

          {postsQuery.isError && (
            <div className="error">
              Error al cargar posts: {postsQuery.error.message}
              <button onClick={() => postsQuery.refetch()}>Reintentar</button>
            </div>
          )}

          {postsQuery.isSuccess && (
            <div className="posts-grid">
              {postsQuery.data.data.map((post: Post) => (
                <button
                  key={post.id}
                  className={`post-card ${
                    selectedPostId === post.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedPostId(post.id)}
                  onMouseEnter={() => handlePrefetchPost(post.id)}
                >
                  <h5>{post.title}</h5>
                  <p>Por {post.author}</p>
                  <div className="post-meta">
                    <span className={`status ${post.status}`}>
                      {post.status}
                    </span>
                    <span className="category">{post.category}</span>
                  </div>
                  <div className="post-stats">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Post Details */}
        {selectedPostId && (
          <div className="post-details">
            <h4>📖 Detalles del Post</h4>
            {postQuery.isPending && (
              <div className="loading">Cargando detalles...</div>
            )}
            {postQuery.isError && (
              <div className="error">
                Error al cargar detalles: {postQuery.error.message}
              </div>
            )}
            {postQuery.isSuccess && (
              <div className="post-detail-card">
                <h5>{postQuery.data.title}</h5>
                <p className="post-content">{postQuery.data.content}</p>
                <div className="post-info">
                  <span>👤 {postQuery.data.author}</span>
                  <span>
                    📅 {new Date(postQuery.data.createdAt).toLocaleDateString()}
                  </span>
                  <span>❤️ {postQuery.data.likes} likes</span>
                  <span>💬 {postQuery.data.comments} comentarios</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Users Section */}
        <div className="users-section">
          <h4>👥 Usuarios (independiente del filtro de posts)</h4>
          {usersQuery.isPending && (
            <div className="loading">Cargando usuarios...</div>
          )}

          {usersQuery.isSuccess && (
            <div className="users-grid">
              {usersQuery.data.data.map((user: User) => (
                <div
                  key={user.id}
                  className={`user-card ${
                    selectedUserId === user.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <img src={user.avatar} alt={user.name} />
                  <div className="user-info">
                    <h6>{user.name}</h6>
                    <p>{user.email}</p>
                    <span className={`role ${user.role}`}>{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Details */}
        {selectedUserId && (
          <div className="user-details">
            <h4>👤 Detalles del Usuario</h4>
            {userQuery.isPending && (
              <div className="loading">Cargando detalles...</div>
            )}
            {userQuery.isSuccess && (
              <div className="user-detail-card">
                <img src={userQuery.data.avatar} alt={userQuery.data.name} />
                <div className="user-detail-info">
                  <h5>{userQuery.data.name}</h5>
                  <p>{userQuery.data.email}</p>
                  <div className="user-meta">
                    <span className={`role ${userQuery.data.role}`}>
                      {userQuery.data.role}
                    </span>
                    <span
                      className={`status ${
                        userQuery.data.isActive ? "active" : "inactive"
                      }`}
                    >
                      {userQuery.data.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="last-login">
                    Último login:{" "}
                    {new Date(userQuery.data.lastLogin).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Cache Management */}
      <section className="cache-management">
        <h3>🗂️ Gestión de Cache</h3>
        <div className="cache-controls">
          <button onClick={handleInvalidateQueries} className="invalidate-btn">
            🔄 Invalidar Cache (refetch all)
          </button>
          <button
            onClick={() => analyticsQuery.refetch()}
            className="refetch-btn"
          >
            📊 Refetch Analytics
          </button>
          <button onClick={() => queryClient.clear()} className="clear-btn">
            🗑️ Clear All Cache
          </button>
        </div>

        {/* Analytics */}
        <div className="analytics-section">
          <h4>📊 Analytics (cached 10 min)</h4>
          {analyticsQuery.isPending && (
            <div className="loading">Cargando analytics...</div>
          )}
          {analyticsQuery.isSuccess && (
            <div className="analytics-grid">
              <div className="analytics-card">
                <h5>📝 Total Posts</h5>
                <span className="stat">{analyticsQuery.data.totalPosts}</span>
              </div>
              <div className="analytics-card">
                <h5>👥 Total Users</h5>
                <span className="stat">{analyticsQuery.data.totalUsers}</span>
              </div>
              <div className="analytics-card">
                <h5>🏷️ Top Category</h5>
                <span className="stat">
                  {analyticsQuery.data.popularCategories[0]?.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Code Examples */}
      <section className="code-examples">
        <h3>💻 Ejemplos de Código</h3>

        <div className="code-tabs">
          <div className="code-tab">
            <h4>🔑 Query Key Dependencies</h4>
            <pre>
              <code>{`// ✅ Query key incluye dependencias
const postsQuery = useQuery({
  queryKey: ['posts', filters], // Se re-ejecuta cuando filters cambia
  queryFn: () => fetchPosts(filters),
  staleTime: 1000 * 60, // Datos frescos por 1 minuto
});

// ✅ Query condicional
const postQuery = useQuery({
  queryKey: ['post', postId],
  queryFn: () => fetchPost(postId),
  enabled: !!postId, // Solo ejecutar si hay postId
});

// ❌ Mal: dependencias no están en query key
const badQuery = useQuery({
  queryKey: ['posts'], // Falta filtros
  queryFn: () => fetchPosts(filters), // filters no está en key
});`}</code>
            </pre>
          </div>

          <div className="code-tab">
            <h4>⚡ Optimizaciones</h4>
            <pre>
              <code>{`// ✅ Prefetching on hover
const handleMouseEnter = async (postId) => {
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    staleTime: 1000 * 60 * 5,
  });
};

// ✅ Configuración de cache por query
const expensiveQuery = useQuery({
  queryKey: ['expensive-data'],
  queryFn: fetchExpensiveData,
  staleTime: 1000 * 60 * 10, // 10 minutos fresh
  gcTime: 1000 * 60 * 30, // 30 minutos en cache
  refetchOnWindowFocus: false, // No refetch automático
});

// ✅ Error handling
const robustQuery = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  retry: 3, // Reintentar 3 veces
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});`}</code>
            </pre>
          </div>

          <div className="code-tab">
            <h4>🎯 Patrones Avanzados</h4>
            <pre>
              <code>{`// ✅ Parallel queries
function UserProfile({ userId }) {
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const postsQuery = useQuery({
    queryKey: ['user-posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId,
  });

  if (userQuery.isPending || postsQuery.isPending) {
    return <Loading />;
  }

  return (
    <div>
      <UserInfo user={userQuery.data} />
      <UserPosts posts={postsQuery.data} />
    </div>
  );
}

// ✅ Dependent queries
function PostWithComments({ postId }) {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postQuery.data, // Solo ejecutar si post existe
  });

  return (
    <div>
      {postQuery.data && <Post data={postQuery.data} />}
      {commentsQuery.data && <Comments data={commentsQuery.data} />}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseQueryDemo;
