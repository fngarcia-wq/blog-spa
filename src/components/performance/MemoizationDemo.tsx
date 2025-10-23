import React, { useState, useMemo, useCallback, memo } from "react";
import "./MemoizationDemo.css";

// Componente sin memoización (problemático)
const ExpensiveComponent = ({
  data,
  onSelect,
}: {
  data: number[];
  onSelect: (value: number) => void;
}) => {
  console.log("🔴 ExpensiveComponent renderizado");

  // Simulamos un cálculo costoso
  const expensiveCalculation = () => {
    console.log("🔴 Cálculo costoso ejecutado");
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
      sum += data.reduce((acc, val) => acc + val, 0);
    }
    return sum;
  };

  const result = expensiveCalculation();

  return (
    <div className="expensive-component">
      <h4>Sin Memoización</h4>
      <p>Resultado del cálculo: {result}</p>
      <button onClick={() => onSelect(result)}>Seleccionar</button>
      <small>⚠️ Se recalcula en cada render</small>
    </div>
  );
};

// Componente optimizado con memoización
const OptimizedComponent = memo(
  ({
    data,
    onSelect,
  }: {
    data: number[];
    onSelect: (value: number) => void;
  }) => {
    console.log("✅ OptimizedComponent renderizado");

    // useMemo para cálculos costosos
    const expensiveCalculation = useMemo(() => {
      console.log("✅ Cálculo costoso ejecutado (memoizado)");
      let sum = 0;
      for (let i = 0; i < 100000; i++) {
        sum += data.reduce((acc, val) => acc + val, 0);
      }
      return sum;
    }, [data]);

    return (
      <div className="expensive-component optimized">
        <h4>Con Memoización</h4>
        <p>Resultado del cálculo: {expensiveCalculation}</p>
        <button onClick={() => onSelect(expensiveCalculation)}>
          Seleccionar
        </button>
        <small>✅ Solo se recalcula si cambian los datos</small>
      </div>
    );
  }
);

OptimizedComponent.displayName = "OptimizedComponent";

// Simulador de lista de usuarios
interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const UserItem = memo(
  ({ user, onToggle }: { user: User; onToggle: (id: number) => void }) => {
    console.log(`👤 UserItem ${user.id} renderizado`);

    return (
      <div className={`user-item ${user.active ? "active" : "inactive"}`}>
        <div className="user-info">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </div>
        <button
          className={`toggle-btn ${user.active ? "deactivate" : "activate"}`}
          onClick={() => onToggle(user.id)}
        >
          {user.active ? "Desactivar" : "Activar"}
        </button>
      </div>
    );
  }
);

UserItem.displayName = "UserItem";

const MemoizationDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [data] = useState([1, 2, 3, 4, 5]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ana García", email: "ana@email.com", active: true },
    { id: 2, name: "Luis Rodriguez", email: "luis@email.com", active: false },
    { id: 3, name: "María López", email: "maria@email.com", active: true },
    { id: 4, name: "Carlos Ruiz", email: "carlos@email.com", active: false },
  ]);
  const [filter, setFilter] = useState("all");

  // Sin useCallback - nueva función en cada render
  const handleSelectBad = (value: number) => {
    setSelectedValue(value);
  };

  // Con useCallback - función memoizada
  const handleSelectGood = useCallback((value: number) => {
    setSelectedValue(value);
  }, []);

  // Con useCallback para toggle de usuarios
  const handleToggleUser = useCallback((id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  // useMemo para filtrar usuarios
  const filteredUsers = useMemo(() => {
    console.log("🔍 Filtrando usuarios...");
    return users.filter((user) => {
      if (filter === "active") return user.active;
      if (filter === "inactive") return !user.active;
      return true;
    });
  }, [users, filter]);

  // Estadísticas computadas con useMemo
  const userStats = useMemo(() => {
    console.log("📊 Calculando estadísticas...");
    const total = users.length;
    const active = users.filter((u) => u.active).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [users]);

  return (
    <div className="memoization-demo">
      <div className="demo-header">
        <h2>🧠 Memoization</h2>
        <p>React.memo, useMemo y useCallback para optimizar renders</p>
      </div>

      {/* Explicación Conceptual */}
      <section className="concept-section">
        <h3>🎯 ¿Qué es Memoization?</h3>
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">🧠</div>
            <h4>React.memo</h4>
            <p>
              Evita re-renders innecesarios de componentes cuando las props no
              cambian
            </p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h4>useMemo</h4>
            <p>Memoriza el resultado de cálculos costosos entre renders</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔗</div>
            <h4>useCallback</h4>
            <p>Memoriza funciones para evitar recrearlas en cada render</p>
          </div>
        </div>
      </section>

      {/* Demo de Performance */}
      <section className="performance-demo">
        <h3>💡 Demo de Performance</h3>
        <p>Abre la consola del navegador para ver los logs de renderizado</p>

        <div className="demo-controls">
          <button onClick={() => setCounter(counter + 1)}>
            Incrementar Counter: {counter}
          </button>
          <p>Este botón forza un re-render del componente padre</p>
        </div>

        <div className="comparison-grid">
          <ExpensiveComponent data={data} onSelect={handleSelectBad} />
          <OptimizedComponent data={data} onSelect={handleSelectGood} />
        </div>

        {selectedValue && (
          <div className="selection-result">
            <p>
              Valor seleccionado: <strong>{selectedValue}</strong>
            </p>
          </div>
        )}
      </section>

      {/* Demo de Lista de Usuarios */}
      <section className="users-demo">
        <h3>👥 Demo: Lista de Usuarios Optimizada</h3>

        <div className="users-controls">
          <div className="filter-controls">
            <h4>Filtros:</h4>
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Todos ({userStats.total})
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Activos ({userStats.active})
            </button>
            <button
              className={filter === "inactive" ? "active" : ""}
              onClick={() => setFilter("inactive")}
            >
              Inactivos ({userStats.inactive})
            </button>
          </div>

          <div className="stats-display">
            <h4>📊 Estadísticas (useMemo):</h4>
            <div className="stat-item">
              <span>Total:</span>
              <span className="stat-value">{userStats.total}</span>
            </div>
            <div className="stat-item">
              <span>Activos:</span>
              <span className="stat-value active">{userStats.active}</span>
            </div>
            <div className="stat-item">
              <span>Inactivos:</span>
              <span className="stat-value inactive">{userStats.inactive}</span>
            </div>
          </div>
        </div>

        <div className="users-list">
          {filteredUsers.map((user) => (
            <UserItem key={user.id} user={user} onToggle={handleToggleUser} />
          ))}
        </div>
      </section>

      {/* Ejemplos de Código */}
      <section className="code-examples">
        <h3>💻 Ejemplos de Código</h3>

        <div className="code-tabs">
          <div className="code-tab">
            <h4>React.memo</h4>
            <pre>
              <code>{`// ❌ Componente que siempre re-renderiza
function UserCard({ user, onEdit }) {
  console.log('Re-render UserCard'); // Logs en cada render del padre
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
}

// ✅ Componente memoizado
const UserCard = memo(function UserCard({ user, onEdit }) {
  console.log('Re-render UserCard'); // Solo logs si props cambian
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
});

// ✅ Con comparación personalizada
const UserCard = memo(function UserCard({ user, onEdit }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Solo re-renderiza si el nombre cambió
  return prevProps.user.name === nextProps.user.name;
});`}</code>
            </pre>
          </div>

          <div className="code-tab">
            <h4>useMemo</h4>
            <pre>
              <code>{`// ❌ Cálculo costoso en cada render
function ExpensiveList({ items, filter }) {
  // 🔴 Se ejecuta en CADA render
  const expensiveResult = items
    .filter(item => item.category === filter)
    .map(item => ({ ...item, computed: heavyCalculation(item) }))
    .sort((a, b) => a.computed - b.computed);

  return <div>{/* render result */}</div>;
}

// ✅ Cálculo memoizado
function ExpensiveList({ items, filter }) {
  // ✅ Solo se ejecuta si items o filter cambian
  const expensiveResult = useMemo(() => {
    return items
      .filter(item => item.category === filter)
      .map(item => ({ ...item, computed: heavyCalculation(item) }))
      .sort((a, b) => a.computed - b.computed);
  }, [items, filter]);

  return <div>{/* render result */}</div>;
}

// ✅ Ejemplo real: búsqueda filtrada
function SearchResults({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div>
      {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="code-tab">
            <h4>useCallback</h4>
            <pre>
              <code>{`// ❌ Nueva función en cada render
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');
  
  // 🔴 Nueva función en cada render = todos los TodoItems re-renderizan
  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      {todos.map(todo => 
        <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
      )}
    </div>
  );
}

// ✅ Función memoizada
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');
  
  // ✅ Misma función entre renders = TodoItems no re-renderizan innecesariamente
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // Sin dependencias porque usa función callback

  // ✅ Con dependencias
  const handleDelete = useCallback((id) => {
    if (filter === 'completed') {
      // Lógica específica para completados
      deleteCompletedTodo(id);
    } else {
      deleteTodo(id);
    }
  }, [filter]); // Re-crea solo si filter cambia

  return (
    <div>
      {todos.map(todo => 
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Mejores Prácticas */}
      <section className="best-practices">
        <h3>✅ Mejores Prácticas</h3>
        <div className="practices-grid">
          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Medir antes de optimizar</h4>
              <p>
                Usa React DevTools Profiler para identificar componentes lentos
                reales
              </p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>memo para componentes de lista</h4>
              <p>
                Especialmente útil en listas largas donde pocos items cambian
              </p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>useMemo para cálculos costosos</h4>
              <p>
                Operaciones que toman &gt;10ms y dependen de props/state
                específicos
              </p>
            </div>
          </div>

          <div className="practice-item bad">
            <div className="practice-icon">❌</div>
            <div className="practice-content">
              <h4>No memoizar todo</h4>
              <p>
                La memoización tiene overhead. Solo aplicar donde hay problema
                real
              </p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>useCallback para props de función</h4>
              <p>
                Especialmente importante cuando se pasa a componentes memoizados
              </p>
            </div>
          </div>

          <div className="practice-item bad">
            <div className="practice-icon">❌</div>
            <div className="practice-content">
              <h4>Cuidado con las dependencias</h4>
              <p>
                Dependencias que cambian frecuentemente anulan la memoización
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas de Debugging */}
      <section className="debugging-tools">
        <h3>🔧 Herramientas de Debugging</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>🛠️ React DevTools Profiler</h4>
            <p>Identifica componentes que se renderizan frecuentemente</p>
            <div className="tool-steps">
              <span>
                F12 → Components → ⚙️ Profiler → Record → Interact → Stop
              </span>
            </div>
          </div>

          <div className="tool-card">
            <h4>📊 why-did-you-render</h4>
            <p>Biblioteca que te dice por qué un componente se re-renderizó</p>
            <div className="tool-steps">
              <span>npm install @welldone-software/why-did-you-render</span>
            </div>
          </div>

          <div className="tool-card">
            <h4>🎯 console.log estratégico</h4>
            <p>Logs en render para identificar re-renders innecesarios</p>
            <div className="tool-steps">
              <span>console.log('Component rendered:', props)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemoizationDemo;
