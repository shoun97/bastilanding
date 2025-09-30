'use client';

import { Box, Typography, styled } from '@mui/material';
import LineaDecorativa from '../atoms/LineaDecorativa';
import { useMemo } from 'react';

// --------------------------------------------------------------
// 1. Definición del Contenedor de Desplazamiento
//    - Oculta el scrollbar.
//    - Contiene la animación CSS Keyframes.
// --------------------------------------------------------------
const AutoScrollContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: '100%',
  // Definición de la animación de desplazamiento
  '@keyframes scroll-x': {
    '0%': { transform: 'translateX(0%)' },
    // El 100% debe mover el contenido por su propio ancho
    '100%': { transform: 'translateX(-100%)' },
  },
}));

// --------------------------------------------------------------
// 2. Definición de la Pista de Contenido
//    - Usa Flexbox para la disposición horizontal.
//    - Aplica la animación. Se duplica el contenido para un loop suave.
// --------------------------------------------------------------
const ScrollTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  // Usamos una cantidad de desplazamiento que garantiza el loop perfecto
  // (La duración puede ajustarse para ir más lento/rápido)
  animation: 'scroll-x 15s linear infinite', 
  // Nota: Duplicamos el contenido dentro para simular el loop continuo
  '& > *': {
    flexShrink: 0, // Evita que los ítems se compriman
    padding: '0 6px', // Espacio horizontal entre ítems
    width: 'auto',
    textAlign: 'center',
  },
}));

// --------------------------------------------------------------
// 3. Componente Principal con el nuevo Marquee
// --------------------------------------------------------------
export default function HighlightResultados() {
    
  // El contenido se duplica en el array para crear un loop visualmente infinito.
  const metrics = [
    { value: '+30', label: 'proyectos completados' },
    { value: '★ 4.9', label: 'Promedio en feedback' },
    { value: '95%', label: 'Éxito en despliegues' },
    { value: '10K', label: 'Líneas de código/mes' },
  ];
  
  // Duplicamos el array para el efecto de scroll infinito.
  const scrollItems = useMemo(() => [...metrics, ...metrics], [metrics]);


  return (
    <Box
      sx={{
        bgcolor: 'linear-gradient(180deg, #1E2A78 0%, #2C3E90 100%)',
        color: 'white',
        textAlign: 'center',
        px: 4,
        py: 6,
        borderRadius: 2,
        // Agregamos un ligero degradado en los bordes para un efecto más pulido
        maskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)'
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Lo que dicen los resultados
      </Typography>

      <LineaDecorativa />

      <Typography variant="body2" sx={{ mb: 4 }}>
        Logros visibles. Opiniones reales.
      </Typography>

      <AutoScrollContainer>
        <ScrollTrack>
          {
            //@ts-ignore
            scrollItems.map((item, index) => (
            <Box key={`metric-${index}`} >
              <Typography variant="h4" fontWeight="bold">{item.value}</Typography>
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </ScrollTrack>
      </AutoScrollContainer>
    </Box>
  );
}