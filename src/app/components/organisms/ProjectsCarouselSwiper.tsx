'use client';

import { useRef, useState, useMemo } from 'react';
import { Box, IconButton, Stack, GlobalStyles } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import ProjectCard, { ProjectCardProps } from '../molecules/ProjectCard';

interface Props {
  items: ProjectCardProps[];
  slideWidth?: number;
  gap?: number;
  showBackground?: boolean;
}

export default function ProjectsCarousel({
  items,
  slideWidth = 288,
  gap = 18,
  showBackground = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  const loopItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (items.length >= 5) return items;
    const out: ProjectCardProps[] = [...items];
    while (out.length < 5) out.push(...items);
    return out.slice(0, 5);
  }, [items]);

  const hasSlides = loopItems.length > 0;
  const enableLoop = hasSlides && loopItems.length > 1;

  if (!hasSlides) {
    return (
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          py: 6,
          px: { xs: 2, md: 4 },
          overflow: 'visible',
          borderRadius: { xs: 0, md: 6 },
        }}
      />
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        py: 6,
        px: { xs: 2, md: 4 },
        overflow: 'visible',
        ...(showBackground && {}),
        borderRadius: { xs: 0, md: 6 },
      }}
    >
      <GlobalStyles
        styles={{
          /* Opacidad base y transición suave */
          '.pc-swiper .swiper-slide': {
            opacity: 0.28,
            transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)',
            willChange: 'opacity, transform',
          },
          /* Las vecinas un poco más visibles */
          '.pc-swiper .swiper-slide-prev, .pc-swiper .swiper-slide-next': {
            opacity: 0.62,
          },
          /* La activa al 100% (incluye duplicadas por loop) */
          '.pc-swiper .swiper-slide-active, .pc-swiper .swiper-slide-duplicate-active': {
            opacity: 1,
          },
        }}
      />

      {/* Carrusel */}
      <Swiper
        key={`slides-${loopItems.length}`}
        modules={[EffectCoverflow, Keyboard]}
        className="pc-swiper"
        effect="coverflow"
        centeredSlides
        grabCursor
        slidesPerView="auto"
        spaceBetween={gap}
        loop={enableLoop}
        speed={1000}               
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => setActive(sw.realIndex)}
        keyboard={{ enabled: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 1.25,
          slideShadows: false,
        }}
        style={{ overflow: 'visible', paddingBottom: 56 }}
      >
        {loopItems.map((it, i) => (
          <SwiperSlide
            key={`${it.title ?? 'item'}-${i}`}
            style={{ width: slideWidth, display: 'flex', justifyContent: 'center' }}
          >
            <ProjectCard {...it} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controles */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2.5, position: 'relative', zIndex: 3 }}
      >
        <IconButton aria-label="Anterior" onClick={() => swiperRef.current?.slidePrev()} sx={controlBtnSx}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* Puntitos: usa la longitud real de items originales */}
        <Stack direction="row" spacing={1.2} alignItems="center">
          {items.map((_, iDot) => (
            <Box
              key={iDot}
              onClick={() => swiperRef.current?.slideToLoop(iDot)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor:
                  iDot === (active % Math.max(items.length, 1))
                    ? 'rgba(255,255,255,.95)'
                    : 'rgba(255,255,255,.35)',
                boxShadow:
                  iDot === (active % Math.max(items.length, 1))
                    ? '0 0 0 3px rgba(255,255,255,.2)'
                    : 'none',
                transition: 'all .25s',
              }}
            />
          ))}
        </Stack>

        <IconButton aria-label="Siguiente" onClick={() => swiperRef.current?.slideNext()} sx={controlBtnSx}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

const controlBtnSx = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  bgcolor: 'rgba(255,255,255,.15)',
  color: '#fff',
  '&:hover': { bgcolor: 'rgba(255,255,255,.25)' },
  border: '1px solid rgba(255,255,255,.25)',
  backdropFilter: 'blur(6px)',
};
