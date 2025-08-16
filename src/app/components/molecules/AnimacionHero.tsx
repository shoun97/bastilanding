'use client';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function AnimacionHero() {
  return (
    <Box sx={{
      display: "flex"
    }}>
      <Image src="/logo_bland.png" alt="Animación Hero" width={150} height={150} />
    </Box>
  );
}
