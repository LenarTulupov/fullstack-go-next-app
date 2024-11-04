import { useEffect } from "react";

export default function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if(isLocked) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => {
      document.body.classList.remove('no-scroll');
    }
  }, [isLocked])
};
