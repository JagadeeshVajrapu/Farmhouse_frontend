'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPOptions {
  dependencies?: unknown[];
}

/**
 * Hook for GSAP scroll-triggered animations
 */
export function useGSAP(
  animationFn: (ctx: gsap.Context) => void,
  options: UseGSAPOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dependencies = [] } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(animationFn, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}

export { gsap, ScrollTrigger };
