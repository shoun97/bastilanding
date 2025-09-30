"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Stack, Skeleton, Typography, Alert, Button, Chip } from "@mui/material";
import TituloFormacionContinua from "../atoms/TituloFormacionContinua";
import dynamic from "next/dynamic";
import { listJobs, type Job } from "@/integrations";

const ProjectsCarousel = dynamic(() => import("./ProjectsCarouselSwiper"), { ssr: false });

type ProjectItem = { logoSrc: string; title: string; description: string; tags: string[] };

const API_ORIGIN = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.blandskron.com/api").replace(/\/api\/?$/, "");
const abs = (u?: string) =>
  u ? (/^https?:\/\//i.test(u) ? u : `${API_ORIGIN}${u.startsWith("/") ? "" : "/"}${u}`) : "";

/* ---------- utils ---------- */
const compactText = (s?: string, maxWords = 4) =>
  (s ?? "")
    .trim()
    .split(/\s+/)
    .slice(0, maxWords)
    .join(" ")
    .concat(((s ?? "").trim().split(/\s+/).length > maxWords) ? "…" : "");

const toTags = (value: unknown): string[] => {
  if (typeof value === "string")
    return value.split(/[,\|]/g).map(s=>s.trim()).filter(Boolean).slice(0,6);
  if (Array.isArray(value))
    return value.map((t:any)=> typeof t==="string"? t : t?.name ?? t?.label ?? String(t)).filter(Boolean).slice(0,6);
  return [];
};

function jobToItem(job: Job): ProjectItem {
  const j: any = job;
  const title = compactText(j?.title || "Proyecto", 4);
  const description = compactText(j?.description || "Sin descripción", 6);
  const logoSrc =
    (j?.img_portada && abs(j.img_portada)) ||
    (j?.gallery?.[0]?.url && abs(j.gallery[0].url)) ||
    "/logos/giphy.svg";
  const tags = toTags(j?.tecnologias);
  return { logoSrc, title, description, tags };
}

/* ---------- MOCK ---------- */
const MOCK_JOBS: ProjectItem[] = [
    {
        logoSrc: "/logos/placeholder-react.svg",
        title: "Frontend: E-Commerce React",
        description: "Reescritura de la aplicación usando Next.js 14 y App Router, optimización de imágenes y diseño responsivo.",
        tags: ["Next.js", "MUI", "SSR", "Vercel"]
    },
    {
        logoSrc: "/logos/placeholder-node.svg",
        title: "Backend: Microservicio de Datos",
        description: "Microservicio Node/TS que genera y envía reportes Excel por correo en cron. Conexión a múltiples bases de datos.",
        tags: ["Node.js", "TypeScript", "BullMQ", "PostgreSQL"]
    },
    {
        logoSrc: "/logos/placeholder-node.svg",
        title: "Dashboard de Analytics",
        description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.",
        tags: ["React", "D3.js", "Chart.js", "API GraphQL"]
    },
];

/* ---------- Loading ---------- */
function LoadingCarousel({ slideWidth = 288, gap = 18, count = 5 }:{
  slideWidth?: number; gap?: number; count?: number;
}) {
  const items = Array.from({ length: count });
  return (
    <Box role="status" aria-label="Cargando" sx={{ width:"100%" }}>
      <Box sx={{ display:"flex", gap, justifyContent:"center", alignItems:"stretch", px:{ xs:1, md:4 }, overflow:"hidden" }}>
        {items.map((_, i) => (
          <Box key={i} sx={{ width: slideWidth, flexShrink:0 }}>
            <Skeleton variant="rounded" width="100%" height={180} sx={{ mb:1, bgcolor:"rgba(255,255,255,0.15)" }} />
            <Skeleton variant="text" width="85%" sx={{ bgcolor:"rgba(255,255,255,0.2)" }} />
            <Skeleton variant="text" width="60%" sx={{ bgcolor:"rgba(255,255,255,0.2)", mb:1 }} />
            <Box sx={{ display:"flex", gap:1, flexWrap:"wrap" }}>
              <Skeleton variant="rounded" width={64} height={24} sx={{ bgcolor:"rgba(255,255,255,0.15)" }} />
              <Skeleton variant="rounded" width={72} height={24} sx={{ bgcolor:"rgba(255,255,255,0.15)" }} />
              <Skeleton variant="rounded" width={56} height={24} sx={{ bgcolor:"rgba(255,255,255,0.15)" }} />
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
  const [usedMock, setUsedMock] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const MAX_ITEMS = 10;

  useEffect(() => { setMounted(true); }, []);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setUsedMock(false);
    setErrorMsg(null);
    try {
      const jobs = await listJobs({ page:1, page_size:MAX_ITEMS }, { signal });
      const mapped = (jobs || []).map(jobToItem).slice(0, MAX_ITEMS);
      if (mapped.length === 0) {
        //@ts-ignore
        setItems(MOCK_JOBS);
        setUsedMock(true);
      } else {
        setItems(mapped);
      }
    } catch (e:any) {
      console.warn("getJobs error", e);
      //@ts-ignore
      setItems(MOCK_JOBS);
      setUsedMock(true);
      setErrorMsg("Mostrando datos de ejemplo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchData]);

  const content = useMemo(() => {
    if (!mounted || loading) return <LoadingCarousel />;
    //@ts-ignore
    const data = items.length ? items : MOCK_ITEMS; // safety net
    return <ProjectsCarousel key={`jobs-${data.length}-${usedMock?"mock":"live"}`} items={data} />;
  }, [mounted, loading, items, usedMock]);

  return (
    <Box
      aria-busy={loading}
      sx={{
        position: "relative",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={2} sx={{ position:"relative", zIndex:1 }}>
        
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <TituloFormacionContinua />
        </Box>

        {content}
      </Stack>
    </Box>
  );
}
