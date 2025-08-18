"use client";
import { Box, Grid, Skeleton } from "@mui/material";
export default function ContactoSkeleton() {
  return (
    <Box sx={{ px:2, py:6 }}>
      <Grid container spacing={2}>
        <Grid>
          <Skeleton variant="rounded" height={48} />
          <Skeleton variant="rounded" height={48} sx={{ mt:1 }} />
          <Skeleton variant="rounded" height={120} sx={{ mt:1 }} />
        </Grid>
        <Grid>
          <Skeleton variant="rounded" height={220} />
        </Grid>
      </Grid>
    </Box>
  );
}