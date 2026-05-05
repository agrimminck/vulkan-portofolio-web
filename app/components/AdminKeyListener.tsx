"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const SECRET = "adm";
const TIMEOUT_MS = 2000;

export default function AdminKeyListener() {
  const buffer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      buffer.current += e.key.toLowerCase();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { buffer.current = ""; }, TIMEOUT_MS);

      if (buffer.current.endsWith(SECRET)) {
        buffer.current = "";
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
