"use client";
import { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import LogoIcon from "../atoms/LogoIcon";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AnimacionHero from "../molecules/AnimacionHero";

const navItems = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Proyectos", icon: <FolderIcon /> },
  { text: "Experiencia", icon: <WorkIcon /> },
  { text: "Educación", icon: <SchoolIcon /> },
  { text: "Descarga CV", icon: <DescriptionIcon /> },
];

export default function MyAppBar() {
  const [open, setOpen] = useState(false);
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
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <AnimacionHero />

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
            top: 54,
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
              {navItems.map(({ text, icon }, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      borderRadius: 1,
                      my: 0.5,
                      backgroundColor:
                        index === 0 ? "rgba(255,255,255,0.1)" : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Fade>
    </>
  );
}
