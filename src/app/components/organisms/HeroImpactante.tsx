"use client";
import { Box, Typography, Button } from "@mui/material";
import AnimatedEspiral from "../atoms/AnimatedEspiral"; // importa el que hicimos antes

export default function HeroImpactante() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
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
        <Typography
          sx={{
            mt: 2,
            width: "288px",
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            fontFamily: "Manrope",
            fontSize: "25px",
            fontWeight: 200,
            lineHeight: "133.4%",
          }}
        >
          Donde el desarrollo encuentra su propósito:
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            width: "288px",
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            fontFamily: "Manrope",
            fontSize: "40px",
            fontWeight: 400,
            lineHeight: "116.7%",
          }}
        >
          crear y educar.
        </Typography>

        <Button
          variant="contained"
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

      <Box sx={{ marginTop: "50px" }} />
    </Box>
  );
}


