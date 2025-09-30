"use client";
import { useEffect, useState } from "react";

export function useProceduralLoader(delaysMs: number[] = []) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let t = 0;
    delaysMs.reduce((acc, ms, i) => {
      t += ms;
      const id = setTimeout(() => {
        if (!cancelled) setStage(i + 1);
      }, t);
      return [...acc, id];
    }, [] as NodeJS.Timeout[]);
    return () => { cancelled = true; };
  }, [delaysMs.join(",")]);
  return stage;
}
