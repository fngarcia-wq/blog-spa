import React, { useCallback, useState, memo } from "react";

// ✅ BUENA PRÁCTICA: Componente memoizado que se beneficia de useCallback
interface CounterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CounterButton = memo<CounterButtonProps>(({ onClick, children }) => {
  console.log("CounterButton renderizado:", children);
  return <button onClick={onClick}>{children}</button>;
});

CounterButton.displayName = "CounterButton";

// ✅ BUENA PRÁCTICA: useCallback para optimizar componentes
const GoodUseCallbackExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  // ✅ BUENA PRÁCTICA: useCallback para funciones que se pasan como props
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // ✅ Sin dependencias porque usa función de actualización

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  // ✅ BUENA PRÁCTICA: useCallback con dependencias cuando es necesario
  const handleNamedIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
    console.log(`${name} incrementó el contador`);
  }, [name]); // ✅ Incluye name como dependencia

  return (
    <div className="card good-practice">
      <h3>useCallback - Buenas Prácticas</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <CounterButton onClick={increment}>+1</CounterButton>
        <CounterButton onClick={decrement}>-1</CounterButton>
        <CounterButton onClick={handleNamedIncrement}>
          +1 (con nombre)
        </CounterButton>
      </div>

      <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "10px" }}>
        Abre DevTools Console para ver cuándo se re-renderizan los botones
      </p>
    </div>
  );
};


// ❌ MALA PRÁCTICA: useCallback mal usado
const BadUseCallbackExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>(['item1', 'item2']);

  // ❌ MALA PRÁCTICA: useCallback innecesario para función simple
  const simpleFunction = useCallback(() => {
    console.log('Función simple'); // ❌ Demasiado simple para memoizar
  }, []);

  // ❌ MALA PRÁCTICA: useCallback sin dependencias cuando las necesita
  const badCallback = useCallback(() => {
    console.log('Count actual:', count); // ❌ Usa count pero no está en dependencias
  }, []); // ❌ Dependencias vacías incorrectas

  // ❌ MALA PRÁCTICA: useCallback con dependencias incorrectas
  const incorrectDependencies = useCallback(() => {
    setItems(prev => [...prev, `item${count}`]); // ❌ Usa count pero no en deps
  }, [items]); // ❌ Dependencias incorrectas

  // ❌ MALA PRÁCTICA: Función recreada en cada render
  const notMemoizedFunction = () => {
    setCount(prev => prev + 1); // ❌ Se recrea en cada render
  };

  return (
    <div className="card bad-practice">
      <h3>useCallback - Malas Prácticas</h3>
      <p>Count: {count}</p>
      <p>Items: {items.length}</p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={simpleFunction}>
          Función Simple (innecesariamente memoizada)
        </button>
        <button onClick={badCallback}>
          Callback con deps incorrectas
        </button>
        <button onClick={incorrectDependencies}>
          Agregar Item (mal callback)
        </button>
        <button onClick={notMemoizedFunction}>
          No Memoizada (se recrea)
        </button>
      </div>
      
      <p className="warning" style={{ fontSize: '0.8rem', marginTop: '10px' }}>
        ⚠️ Estos ejemplos muestran problemas de optimización
      </p>
    </div>
  );
};


const UseCallbackExample: React.FC = () => {
  return (
    <div>
      <h2>useCallback Hook - Comparación de Prácticas</h2>
      <GoodUseCallbackExample />
      {/* <BadUseCallbackExample /> */}

      <div className="card">
        <h3>Explicación</h3>
        <h4>Cuándo usar useCallback:</h4>
        <ul>
          <li>Funciones que se pasan como props a componentes memoizados</li>
          <li>Funciones que son dependencias de otros hooks</li>
          <li>Funciones costosas que se recrean frecuentemente</li>
          <li>Para romper ciclos de dependencias en useEffect</li>
        </ul>

        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Solo memoizar funciones que realmente lo necesiten</li>
          <li>Incluir todas las dependencias necesarias</li>
          <li>Usar con componentes memoizados (memo, PureComponent)</li>
          <li>Preferir función de actualización cuando sea posible</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>Memoizar funciones simples innecesariamente</li>
          <li>Dependencias incorrectas o faltantes</li>
          <li>Usar sin componentes memoizados que se beneficien</li>
          <li>Overhead de memoización sin beneficio real</li>
        </ul>
      </div>
    </div>
  );
};

export default UseCallbackExample;
