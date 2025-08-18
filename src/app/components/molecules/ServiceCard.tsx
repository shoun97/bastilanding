"use client";
import { Box, Typography, Card, CardContent, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Image from "next/image";
import LineaDecorativa from "../atoms/LineaDecorativa";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  videoSrc: string;
}

export default function ServiceCard({
  icon,
  title,
  subtitle,
  description,
  image,
  videoSrc,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "linear-gradient(to bottom, #444, #111)",
        color: "white",
        overflow: "visible",
        position: "relative",
        marginTop: "100px",
      }}
    >
      {/* Imagen flotante */}
      <Box
        sx={{
          position: "absolute",
          top: -110,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          style={{ objectFit: "contain" }}
        />
      </Box>

      <CardContent>
        {/* Línea decorativa (solo 20px debajo de la imagen) */}
        <Box mt={2} sx={{}}>
          <LineaDecorativa />
        </Box>

        {/* Subtítulo */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          {subtitle}
        </Typography>

        {/* Descripción */}
        <Typography variant="body2" align="center" color="gray.300">
          {description}
        </Typography>

        {/* Botón más detalles */}
        <Box textAlign="center" mt={2}>
          <Typography
            variant="body2"
            color="#00BCD4"
            fontWeight="bold"
            component="div"
            display="inline-flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
          >
            Más detalles
            <ExpandMoreIcon
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </Typography>
        </Box>

        {/* Contenido expandido: video */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box mt={2} textAlign="center">
            <video
              src={videoSrc}
              width="100%"
              controls
              style={{
                borderRadius: 12,
                maxHeight: 300,
              }}
            />
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}
