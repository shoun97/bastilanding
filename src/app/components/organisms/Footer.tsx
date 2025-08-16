'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import LineaDecorativa from '../atoms/LineaDecorativa';

const opciones = [
  {
    title: 'Proyectos',
    iconSrc: '/icons/proyectos.svg',
  },
  {
    title: 'Experiencia',
    iconSrc: '/icons/experiencia.svg',
  },
  {
    title: 'Educación',
    iconSrc: '/icons/educacion.svg',
  },
];

export default function VerMasSection() {
  return (
    <Box
      sx={{
        color: 'white',
        textAlign: 'center',
        py: 6,
        px: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        ¿Te interesa ver más?
      </Typography>

      {/* Línea decorativa con símbolo */}
      <LineaDecorativa/>

      <Typography sx={{ maxWidth: 320, mx: 'auto', mb: 4 }}>
        Revisa a fondo mi trayectoria y descubramos juntos lo que podemos construir.
      </Typography>

      {/* Contenedor padre de los íconos */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          border: '1px solid white',
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: 360,
          mx: 'auto',
          mb: 5,
        }}
      >
        {opciones.map((item, idx) => (
          <Box
            key={item.title}
            sx={{
              flex: 1,
              borderLeft: idx !== 0 ? '1px solid white' : 'none',
              py: 3,
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Image
              src={item.iconSrc}
              alt={item.title}
              width={32}
              height={32}
            />
            <Typography>{item.title}</Typography>
          </Box>
        ))}
      </Box>

      {/* Logo + derechos */}
      <Image
        src="/logo-blandskron.svg"
        alt="Blandskron Logo"
        width={28}
        height={28}
        style={{ margin: '0 auto 8px' }}
      />
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Blands kron
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.6 }}>
        © 2025 Velchi. Todos los derechos reservados.
      </Typography>
    </Box>
  );
}
