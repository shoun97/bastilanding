"use client";
import { Box, Grid, Skeleton } from "@mui/material";

export default function ServiciosSkeleton() {
  const items = Array.from({ length: 3 }, (_, i) => i);
  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: "auto" }}>
      <Grid container spacing={2}>
        {items.map((i) => (
          <Grid key={`svc-skel-${i}`}>
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
