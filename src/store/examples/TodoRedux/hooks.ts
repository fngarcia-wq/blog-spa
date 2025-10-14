/**
 * 🪝 Custom Redux Hooks
 */

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// ============================================
// 🪝 HOOKS TIPADOS
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Crear hooks tipados
 * - Evita tener que tipar cada uso de useSelector y useDispatch
 * - Proporciona autocompletado automático
 * - Previene errores de tipos
 */

// Hook tipado para dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook tipado para selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ============================================
// 📝 USO EN COMPONENTES
// ============================================

/**
 * Antes (sin tipos):
 * const dispatch = useDispatch();
 * const todos = useSelector((state: RootState) => state.todos.todos);
 * 
 * Después (con tipos):
 * const dispatch = useAppDispatch();
 * const todos = useAppSelector(state => state.todos.todos); // ✅ Autocompletado!
 */
