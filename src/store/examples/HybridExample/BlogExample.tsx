/**
 * 🤝 EJEMPLO DE INTEGRACIÓN ARMÓNICA
 * 
 * Este componente demuestra cómo usar Context API, Zustand y Redux Toolkit
 * juntos en la misma aplicación de forma eficiente.
 * 
 * 📚 ARQUITECTURA:
 * - Context API: Autenticación (UserContext)
 * - Zustand: UI State (modales, notificaciones)
 * - Redux: Datos de posts (lógica de negocio)
 */

import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';

// ============================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================

export const BlogExample: React.FC = () => {
  // 1️⃣ Context API - Autenticación
  const { user, isTeacher, login, logout } = useUser();

  // 2️⃣ Estado local para UI simple (sin necesidad de Zustand para este ejemplo)
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // 3️⃣ Simulación de datos de posts (normalmente vendría de Redux)
  const [posts] = useState([
    { id: 1, title: 'Introducción a React', author: 'Ana García', likes: 42 },
    { id: 2, title: 'Gestión de Estados', author: 'Carlos Mendez', likes: 38 },
    { id: 3, title: 'Redux vs Zustand', author: 'Ana García', likes: 55 },
  ]);

  // ============================================
  // 🎬 HANDLERS
  // ============================================

  const handleLogin = () => {
    // Context API: Login de usuario
    login({
      id: 1,
      name: 'Ana García',
      email: 'ana@estudiante.com',
      role: 'student',
      preferences: { theme: 'light', language: 'es' },
    });
    
    // Zustand (simulado): Mostrar notificación
    setNotification('¡Bienvenida Ana! 👋');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    // Context API: Logout
    logout();
    
    // Zustand (simulado): Mostrar notificación
    setNotification('Sesión cerrada correctamente');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreatePost = () => {
    if (!user) {
      setNotification('⚠️ Debes iniciar sesión para crear un post');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Zustand (simulado): Abrir modal
    setShowModal(true);
  };

  const handleSavePost = () => {
    // Redux (simulado): Guardar post
    console.log('📝 Guardando post en Redux...');
    
    // Zustand (simulado): Cerrar modal y mostrar notificación
    setShowModal(false);
    setNotification('✅ Post creado correctamente');
    setTimeout(() => setNotification(null), 3000);
  };

  // ============================================
  // 🎨 RENDER
  // ============================================

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🤝 Integración Armónica</h1>
        <p style={styles.subtitle}>
          Context API + Zustand + Redux Toolkit trabajando juntos
        </p>
      </div>

      {/* Notificación (Zustand) */}
      {notification && (
        <div style={styles.notification}>
          {notification}
        </div>
      )}

      {/* Panel de Usuario (Context API) */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          📋 Context API - Autenticación
        </h2>
        <div style={styles.card}>
          {user ? (
            <div style={styles.userInfo}>
              <div>
                <p style={styles.userName}>👤 {user.name}</p>
                <p style={styles.userEmail}>{user.email}</p>
                <p style={styles.userRole}>
                  Rol: <strong>{user.role}</strong>
                  {isTeacher && ' 🎓'}
                </p>
              </div>
              <button onClick={handleLogout} style={styles.buttonSecondary}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div style={styles.loginPrompt}>
              <p>No has iniciado sesión</p>
              <button onClick={handleLogin} style={styles.buttonPrimary}>
                Iniciar Sesión como Estudiante
              </button>
            </div>
          )}
        </div>
        <div style={styles.explanation}>
          <p>
            ✅ <strong>Por qué Context API:</strong> Los datos de usuario cambian
            raramente (solo en login/logout) y se necesitan en muchos componentes.
          </p>
        </div>
      </div>

      {/* UI State (Zustand) */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🐻 Zustand - Estado de UI
        </h2>
        <div style={styles.card}>
          <div style={styles.uiControls}>
            <button
              onClick={handleCreatePost}
              style={styles.buttonPrimary}
            >
              ➕ Crear Nuevo Post
            </button>
            <p style={styles.hint}>
              {showModal ? '✅ Modal abierto' : '❌ Modal cerrado'}
            </p>
          </div>
        </div>
        <div style={styles.explanation}>
          <p>
            ✅ <strong>Por qué Zustand:</strong> El estado de UI (modales,
            notificaciones) cambia frecuentemente y necesita excelente rendimiento.
          </p>
        </div>
      </div>

      {/* Posts (Redux) */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          ⚛️ Redux Toolkit - Datos de Negocio
        </h2>
        <div style={styles.card}>
          <div style={styles.postsList}>
            {posts.map((post) => (
              <div key={post.id} style={styles.postItem}>
                <div style={styles.postContent}>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <p style={styles.postAuthor}>Por {post.author}</p>
                </div>
                <div style={styles.postLikes}>
                  ❤️ {post.likes}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.explanation}>
          <p>
            ✅ <strong>Por qué Redux:</strong> Los posts son lógica de negocio
            compleja con CRUD, necesitan debugging avanzado y RTK Query para cache.
          </p>
        </div>
      </div>

      {/* Modal (Zustand) */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Crear Nuevo Post</h2>
            <input
              type="text"
              placeholder="Título del post"
              style={styles.input}
            />
            <textarea
              placeholder="Contenido del post"
              style={styles.textarea}
              rows={4}
            />
            <div style={styles.modalActions}>
              <button
                onClick={handleSavePost}
                style={styles.buttonPrimary}
              >
                Guardar
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={styles.buttonSecondary}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resumen de Arquitectura */}
      <div style={styles.summary}>
        <h2 style={styles.summaryTitle}>📊 Resumen de Arquitectura</h2>
        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryCardTitle}>📋 Context API</h3>
            <ul style={styles.summaryList}>
              <li>✅ Autenticación</li>
              <li>✅ Tema (dark/light)</li>
              <li>✅ Idioma (i18n)</li>
              <li>✅ Preferencias</li>
            </ul>
            <p style={styles.summaryNote}>
              Cambia raramente, se usa en muchos lugares
            </p>
          </div>

          <div style={styles.summaryCard}>
            <h3 style={styles.summaryCardTitle}>🐻 Zustand</h3>
            <ul style={styles.summaryList}>
              <li>✅ Modales</li>
              <li>✅ Notificaciones</li>
              <li>✅ Sidebar</li>
              <li>✅ Filtros/Búsqueda</li>
            </ul>
            <p style={styles.summaryNote}>
              Cambia frecuentemente, necesita rendimiento
            </p>
          </div>

          <div style={styles.summaryCard}>
            <h3 style={styles.summaryCardTitle}>⚛️ Redux Toolkit</h3>
            <ul style={styles.summaryList}>
              <li>✅ Posts (CRUD)</li>
              <li>✅ Comments</li>
              <li>✅ RTK Query</li>
              <li>✅ Estados complejos</li>
            </ul>
            <p style={styles.summaryNote}>
              Lógica de negocio, debugging avanzado
            </p>
          </div>
        </div>
      </div>

      {/* Flujo de Datos */}
      <div style={styles.flow}>
        <h2 style={styles.flowTitle}>🔄 Flujo de Datos</h2>
        <div style={styles.flowDiagram}>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>1</div>
            <p>Usuario hace click en "Crear Post"</p>
          </div>
          <div style={styles.flowArrow}>↓</div>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>2</div>
            <p>Context API verifica si está logueado</p>
          </div>
          <div style={styles.flowArrow}>↓</div>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>3</div>
            <p>Zustand abre el modal</p>
          </div>
          <div style={styles.flowArrow}>↓</div>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>4</div>
            <p>Usuario completa el formulario</p>
          </div>
          <div style={styles.flowArrow}>↓</div>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>5</div>
            <p>Redux guarda el post</p>
          </div>
          <div style={styles.flowArrow}>↓</div>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>6</div>
            <p>Zustand cierra modal y muestra notificación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 🎨 ESTILOS
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '15px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '10px',
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#333',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 5px 0',
  },
  userRole: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  loginPrompt: {
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#61dafb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonSecondary: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  explanation: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '6px',
    borderLeft: '4px solid #61dafb',
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#333',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  uiControls: {
    textAlign: 'center',
  },
  hint: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  postItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #e9ecef',
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#333',
  },
  postAuthor: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  postLikes: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e91e63',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontSize: '24px',
    margin: '0 0 20px 0',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  summary: {
    marginTop: '60px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  summaryTitle: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  summaryCardTitle: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#333',
  },
  summaryList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 15px 0',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '1.8',
  },
  summaryNote: {
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic',
    margin: 0,
  },
  flow: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  flowTitle: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  flowDiagram: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  flowStep: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
    color: '#333',
  },
  flowNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#61dafb',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  flowArrow: {
    fontSize: '24px',
    color: '#61dafb',
  },
};
