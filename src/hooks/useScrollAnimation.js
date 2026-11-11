import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that uses IntersectionObserver to detect when an element
 * scrolls into view. Once visible, the element stays marked as visible
 * (one-shot trigger) so entrance animations only play once.
 *
 * @param {number} threshold - Visibility ratio (0–1) required to trigger.
 * @returns {[React.RefObject, boolean]} A ref to attach and the visibility flag.
 */
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return [ref, isVisible];
}
