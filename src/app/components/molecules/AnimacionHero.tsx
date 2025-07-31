'use client';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function AnimacionHero() {
  return (
    <Box sx={{ width: 264, height: 55 }}>
      <Image src="/hero-icon.svg" alt="Animación Hero" width={264} height={55} />
    </Box>
  );
}
