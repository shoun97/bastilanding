'use client';
import { Box, Stack } from '@mui/material';
import TituloServicios from '../atoms/TituloServicios';
import Servicios from "@/components/organisms/Servicios";

export default function ServiciosSections() {
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <TituloServicios />
        </Box>

        <Servicios></Servicios>
      </Stack>
    </Box>
  );
}
