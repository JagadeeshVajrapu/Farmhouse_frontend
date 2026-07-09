'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SERVICES } from '@/lib/services-data';

export function ServiceStickyNav() {
  const [activeSlug, setActiveSlug] = useState(SERVICES[0].slug);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SERVICES.forEach((service) => {
      const el = document.getElementById(`service-${service.slug}`);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSlug(service.slug);
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="sticky top-20 z-40 hidden border-b border-gold/10 bg-[#0a0a0a]/90 backdrop-blur-xl lg:block">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <a
                href={`#service-${service.slug}`}
                className={cn(
                  'whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-wider transition-all duration-300',
                  activeSlug === service.slug
                    ? 'bg-gold/15 text-gold'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
