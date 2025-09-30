'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LineaDecorativa from '../atoms/LineaDecorativa';
import { postContact } from '@/integrations';

export default function ContactoSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    msg: string;
  }>({ open: false, severity: 'success', msg: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('blandskron@gmail.com');
    setToast({ open: true, severity: 'success', msg: 'Correo copiado 👍' });
  };

  const emailOk = useMemo(() => {
    // valida email simple
    const r =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return r.test(email.trim());
  }, [email]);

  const isValid = name.trim().length >= 2 && emailOk && message.trim().length >= 5;

  const resetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || loading) return;
    setLoading(true);
    try {
      await postContact({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      resetForm();
      setToast({
        open: true,
        severity: 'success',
        msg: '¡Gracias! Recibí tu mensaje y te responderé pronto.',
      });
    } catch (err: any) {
      setToast({
        open: true,
        severity: 'error',
        msg:
          err?.response?.data?.detail ||
          'No pude enviar tu mensaje. Intenta nuevamente.',
      });
    } finally {
      setLoading(false);
    }
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
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="filled"
            required
            error={name !== '' && name.trim().length < 2}
            helperText={
              name !== '' && name.trim().length < 2 ? 'Ingresa tu nombre' : ' '
            }
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
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            variant="filled"
            required
            error={email !== '' && !emailOk}
            helperText={
              email !== '' && !emailOk ? 'Correo inválido' : ' '
            }
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="filled"
            required
            error={message !== '' && message.trim().length < 5}
            helperText={
              message !== '' && message.trim().length < 5
                ? 'Escribe al menos 5 caracteres'
                : ' '
            }
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
            type="submit"
            variant="contained"
            disabled={!isValid || loading}
            sx={{
              borderRadius: 99,
              py: 1.5,
              backgroundColor: '#1F2491',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#151A6D' },
            }}
            startIcon={
              loading ? <CircularProgress size={18} /> : undefined
            }
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </Button>
        </Stack>
      </Box>

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

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
