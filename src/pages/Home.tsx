import React from "react";
import { useCounter } from "../hooks/useCounter";
import UseStateExample from "../hooks/examples/UseStateExample";
import UseEffectExample from "../hooks/examples/UseEffectExample";
import UseContextExample from "../hooks/examples/UseContextExample";
import UseReducerExample from "../hooks/examples/UseReducerExample";
import UseRefExample from "../hooks/examples/UseRefExample";
import UseMemoExample from "../hooks/examples/UseMemoExample";
import UseCallbackExample from "../hooks/examples/UseCallbackExample";
import "./Home.css";

const Home: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div className="container">

      <section className="demo-section">
        <div className="card">
          <h2>Demo Rápido: useCounter Hook</h2>
          <p>Este es un ejemplo de nuestro hook personalizado:</p>
          <div className="counter-demo">
            <span className="count-display">Contador: {count}</span>
            <div className="counter-buttons">
              <button onClick={increment}>+1</button>
              <button onClick={decrement}>-1</button>
              <button onClick={reset}>Reset</button>
            </div>
          </div>
        </div>
      </section>

      <section className="examples-grid">
        <div className="example-card">
          <h3>useState</h3>
          <p>Aprende el hook más básico y fundamental de React</p>
          <a href="#useState" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useEffect</h3>
          <p>Maneja efectos secundarios y ciclo de vida</p>
          <a href="#useEffect" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useContext</h3>
          <p>Comparte estado global entre componentes</p>
          <a href="#useContext" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useReducer</h3>
          <p>Maneja estado complejo con acciones</p>
          <a href="#useReducer" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useRef</h3>
          <p>Referencias DOM y valores persistentes</p>
          <a href="#useRef" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useMemo</h3>
          <p>Optimización de cálculos costosos</p>
          <a href="#useMemo" className="example-link">
            Ver ejemplos →
          </a>
        </div>

        <div className="example-card">
          <h3>useCallback</h3>
          <p>Optimización de funciones memoizadas</p>
          <a href="#useCallback" className="example-link">
            Ver ejemplos →
          </a>
        </div>
      </section>

      <div id="useState">
        <UseStateExample />
      </div>

      <div id="useEffect">
        <UseEffectExample />
      </div>

      <div id="useContext">
        <UseContextExample />
      </div>

      <div id="useReducer">
        <UseReducerExample />
      </div>

      <div id="useRef">
        <UseRefExample />
      </div>

      <div id="useMemo">
        <UseMemoExample />
      </div>

      <div id="useCallback">
        <UseCallbackExample />
      </div>
    </div>
  );
};

export default Home;
