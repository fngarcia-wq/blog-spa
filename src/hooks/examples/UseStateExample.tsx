import React, { useState } from "react";

// ✅ BUENA PRÁCTICA: useState con TypeScript
const GoodUseStateExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  // ✅ BUENA PRÁCTICA: Función de actualización para evitar dependencias obsoletas
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // ✅ BUENA PRÁCTICA: Actualizar objeto de forma inmutable
  const updateUser = () => {
    setUser((prevUser) => ({
      ...prevUser,
      id: Math.random(),
      name: name || "Usuario",
    }));
  };

  return (
    <div className="card good-practice">
      <h3>useState - Buenas Prácticas</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Incrementar</button>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del usuario"
      />
      <button onClick={updateUser}>Crear Usuario</button>

      {user && (
        <p>
          Usuario: {user.name} (ID: {user.id.toFixed(0)})
        </p>
      )}
    </div>
  );
};

// ❌ MALA PRÁCTICA: useState mal usado
const BadUseStateExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<{name?: string}>({});

  // ❌ MALA PRÁCTICA: No usar función de actualización
  const increment = () => {
    setCount(count + 1); // Dependencia obsoleta
  };

  // ❌ MALA PRÁCTICA: Mutar objeto directamente
  const updateUser = () => {
    user.name = "Nuevo nombre"; // ❌ Mutación directa
    setUser(user); // ❌ No detectará el cambio
  };

  return (
    <div className="card bad-practice">
      <h3>useState - Malas Prácticas</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Incrementar (No funciona bien)</button>

      <button onClick={updateUser}>Actualizar Usuario (No funciona)</button>
      <p>Usuario: {user.name || "Sin nombre"}</p>
    </div>
  );
};

const UseStateExample: React.FC = () => {
  return (
    <div>
      <h2>useState Hook - Comparación de Prácticas</h2>
      <GoodUseStateExample />
      {<BadUseStateExample />}

      <div className="card">
        <h3>Explicación</h3>
        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Usar TypeScript para type safety</li>
          <li>
            Usar función de actualización para evitar dependencias obsoletas
          </li>
          <li>Actualizar estado de forma inmutable</li>
          <li>Inicializar con el tipo correcto</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>No usar función de actualización (closure stale)</li>
          <li>Mutar objetos directamente</li>
          <li>No tipificar el estado</li>
          <li>Dependencias obsoletas en callbacks</li>
        </ul>
      </div>
    </div>
  );
};

export default UseStateExample;
