// src/app/page.tsx
"use client";

import { Box } from "@mui/material";
import TopAppBar from "@/components/organisms/AppBar";
import Footer from "@/components/organisms/Footer";

import SectionGate from "@/components/common/SectionGate";
import { useProceduralLoader } from "@/hooks/useProceduralLoader";

// Componentes reales
import HeroImpactante from "@/components/organisms/HeroImpactante";
import AboutMe from "@/components/organisms/AnimacionAboutme";
import Servicios from "@/components/organisms/ServiciosSections";
import RecentProjects from "@/components/organisms/RecentProyects";
import UltimaExperienciaLaboral from "@/components/organisms/UltimaExperienciaLaboral";
import FormacionContinua from "@/components/organisms/FormacionContinua";
import TestimoniosYResultados from "@/components/organisms/TestimoniosYResultados";
import ContactoSection from "@/components/organisms/ContactoSection";

// Skeletons
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import AboutSkeleton from "@/components/skeletons/AboutSkeleton";
import ServiciosSkeleton from "@/components/skeletons/ServiciosSkeleton";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
import ExperienciaSkeleton from "@/components/skeletons/ExperienciaSkeleton";
import FormacionSkeleton from "@/components/skeletons/FormacionSkeleton";
import TestimoniosSkeleton from "@/components/skeletons/TestimoniosSkeleton";
import ContactoSkeleton from "@/components/skeletons/ContactoSkeleton";

export default function Home() {
  // Procedural: 0ms -> Hero, 180ms -> About, 180ms -> Servicios, etc.
  const stage = useProceduralLoader([0, 180, 180, 220, 220, 220, 240, 240]);

  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw", overflowX: "hidden" }}>
      <TopAppBar />

      <Box sx={{ backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* 1. Hero */}
        <SectionGate stage={stage} showAt={1} fallback={<HeroSkeleton />}>
          <HeroImpactante />
        </SectionGate>

        {/* 2. About */}
        <SectionGate stage={stage} showAt={2} fallback={<AboutSkeleton />}>
          <AboutMe />
        </SectionGate>
      </Box>

      {/* 3. Servicios */}
      <SectionGate stage={stage} showAt={3} fallback={<ServiciosSkeleton />}>
        <Servicios />
      </SectionGate>

      {/* 4. Proyectos recientes */}
      <SectionGate stage={stage} showAt={4} fallback={<ProjectsSkeleton />}>
        <RecentProjects />
      </SectionGate>

      {/* 5. Última experiencia laboral */}
      <SectionGate stage={stage} showAt={5} fallback={<ExperienciaSkeleton />}>
        <UltimaExperienciaLaboral />
      </SectionGate>

      {/* 6. Formación continua */}
      <SectionGate stage={stage} showAt={6} fallback={<FormacionSkeleton />}>
        <FormacionContinua />
      </SectionGate>

      {/* 7. Testimonios y resultados */}
      <SectionGate stage={stage} showAt={7} fallback={<TestimoniosSkeleton />}>
        <TestimoniosYResultados />
      </SectionGate>

      {/* 8. Contacto */}
      <SectionGate stage={stage} showAt={8} fallback={<ContactoSkeleton />}>
        <ContactoSection />
      </SectionGate>

      <Footer />
    </div>
  );
}
