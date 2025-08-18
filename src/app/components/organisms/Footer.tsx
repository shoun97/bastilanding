"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import LineaDecorativa from "../atoms/LineaDecorativa";
import AnimacionHero from "../molecules/AnimacionHero";

const opciones = [
  {
    title: "Proyectos",
    iconSrc: "/icons/proyectos.gif",
  },
  {
    title: "Experiencia",
    iconSrc: "/icons/experiencia.gif",
  },
  {
    title: "Educación",
    iconSrc: "/icons/educacion.gif",
  },
];

export default function VerMasSection() {
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        backgroundColor: "#4c34a1ff",
        py: 6,
        px: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        ¿Te interesa ver más?
      </Typography>

      {/* Línea decorativa con símbolo */}
      <LineaDecorativa />

      <Typography sx={{ maxWidth: 320, mx: "auto", mb: 4 }}>
        Revisa a fondo mi trayectoria y descubramos juntos lo que podemos
        construir.
      </Typography>

      {/* Contenedor padre de los íconos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          border: "1px solid white",
          borderRadius: "16px",
          overflow: "hidden",
          maxWidth: 360,
          mx: "auto",
          mb: 5,
        }}
      >
        {opciones.map((item, idx) => (
          <Box
            key={item.title}
            sx={{
              flex: 1,
              borderLeft: idx !== 0 ? "1px solid white" : "none",
              py: 3,
              px: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Image src={item.iconSrc} alt={item.title} width={60} height={60} />
            <Typography>{item.title}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", height: "100%", width: "100%" }}>
          <AnimacionHero />
      </Box>
      <Typography variant="caption" sx={{ opacity: 0.6 }}>
        © 2025 Blandskron. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
