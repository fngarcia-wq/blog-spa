import { useState, useCallback } from 'react';

// ✅ BUENA PRÁCTICA: Hook personalizado con TypeScript
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

// ✅ BUENA PRÁCTICA: Hook con valor inicial opcional
export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState<number>(initialValue);

  // ✅ BUENA PRÁCTICA: Usar useCallback para funciones que se pasan como props
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const handleSetCount = useCallback((value: number) => {
    setCount(value);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount: handleSetCount
  };
};

// ❌ MALA PRÁCTICA: Hook sin TypeScript ni optimizaciones
export const useBadCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  // ❌ MALA PRÁCTICA: Funciones recreadas en cada render
  const increment = () => {
    setCount(count + 1); // ❌ MALA PRÁCTICA: No usar función de actualización
  };

  const decrement = () => {
    setCount(count - 1); // ❌ MALA PRÁCTICA: Dependencia obsoleta
  };

  const reset = () => {
    setCount(0); // ❌ MALA PRÁCTICA: No respetar valor inicial
  };

  return { count, increment, decrement, reset };
};