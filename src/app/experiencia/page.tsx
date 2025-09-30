"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Skeleton,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import TopAppBar from "@/components/organisms/AppBar";
import Footer from "@/components/organisms/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/molecules/ProjectCard";
import { listJobs, type Job } from "@/integrations";

type ProjectItem = ProjectCardProps & { id?: string | number };

const API_ORIGIN = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.blandskron.com/api")
  .replace(/\/api\/?$/, "");

const abs = (u?: string) =>
  u ? (/^https?:\/\//i.test(u) ? u : `${API_ORIGIN}${u.startsWith("/") ? "" : "/"}${u}`) : "";

function jobToItem(job: Job): ProjectItem {
  const title = job.title || "Proyecto sin título";
  const description = job.description || "Sin descripción";
  const logoSrc = abs((job as any).img || (job as any).logo || "");
  const tags = (job as any).tags || (job as any).stack || [];
  return { id: (job as any).id ?? title, logoSrc, title, description, tags, layout: "horizontal" };
}

export default function ProyectosPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  // filtros
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // paginación
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listJobs();
      const mapped = Array.isArray(res) ? res.map(jobToItem) : [];
      setItems(mapped);
    } catch (e) {
      setItems([]);
      setError("No se pudo cargar la lista de proyectos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔹 tags dinámicos desde los ítems
  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => it.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    if (!selectedTags.length) return items;
    const sel = new Set(selectedTags);
    return items.filter((it) => it.tags.some((t) => sel.has(t)));
  }, [items, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // reset de página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [selectedTags]);

  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw", overflowX: "hidden" }}>
      <TopAppBar />

      <Box
        sx={{
          minHeight: "100dvh",
          pb: 8,
          background:
            "radial-gradient(120% 120% at 50% -10%, #3B2DB5 0%, #211B5E 40%, #1A1552 100%)",
        }}
      >
        {/* Header con título y filtros */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "rgba(255,255,255,.9)" }}>
            Proyectos
          </Typography>

          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: "rgba(255,255,255,.9)", textTransform: "none", fontWeight: 600, gap: 1 }}
            endIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
            startIcon={<FilterAltIcon sx={{ fontSize: 18 }} />}
          >
            Filtros
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              sx: {
                bgcolor: "rgba(20,20,60,.95)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.12)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {allTags.map((tag) => {
              const checked = selectedTags.includes(tag);
              return (
                <MenuItem
                  key={tag}
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                    )
                  }
                >
                  <Checkbox checked={checked} sx={{ color: "#fff" }} />
                  <ListItemText primary={tag} />
                </MenuItem>
              );
            })}
            {!!selectedTags.length && (
              <MenuItem onClick={() => setSelectedTags([])}>
                <ListItemText primary="Limpiar filtros" />
              </MenuItem>
            )}
          </Menu>
        </Stack>

        {/* Chips de filtros activos */}
        {!!selectedTags.length && (
          <Stack direction="row" spacing={1} sx={{ px: 2, pb: 1 }} flexWrap="wrap">
            {selectedTags.map((t) => (
              <Chip
                key={t}
                label={t}
                onDelete={() => setSelectedTags((prev) => prev.filter((x) => x !== t))}
                sx={{
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.24)",
                }}
              />
            ))}
          </Stack>
        )}

        {/* Lista de proyectos */}
        <Stack spacing={2} sx={{ px: 2, py: 1 }}>
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  borderRadius: "40px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  height={110}
                  sx={{ bgcolor: "rgba(255,255,255,.08)" }}
                />
              </Box>
            ))}

          {!loading && paged.map((it) => <ProjectCard key={it.id ?? it.title} {...it} layout="horizontal" />)}

          {/* vacío / error */}
          {!loading && !paged.length && (
            <Stack alignItems="center" spacing={2} sx={{ py: 6, color: "rgba(255,255,255,.8)" }}>
              <Typography variant="body1">
                {error ? "No se pudo cargar la lista de proyectos." : "No hay proyectos para mostrar."}
              </Typography>
              <Button
                variant="outlined"
                onClick={fetchData}
                sx={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Reintentar
              </Button>
            </Stack>
          )}
        </Stack>

        {/* Paginación */}
        {!loading && paged.length > 0 && Math.ceil(filtered.length / pageSize) > 1 && (
          <Stack alignItems="center" sx={{ mt: 2 }}>
            <Pagination
              page={page}
              count={Math.ceil(filtered.length / pageSize)}
              onChange={(_, p) => setPage(p)}
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255,255,255,.9)",
                  borderColor: "rgba(255,255,255,.24)",
                },
              }}
            />
          </Stack>
        )}
      </Box>

      <Footer />
    </div>
  );
}
