"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProjectCard, { ProjectCardProps } from "../molecules/ProjectCard";

interface ProjectsCarouselProps {
  items: ProjectCardProps[];
  durationMs?: number;
  width?: number;
  gap?: number;
}

export default function ProjectsCarousel({
  items,
  durationMs = 450,
  width = 336,
  gap = 10,
}: ProjectsCarouselProps) {
  const n = items.length;
  const slideW = width + gap;

  const extended = useMemo(
    () => [items[n - 1], ...items, items[0]],
    [items, n]
  );

  const [idx, setIdx] = useState(1);
  const [anim, setAnim] = useState(true);

  const go = (dir: 1 | -1) => {
    setAnim(true);
    setIdx((i) => Math.max(0, Math.min(i + dir, n + 1)));
  };
  const goTo = (realIndex: number) => {
    setAnim(true);
    setIdx(realIndex + 1);
  };

  const activeReal = useMemo(() => {
    let r = (idx - 1) % n;
    if (r < 0) r += n;
    return r;
  }, [idx, n]);

  const onTransitionEnd = () => {
    if (idx === 0) {
      setAnim(false);
      setIdx(n);
    } else if (idx === n + 1) {
      setAnim(false);
      setIdx(1);
    }
  };
  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  const touch = useRef({ x: 0, dx: 0, active: false });
  const onStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, dx: 0, active: true };
  };
  const onMove = (e: React.TouchEvent) => {
    if (touch.current.active)
      touch.current.dx = e.touches[0].clientX - touch.current.x;
  };
  const onEnd = () => {
    if (!touch.current.active) return;
    const { dx } = touch.current;
    touch.current.active = false;
    if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1);
  };

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

  const backCenterIndex = useMemo(
    () => Math.floor(REP / 2) * n + activeReal - BACK_KEEP_BEHIND,
    [activeReal, n]
  );

  const backPhasePx = backSlideW * BACK_PARALLAX * 0.5;

  const frontTx = `translateX(calc(50% - ${width / 2}px - ${idx * slideW}px))`;
  const backTx = `translateX(calc(50% - ${backWidth / 2}px - ${
    backCenterIndex * backSlideW * BACK_PARALLAX
  }px + ${backPhasePx}px))`;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        py: 6,
        userSelect: "none",
        overflow: "visible",
      }}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: `${gap}px`,
            px: 4,
            transform: backTx,
            transition: anim
              ? `transform ${durationMs}ms cubic-bezier(.2,.8,.2,1)`
              : "none",
          }}
        >
          {backItems.map((card, i) => (
            <Box
              key={`bg-${i}`}
              sx={{
                width: backWidth,
                flex: "0 0 auto",
                transform: "scale(1)",
                filter: "blur(1.4px) brightness(.9)",
                opacity: 0.45,
              }}
            >
              <ProjectCard {...card} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        onTransitionEnd={onTransitionEnd}
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: `${gap}px`,
          px: 4,
          transform: frontTx,
          transition: anim
            ? `transform ${durationMs}ms cubic-bezier(.2,.8,.2,1)`
            : "none",
        }}
      >
        {extended.map((card, i) => {
          const isActive = i === idx;
          return (
            <Box
              key={`fg-${i}`}
              sx={{
                width,
                flex: "0 0 auto",
                zIndex: isActive ? 3 : 2,
                filter: isActive ? "none" : "blur(1px) brightness(.95)",
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
        sx={{ mt: 2, zIndex: 3, position: "relative" }}
      >
        <IconButton
          aria-label="Anterior"
          onClick={() => go(-1)}
          sx={{
            bgcolor: "rgba(255,255,255,.15)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,.25)" },
            border: "1px solid rgba(255,255,255,.25)",
            backdropFilter: "blur(6px)",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Stack direction="row" spacing={1.2} alignItems="center">
          {items.map((_, iDot) => (
            <Box
              key={iDot}
              onClick={() => goTo(iDot)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor:
                  iDot === activeReal
                    ? "rgba(255,255,255,.95)"
                    : "rgba(255,255,255,.35)",
                boxShadow:
                  iDot === activeReal
                    ? "0 0 0 3px rgba(255,255,255,.2)"
                    : "none",
                transition: "all .3s",
              }}
            />
          ))}
        </Stack>

        <IconButton
          aria-label="Siguiente"
          onClick={() => go(1)}
          sx={{
            bgcolor: "rgba(255,255,255,.15)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(255,255,255,.25)" },
            border: "1px solid rgba(255,255,255,.25)",
            backdropFilter: "blur(6px)",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
