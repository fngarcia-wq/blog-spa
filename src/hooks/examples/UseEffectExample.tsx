import React, { useState, useEffect } from "react";

// ✅ BUENA PRÁCTICA: useEffect con dependencias correctas
const GoodUseEffectExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);

  // ✅ BUENA PRÁCTICA: Effect con cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    // ✅ BUENA PRÁCTICA: Cleanup function
    return () => clearInterval(interval);
  }, []); // ✅ Dependencias vacías para ejecutar solo una vez

  // ✅ BUENA PRÁCTICA: Effect que depende de una variable
  useEffect(() => {
    if (count > 0) {
      setData(`Contador actualizado: ${count} veces`);
    }
  }, [count]); // ✅ Dependencia correcta

  // ✅ BUENA PRÁCTICA: Effect para API calls con cleanup
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        // Simular API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!isCancelled) {
          console.log("Datos cargados correctamente");
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error al cargar datos:", error);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // ✅ Prevenir memory leaks
    };
  }, []);

  return (
    <div className="card good-practice">
      <h3>useEffect - Buenas Prácticas</h3>
      <p>Timer: {timer}s</p>
      <p>Count: {count}</p>
      <p>{data}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
    </div>
  );
};

/* 
// ❌ MALA PRÁCTICA: useEffect mal usado
const BadUseEffectExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState('');

  // ❌ MALA PRÁCTICA: Effect sin dependencias cuando debería tenerlas
  useEffect(() => {
    setData(`Contador: ${count}`); // Usa count pero no está en dependencias
  }); // ❌ Sin array de dependencias, se ejecuta en cada render

  // ❌ MALA PRÁCTICA: Effect con dependencias incorrectas
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // ❌ Usa count obsoleto
    }, 1000);

    // ❌ MALA PRÁCTICA: No cleanup
    // return () => clearInterval(interval); // Comentado intencionalmente
  }, []); // ❌ Dependencias vacías pero usa count

  // ❌ MALA PRÁCTICA: Effect que causa re-renders infinitos
  useEffect(() => {
    setData(`Datos: ${Math.random()}`); // ❌ Actualiza estado sin condición
  }, [data]); // ❌ Depende del estado que modifica

  return (
    <div className="card bad-practice">
      <h3>useEffect - Malas Prácticas</h3>
      <p>Count: {count}</p>
      <p>{data}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Incrementar
      </button>
      <p className="warning">
        ⚠️ Este componente tiene memory leaks y re-renders infinitos
      </p>
    </div>
  );
};
*/

const UseEffectExample: React.FC = () => {
  return (
    <div>
      <h2>useEffect Hook - Comparación de Prácticas</h2>
      <GoodUseEffectExample />
      {/* <BadUseEffectExample /> */}

      <div className="card">
        <h3>Explicación</h3>
        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Siempre incluir array de dependencias</li>
          <li>Usar cleanup functions para prevenir memory leaks</li>
          <li>Incluir todas las variables usadas en dependencias</li>
          <li>Usar flags de cancelación para async operations</li>
          <li>Separar effects por responsabilidad</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>Omitir array de dependencias</li>
          <li>No hacer cleanup de timers/subscriptions</li>
          <li>Dependencias incorrectas o faltantes</li>
          <li>Effects que causan re-renders infinitos</li>
          <li>No manejar cancelación de operaciones async</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectExample;
