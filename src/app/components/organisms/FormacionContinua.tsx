"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Skeleton, Typography } from "@mui/material";
import TituloRecentProyects from "../atoms/TituloRecentProyects";
import dynamic from "next/dynamic";
import { listJobs, type Job } from "@/integrations";
import TituloFormacionContinua from "../atoms/TituloFormacionContinua";

const ProjectsCarousel = dynamic(() => import("./ProjectsCarouselSwiper"), {
  ssr: false,
});

type ProjectItem = {
  logoSrc: string;
  title: string;
  description: string;
  tags: string[];
};

const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.blandskron.com/api"
).replace(/\/api\/?$/, "");
const abs = (u?: string) =>
  u
    ? /^https?:\/\//i.test(u)
      ? u
      : `${API_ORIGIN}${u.startsWith("/") ? "" : "/"}${u}`
    : "";

function toTags(value: unknown): string[] {
  if (typeof value === "string") {
    return value
      .split(/[,\|]/g)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);
  }
  if (Array.isArray(value)) {
    return value
      .map((t: any) =>
        typeof t === "string" ? t : t?.name ?? t?.label ?? String(t)
      )
      .filter(Boolean)
      .slice(0, 6);
  }
  return [];
}

function jobToItem(job: Job): ProjectItem {
  const j: any = job;
  const title = j?.title || "Proyecto sin título";
  const description = j?.description || "Sin descripción";
  const logoSrc =
    (j?.img_portada &&
      (/^https?:/.test(j.img_portada)
        ? j.img_portada
        : `${API_ORIGIN}${j.img_portada.startsWith("/") ? "" : "/"}${
            j.img_portada
          }`)) ||
    (j?.gallery?.[0]?.url &&
      (/^https?:/.test(j.gallery[0].url)
        ? j.gallery[0].url
        : `${API_ORIGIN}${j.gallery[0].url.startsWith("/") ? "" : "/"}${
            j.gallery[0].url
          }`)) ||
    "/logos/giphy.svg";
  const tags = toTags(j?.tecnologias);
  return { logoSrc, title, description, tags };
}

function LoadingCarousel({
  slideWidth = 288,
  gap = 18,
  count = 5,
}: {
  slideWidth?: number;
  gap?: number;
  count?: number;
}) {
  const items = Array.from({ length: count });
  return (
    <Box role="status" aria-label="Cargando proyectos" sx={{ width: "100%" }}>

      <Box
        sx={{
          display: "flex",
          gap,
          justifyContent: "center",
          alignItems: "stretch",
          px: { xs: 1, md: 4 },
          overflow: "hidden",
        }}
      >
        {items.map((_, i) => (
          <Box key={i} sx={{ width: slideWidth, flexShrink: 0 }}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={180}
              sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.15)" }}
            />
            <Skeleton
              variant="text"
              width="85%"
              sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
            />
            <Skeleton
              variant="text"
              width="60%"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 1 }}
            />
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Skeleton
                variant="rounded"
                width={64}
                height={24}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                variant="rounded"
                width={72}
                height={24}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                variant="rounded"
                width={56}
                height={24}
                sx={{ bgcolor: "rgba(255,255,255,0.15)" }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function FormacionContinua() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); 
  const MAX_ITEMS = 10;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const jobs = await listJobs(
          { page: 1, page_size: MAX_ITEMS },
          { signal: ctrl.signal }
        );

        const mapped = jobs
          .map((j) => {
            try {
              return jobToItem(j);
            } catch (e) {
              console.warn("job inválido, lo salto:", j, e);
              return null;
            }
          })
          .filter(Boolean) as ProjectItem[];

        setItems(mapped);
      } catch (e) {
        console.warn("getJobs error", e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const content = useMemo(() => {
    if (!mounted) return <LoadingCarousel />;
    if (loading) return <LoadingCarousel />;
    if (items.length === 0) {
      return (
        <Typography sx={{ color: "white", textAlign: "center", opacity: 0.8 }}>
          Aún no hay proyectos para mostrar.
        </Typography>
      );
    }
    return <ProjectsCarousel key={`jobs-${items.length}`} items={items} />;
  }, [mounted, loading, items]);

  return (
    <Box
      aria-busy={loading}
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #6120E0 0%, #6120E0 30%, #6E2CE9 70%, #6E2CE9 100%)",
      }}
    >
      <Stack spacing={4} sx={{ position: "relative", zIndex: 1 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
            <TituloFormacionContinua/>
        </Box>
        {content}
      </Stack>
    </Box>
  );
}
