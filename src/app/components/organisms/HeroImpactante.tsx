"use client";
import { Box, Typography, Button } from "@mui/material";
import AnimatedEspiral from "../atoms/AnimatedEspiral"; // importa el que hicimos antes

export default function HeroImpactante() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "70vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        pt: 4
      }}
    >
      {/* Fondo animado */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        {/*  <AnimatedEspiral speed="16s" saturation={1.3} />  a*/}
      </Box>

      {/* Texto y botón */}
      <Box sx={{ zIndex: 1 }}>
        {/* Lead */}
        <Typography
          sx={{
            mt: { xs: 2, sm: 0 },
            width: { xs: "288px", sm: "520px", md: "760px" }, // ancho más grande en tablet/escritorio
            mx: "auto", // centrado horizontal
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 200,
            fontSize: { xs: "20px", sm: "26px", md: "32px" }, // responsive
            lineHeight: { xs: "133%", md: "130%" },
          }}
        >
          Donde el desarrollo encuentra su propósito
        </Typography>

        {/* Headline */}
        <Typography
          variant="h4"
          sx={{
            mt: { xs: 1, sm: 1.5 },
            width: { xs: "288px", sm: "520px", md: "760px" },
            mx: "auto",
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            fontFamily: "Manrope",
            fontWeight: 400,
            fontSize: { xs: "32px", sm: "48px", md: "64px" }, // responsive
            lineHeight: { xs: "116%", md: "112%" },
          }}
        >
          crear y educar.
        </Typography>

        <Button
          variant="contained"
          href="#contacto"  
          sx={{
            display: "inline-flex",
            height: "42px",
            marginTop: "46px",
            padding: "8px 22px",
            borderRadius: "38px",
            backgroundColor: "#1F2491",
            textTransform: "none",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
            fontWeight: 500,
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#1A2B85",
            },
          }}
        >
          Trabajemos juntos
        </Button>
      </Box>


    </Box>
  );
}
