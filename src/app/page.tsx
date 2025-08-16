"use client";

import HeroImpactante from "@/components/organisms/HeroImpactante";
import AboutMe from "@/components/organisms/AnimacionAboutme";
import TestimoniosYResultados from "@/components/organisms/TestimoniosYResultados";
import TopAppBar from "@/components/organisms/AppBar";
import AnimatedGradientHero from "./components/atoms/AnimatedGradientHero";
import Servicios from "./components/organisms/ServiciosSections";
import { Box } from "@mui/material";
import ContactoSection from "./components/organisms/ContactoSection";
import Footer from "./components/organisms/Footer";
import RecentProjects from "./components/organisms/RecentProyects";
import UltimaExperienciaLaboral from "./components/organisms/UltimaExperienciaLaboral";
import FormacionContinua from "./components/organisms/FormacionContinua";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw", overflowY: "hidden"}}>
      <TopAppBar />
      <Box
        sx={{
          /* backgroundImage: 'url("/hero-bg.png")', */
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <AnimatedGradientHero /> */}
        <HeroImpactante />
        <AboutMe />
      </Box>
      <Servicios/>
      <RecentProjects/>
      <UltimaExperienciaLaboral/>
      <FormacionContinua/>
      <TestimoniosYResultados/>
      <ContactoSection/>
      <Footer/>
    </div>
  );
}
