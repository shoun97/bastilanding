'use client';
import { Box } from '@mui/material';

export default function AnimatedGradientHero() {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          conic-gradient(
            from 90deg at 50% 50%,
            #06b6d4,
            #3b82f6,
            #1e3a8a,
            #06b6d4
          )
        `,
        backgroundSize: '200% 200%',
        animation: 'rotateGradient 20s linear infinite',
        filter: 'blur(40px)',
        opacity: 0.7,
        transform: 'scale(1.2)',
        '@keyframes rotateGradient': {
          '0%': { transform: 'rotate(0deg) scale(1.2)' },
          '100%': { transform: 'rotate(360deg) scale(1.2)' },
        },
      }}
    />
  );
}
