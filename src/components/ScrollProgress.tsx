"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const h = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      el.style.width = `${p}%`;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div ref={ref} className="a-progress" />;
}
