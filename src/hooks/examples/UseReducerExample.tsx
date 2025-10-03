import React, { useReducer } from "react";

// ✅ BUENA PRÁCTICA: useReducer con TypeScript
interface CounterState {
  count: number;
  history: number[];
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET_VALUE"; payload: number };

// ✅ BUENA PRÁCTICA: Reducer puro y tipado
const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case "RESET":
      return {
        count: 0,
        history: [0],
      };
    case "SET_VALUE":
      return {
        ...state,
        count: action.payload,
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

// ✅ BUENA PRÁCTICA: Estado inicial bien definido
const initialState: CounterState = {
  count: 0,
  history: [0],
};

const GoodUseReducerExample: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="card good-practice">
      <h3>useReducer - Buenas Prácticas</h3>
      <p>Count: {state.count}</p>
      <p>Historial: {state.history.slice(-5).join(", ")} (últimos 5)</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        <button onClick={() => dispatch({ type: "SET_VALUE", payload: 100 })}>
          Set 100
        </button>
      </div>
    </div>
  );
};

/* 
// ❌ MALA PRÁCTICA: useReducer mal implementado
const badReducer = (state: any, action: any) => { // ❌ Sin tipado
  // ❌ MALA PRÁCTICA: Mutar estado directamente
  switch (action.type) {
    case 'INCREMENT':
      state.count++; // ❌ Mutación directa
      return state;
    case 'DECREMENT':
      state.count--; // ❌ Mutación directa
      return state;
    default:
      return state;
  }
};

const BadUseReducerExample: React.FC = () => {
  // ❌ MALA PRÁCTICA: Usar useState para lógica compleja que debería ser useReducer
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null); // ❌ Uso de any

  // ❌ MALA PRÁCTICA: Múltiples setStates que deberían ser una acción
  const handleComplexOperation = () => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setData({ result: count * 2 });
        setIsLoading(false);
      } else {
        setError('Error simulado');
        setIsLoading(false);
      }
    }, 1000);
  };

  // Usar el reducer mal implementado para mostrar el problema
  const [badState, badDispatch] = useReducer(badReducer, { count: 0 });

  return (
    <div className="card bad-practice">
      <h3>useReducer - Malas Prácticas</h3>
      
      <div>
        <h4>Problema 1: Múltiples estados relacionados</h4>
        <p>Count: {count}</p>
        <p>Loading: {isLoading ? 'Sí' : 'No'}</p>
        <p>Error: {error || 'Ninguno'}</p>
        <p>Data: {data ? JSON.stringify(data) : 'Ninguno'}</p>
        <button onClick={handleComplexOperation}>
          Operación Compleja
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h4>Problema 2: Reducer que muta estado</h4>
        <p>Bad Count: {badState.count}</p>
        <button onClick={() => badDispatch({ type: 'INCREMENT' })}>
          Incrementar (puede no funcionar)
        </button>
      </div>
    </div>
  );
};
*/

const UseReducerExample: React.FC = () => {
  return (
    <div>
      <h2>useReducer Hook - Comparación de Prácticas</h2>
      <GoodUseReducerExample />
      {/* <BadUseReducerExample /> */}

      <div className="card">
        <h3>Explicación</h3>
        <h4>Cuándo usar useReducer:</h4>
        <ul>
          <li>Estado complejo con múltiples valores relacionados</li>
          <li>Lógica de actualización de estado compleja</li>
          <li>Múltiples componentes necesitan disparar las mismas acciones</li>
          <li>Estado que depende del estado anterior de forma compleja</li>
        </ul>

        <h4>Buenas Prácticas:</h4>
        <ul>
          <li>Tipar state y actions correctamente</li>
          <li>Reducer debe ser función pura</li>
          <li>No mutar estado, siempre retornar nuevo objeto</li>
          <li>Usar nombres descriptivos para actions</li>
          <li>Manejar caso default en reducer</li>
        </ul>

        <h4>Malas Prácticas:</h4>
        <ul>
          <li>Mutar estado directamente en reducer</li>
          <li>No tipar state y actions</li>
          <li>Usar múltiples useState cuando se necesita useReducer</li>
          <li>Efectos secundarios en reducer</li>
          <li>No manejar todos los casos en reducer</li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerExample;
