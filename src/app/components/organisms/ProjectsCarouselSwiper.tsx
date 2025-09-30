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

  // ** FIX VISUAL & ANTI-BUG **
  // Restauramos la duplicación para el efecto visual, pero ajustamos el loop.
  const isDuplicated = items.length > 0 && items.length < 5;

  const loopItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    // Si hay menos de 5 items, duplicamos hasta tener 5 (o más si quieres más visibilidad).
    if (!isDuplicated) return items;

    const out: ProjectCardProps[] = [...items];
    while (out.length < 5) out.push(...items);
    return out.slice(0, 5); // Limitamos a 5 para el ejemplo
  }, [items, isDuplicated]);

  const hasSlides = loopItems.length > 0;
  // Desactivamos el loop nativo de Swiper (lo ponemos en 'false') solo si hemos duplicado manualmente.
  // Esto evita el bug de indexación al usar slideToLoop.
  const enableSwiperLoop = hasSlides && loopItems.length > 1 && !isDuplicated; 

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

  // Obtenemos el índice real del item original para los puntos.
  const realIndex = active % Math.max(items.length, 1);

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
      {/* Se eliminan los GlobalStyles que modificaban la opacidad para mantener el efecto */}

      <Swiper
        key={`slides-${loopItems.length}`}
        modules={[EffectCoverflow, Keyboard]}
        className="pc-swiper"
        effect="coverflow"
        centeredSlides
        grabCursor
        slidesPerView="auto"
        spaceBetween={gap}
        // Usamos el flag condicional para evitar el bug de indexación
        loop={enableSwiperLoop} 
        speed={1000}
        onSwiper={(sw) => (swiperRef.current = sw)}
        // Usamos activeIndex en lugar de realIndex si no usamos loop nativo
        onSlideChange={(sw) => setActive(isDuplicated ? sw.activeIndex : sw.realIndex)}
        keyboard={{ enabled: true }}
        coverflowEffect={{
          // Ajustes para el efecto visual de superposición (similar a la anterior corrección)
          rotate: 3, 
          stretch: 0,
          depth: 100, 
          modifier: 3, 
          slideShadows: false,
        }}
        style={{ overflow: 'visible', paddingBottom: 16 }} 
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
              // Si duplicamos manualmente, calculamos a qué índice de loopItems debemos ir.
              // De lo contrario, usamos slideToLoop (si loop nativo está activo).
              onClick={() => {
                if (isDuplicated) {
                  // Encuentra la primera aparición del item en el loopItems
                  const targetIndex = loopItems.findIndex((item, index) => index % items.length === iDot);
                  if (targetIndex !== -1) {
                    swiperRef.current?.slideTo(targetIndex);
                  }
                } else {
                  swiperRef.current?.slideToLoop(iDot);
                }
              }}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                cursor: 'pointer',
                // Usamos realIndex que ya está calculado para mostrar el punto activo
                bgcolor:
                  iDot === realIndex
                    ? 'rgba(255,255,255,.95)'
                    : 'rgba(255,255,255,.35)',
                boxShadow:
                  iDot === realIndex
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