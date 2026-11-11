import { useEffect, useState } from 'react';

/**
 * Custom hook that detects the user's `prefers-reduced-motion` OS setting.
 * Returns `true` when reduced motion is preferred, allowing components
 * to disable or simplify animations for accessibility.
 *
 * @returns {boolean} Whether the user prefers reduced motion.
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
