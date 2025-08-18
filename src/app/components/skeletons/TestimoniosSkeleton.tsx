"use client";
import { Box, Skeleton, Stack } from "@mui/material";
export default function TestimoniosSkeleton() {
  return (
    <Box sx={{ px:2, py:4 }}>
      <Stack spacing={2}>
        <Skeleton variant="rounded" width="35%" height={24} />
        <Skeleton variant="rounded" width="100%" height={160} />
      </Stack>
    </Box>
  );
}