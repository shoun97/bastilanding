'use client';

import { Box } from '@mui/material';
import Image from 'next/image';

interface ImageClusterProps {
  images: { src: string; alt?: string }[];
}

export default function ImageCluster({ images }: ImageClusterProps) {
  if (images.length < 3) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 300, sm: 400 },
        height: { xs: 250, sm: 400 },
        mx: 'auto',
      }}
    >
      {/* Top Left Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Image src={images[0].src} alt={images[0].alt || ''} width={400} height={400} style={{ width: '100%', height: 'auto' }} />
      </Box>

      {/* Right Image (center vertical) */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: 0,
          width: '50%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Image src={images[1].src} alt={images[1].alt || ''} width={400} height={400} style={{ width: '100%', height: 'auto' }} />
      </Box>

      {/* Bottom Left Image */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: '65%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Image src={images[2].src} alt={images[2].alt || ''} width={400} height={400} style={{ width: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
}
