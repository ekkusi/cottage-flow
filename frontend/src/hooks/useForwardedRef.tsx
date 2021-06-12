import { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

function useForwardedRef<T>(
  ...refs: ForwardedRef<any>[]
): MutableRefObject<T | null> {
  const targetRef = useRef(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export default useForwardedRef;
