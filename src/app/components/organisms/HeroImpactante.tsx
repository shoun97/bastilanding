"use client";
import { Box, Typography, Button } from "@mui/material";
import AnimacionHero from "../molecules/AnimacionHero";
import AnimatedGradient from "../atoms/AnimatedGradientHero";
import ImageCluster from "../molecules/ImageCluster"

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

      {/* Animación central */}
      <Box sx={{ zIndex: 2, mb: 2 }}>
        <AnimacionHero />
      </Box>

      {/* Texto y botón */}
      <Box sx={{ zIndex: 2 }}>
        <Typography
          sx={{
            mt: 2,
            width: "288px",
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Manrope",
            fontSize: "25px",
            fontStyle: "normal",
            fontWeight: 200,
            lineHeight: "133.4%",
          }}
        >
          Donde el desarrollo encuentra su propósito:
        </Typography>

        <Typography
          variant="h4"
          color="white"
          sx={{
            mt: 1,
            width: "288px",
            color: "rgba(255, 255, 255, 0.90)",
            textAlign: "center",
            fontFeatureSettings: "'liga' off, 'clig' off",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            fontFamily: "Manrope",
            fontSize: "40px",
            fontStyle: "normal",
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "38px",
            backgroundColor: "#20339F",
            color: "primary.contrastText",
            textTransform: "none",
            boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2)",
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
      <Box sx={{marginTop: "50px"}}/>

    </Box>
  );
}
