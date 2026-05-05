"use client";

import { useEffect, useRef } from "react";

const SECRET = "idy";
const TIMEOUT_MS = 2000;

export default function AdminKeyListener() {
  const buffer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      buffer.current += e.key.toLowerCase();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { buffer.current = ""; }, TIMEOUT_MS);

      if (buffer.current.endsWith(SECRET)) {
        buffer.current = "";
        window.location.href = "/admin";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
