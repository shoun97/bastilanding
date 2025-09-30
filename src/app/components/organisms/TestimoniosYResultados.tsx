'use client';

import { Box, Grid } from '@mui/material';
import HighlightResultados from '../molecules/HighlightResultados';
import TestimonioCardRightImage from '../molecules/TestimonioCardImage';
import TestimoniosCarouselFade from './TestimonioCarouselFade';

const testimonios = [
  {
    nombre: 'Camila R.',
    cargo: 'CEO en StartupEdu',
    testimonio: 'Bastián nos ayudó a implementar un CRM desde cero y automatizar procesos en tiempo récord. Profesional, claro y muy comprometido.',
    imagen: '/images/mujerformal.png',
    linkedinUrl: 'https://linkedin.com/',
    facebookUrl: 'https://facebook.com/',
  },
  {
    nombre: 'Mónica L.',
    cargo: 'Directora Comercial',
    testimonio: 'Gracias al programa, nuestro equipo logró mejores resultados en menor tiempo. Muy recomendable.',
    imagen: '/images/mujersonriente.png',
    linkedinUrl: 'https://linkedin.com/',
    facebookUrl: 'https://facebook.com/',
  },
  {
    nombre: 'Rodrigo A.',
    cargo: 'Socio en XYZ Consultores',
    testimonio: 'El impacto fue inmediato. Mejor comunicación interna y procesos más ágiles.',
    imagen: '/images/hombrenegocios.png',
    linkedinUrl: 'https://linkedin.com/',
    facebookUrl: 'https://facebook.com/',
  },
];

export default function TestimoniosYResultadosSection() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 10,
        background:
          "linear-gradient(178deg, #20339F 0.64%, #1A2668 51.28%, #20339F 94.27%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // centra horizontalmente
        alignItems: "center", 
        gap: 4, // espacio entre columnas
      }}
    >
      {/* Columna izquierda: Highlight */}
      <Box
        sx={{
          flex: { xs: "0 0 auto", md: "0 0 33%" }, // ocupa 1/3 en desktop
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <HighlightResultados />
      </Box>

      {/* Columna derecha: Testimonios */}
      <Box
        sx={{
          flex: { xs: "0 0 auto", md: "0 0 67%" }, // ocupa 2/3 en desktop
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end", 
        }}
      >
        <TestimoniosCarouselFade items={testimonios} />
      </Box>
    </Box>
  );
}


