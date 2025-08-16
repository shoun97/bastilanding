import React from "react";

/**
 * SwirlBackground – fondo animado tipo vórtice (blue/purple glow)
 *
 *
 * Uso:
 *   import SwirlBackground from "@/components/SwirlBackground";
 *   export default function Page(){
 *     return (
 *       <main style={{height:"100dvh"}}>
 *         <SwirlBackground speed="16s" saturation={1.3} />
 *       </main>
 *     )
 *   }
 */

type Props = {
  speed?: string;
  saturation?: number;
  blur?: number;
};

export default function EspiralBackground({ speed = "14s", saturation = 1.4, blur = 60 }: Props) {
  return (
    <div
      className="swirl"
      style={{
        // CSS custom properties – se pueden ajustar desde props perdón por tanto @ts-ignore... Quiero dormir perrooooooooooooo aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        // @ts-ignore - CSS var custom
        "--speed": speed,
        // @ts-ignore
        "--sat": String(saturation),
        // @ts-ignore
        "--blur": `${blur}px`,
      }}
    >
      {/* Capa opcional para contenido */}
      <div className="content">
      </div>

      <style jsx>{`
        /* Registro de la propiedad animada para interpolación suave */
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .swirl {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: radial-gradient(120% 120% at 50% 50%, #07102e 0%, #050b23 45%, #04071a 100%);
          isolation: isolate; /* mezcla correcta de capas */
        }

        .swirl::before {
          content: '';
          position: absolute;
          inset: -22%; /* margen extra para que el blur no corte */
          --angle: 0deg;
          background: conic-gradient(from var(--angle),
            rgba(135, 0, 255, .3) 0 85deg,
            rgba(0, 105, 255, .3) 85deg 180deg,
            rgba(135, 0, 255, .3) 180deg 265deg,
            rgba(0, 105, 255, .3) 265deg 360deg
          );
          filter: blur(var(--blur)) saturate(var(--sat));
          transform: translateZ(0);
          will-change: filter;
          mix-blend-mode: screen;
          animation: spin var(--speed) linear infinite;
        }

        .swirl::after {
          content: '';
          position: absolute;
          inset: -25%;
          --angle: 180deg;
          background: conic-gradient(from var(--angle),
            rgba(0, 55, 255, .45) 0 90deg,
            rgba(156, 0, 255, .45) 90deg 180deg,
            rgba(0, 55, 255, .45) 180deg 270deg,
            rgba(156, 0, 255, .45) 270deg 360deg
          );
          filter: blur(calc(var(--blur) * 0.9)) saturate(calc(var(--sat) * 0.9));
          mix-blend-mode: screen;
          animation: spin-rev calc(var(--speed) * 1.25) linear infinite;
        }

        /* Vignette suave para oscurecer bordes y dar foco central */
        .swirl :global(.vignette), .swirl .vignette { display: none; }
        .swirl > :global(.vignette), .swirl > .vignette { display: block; }

        .content {
          position: relative;
          z-index: 1; /* sobre las capas del vórtice */
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: white;
          text-shadow: 0 3px 20px rgba(0,0,0,.45);
        }

        .swirl::marker { content: none; }

        @keyframes spin {
          to { --angle: 360deg; }
        }
        @keyframes spin-rev {
          to { --angle: -180deg; }
        }

        .swirl:after {
          /* esto es como una mascara basti por si lees acá hola esimado y perdon por la demora pero si o si estará antes de septiembre */
        }

        @supports (-webkit-touch-callout: none) {
          .swirl::before, .swirl::after { filter: blur(var(--blur)) saturate(calc(var(--sat) * 1.05)); }
        }
      `}</style>
    </div>
  );
}
