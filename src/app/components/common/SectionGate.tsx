"use client";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function SectionGate({
  stage,
  showAt,
  fallback,
  children,
}: {
  stage: number;
  showAt: number;
  fallback: ReactNode;
  children: ReactNode;
}) {
  if (stage < showAt) return <Box component="section">{fallback}</Box>;
  return <Box component="section">{children}</Box>;
}
