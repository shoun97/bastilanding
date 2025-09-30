"use client";
import { Box, Skeleton, Stack } from "@mui/material";
export default function AboutSkeleton() {
  return (
    <Box sx={{ px:2, py:6 }}>
      <Stack spacing={1.5} sx={{ maxWidth: 920, mx:"auto" }}>
        <Skeleton variant="rounded" width="40%" height={28} />
        <Skeleton variant="rounded" width="100%" height={16} />
        <Skeleton variant="rounded" width="95%" height={16} />
        <Skeleton variant="rounded" width="85%" height={16} />
      </Stack>
    </Box>
  );
}