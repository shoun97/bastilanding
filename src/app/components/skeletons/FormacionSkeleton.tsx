"use client";
import { Box, Grid, Skeleton } from "@mui/material";
export default function FormacionSkeleton() {
  return (
    <Box sx={{ px:2, py:4 }}>
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid key={i}>
            <Skeleton variant="rounded" height={100} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}