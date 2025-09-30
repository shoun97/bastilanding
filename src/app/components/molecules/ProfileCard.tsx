"use client";

import { Box, Button, Typography, Stack, IconButton } from "@mui/material";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function ProfileCard() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        overflowX: "auto",
      }}
    >
      {/* Imagen a la izquierda */}
      <Box
        sx={{
          width: "212px",
          height: "345px",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src="/bastian_encachado.png"
          alt="Bastián Landskron"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      {/* Contenido a la derecha */}
      <Box
        sx={{
          minWidth: 0,
          maxWidth: { xs: "100%", md: 520 }, 
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1, sm: 1.5, md: 2 }, 
        }}
      >
        {/* Nombre */}
        <Typography
          component="h1"
          sx={{
            color: "rgba(255, 255, 255, 0.90)",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Manrope",
            fontSize: { xs: 32, sm: 38, md: 44 }, 
            fontWeight: 400,
            lineHeight: { xs: "108%", md: "107%" },
          }}
        >
          Bastián{" "}
          <Box
            component="span"
            sx={{
              display: { xs: "block", sm: "inline" }, 
              fontSize: { xs: 24, sm: 28, md: 32 },
              lineHeight: { xs: "98%", md: "95%" },
            }}
          >
            Landskron
          </Box>
        </Typography>

        {/* Descripción */}
        <Typography
          sx={{
            color: "var(--primary-contrastText, #ffffff)",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Manrope",
            fontSize: { xs: 12, sm: 13, md: 14 },
            fontWeight: 300,
            lineHeight: "157%",
            letterSpacing: "0.1px",
          }}
        >
          Combino mi experiencia en desarrollo web con la vocación de enseñar
          para construir soluciones eficientes y formar talento con visión de
          futuro.
        </Typography>

        {/* Íconos sociales */}
        <Stack
          direction="row"
          spacing={{ xs: 1.5, sm: 2 }}
          mt={{ xs: 1.5, sm: 2 }}
          alignItems="center"
        >
          <IconButton
            href="https://github.com/Blandskron"
            target="_blank"
            aria-label="GitHub"
            sx={{ p: { xs: 0.75, sm: 1 } }}
          >
            <GitHubIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
          </IconButton>
          <IconButton
            href="https://wa.me/56956460650"
            target="_blank"
            aria-label="WhatsApp"
            sx={{ p: { xs: 0.75, sm: 1 } }}
          >
            <WhatsAppIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/blandskron/"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ p: { xs: 0.75, sm: 1 } }}
          >
            <LinkedInIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
          </IconButton>
        </Stack>

        {/* Botón */}
        <Box
          sx={{
            mt: { xs: 1.5, sm: 2.5 },
            display: "flex",
            justifyContent: { xs: "stretch", sm: "flex-start", lg: "center" }, 
          }}
        >
          <Button
            variant="outlined"
            href="/CV.pdf"
            sx={{
              borderRadius: "360px",
              px: 4,
              py: 1,
              width: { xs: "100%", sm: 260, lg: 360 }, 
              height: { xs: 36, sm: 40 },
              textTransform: "none",
              borderColor: "#3FB4E0",
              color: "#3FB4E0",
              "&:hover": {
                backgroundColor: "rgba(63,180,224,0.1)",
                borderColor: "#3FB4E0",
              },
            }}
          >
            Descargar CV
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
