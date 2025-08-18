import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/manrope/200.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import GlobalAnimatedEspiral from "@/components/atoms/GlobalAnimatedEspiral";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Bastian Landskron | Arquitectura de Software, Ciberseguridad & DevOps",
  description:
    "Bastian Landskron es arquitecto de software, especialista en ciberseguridad y DevOps. Diseña soluciones escalables, microservicios seguros y sistemas inteligentes con IA, FastAPI, Spring Boot y JWT. Además, es docente y speaker internacional.",
  authors: [{ name: "Bastian Landskron", url: "https://blandskron.com" }],
  keywords: [
    "Bastian Landskron",
    "ciberseguridad",
    "arquitectura de software",
    "DevOps",
    "microservicios",
    "FastAPI",
    "Spring Boot",
    "JWT",
    "autenticación segura",
    "IA aplicada",
    "machine learning",
    "infraestructura escalable",
    "automatización",
    "ethical hacking",
    "arquitectura hexagonal",
    "API Gateway",
    "OpenAPI",
    "OAuth2",
    "Docker",
    "CI/CD",
    "Traefik",
    "PostgreSQL",
    "Azure",
    "certificaciones profesionales",
    "docente de tecnología",
    "speaker internacional",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body style={{ backgroundColor: "#04071a" }}>
        <GlobalAnimatedEspiral />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
