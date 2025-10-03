import React, { useRef, useEffect, useState } from "react";

// ✅ BUENA PRÁCTICA: useRef para referencias DOM
const GoodUseRefExample: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<number>(0);
  const [, forceUpdate] = useState({});

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementCounter = () => {
    countRef.current += 1;
    forceUpdate({});
  };

  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      console.log("Timer ejecutándose");
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="card good-practice">
      <h3>useRef - Buenas Prácticas</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="Haz click en 'Enfocar' para hacer focus aquí"
      />
      <button onClick={focusInput}>Enfocar Input</button>

      <p>Contador (no causa re-render): {countRef.current}</p>
      <button onClick={incrementCounter}>Incrementar</button>

      <div>
        <button onClick={startTimer}>Iniciar Timer</button>
        <button onClick={stopTimer}>Detener Timer</button>
      </div>
    </div>
  );
};

/* 
📚 SECCIÓN DE MALAS PRÁCTICAS - DESCOMENTA PARA EXPLICAR:

// ❌ MALA PRÁCTICA: Mal uso de useRef
const BadUseRefExample: React.FC = () => {
  const badRef = useRef<any>(null); // ❌ Uso de any
  const [count, setCount] = useState(0);

  // ❌ MALA PRÁCTICA: Usar ref para estado que debería causar re-render
  const badCountRef = useRef(0);

  const badIncrement = () => {
    badCountRef.current += 1;
    // ❌ El componente no se actualiza porque ref no causa re-render
    console.log('Count actualizado:', badCountRef.current);
  };

  // ❌ MALA PRÁCTICA: Modificar DOM directamente
  const badDOMManipulation = () => {
    const element = document.getElementById('bad-element');
    if (element) {
      element.style.color = 'red'; // ❌ Manipulación directa del DOM
    }
  };

  // ❌ MALA PRÁCTICA: No cleanup de recursos
  const createBadTimer = () => {
    setInterval(() => {
      console.log('Timer sin cleanup'); // ❌ Memory leak
    }, 1000);
  };

  return (
    <div className="card bad-practice">
      <h3>useRef - Malas Prácticas</h3>
      <input ref={badRef} type="text" />
      
      <p id="bad-element">Count que no se actualiza: {badCountRef.current}</p>
      <button onClick={badIncrement}>Incrementar (no funciona)</button>
      
      <button onClick={badDOMManipulation}>Cambiar Color (malo)</button>
      <button onClick={createBadTimer}>Timer sin Cleanup</button>
      
      <p>Count con useState: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar (funciona)</button>
    </div>
  );
};
*/

export default function UseRefExample() {
  return (
    <div>
      <h2>useRef Hook - Buenas Prácticas</h2>
      <GoodUseRefExample />
      {/* 📚 Descomenta para mostrar malas prácticas: <BadUseRefExample /> */}

      <div className="card">
        <h3>Explicación</h3>
        <h4>useRef se usa para:</h4>
        <ul>
          <li>Referencias a elementos DOM</li>
          <li>Almacenar valores que no causan re-render</li>
          <li>Mantener referencias a timers/intervalos</li>
          <li>Acceder a APIs imperativas de componentes hijos</li>
        </ul>

        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Tipar correctamente las referencias</li>
          <li>Verificar que current no sea null antes de usar</li>
          <li>Usar ref para valores que no afectan el render</li>
          <li>Hacer cleanup de recursos en useEffect</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>Usar any en lugar de tipar correctamente</li>
          <li>Usar ref para estado que debería causar re-render</li>
          <li>Manipular DOM directamente sin React</li>
          <li>No hacer cleanup de timers/intervalos</li>
          <li>Asumir que current siempre tiene valor</li>
        </ul>
      </div>
    </div>
  );
}
