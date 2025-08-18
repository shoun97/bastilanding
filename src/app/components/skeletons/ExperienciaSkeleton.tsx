"use client";
import { Box, Skeleton, Stack } from "@mui/material";
export default function ExperienciaSkeleton() {
  return (
    <Box sx={{ px:2, py:4 }}>
      <Stack spacing={1.2} sx={{ maxWidth: 1000, mx: "auto" }}>
        <Skeleton variant="rounded" width="30%" height={24} />
        <Skeleton variant="rounded" width="100%" height={18} />
        <Skeleton variant="rounded" width="92%" height={18} />
        <Skeleton variant="rounded" width="86%" height={18} />
      </Stack>
    </Box>
  );
}