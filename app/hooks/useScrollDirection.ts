"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 5) {
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const diff = Math.abs(y - lastY);
          if (diff > threshold) {
            setDirection(y > lastY ? "down" : "up");
            lastY = y;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
