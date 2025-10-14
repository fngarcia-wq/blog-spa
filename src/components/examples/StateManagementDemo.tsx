/**
 * 🎯 COMPONENTE DE DEMOSTRACIÓN
 * 
 * Este componente muestra los tres ejemplos de gestión de estados
 * lado a lado para comparación directa.
 */

import React, { useState } from 'react';
import { TodoContextExample } from '../../store/examples/TodoContext';
import { TodoZustandExample } from '../../store/examples/TodoZustand';
import { TodoReduxExample } from '../../store/examples/TodoRedux';
import { BlogExample } from '../../store/examples/HybridExample';

type DemoView = 'comparison' | 'context' | 'zustand' | 'redux' | 'hybrid';

export const StateManagementDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<DemoView>('comparison');

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎓 Gestión de Estados en React</h1>
        <p style={styles.subtitle}>
          Comparativa práctica: Context API vs Zustand vs Redux Toolkit
        </p>
      </div>

      {/* Navigation */}
      <div style={styles.nav}>
        <button
          onClick={() => setActiveView('comparison')}
          style={{
            ...styles.navButton,
            ...(activeView === 'comparison' ? styles.navButtonActive : {}),
          }}
        >
          📊 Comparación
        </button>
        <button
          onClick={() => setActiveView('context')}
          style={{
            ...styles.navButton,
            ...(activeView === 'context' ? styles.navButtonActive : {}),
          }}
        >
          📋 Context API
        </button>
        <button
          onClick={() => setActiveView('zustand')}
          style={{
            ...styles.navButton,
            ...(activeView === 'zustand' ? styles.navButtonActive : {}),
          }}
        >
          🐻 Zustand
        </button>
        <button
          onClick={() => setActiveView('redux')}
          style={{
            ...styles.navButton,
            ...(activeView === 'redux' ? styles.navButtonActive : {}),
          }}
        >
          ⚛️ Redux Toolkit
        </button>
        <button
          onClick={() => setActiveView('hybrid')}
          style={{
            ...styles.navButton,
            ...(activeView === 'hybrid' ? styles.navButtonActive : {}),
          }}
        >
          🤝 Integración
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeView === 'comparison' && <ComparisonView />}
        {activeView === 'context' && <TodoContextExample />}
        {activeView === 'zustand' && <TodoZustandExample />}
        {activeView === 'redux' && <TodoReduxExample />}
        {activeView === 'hybrid' && <BlogExample />}
      </div>
    </div>
  );
};

// ============================================
// 📊 VISTA DE COMPARACIÓN
// ============================================

const ComparisonView: React.FC = () => {
  return (
    <div style={styles.comparison}>
      <h2 style={styles.comparisonTitle}>
        📊 Tabla Comparativa de Soluciones
      </h2>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <div style={styles.tableCell}>Característica</div>
          <div style={styles.tableCell}>Context API</div>
          <div style={styles.tableCell}>Zustand</div>
          <div style={styles.tableCell}>Redux Toolkit</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>Complejidad</strong></div>
          <div style={styles.tableCell}>🟡 Baja</div>
          <div style={styles.tableCell}>🟢 Muy Baja</div>
          <div style={styles.tableCell}>🟠 Media</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>Boilerplate</strong></div>
          <div style={styles.tableCell}>🟡 Medio</div>
          <div style={styles.tableCell}>🟢 Mínimo</div>
          <div style={styles.tableCell}>🟡 Bajo</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>Rendimiento</strong></div>
          <div style={styles.tableCell}>🟡 Medio*</div>
          <div style={styles.tableCell}>🟢 Alto</div>
          <div style={styles.tableCell}>🟢 Alto</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>DevTools</strong></div>
          <div style={styles.tableCell}>❌ No</div>
          <div style={styles.tableCell}>✅ Sí</div>
          <div style={styles.tableCell}>✅ Sí</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>Curva de aprendizaje</strong></div>
          <div style={styles.tableCell}>🟢 Baja</div>
          <div style={styles.tableCell}>🟢 Muy Baja</div>
          <div style={styles.tableCell}>🟡 Media</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>Bundle Size</strong></div>
          <div style={styles.tableCell}>🟢 0 KB</div>
          <div style={styles.tableCell}>🟢 ~1 KB</div>
          <div style={styles.tableCell}>🟡 ~10 KB</div>
        </div>

        <div style={styles.tableRow}>
          <div style={styles.tableCell}><strong>TypeScript</strong></div>
          <div style={styles.tableCell}>🟡 Bueno</div>
          <div style={styles.tableCell}>🟢 Excelente</div>
          <div style={styles.tableCell}>🟢 Excelente</div>
        </div>
      </div>

      {/* Casos de Uso */}
      <div style={styles.useCases}>
        <h3 style={styles.useCasesTitle}>🎯 Casos de Uso Ideales</h3>

        <div style={styles.useCaseGrid}>
          <div style={styles.useCaseCard}>
            <h4 style={styles.useCaseCardTitle}>📋 Context API</h4>
            <ul style={styles.useCaseList}>
              <li>✅ Autenticación y datos de usuario</li>
              <li>✅ Tema (dark/light mode)</li>
              <li>✅ Preferencias de idioma</li>
              <li>✅ Estados que cambian poco</li>
              <li>✅ Aplicaciones pequeñas/medianas</li>
            </ul>
            <div style={styles.useCaseExample}>
              <strong>Ejemplo:</strong> Sistema de login con tema configurable
            </div>
          </div>

          <div style={styles.useCaseCard}>
            <h4 style={styles.useCaseCardTitle}>🐻 Zustand</h4>
            <ul style={styles.useCaseList}>
              <li>✅ UI State (modales, sidebar)</li>
              <li>✅ Filtros y búsquedas</li>
              <li>✅ Estados temporales</li>
              <li>✅ Estados que cambian mucho</li>
              <li>✅ Apps medianas/grandes</li>
            </ul>
            <div style={styles.useCaseExample}>
              <strong>Ejemplo:</strong> Dashboard con múltiples filtros y modales
            </div>
          </div>

          <div style={styles.useCaseCard}>
            <h4 style={styles.useCaseCardTitle}>⚛️ Redux Toolkit</h4>
            <ul style={styles.useCaseList}>
              <li>✅ Datos de negocio (CRUD)</li>
              <li>✅ Cache de API (RTK Query)</li>
              <li>✅ Estados muy complejos</li>
              <li>✅ Equipos grandes</li>
              <li>✅ Apps empresariales</li>
            </ul>
            <div style={styles.useCaseExample}>
              <strong>Ejemplo:</strong> E-commerce con carrito, productos y pedidos
            </div>
          </div>
        </div>
      </div>

      {/* Recomendación de Integración */}
      <div style={styles.recommendation}>
        <h3 style={styles.recommendationTitle}>💡 Recomendación</h3>
        <p style={styles.recommendationText}>
          No tienes que elegir solo una. La mejor arquitectura combina las tres:
        </p>
        <div style={styles.recommendationGrid}>
          <div style={styles.recommendationItem}>
            <div style={styles.recommendationIcon}>📋</div>
            <div>
              <strong>Context API</strong>
              <p>Para configuración global</p>
            </div>
          </div>
          <div style={styles.recommendationPlus}>+</div>
          <div style={styles.recommendationItem}>
            <div style={styles.recommendationIcon}>🐻</div>
            <div>
              <strong>Zustand</strong>
              <p>Para UI state</p>
            </div>
          </div>
          <div style={styles.recommendationPlus}>+</div>
          <div style={styles.recommendationItem}>
            <div style={styles.recommendationIcon}>⚛️</div>
            <div>
              <strong>Redux</strong>
              <p>Para lógica de negocio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instrucciones */}
      <div style={styles.instructions}>
        <h3 style={styles.instructionsTitle}>🚀 Cómo usar esta demo</h3>
        <ol style={styles.instructionsList}>
          <li>
            <strong>Context API:</strong> Funciona sin instalación adicional.
            Haz click en la pestaña para ver el ejemplo.
          </li>
          <li>
            <strong>Zustand:</strong> Requiere instalación. Ejecuta:
            <code style={styles.code}>npm install zustand</code>
          </li>
          <li>
            <strong>Redux Toolkit:</strong> Requiere instalación. Ejecuta:
            <code style={styles.code}>npm install @reduxjs/toolkit react-redux</code>
          </li>
          <li>
            <strong>Integración:</strong> Muestra cómo usar las tres juntas en armonía.
          </li>
        </ol>
      </div>

      {/* Recursos */}
      <div style={styles.resources}>
        <h3 style={styles.resourcesTitle}>📚 Recursos Adicionales</h3>
        <div style={styles.resourcesList}>
          <a href="https://react.dev/reference/react/createContext" style={styles.resourceLink}>
            📖 Context API - Documentación Oficial
          </a>
          <a href="https://docs.pmnd.rs/zustand" style={styles.resourceLink}>
            📖 Zustand - Documentación Oficial
          </a>
          <a href="https://redux-toolkit.js.org/" style={styles.resourceLink}>
            📖 Redux Toolkit - Documentación Oficial
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================
//  ESTILOS
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #dee2e6',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 10px 0',
    color: '#333',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    margin: 0,
  },
  nav: {
    backgroundColor: '#fff',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    borderBottom: '1px solid #dee2e6',
  },
  navButton: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 'bold',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#333',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  navButtonActive: {
    backgroundColor: '#61dafb',
    color: '#fff',
    borderColor: '#61dafb',
  },
  content: {
    padding: '40px 20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  comparison: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  comparisonTitle: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  table: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '1px',
    backgroundColor: '#dee2e6',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '40px',
  },
  tableHeader: {
    display: 'contents',
  },
  tableRow: {
    display: 'contents',
  },
  tableCell: {
    backgroundColor: '#fff',
    padding: '15px',
    fontSize: '14px',
    color: '#333',
  },
  useCases: {
    marginTop: '40px',
  },
  useCasesTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  useCaseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  useCaseCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dee2e6',
  },
  useCaseCardTitle: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#333',
  },
  useCaseList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 15px 0',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.8',
  },
  useCaseExample: {
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  recommendation: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#e7f5ff',
    borderRadius: '8px',
    border: '2px solid #61dafb',
  },
  recommendationTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  recommendationText: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#666',
  },
  recommendationGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  recommendationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  recommendationIcon: {
    fontSize: '32px',
  },
  recommendationPlus: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#61dafb',
  },
  instructions: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#fff3cd',
    borderRadius: '8px',
    border: '2px solid #ffc107',
  },
  instructionsTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  instructionsList: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#666',
    paddingLeft: '20px',
  },
  code: {
    display: 'inline-block',
    margin: '5px 0',
    padding: '4px 8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '13px',
    border: '1px solid #dee2e6',
  },
  resources: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  resourcesTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  resourcesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  resourceLink: {
    fontSize: '14px',
    color: '#61dafb',
    textDecoration: 'none',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #dee2e6',
    transition: 'all 0.2s',
  },
};
