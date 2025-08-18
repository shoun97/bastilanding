'use client';

import { Box, Typography, Grid } from '@mui/material';
import LineaDecorativa from '../atoms/LineaDecorativa';

export default function HighlightResultados() {
  return (
    <Box
      sx={{
        bgcolor: 'linear-gradient(180deg, #1E2A78 0%, #2C3E90 100%)',
        color: 'white',
        textAlign: 'center',
        px: 4,
        py: 6,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Lo que dicen los resultados
      </Typography>

      <LineaDecorativa />

      <Typography variant="body2" sx={{ mb: 4 }}>
        Logros visibles. Opiniones reales.
      </Typography>

      <marquee>
        <div style={{
          display: "flex",
          gap: "12px"
        }}>
            <div>
              <Typography variant="h4" fontWeight="bold">+30</Typography>
              <Typography variant="body2">proyectos completados</Typography>
            </div>
            <div item xs={6} md={3}>
              <Typography variant="h4" fontWeight="bold">★ 4.9</Typography>
              <Typography variant="body2">Promedio en feedback</Typography>
            </div>
            <div>
              <Typography variant="h4" fontWeight="bold">+30</Typography>
              <Typography variant="body2">proyectos completados</Typography>
            </div>
            <div item xs={6} md={3}>
              <Typography variant="h4" fontWeight="bold">★ 4.9</Typography>
              <Typography variant="body2">Promedio en feedback</Typography>
            </div>
        </div>
      </marquee>
    </Box>
  );
}
