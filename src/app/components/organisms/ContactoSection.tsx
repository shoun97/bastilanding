'use client';

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LineaDecorativa from '../atoms/LineaDecorativa';

export default function ContactoSection() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('blandskron@gmail.com');
  };

  return (
    <Box
      sx={{
        color: 'white',
        py: 6,
        px: 3,
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Contacto
      </Typography>

      <LineaDecorativa />

      <Typography variant="body2" mb={3}>
        Déjame un mensaje o conéctate por redes. También puedes explorar más sobre mis proyectos, experiencia y formación.
      </Typography>

      {/* Formulario */}
      <Stack spacing={2}>
        <TextField
          fullWidth
          placeholder="Nombre completo"
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&::placeholder': { color: 'white' },
            },
          }}
          inputProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          placeholder="E-mail o Teléfono"
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&::placeholder': { color: 'white' },
            },
          }}
          inputProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          placeholder="Mensaje o consulta"
          multiline
          rows={3}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&::placeholder': { color: 'white' },
            },
          }}
          inputProps={{ style: { color: 'white' } }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: 99,
            py: 1.5,
            backgroundColor: '#1F2491',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#151A6D' },
          }}
        >
          Enviar Mensaje
        </Button>
      </Stack>

      {/* Email + Copiar */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <IconButton onClick={handleCopyEmail} sx={{ color: 'white' }}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2">blandskron@gmail.com</Typography>
      </Stack>

      {/* Redes Sociales */}
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <IconButton sx={{ color: 'white' }} aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }} aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }} aria-label="WhatsApp">
          <WhatsAppIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
