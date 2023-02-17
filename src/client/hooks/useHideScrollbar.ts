import { useEffect } from "react";

export const useHideScrollbar = (hide: boolean) => {
  useEffect(() => {
    if (hide) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.removeProperty('overflow');
    }
  }, [hide]);
};