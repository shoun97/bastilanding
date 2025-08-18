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
    <Box sx={{ px: { xs: 2, md: 6 }, py: 10, background: 'linear-gradient(178deg, #20339F 0.64%, #1A2668 51.28%, #20339F 94.27%);' }}>
      <Grid container spacing={4}>
        {/* Columna izquierda: Highlight */}
        <Grid item xs={12} md={4}>
          <HighlightResultados />
        </Grid>

        {/* Columna derecha: Testimonios */}
        <TestimoniosCarouselFade items={testimonios}/>
      </Grid>
    </Box>
  );
}
