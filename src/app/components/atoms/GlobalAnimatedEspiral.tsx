// components/atoms/GlobalSwirlBackground.tsx
"use client";
import Box from "@mui/material/Box";
import AnimatedEspiral from "./AnimatedEspiral"; 

export default function GlobalSwirlBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,               
        pointerEvents: "none",   
      }}
    >
      <AnimatedEspiral speed="16s" saturation={1.25} blur={60} />
    </Box>
  );
}
