import React, { useState } from 'react';
import './SecurityChecklist.css';

interface SecurityThreat {
  id: string;
  name: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  description: string;
  impact: string;
}

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'Alta' | 'Media' | 'Baja';
  implemented: boolean;
}

interface SecurityChecklistProps {
  threats: SecurityThreat[];
}

const SecurityChecklist: React.FC<SecurityChecklistProps> = ({ threats }) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Autenticación y Autorización
    {
      id: 'auth-1',
      category: 'Autenticación',
      title: 'Implementar autenticación multifactor (MFA)',
      description: 'Agregar segunda capa de verificación para cuentas importantes',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'auth-2',
      category: 'Autenticación',
      title: 'Usar tokens JWT con expiración corta',
      description: 'Access tokens de 15-30 minutos máximo',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'auth-3',
      category: 'Autenticación',
      title: 'Implementar refresh token rotation',
      description: 'Rotar refresh tokens en cada uso',
      priority: 'Media',
      implemented: false
    },
    
    // Almacenamiento Seguro
    {
      id: 'storage-1',
      category: 'Almacenamiento',
      title: 'Usar HttpOnly cookies para tokens sensibles',
      description: 'Refresh tokens en cookies HttpOnly, Secure, SameSite',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'storage-2',
      category: 'Almacenamiento',
      title: 'Evitar localStorage para datos sensibles',
      description: 'No almacenar tokens de acceso en localStorage',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'storage-3',
      category: 'Almacenamiento',
      title: 'Encriptar datos sensibles en el cliente',
      description: 'Usar bibliotecas como crypto-js para datos críticos',
      priority: 'Media',
      implemented: false
    },
    
    // Protección XSS
    {
      id: 'xss-1',
      category: 'XSS Protection',
      title: 'Implementar Content Security Policy (CSP)',
      description: 'Headers CSP restrictivos para prevenir XSS',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'xss-2',
      category: 'XSS Protection',
      title: 'Sanitizar entrada de usuario',
      description: 'Usar DOMPurify para contenido HTML del usuario',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'xss-3',
      category: 'XSS Protection',
      title: 'Validar URLs antes de redirecciones',
      description: 'Whitelist de dominios permitidos para redirecciones',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'xss-4',
      category: 'XSS Protection',
      title: 'Evitar dangerouslySetInnerHTML sin sanitizar',
      description: 'Siempre sanitizar contenido HTML antes de renderizar',
      priority: 'Alta',
      implemented: false
    },
    
    // Configuración CORS
    {
      id: 'cors-1',
      category: 'CORS',
      title: 'Configurar orígenes específicos en producción',
      description: 'Nunca usar origin: "*" en producción',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'cors-2',
      category: 'CORS',
      title: 'Limitar métodos HTTP permitidos',
      description: 'Solo habilitar métodos necesarios (GET, POST, etc.)',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'cors-3',
      category: 'CORS',
      title: 'Configurar headers permitidos',
      description: 'Whitelist específica de headers en requests',
      priority: 'Media',
      implemented: false
    },
    
    // Headers de Seguridad
    {
      id: 'headers-1',
      category: 'Security Headers',
      title: 'Configurar X-Frame-Options',
      description: 'Prevenir clickjacking con DENY o SAMEORIGIN',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'headers-2',
      category: 'Security Headers',
      title: 'Implementar HSTS (HTTP Strict Transport Security)',
      description: 'Forzar conexiones HTTPS',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'headers-3',
      category: 'Security Headers',
      title: 'Configurar X-Content-Type-Options',
      description: 'Prevenir MIME type sniffing',
      priority: 'Baja',
      implemented: false
    },
    
    // Validación y Sanitización
    {
      id: 'validation-1',
      category: 'Validación',
      title: 'Validar entrada en frontend Y backend',
      description: 'Doble validación - nunca confiar solo en cliente',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'validation-2',
      category: 'Validación',
      title: 'Implementar rate limiting',
      description: 'Limitar requests por IP/usuario para prevenir ataques',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'validation-3',
      category: 'Validación',
      title: 'Validar tipos de archivo en uploads',
      description: 'Verificar extension y contenido real de archivos',
      priority: 'Alta',
      implemented: false
    },
    
    // OAuth y APIs Externas
    {
      id: 'oauth-1',
      category: 'OAuth',
      title: 'Implementar state parameter en OAuth',
      description: 'Prevenir CSRF attacks en flujo OAuth',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'oauth-2',
      category: 'OAuth',
      title: 'Mantener client secrets seguros',
      description: 'Solo en backend, nunca en código frontend',
      priority: 'Alta',
      implemented: false
    },
    {
      id: 'oauth-3',
      category: 'OAuth',
      title: 'Usar PKCE para OAuth public clients',
      description: 'Proof Key for Code Exchange en apps móviles/SPA',
      priority: 'Media',
      implemented: false
    },
    
    // Monitoreo y Logging
    {
      id: 'monitoring-1',
      category: 'Monitoreo',
      title: 'Implementar logging de eventos de seguridad',
      description: 'Log intentos de login, errores de autenticación, etc.',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'monitoring-2',
      category: 'Monitoreo',
      title: 'Configurar alertas de seguridad',
      description: 'Notificaciones para actividades sospechosas',
      priority: 'Media',
      implemented: false
    },
    {
      id: 'monitoring-3',
      category: 'Monitoreo',
      title: 'Realizar auditorías de seguridad regulares',
      description: 'Revisiones periódicas de vulnerabilidades',
      priority: 'Baja',
      implemented: false
    }
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const categories = [...new Set(checklistItems.map(item => item.category))];
  
  const toggleItemImplementation = (itemId: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, implemented: !item.implemented } : item
      )
    );
  };

  const getFilteredItems = () => {
    return checklistItems.filter(item => {
      const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
      const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
      const statusMatch = filterStatus === 'all' || 
        (filterStatus === 'completed' && item.implemented) ||
        (filterStatus === 'pending' && !item.implemented);
      
      return categoryMatch && priorityMatch && statusMatch;
    });
  };

  const getProgress = () => {
    const total = checklistItems.length;
    const completed = checklistItems.filter(item => item.implemented).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklistItems.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.implemented).length;
    const total = categoryItems.length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getPriorityBadge = (priority: ChecklistItem['priority']) => {
    const priorityClasses = {
      'Alta': 'priority-high',
      'Media': 'priority-medium',
      'Baja': 'priority-low'
    };
    
    return (
      <span className={`priority-badge ${priorityClasses[priority]}`}>
        {priority}
      </span>
    );
  };

  const getSeverityBadge = (severity: SecurityThreat['severity']) => {
    const severityClasses = {
      'Crítica': 'severity-critical',
      'Alta': 'severity-high',
      'Media': 'severity-medium',
      'Baja': 'severity-low'
    };
    
    return (
      <span className={`severity-badge ${severityClasses[severity]}`}>
        {severity}
      </span>
    );
  };

  const progress = getProgress();
  const filteredItems = getFilteredItems();

  return (
    <div className="security-checklist">
      <h2>✅ Checklist Completo de Seguridad Frontend</h2>

      {/* Resumen de Progreso */}
      <div className="progress-summary">
        <h3>📊 Progreso General</h3>
        
        <div className="overall-progress">
          <div className="progress-circle">
            <div className="progress-text">
              <span className="percentage">{progress.percentage}%</span>
              <span className="label">Completado</span>
            </div>
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring-circle-bg"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring-circle"
                stroke="#10b981"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress.percentage / 100)}`}
              />
            </svg>
          </div>
          
          <div className="progress-details">
            <div className="stat">
              <span className="stat-value">{progress.completed}</span>
              <span className="stat-label">Completadas</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress.total - progress.completed}</span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress.total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progreso por Categoría */}
      <div className="category-progress">
        <h3>📋 Progreso por Categoría</h3>
        <div className="category-grid">
          {categories.map((category) => {
            const categoryProgress = getCategoryProgress(category);
            return (
              <div key={category} className="category-card">
                <h4>{category}</h4>
                <div className="category-bar">
                  <div 
                    className="category-fill"
                    style={{ width: `${categoryProgress.percentage}%` }}
                  />
                </div>
                <div className="category-stats">
                  {categoryProgress.completed}/{categoryProgress.total} ({categoryProgress.percentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabla de Amenazas Resumen */}
      <div className="threats-summary">
        <h3>🚨 Resumen de Amenazas</h3>
        <div className="threats-table">
          <div className="threats-header">
            <div>Amenaza</div>
            <div>Severidad</div>
            <div>Impacto</div>
          </div>
          {threats.map((threat) => (
            <div key={threat.id} className="threat-row">
              <div className="threat-name">{threat.name}</div>
              <div>{getSeverityBadge(threat.severity)}</div>
              <div className="threat-impact">{threat.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="checklist-filters">
        <h3>🔍 Filtros</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="category-filter">Categoría:</label>
            <select 
              id="category-filter"
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Todas</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="priority-filter">Prioridad:</label>
            <select 
              id="priority-filter"
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="status-filter">Estado:</label>
            <select 
              id="status-filter"
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="completed">Completados</option>
              <option value="pending">Pendientes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Checklist */}
      <div className="checklist-items">
        <h3>📝 Items del Checklist ({filteredItems.length})</h3>
        
        <div className="items-list">
          {filteredItems.map((item) => (
            <div key={item.id} className={`checklist-item ${item.implemented ? 'completed' : 'pending'}`}>
              <div className="item-header">
                <label className="checkbox-container" aria-label={`Marcar como ${item.implemented ? 'no completado' : 'completado'}: ${item.title}`}>
                  <input
                    type="checkbox"
                    checked={item.implemented}
                    onChange={() => toggleItemImplementation(item.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                
                <div className="item-info">
                  <h4 className={item.implemented ? 'completed-title' : ''}>{item.title}</h4>
                  <div className="item-meta">
                    <span className="category-tag">{item.category}</span>
                    {getPriorityBadge(item.priority)}
                  </div>
                </div>
              </div>
              
              <p className="item-description">{item.description}</p>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items">
            <p>No hay items que coincidan con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Recursos Adicionales */}
      <div className="additional-resources">
        <h3>📚 Recursos Adicionales</h3>
        
        <div className="resources-grid">
          <div className="resource-card">
            <h4>🛡️ Herramientas de Seguridad</h4>
            <ul>
              <li><strong>OWASP ZAP:</strong> Escáner de vulnerabilidades</li>
              <li><strong>Snyk:</strong> Análisis de dependencias</li>
              <li><strong>SonarQube:</strong> Análisis de código estático</li>
              <li><strong>Helmet.js:</strong> Headers de seguridad para Express</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>📖 Documentación</h4>
            <ul>
              <li><strong>OWASP Top 10:</strong> Principales vulnerabilidades web</li>
              <li><strong>MDN Security:</strong> Guías de seguridad web</li>
              <li><strong>React Security:</strong> Mejores prácticas React</li>
              <li><strong>NIST Guidelines:</strong> Estándares de seguridad</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>🧪 Testing</h4>
            <ul>
              <li><strong>Jest Security:</strong> Tests de seguridad</li>
              <li><strong>Cypress Security:</strong> E2E security testing</li>
              <li><strong>Burp Suite:</strong> Pruebas de penetración</li>
              <li><strong>OWASP Testing Guide:</strong> Metodología de testing</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>📊 Monitoreo</h4>
            <ul>
              <li><strong>Sentry:</strong> Error tracking y monitoreo</li>
              <li><strong>LogRocket:</strong> Session replay y logging</li>
              <li><strong>DataDog:</strong> Monitoreo de aplicaciones</li>
              <li><strong>New Relic:</strong> Performance y security monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Próximos Pasos */}
      <div className="next-steps">
        <h3>🚀 Próximos Pasos Recomendados</h3>
        
        <div className="steps-timeline">
          <div className="timeline-step">
            <div className="step-marker">1</div>
            <div className="step-content">
              <h4>Priorizar items de Alta prioridad</h4>
              <p>Comenzar con elementos críticos de autenticación y XSS protection</p>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-marker">2</div>
            <div className="step-content">
              <h4>Implementar herramientas de análisis</h4>
              <p>Configurar SonarQube, Snyk u otras herramientas de security scanning</p>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-marker">3</div>
            <div className="step-content">
              <h4>Establecer proceso de revisión</h4>
              <p>Code reviews enfocados en seguridad y auditorías regulares</p>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="step-marker">4</div>
            <div className="step-content">
              <h4>Capacitación del equipo</h4>
              <p>Training regular sobre nuevas amenazas y mejores prácticas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityChecklist;