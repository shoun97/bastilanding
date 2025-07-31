"use client";
import { Box } from "@mui/material";
import ImageCluster from "../molecules/ImageCluster";
import ProfileCard from "../molecules/ProfileCard";

export default function AboutMe() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box>
        <ImageCluster images={[
          {alt: 'image1', src: '/collage1.svg'},
          {alt: 'image2', src: '/collage2.svg'},
          {alt: 'image3', src: '/collage3.svg'},
        ]}/>
      </Box>
      
      <Box sx={{ zIndex: 2, marginTop: "40px;" }}>
        <ProfileCard/>
      </Box>

    </Box>
  );
}

