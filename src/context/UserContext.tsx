import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ✅ BUENA PRÁCTICA: Interfaces bien definidas
interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  preferences: {
    theme: "light" | "dark";
    language: "es" | "en";
  };
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<User["preferences"]>) => void;
  isLoggedIn: boolean;
  isTeacher: boolean;
}

// ✅ BUENA PRÁCTICA: Contexto tipado
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ BUENA PRÁCTICA: Hook personalizado para usar el contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

// ✅ BUENA PRÁCTICA: Provider bien estructurado
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // ✅ BUENA PRÁCTICA: Cargar usuario del localStorage si existe
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updatePreferences = (newPreferences: Partial<User["preferences"]>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...newPreferences,
        },
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const isLoggedIn = user !== null;
  const isTeacher = user?.role === "teacher" || user?.role === "admin";

  const value: UserContextType = {
    user,
    login,
    logout,
    updatePreferences,
    isLoggedIn,
    isTeacher,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// ✅ BUENA PRÁCTICA: Datos de ejemplo para la demostración
export const DEMO_USERS = {
  student: {
    id: 1,
    name: "Ana García",
    email: "ana@estudiante.com",
    role: "student" as const,
    preferences: {
      theme: "light" as const,
      language: "es" as const,
    },
  },
  teacher: {
    id: 2,
    name: "Prof. Carlos Mendez",
    email: "carlos@profesor.com",
    role: "teacher" as const,
    preferences: {
      theme: "dark" as const,
      language: "es" as const,
    },
  },
};

export default UserContext;
