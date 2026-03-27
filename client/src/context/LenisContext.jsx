import { createContext, useContext } from 'react';

/**
 * LenisContext — share the Lenis instance tree-wide.
 * Any component can call useLenisContext() to access scroll methods.
 */
export const LenisContext = createContext(null);

export function useLenisContext() {
  return useContext(LenisContext);
}
