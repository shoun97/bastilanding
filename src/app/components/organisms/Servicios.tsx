'use client';
import { Box, Stack, Typography } from '@mui/material';
import TituloServicios from '../atoms/TituloServicios';
import ServiceCard from '../molecules/ServiceCard';

import SchoolIcon from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TerminalIcon from '@mui/icons-material/Terminal';

const servicios = [
  {
    icon: <SchoolIcon sx={{ color: 'white' }} />,
    title: 'Educador',
    subtitle: 'Formación que convierte conocimiento en acción',
    description:
      'Mentorías, talleres y cursos diseñados para desarrollar talento técnico con visión de futuro. Enseño con claridad, foco práctico y herramientas actuales.',
    image: '/images/educador.png',
    videoSrc: '/videos/educador.mp4',
  },
  {
    icon: <PsychologyIcon sx={{ color: 'white' }} />,
    title: 'Consultor',
    subtitle: 'Acompañamiento estratégico que impulsa el cambio',
    description:
      'Te ayudo a tomar decisiones acertadas con visión de negocio. Diagnóstico, innovación y acompañamiento en procesos clave para tu organización.',
    image: '/images/consultor.png',
    videoSrc: '/videos/consultor.mp4',
  },
  {
    icon: <TerminalIcon sx={{ color: 'white' }} />,
    title: 'Desarrollador',
    subtitle: 'Soluciones web eficientes, escalables y sostenibles',
    description:
      'Desarrollo fluido de aplicaciones modernas, basadas en tecnologías robustas, con foco en rendimiento, UX y crecimiento continuo.',
    image: '/images/desarrollador.png',
    videoSrc: '/videos/desarrollador.mp4',
  },
];

export default function Servicios() {
  return (
    <Box
      sx={{
        position: 'relative',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: '#20339F',
      }}
    >
      <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>

        <Stack spacing={4}>
          {servicios.map((servicio, idx) => (
            <>
                <Box display="flex" alignItems="center" gap={1} justifyContent="center" mb={1}>
                    {servicio.icon}
                    <Typography variant="h6" color="white">
                        {servicio.title}
                    </Typography>
                </Box>
                <div style={{marginTop: '80px'}}/>
                <ServiceCard key={idx} {...servicio} />
            </>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
