import React from "react";

type Props = {
  speed?: string;
  saturation?: number;
  blur?: number;
  colorChangeSpeed?: string;
  /** Rangos de tono permitidos (HSL) en grados 0–360 */
  hue1?: [number, number]; // capa ::before
  hue2?: [number, number]; // capa ::after
};

export default function EspiralBackground({
  speed = "14s",
  saturation = 1.4,
  blur = 80,
  colorChangeSpeed = "20s",
  hue1 = [250, 280], 
  hue2 = [210, 260], 
}: Props) {
  return (
    <div
      className="swirl"
      style={
        {
          // @ts-ignore
          "--speed": speed,
          // @ts-ignore
          "--sat": String(saturation),
          // @ts-ignore
          "--blur": `${blur}px`,
          // @ts-ignore
          "--color-change-speed": colorChangeSpeed,
          // @ts-ignore
          "--h1-min": hue1[0],
          // @ts-ignore
          "--h1-max": hue1[1],
          // @ts-ignore
          "--h2-min": hue2[0],
          // @ts-ignore
          "--h2-max": hue2[1],
        } as React.CSSProperties
      }
    >
      <div className="content" />

      <style jsx>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @property --hue-1 {
          syntax: "<number>";
          inherits: false;
          initial-value: 260;
        }
        @property --hue-2 {
          syntax: "<number>";
          inherits: false;
          initial-value: 220;
        }
        /* límites tipados para poder animar entre min/max */
        @property --h1-min { syntax: "<number>"; inherits: false; initial-value: 230; }
        @property --h1-max { syntax: "<number>"; inherits: false; initial-value: 300; }
        @property --h2-min { syntax: "<number>"; inherits: false; initial-value: 210; }
        @property --h2-max { syntax: "<number>"; inherits: false; initial-value: 280; }

        .swirl {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: radial-gradient(
            120% 120% at 50% 50%,
            #07102e 0%,
            #050b23 45%,
            #04071a 100%
          );
          isolation: isolate;
        }

        .swirl::before {
          content: "";
          position: absolute;
          inset: -30%;
          --angle: 0deg;
          background: conic-gradient(
            from var(--angle),
            hsla(var(--hue-1), 100%, 50%, 0.30) 0 85deg,
            hsla(var(--hue-2), 100%, 50%, 0.30) 85deg 180deg,
            hsla(var(--hue-1), 100%, 50%, 0.30) 180deg 265deg,
            hsla(var(--hue-2), 100%, 50%, 0.30) 265deg 360deg
          );
          filter: blur(var(--blur)) saturate(var(--sat));
          mix-blend-mode: screen;
          animation:
            spin var(--speed) linear infinite,
            clampHues var(--color-change-speed) ease-in-out infinite alternate;
        }

        .swirl::after {
          content: "";
          position: absolute;
          inset: -35%;
          --angle: 180deg;
          background: conic-gradient(
            from var(--angle),
            hsla(var(--hue-2), 100%, 50%, 0.45) 0 90deg,
            hsla(var(--hue-1), 100%, 50%, 0.45) 90deg 180deg,
            hsla(var(--hue-2), 100%, 50%, 0.45) 180deg 270deg,
            hsla(var(--hue-1), 100%, 50%, 0.45) 270deg 360deg
          );
          filter: blur(calc(var(--blur) * 1.2)) saturate(calc(var(--sat) * 0.9));
          mix-blend-mode: screen;
          animation:
            spin-rev calc(var(--speed) * 1.25) linear infinite,
            clampHues var(--color-change-speed) ease-in-out infinite alternate-reverse;
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: white;
          text-shadow: 0 3px 20px rgba(139, 15, 119, 0.45);
        }

        @keyframes spin { to { --angle: 360deg; } }
        @keyframes spin-rev { to { --angle: -180deg; } }

        /* Animación restringida: solo oscila entre min y max */
        @keyframes clampHues {
          from {
            --hue-1: var(--h1-min);
            --hue-2: var(--h2-min);
          }
          to {
            --hue-1: var(--h1-max);
            --hue-2: var(--h2-max);
          }
        }

        @supports (-webkit-touch-callout: none) {
          .swirl::before,
          .swirl::after {
            filter: blur(calc(var(--blur) * 1.1)) saturate(calc(var(--sat) * 1.05));
          }
        }
      `}</style>
    </div>
  );
}
