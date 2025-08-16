"use client";

import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import RemoteImage from "@/components/RemoteImage";

export interface ProjectCardProps {
  logoSrc: string;
  title: string;
  description: string;
  tags: string[];
}

export default function ProjectCard({
  logoSrc,
  title,
  description,
  tags,
}: ProjectCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: '40px',
        border: "1px solid rgba(255, 255, 255, 0.50)",
        
        // ==== borde degradado ====
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: 6,
          padding: "1px",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },

        // ==== fondo ====
        background: "var(--primary-blandskron, #20339F)",
        boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.25)",
        color: "#fff",
        width: "288px",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Marca de agua muy tenue */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: 'url("/watermark.svg") center/60% no-repeat',
          opacity: 0.05,
          pointerEvents: "none",
        }}
      />

      {/* Contenido */}
      <Stack
        spacing={1.5}
        alignItems="center"
        sx={{ position: "relative", zIndex: 1, textAlign: "center", px: 2 }}
      >
        {/* Logo */}
        <Box sx={{ width: 40, height: 40, position: "relative" }}>
{/*           <RemoteImage
            src={logoSrc}
            alt={title}
            width={96}
            height={96}
            style={{ objectFit: "cover", borderRadius: 12 }}
          /> */}
        </Box>

        {/* Título */}
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            letterSpacing: ".08em",
            opacity: 0.95,
          }}
        >
          {title.toUpperCase()}
        </Typography>

        {/* Descripción */}
        <Typography
          sx={{
            maxWidth: 280,
            fontSize: 14.5,
            lineHeight: 1.5,
            color: "rgba(255,255,255,.90)",
            textShadow: "0 2px 4px rgba(0,0,0,.25)",
          }}
        >
          {description}
        </Typography>

        {/* Chips */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {tags.map((t) => (
            <Box
              key={t}
              sx={{
                px: 1.4,
                py: 0.5,
                borderRadius: 999,
                fontSize: 12.5,
                fontWeight: 700,
                bgcolor: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.16)",
                boxShadow: "0 2px 10px rgba(0,0,0,.25)",
                backdropFilter: "blur(6px)",
              }}
            >
              {t}
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* brillos suaves en esquinas (opcional) */}
      <Box
        sx={{
          position: "absolute",
          width: 240,
          height: 240,
          top: -120,
          left: -120,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(111,88,255,.25), transparent 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          bottom: -110,
          right: -110,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(0,190,255,.18), transparent 70%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
