import { useEffect, useState } from 'react';

/**
 * Custom hook that tracks which `<section id="...">` is currently
 * in the viewport, powering active-state highlights in the navbar.
 *
 * Uses a negative top root-margin so the navbar area is excluded
 * from the intersection calculation.
 *
 * @returns {string} The `id` of the currently active section.
 */
export function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return active;
}
