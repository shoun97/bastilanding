"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Fade,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import LightModeIcon from "@mui/icons-material/LightMode";
import AnimacionHero from "../molecules/AnimacionHero";
// import LogoIcon from "../atoms/LogoIcon";

const navItems = [
  { text: "Home", icon: <HomeIcon />, url: "/" },
  { text: "Proyectos", icon: <FolderIcon />, url: "/proyectos" },
  { text: "Experiencia", icon: <WorkIcon />, url: "/experiencia" },
  { text: "Educación", icon: <SchoolIcon />, url: "/educacion" },
  { text: "Descarga CV", icon: <DescriptionIcon />, url: "/descargarCV" },
];

export default function MyAppBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Skeleton para el brand (logo + texto)
  const [logoLoading, setLogoLoading] = useState(true);
  useEffect(() => {
    // pequeño delay para evitar parpadeo y cubrir carga del Lottie/SVG
    const t = setTimeout(() => setLogoLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2,
          color: "#fff",
          borderBottom: "1px solid rgba(255, 255, 255, 0.50)",
          background: "rgba(0, 0, 0, 0.30)",
          backdropFilter: "blur(15px)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 60,
            height: 60,
            maxHeight: 60,
            px: 2,
          }}
        >
          {/* Brand clickeable */}
          <Box
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              minHeight: 60,
              height: 60,
              maxHeight: 60,
            }}
          >
            {logoLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: "rgba(255,255,255,.2)" }} />
                <Skeleton variant="rounded" width={120} height={18} sx={{ bgcolor: "rgba(255,255,255,.2)" }} />
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                <AnimacionHero />
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "#fff" }}>
              <LightModeIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(!open)}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menú desplegable sobrepuesto */}
      <Fade in={open}>
        <Box
          sx={{
            position: "fixed",
            top: 60, // coincide con la altura del AppBar
            left: 0,
            width: "100%",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              px: 2,
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: 0,
              color: "#fff",
            }}
          >
            <List>
              {navItems.map(({ text, icon, url }) => {
                const active =
                  pathname === url || (url !== "/" && pathname?.startsWith(url));
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={url}
                      prefetch
                      onClick={() => setOpen(false)}
                      selected={active}
                      sx={{
                        borderRadius: 1,
                        my: 0.5,
                        backgroundColor: active ? "rgba(255,255,255,0.12)" : "transparent",
                        "&.Mui-selected": {
                          backgroundColor: "rgba(255,255,255,0.12)",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.2)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      </Fade>
    </>
  );
}
