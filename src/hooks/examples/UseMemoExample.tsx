import React, { useMemo, useState } from "react";

// ✅ BUENA PRÁCTICA: useMemo para cálculos costosos
const GoodUseMemoExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<number[]>(() =>
    Array.from({ length: 1000 }, (_, i) => i)
  );

  // ✅ BUENA PRÁCTICA: Memoizar cálculo costoso
  const expensiveCalculation = useMemo(() => {
    console.log("Calculando suma costosa...");
    return items.reduce((sum, item) => sum + item, 0);
  }, [items]); // ✅ Dependencia correcta

  // ✅ BUENA PRÁCTICA: Memoizar objeto que se pasa como prop
  const configObject = useMemo(
    () => ({
      theme: "dark",
      apiUrl: "https://api.example.com",
      timeout: 5000,
    }),
    []
  ); // ✅ Sin dependencias porque los valores son constantes

  // ✅ BUENA PRÁCTICA: Memoizar array filtrado
  const filteredItems = useMemo(() => {
    console.log("Filtrando items...");
    return items.filter((item) => item % 2 === 0);
  }, [items]);

  const addItem = () => {
    setItems((prev) => [...prev, prev.length]);
  };

  const removeItem = () => {
    setItems((prev) => prev.slice(0, -1));
  };

  return (
    <div className="card good-practice">
      <h3>useMemo - Buenas Prácticas</h3>
      <p>Count: {count}</p>
      <p>Total items: {items.length}</p>
      <p>Suma total (memoizada): {expensiveCalculation}</p>
      <p>Items pares: {filteredItems.length}</p>
      <p>Config: {JSON.stringify(configObject)}</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => setCount((c) => c + 1)}>
          Incrementar Count
        </button>
        <button onClick={addItem}>Agregar Item</button>
        <button onClick={removeItem}>Quitar Item</button>
      </div>
    </div>
  );
};


// ❌ MALA PRÁCTICA: useMemo mal usado
const BadUseMemoExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ MALA PRÁCTICA: Memoizar cálculo simple
  const simpleCalculation = useMemo(() => {
    return count * 2; // ❌ Demasiado simple para memoizar
  }, [count]);

  // ❌ MALA PRÁCTICA: useMemo sin dependencias cuando debería tenerlas
  const badMemo = useMemo(() => {
    return count + name.length; // ❌ Usa name pero no está en dependencias
  }, [count]); // ❌ Falta name en dependencias

  // ❌ MALA PRÁCTICA: Memoizar todo sin razón
  const unnecessaryMemo = useMemo(() => {
    return 'Hola mundo'; // ❌ String literal no necesita memoización
  }, []);

  // ❌ MALA PRÁCTICA: Crear objeto en cada render
  const configObject = {
    theme: 'light',
    count: count // ❌ Se recrea en cada render
  };

  return (
    <div className="card bad-practice">
      <h3>useMemo - Malas Prácticas</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Simple calc (innecesariamente memoizado): {simpleCalculation}</p>
      <p>Bad memo (dependencias incorrectas): {badMemo}</p>
      <p>Unnecessary memo: {unnecessaryMemo}</p>
      <p>Config object: {JSON.stringify(configObject)}</p>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe algo"
      />
      <button onClick={() => setCount(c => c + 1)}>
        Incrementar
      </button>
    </div>
  );
};


const UseMemoExample: React.FC = () => {
  return (
    <div>
      <h2>useMemo Hook - Comparación de Prácticas</h2>
      <GoodUseMemoExample />
      { <BadUseMemoExample /> }

      <div className="card">
        <h3>Explicación</h3>
        <h4>Cuándo usar useMemo:</h4>
        <ul>
          <li>Cálculos costosos que dependen de props/state</li>
          <li>Crear objetos/arrays que se pasan como props</li>
          <li>Filtrar o transformar listas grandes</li>
          <li>Cuando el cálculo es notablemente lento</li>
        </ul>

        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Solo memoizar cálculos realmente costosos</li>
          <li>Incluir todas las dependencias necesarias</li>
          <li>Memoizar objetos/arrays que se pasan como props</li>
          <li>Usar para evitar re-cálculos innecesarios</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>Memoizar cálculos simples (overhead innecesario)</li>
          <li>Dependencias incorrectas o faltantes</li>
          <li>Memoizar valores primitivos constantes</li>
          <li>Uso excesivo de useMemo por si acaso</li>
        </ul>
      </div>
    </div>
  );
};

export default UseMemoExample;
