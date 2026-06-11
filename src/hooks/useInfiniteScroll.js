import {
  useEffect,
  useRef,
} from "react";

export default function useInfiniteScroll(
  callback,
  enabled = true
) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const node = observerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: "600px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [callback, enabled]);

  return observerRef;
}
