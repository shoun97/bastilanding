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
  facebookUrl
}: TestimonioCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to right, #0D0D0D, #1E2A78)',
        borderRadius: 2,
        overflow: 'hidden',
        p: 4,
        gap: 2,
        color: '#fff',
      }}
    >
      {/* Texto a la izquierda */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontStyle: 'italic',
            fontSize: '16px',
            mb: 2,
          }}
        >
          “{testimonio}”
        </Typography>

        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
          — {nombre}, {cargo}
        </Typography>

        <Stack direction="row" spacing={1} mt={2}>
          {linkedinUrl && (
            <IconButton href={linkedinUrl} target="_blank">
              <LinkedInIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
          {facebookUrl && (
            <IconButton href={facebookUrl} target="_blank">
              <FacebookIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </Stack>
      </Box>

      {/* Imagen a la derecha */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '100%', md: '200px' },
          height: 'auto',
          minHeight: '240px',
          flexShrink: 0,
        }}
      >
        <Image
          src={imagen}
          alt={nombre}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
}
