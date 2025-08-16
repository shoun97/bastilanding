'use client';

import { useMemo, useRef, useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ProjectCard, { ProjectCardProps } from '../molecules/ProjectCard';

interface Props {
  items: ProjectCardProps[];
  width?: number;
  gap?: number;
  durationMs?: number;
}

export default function ProjectsCarouselLikeShot({
  items,
  width = 400,
  gap = 10,
  durationMs = 200,
}: Props) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const progressRef = useRef(0);

  // ======== KEEN: carril frontal ========
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'precision',
    rubberband: false,
    slides: { perView: 1, spacing: gap },
    created(s) {
      setActive(s.track.details.rel);
      progressRef.current = s.track.details.position;
    },
    slideChanged(s) {
      setActive(s.track.details.rel);
    },
    detailsChanged(s) {
      progressRef.current = s.track.details.position;
    },
    //@ts-ignore
    animation: { duration: durationMs, easing: (t) => 1 - Math.pow(1 - t, 3) },
  });

  // ======== CARRIL DE FONDO (parallax) ========
  const REP = 7; 
  const BACK_SCALE = 0.9;
  const BACK_PARALLAX = 0.33;
  const BACK_KEEP_BEHIND = 2;

  const backWidth = width * BACK_SCALE;
  const backSlideW = backWidth + gap;

  const backItems = useMemo(
    () => Array.from({ length: REP }).flatMap(() => items),
    [items]
  );

  const backCenterIndex = Math.floor(REP / 2) * n + active - BACK_KEEP_BEHIND;

  // Progreso continuo del slider frontal translate parallax del fondo
  const backTxPx =
    (backCenterIndex + (progressRef.current - active)) *
      backSlideW *
      BACK_PARALLAX +
    backSlideW * BACK_PARALLAX * 0.5; 

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        py: 6,
        overflow: 'visible',
      }}
    >
      {/* ===== Carril de fondo (blur y opacidad) ===== */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: `${gap}px`,
            px: 4,
            transform: `translateX(calc(50% - ${backWidth / 2}px - ${backTxPx}px))`,
            transition: `transform ${durationMs}ms cubic-bezier(.2,.8,.2,1)`,
          }}
        >
          {backItems.map((card, i) => (
            <Box
              key={`bg-${i}`}
              sx={{
                width: backWidth,
                flex: '0 0 auto',
                filter: 'blur(1.4px) brightness(.9)',
                opacity: 0.45,
              }}
            >
              <ProjectCard {...card} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* ===== Carril frontal ===== */}
      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{ position: 'relative', zIndex: 2, px: 4 }}
      >
        {items.map((card, i) => {
          const isActive = i === active;
          return (
            <Box
              key={`fg-${i}`}
              className="keen-slider__slide"
              sx={{
                width,
                mx: 'auto',
                filter: isActive ? 'none' : 'blur(1px) brightness(.95)',
                opacity: isActive ? 1 : 0.75,
                transform: `scale(${isActive ? 1 : 0.96})`,
                transition: `filter ${durationMs}ms, opacity ${durationMs}ms, transform ${durationMs}ms`,
              }}
            >
              <ProjectCard {...card} />
            </Box>
          );
        })}
      </Box>

     
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2.5, position: 'relative', zIndex: 3 }}
      >
        <IconButton
          aria-label="Anterior"
          onClick={() => instanceRef.current?.prev()}
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,.15)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(255,255,255,.25)' },
            border: '1px solid rgba(255,255,255,.25)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Stack direction="row" spacing={1.2} alignItems="center">
          {items.map((_, iDot) => (
            <Box
              key={iDot}
              onClick={() => instanceRef.current?.moveToIdx(iDot)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor:
                  iDot === active
                    ? 'rgba(255,255,255,.95)'
                    : 'rgba(255,255,255,.35)',
                boxShadow:
                  iDot === active ? '0 0 0 3px rgba(255,255,255,.2)' : 'none',
                transition: 'all .25s',
              }}
            />
          ))}
        </Stack>

        <IconButton
          aria-label="Siguiente"
          onClick={() => instanceRef.current?.next()}
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,.15)',
            color: '#fff',
            '&:hover': { bgcolor: 'rgba(255,255,255,.25)' },
            border: '1px solid rgba(255,255,255,.25)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
