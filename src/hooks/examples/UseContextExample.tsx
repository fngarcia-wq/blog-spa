import React, { createContext, useContext, useState, type ReactNode } from "react";

// ✅ BUENA PRÁCTICA: Contexto tipado correctamente
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

// ✅ BUENA PRÁCTICA: Crear contexto con valor por defecto
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ BUENA PRÁCTICA: Hook personalizado para usar el contexto
const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};

// ✅ BUENA PRÁCTICA: Provider tipado
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = user !== null;

  const value: UserContextType = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// ✅ BUENA PRÁCTICA: Componente que usa el contexto correctamente
const GoodUserProfile: React.FC = () => {
  const { user, login, logout, isLoggedIn } = useUser();

  const handleLogin = () => {
    login({
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
    });
  };

  return (
    <div className="card good-practice">
      <h3>useContext - Buenas Prácticas</h3>
      {isLoggedIn ? (
        <div>
          <p>Bienvenido, {user?.name}!</p>
          <p>Email: {user?.email}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <p>No has iniciado sesión</p>
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      )}
    </div>
  );
};

/* 
// ❌ MALA PRÁCTICA: Usar contexto sin tipado y sin validación
const BadContext = createContext(null); // ❌ Sin tipado

const BadUserProfile: React.FC = () => {
  // ❌ MALA PRÁCTICA: Usar useContext directamente sin validación
  const context = useContext(BadContext);

  // ❌ MALA PRÁCTICA: No manejar el caso donde context es undefined
  const user = (context as any)?.user; // ❌ Uso de any

  return (
    <div className="card bad-practice">
      <h3>❌ useContext - Malas Prácticas</h3>
      <p>Usuario: {user?.name || 'Sin datos'}</p>
      <p className="warning">
        ⚠️ Este componente puede fallar si se usa fuera del provider
      </p>
    </div>
  );
};
*/

const UseContextExample: React.FC = () => {
  return (
    <div>
      <h2>useContext Hook - Comparación de Prácticas</h2>

      {/* ✅ BUENA PRÁCTICA: Envolver componentes en Provider */}
      <UserProvider>
        <GoodUserProfile />
      </UserProvider>

      {/* ❌ MALA PRÁCTICA: Componente sin Provider */}
      {/* <BadUserProfile /> */}

      <div className="card">
        <h3>Explicación</h3>
        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Tipar el contexto correctamente</li>
          <li>Crear hook personalizado para usar el contexto</li>
          <li>Validar que el contexto esté disponible</li>
          <li>Usar Provider para envolver componentes</li>
          <li>Separar lógica del contexto en provider</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>No tipar el contexto</li>
          <li>Usar useContext directamente sin validación</li>
          <li>No manejar el caso de contexto undefined</li>
          <li>Usar any para evitar errores de tipado</li>
          <li>No envolver componentes en Provider</li>
        </ul>
      </div>
    </div>
  );
};

export default UseContextExample;
