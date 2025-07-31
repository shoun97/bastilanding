'use client';

import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ProfileCard() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        overflowX: 'auto',
      }}
    >
      {/* Imagen a la izquierda */}
      <Box
        sx={{
          width: '212px',
          height: '345px',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <Image
          src="/bastian.png"
          alt="Bastián Landskron"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      {/* Contenido a la derecha */}
      <Box sx={{minWidth: 0 }}>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.90)',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Manrope',
            fontSize: '44px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '107%',
          }}
        >
          Bastián
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.90)',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Manrope',
            fontSize: '32px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: '95%',
            mb: 2,
          }}
        >
          Landskron
        </Typography>
        <Typography
          sx={{
            color: 'var(--primary-contrastText, #ffffff)',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Manrope',
            fontSize: '12px',
            fontWeight: 300,
            fontStyle: 'normal',
            lineHeight: '157%',
            letterSpacing: '0.1px',
          }}
        >
          Combino mi experiencia en desarrollo web con la vocación de enseñar
          para construir soluciones eficientes y formar talento con visión de futuro.
        </Typography>

        {/* Íconos sociales */}
        <Stack direction="row" spacing={2} mt={3}>
          <IconButton href="https://github.com/" target="_blank">
            <GitHubIcon sx={{ color: '#fff' }} />
          </IconButton>
          <IconButton href="https://wa.me/56912345678" target="_blank">
            <WhatsAppIcon sx={{ color: '#fff' }} />
          </IconButton>
          <IconButton href="https://linkedin.com/" target="_blank">
            <LinkedInIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Stack>

        {/* Botón de descarga */}
        <Button
          variant="contained"
          sx={{
            borderRadius: "360px",
            display: "flex",
            padding: "4px 10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
            backgroundColor: "transparent"
          }}
          href="/CV_BastianLandskron.pdf"
          download
        >
          Descargar CV
        </Button>
      </Box>
    </Box>
  );
}
