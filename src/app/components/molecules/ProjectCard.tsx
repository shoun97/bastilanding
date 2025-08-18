"use client";

import { Box, Typography, Stack } from "@mui/material";
import RemoteImage from "@/components/RemoteImage";

export interface ProjectCardProps {
  logoSrc: string;
  title: string;
  description: string;
  tags: string[];
  /** "vertical" = logo arriba (por defecto). "horizontal" = logo a la izquierda */
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
    <Box
      sx={{
        position: "relative",
        borderRadius: "40px",
        border: "1px solid rgba(255, 255, 255, 0.50)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "40px",
          padding: "1px",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        },
        background: "var(--primary-blandskron, #20339F)",
        boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.25)",
        color: "#fff",
        overflow: "hidden",

        width: isHorizontal ? "100%" : 288,
        maxWidth: isHorizontal ? "100%" : 288,
        height: isHorizontal ? "auto" : 300,

        // Para centrar en vertical, pero en horizontal usamos padding
        display: isHorizontal ? "block" : "flex",
        alignItems: isHorizontal ? undefined : "center",
        justifyContent: isHorizontal ? undefined : "center",
        p: isHorizontal ? 2 : 0,
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
      {isHorizontal ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ position: "relative", zIndex: 1, textAlign: "left" }}
        >
          {/* Logo a la izquierda */}
          <Box
            sx={{
              width: 64,
              height: 64,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: 3,
              bgcolor: "rgba(0,0,0,.12)",
              border: "1px solid rgba(255,255,255,.16)",
            }}
          >
{/*             <RemoteImage
              src={logoSrc}
              alt={title}
              width={56}
              height={56}
              style={{ objectFit: "contain", borderRadius: 10 }}
            /> */}
          </Box>

          {/* Texto a la derecha */}
          <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, letterSpacing: ".08em", opacity: 0.95 }}
            >
              {title.toUpperCase()}
            </Typography>

            <Typography
              sx={{
                fontSize: 14.5,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.90)",
                textShadow: "0 2px 4px rgba(0,0,0,.25)",
              }}
            >
              {description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {tags.map((t) => (
                <Box
                  key={t}
                  sx={{
                    px: 1.4,
                    py: 0.5,
                    marginTop: "3px",
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
        </Stack>
      ) : (
        <Stack
          spacing={1.5}
          alignItems="center"
          sx={{ position: "relative", zIndex: 1, textAlign: "center", px: 2 }}
        >
          {/* Logo arriba */}
          <Box sx={{ width: 40, height: 40, position: "relative" }}>
{/*             <RemoteImage
              src={logoSrc}
              alt={title}
              width={96}
              height={96}
              style={{ objectFit: "cover", borderRadius: 12 }}
            /> */}
          </Box>

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, letterSpacing: ".08em", opacity: 0.95 }}
          >
            {title.toUpperCase()}
          </Typography>

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

          <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
            {tags.map((t) => (
              <Box
                key={t}
                sx={{
                  px: 1.4,
                  py: 0.5,
                  marginTop: "2px",
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
      )}

      {/* brillos suaves en esquinas */}
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
