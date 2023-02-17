import { useRef, useState } from 'react';

const useMedia = (...breakpoints: [string, string][]) => {
  const [media, setMedia] = useState<Record<string, boolean>>({});
  const mounted = useRef(false);

  // Media must be checked before component renders to avoid
  // unnecessary renders and state updates
  if (!mounted.current) {
    const initialMedia: Record<string, boolean> = {};
    breakpoints.forEach(([name, breakpoint]) => {
      if (typeof window === 'undefined') return;
      const browserMedia = window.matchMedia(breakpoint);
      initialMedia[name] = browserMedia.matches;
      browserMedia.onchange = () => {
        setMedia(prev => ({
          ...prev,
          [name]: browserMedia.matches,
        }));
      };
    });
    setMedia(initialMedia);
    mounted.current = true;
  }

  return media;
};

export default useMedia;
