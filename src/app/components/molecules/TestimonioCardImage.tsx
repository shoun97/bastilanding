'use client';

import { Box, Typography, IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

interface TestimonioCardProps {
  nombre: string;
  cargo: string;           
  testimonio: string;
  imagen: string;           
  linkedinUrl?: string;
  facebookUrl?: string;
}

export default function TestimonioCardRightImage({
  nombre,
  cargo,
  testimonio,
  imagen,
  linkedinUrl,
  facebookUrl,
}: TestimonioCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        alignItems: 'center',
        gap: { xs: 3, md: 4 },
        p: { xs: 3, md: 4 },
        width: "100%",
        color: '#fff',
        background: 'transparent',
      }}
    >
      {/* Glow detrás para dar profundidad al lado de la imagen */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: -80, md: -60 },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { xs: 220, md: 320 },
          height: { xs: 220, md: 320 },
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(79,143,234,0.25) 0%, rgba(79,143,234,0) 60%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Columna izquierda: texto */}
      <Box sx={{ zIndex: 1, pr: { md: 2 }, marginRight: "30%" }}>
        <Typography
          component="blockquote"
          sx={{
            m: 0,
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.92)',
            fontStyle: 'italic',
            position: 'relative',
            // Comillas decorativas
            '&::before': {
              content: '"“"',
              position: 'absolute',
              left: -10,
              top: -6,
              fontSize: { xs: 28, md: 34 },
              lineHeight: 1,
              color: 'rgba(255,255,255,0.25)',
            },
          }}
        >
          {testimonio}
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontWeight: 600,
            fontSize: 14,
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          — {nombre}, {cargo}
        </Typography>

        <Stack direction="row" spacing={1.5} mt={2}>
          {linkedinUrl && (
            <IconButton
              component="a"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <LinkedInIcon sx={{ color: '#0D0D0D' }} />
            </IconButton>
          )}
          {facebookUrl && (
            <IconButton
              component="a"
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: '#fff',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <FacebookIcon sx={{ color: '#0D0D0D' }} />
            </IconButton>
          )}
        </Stack>
      </Box>

      {/* Columna derecha: imagen recortada */}
      <Box
        sx={{
          position: 'absolute',
          justifySelf: { md: 'end' },
          width: { xs: '100%', md: 260 },
          height: { xs: 260, md: 340 },
          // Mantener a la derecha y que no se deforme
          flexShrink: 0,
        }}
      >
        <Image
          src={imagen}
          alt={nombre}
          fill
          priority
          style={{ objectFit: 'contain', objectPosition: 'right center' }}
          sizes="(max-width: 900px) 100vw, 260px"
        />
      </Box>
    </Box>
  );
}
