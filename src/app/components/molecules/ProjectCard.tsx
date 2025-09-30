'use client';

import { Box, Typography, Stack } from "@mui/material";
import RemoteImage from "@/components/RemoteImage";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  logoSrc: string;
  title: string;
  description: string;
  tags: string[];
  layout?: "vertical" | "horizontal";
}

export default function ProjectCard({
  logoSrc,
  title,
  description,
  tags,
  layout = "vertical",
}: ProjectCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
<div className={styles.cardFigma}>
  <div className={styles.watermark} />

  <div className="flex h-full w-full flex-col items-center text-center relative z-[1]">
    {/* Logo arriba */}
    <div style={{ width: 90, height: 90, borderRadius: 12, overflow: "hidden", marginTop: 4 }}>
      <RemoteImage src={logoSrc} alt={title} width={90} height={90} style={{ objectFit: "cover" }} />
    </div>

    {/* Título */}
    <Typography sx={{ mt: 0.5, fontWeight: 700, fontSize: 18, lineHeight: 1.2, px: 1 }}>
      {title}
    </Typography>

    {/* Descripción (clamp) */}
    <Typography
      sx={{
        mt: 0.5,
        px: 1,
        maxWidth: 260,
        fontSize: 13,
        lineHeight: 1.35,
        color: "rgba(255,255,255,.90)",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {description}
    </Typography>

    {/* SPACER: empuja tags al fondo */}
    <div style={{ flex: 1 }} />

    {/* Tags */}
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ pb: 0.5 }}>
      {tags.map((t) => (
        <Box key={t} sx={{ px: 1.1, py: 0.35, borderRadius: 999, fontSize: 12, fontWeight: 500,
          bgcolor: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", mt: "2px" }}>
          {t}
        </Box>
      ))}
    </Stack>
  </div>

  <div className={styles.glowTL} />
  <div className={styles.glowBR} />
</div>
  );
}
