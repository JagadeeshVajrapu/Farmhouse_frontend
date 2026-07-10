'use client';

import { useEffect, useState } from 'react';

/** Tracks mobile nav open state via body class set in Navbar */
export function useMobileNavOpen(): boolean {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sync = () => {
      setIsOpen(document.body.classList.contains('mobile-nav-open'));
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isOpen;
}
