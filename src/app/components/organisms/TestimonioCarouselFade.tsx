'use client';

import { Box, Fade } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import TestimonioCardRightImage from '@/components/molecules/TestimonioCardImage';

// Ajusta este tipo si tu TestimonioCardRightImage usa otro nombre de props
type Item = Parameters<typeof TestimonioCardRightImage>[0];

type Props = {
  items: Item[];
  intervalMs?: number;     
  pauseOnHover?: boolean;  
};

export default function TestimoniosCarouselFade({
  items,
  intervalMs = 6000,
  pauseOnHover = true,
}: Props) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!items?.length) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setIdx((i) => (i + 1) % items.length);
      }
    }, intervalMs);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [items?.length, intervalMs]);

  if (!items?.length) return null;

  return (
    <Box
      onMouseEnter={() => (pausedRef.current = pauseOnHover ? true : false)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <Fade in key={idx} timeout={800}>
        <Box>
          <TestimonioCardRightImage {...items[idx]} />
        </Box>
      </Fade>
    </Box>
  );
}
