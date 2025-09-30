'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Box, Stack, Skeleton, Typography, Alert, Button, Chip } from '@mui/material';
import TituloRecentProyects from '../atoms/TituloRecentProyects';
import dynamic from 'next/dynamic';
import { listJobs, type Job } from '@/integrations';

// Asegúrate de que esta ruta sea correcta en tu proyecto
const ProjectsCarousel = dynamic(() => import('./ProjectsCarouselSwiper'), { 
  ssr: false,
});

type ProjectItem = {
  logoSrc: string;
  title: string;
  description: string;
  tags: string[];
};

const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.blandskron.com/api'
).replace(/\/api\/?$/, '');

const abs = (u?: string) =>
  u
    ? /^https?:\/\//i.test(u)
      ? u
      : `${API_ORIGIN}${u.startsWith('/') ? '' : '/'}${u}`
    : '';

/** Convierte "a,b|c" o arrays mixtos a string[] (máx. 6) */
function toTags(value: unknown): string[] {
  if (typeof value === 'string') {
    return value
      .split(/[,\|]/g)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);
  }
  if (Array.isArray(value)) {
    return value
      .map((t: any) =>
        typeof t === 'string' ? t : t?.name ?? t?.label ?? String(t)
      )
      .filter(Boolean)
      .slice(0, 6);
  }
  return [];
}

function jobToItem(job: Job): ProjectItem {
  const j: any = job;
  const title = j?.title || 'Proyecto sin título';
  const description = j?.description || 'Sin descripción';

  const logoSrc =
    (j?.img_portada && abs(j.img_portada)) ||
    (j?.gallery?.[0]?.url && abs(j.gallery[0].url)) ||
    '/logos/giphy.svg';

  const tags = toTags(j?.tecnologias);
  return { logoSrc, title, description, tags };
}

/** Normaliza distintos formatos de respuesta a Job[] */
function unwrapJobs(res: any): Job[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.page?.data)) return res.page.data;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.items)) return res.items;
  return [];
}

const MOCK_JOBS: ProjectItem[] = [
  {
    // Réplica de la imagen de ejemplo (toggl track)
    logoSrc: '/logos/toggl-track.svg', // Asumiendo que tienes un logo así. Si no, usa picsum.
    title: 'Toggl Track',
    // Texto de 80 caracteres exactos (copiado de la imagen de ejemplo)
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.',
    tags: ['React', 'Django', 'MUI', 'Scrum'],
  },
  {
    // Réplica de la tarjeta a la izquierda (GIPHY)
    logoSrc: '/logos/giphy.svg', 
    title: 'Giphy API Integración',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut.', // 80 caracteres
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
  },
  {
    // Réplica de la tarjeta a la derecha (Payrol/Nómina)
    logoSrc: 'https://picsum.photos/seed/payroll/300/200', // Usa un placeholder si no tienes el SVG
    title: 'Sistema de Nómina (Payrol)',
    description: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.', // 80 caracteres
    tags: ['Python', 'Stripe API', 'RabbitMQ', 'PostgreSQL'],
  },
  // Puedes agregar más proyectos mock aquí si lo necesitas
].slice(0, 10);

/* ----------------------- UTIL: TIMEOUT ----------------------- */
async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let t: any;
  const timeout = new Promise<never>((_, rej) => {
    t = setTimeout(() => rej(new Error('timeout')), ms);
  });
  try {
    const r = await Promise.race([p, timeout]);
    return r as T;
  } finally {
    clearTimeout(t);
  }
}

/* ---------------------- LOADING SKELETON --------------------- */
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
    <Box role="status" aria-label="Cargando proyectos" sx={{ width: '100%' }}>
      <Typography
        variant="body2"
        sx={{ color: 'rgba(255,255,255,0.9)', mb: 2, textAlign: 'center' }}
      >
        Cargando proyectos…
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap,
          justifyContent: 'center',
          alignItems: 'stretch',
          px: { xs: 1, md: 4 },
          overflow: 'hidden',
        }}
      >
        {items.map((_, i) => (
          <Box key={i} sx={{ width: slideWidth, flexShrink: 0 }}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={180}
              sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.15)' }}
            />
            <Skeleton
              variant="text"
              width="85%"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
            />
            <Skeleton
              variant="text"
              width="60%"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Skeleton
                variant="rounded"
                width={64}
                height={24}
                sx={{ bgcolor: 'rgba(255,255,255,0.15)' }}
              />
              <Skeleton
                variant="rounded"
                width={72}
                height={24}
                sx={{ bgcolor: 'rgba(255,255,255,0.15)' }}
              />
              <Skeleton
                variant="rounded"
                width={56}
                height={24}
                sx={{ bgcolor: 'rgba(255,255,255,0.15)' }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function RecentProjects() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Estados de error/offline/mock
  const [isOffline, setIsOffline] = useState(false);
  const [usedMock, setUsedMock] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const MAX_ITEMS = 10;
  const TIMEOUT_MS = 5000; // 5s para considerar la API no disponible

  useEffect(() => {
    setMounted(true);

    // listeners para cambios de conectividad
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
      window.addEventListener('online', goOnline);
      window.addEventListener('offline', goOffline);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', goOnline);
        window.removeEventListener('offline', goOffline);
      }
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    setUsedMock(false);

    try {
      // Intento normal con timeout (sin AbortController explícito)
      const res = await withTimeout(
        listJobs({ page: 1, page_size: MAX_ITEMS }),
        TIMEOUT_MS
      );
      const jobs = unwrapJobs(res);
      const mapped = jobs
        .map((j) => {
          try {
            return jobToItem(j);
          } catch {
            return null;
          }
        })
        .filter(Boolean) as ProjectItem[];

      if (mapped.length === 0) {
        setItems(MOCK_JOBS);
        setUsedMock(true);
      } else {
        setItems(mapped.slice(0, MAX_ITEMS));
      }
    } catch (e: any) {
      // NetworkError/TypeError normalmente indican problemas de conexión CORS/offline
      const offlineLikely =
        typeof window !== 'undefined' && !navigator.onLine;
      setIsOffline(offlineLikely);

      // Activamos MOCK
      setItems(MOCK_JOBS);
      setUsedMock(true);

      const msg =
        e?.message === 'timeout'
          ? 'La API no respondió a tiempo (timeout).'
          : 'No se pudo conectar con la API.';
      setErrorMsg(msg);
      // console para diagnóstico, sin romper UI
      console.error('getJobs error', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MAX_ITEMS]);

  const content = useMemo(() => {
    if (!mounted) return <LoadingCarousel />;
    if (loading) return <LoadingCarousel />;
    if (items.length === 0) {
      return (
        <Typography sx={{ color: 'white', textAlign: 'center', opacity: 0.8 }}>
          Aún no hay proyectos para mostrar.
        </Typography>
      );
    }
    return <ProjectsCarousel key={`jobs-${items.length}-${usedMock ? 'mock' : 'live'}`} items={items} />;
  }, [mounted, loading, items, usedMock]);

  return (
    <Box
      aria-busy={loading}
      sx={{
        position: 'relative',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Avisos de estado */}

        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          <TituloRecentProyects />
        </Box>

        {content}
      </Stack>
    </Box>
  );
}