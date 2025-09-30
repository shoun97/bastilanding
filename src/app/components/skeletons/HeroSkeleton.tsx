"use client";
import { Box, Skeleton, Stack } from "@mui/material";
export default function HeroSkeleton() {
  return (
    <Box sx={{ minHeight: "70dvh", display:"grid", placeItems:"center", px:2 }}>
      <Stack spacing={2} alignItems="center" sx={{ width: "min(920px, 100%)" }}>
        <Skeleton variant="rounded" key="1" width="60%" height={36} />
        <Skeleton variant="rounded" key="2" width="80%" height={20} />
        <Skeleton variant="rounded" key="3" width={180} height={42} />
      </Stack>
    </Box>
  );
}