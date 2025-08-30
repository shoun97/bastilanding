"use client";
import { Box, Stack, Typography } from "@mui/material";
import ServiceCard from "../molecules/ServiceCard";

const servicios = [
  {
    icon: "/icons/educador.gif",
    title: "Educador",
    subtitle: "Formación que convierte conocimiento en acción",
    description:
      "Mentorías, talleres y cursos diseñados para desarrollar talento técnico con visión de futuro. Enseño con claridad, foco práctico y herramientas actuales.",
    image: "/images/educador.png",
    videoSrc: "/videos/educador.mp4",
  },
  {
    icon: "/icons/consultor.gif",
    title: "Consultor",
    subtitle: "Acompañamiento estratégico que impulsa el cambio",
    description:
      "Te ayudo a tomar decisiones acertadas con visión de negocio. Diagnóstico, innovación y acompañamiento en procesos clave para tu organización.",
    image: "/images/consultor.png",
    videoSrc: "/videos/consultor.mp4",
  },
  {
    icon: "/icons/desarrollador.gif",
    title: "Desarrollador",
    subtitle: "Soluciones web eficientes, escalables y sostenibles",
    description:
      "Desarrollo fluido de aplicaciones modernas, basadas en tecnologías robustas, con foco en rendimiento, UX y crecimiento continuo.",
    image: "/images/desarrollador.png",
    videoSrc: "/videos/desarrollador.mp4",
  },
];

export default function Servicios() {
  // Queremos que "Desarrollador" sea el héroe que va arriba y ocupa todo el ancho en tablet
  const heroTitle = "Desarrollador";
  const heroIdx = servicios.findIndex((s) => s.title === heroTitle);

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        minHeight: "100vh",
        backgroundColor: "#20339F",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, sm: 4, md: 6 },
          // Móvil: 1 columna | Tablet (sm/md): 2 columnas | Desktop (lg+): 3 columnas
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0,1fr))",
            lg: "repeat(3, minmax(0,1fr))",
          },
        }}
      >
        {servicios.map((servicio, idx) => {
          const isHero = idx === heroIdx;
          return (
            <Box
              key={servicio.title}
              component="section"
              sx={{
                // En tablet (sm/md), el héroe ocupa toda la fila (1 / -1)
                gridColumn: {
                  xs: "auto",
                  sm: isHero ? "1 / -1" : "auto",
                  md: isHero ? "1 / -1" : "auto",
                  lg: "auto", // En desktop dejamos 3 columnas normales
                },
                // En tablet, forzamos que el héroe vaya primero
                order: {
                  xs: idx,
                  sm: isHero ? 0 : 1,
                  md: isHero ? 0 : 1,
                  lg: idx,
                },
              }}
            >
              <Stack spacing={0} alignItems="center">
                {/* Título arriba */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "288px", // 👈 ancho fijo
                    height: "410px", // 👈 alto fijo
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                    sx={{
                      mb: { xs: 10, md: 10 },
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <img
                      width={50}
                      height={50}
                      src={servicio.icon}
                      alt={`${servicio.title} icon`}
                    />
                    <Typography variant="h6" color="white">
                      {servicio.title}
                    </Typography>
                  </Box>

                  {/* Card abajo */}
                  <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <ServiceCard {...servicio} />
                  </Box>
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
