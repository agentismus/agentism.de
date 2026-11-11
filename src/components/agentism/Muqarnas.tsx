import { useEffect, useRef } from "react";
import { buildVault, planPath } from "./muqarnas/geometry";
import { createScene, drawVault, parseColor, type VaultColors } from "./muqarnas/render";

const vault = buildVault();
const plan = planPath(vault);
// Matches the scale the canvas uses, so the server-rendered plan and the first frame coincide.
const extent = vault.radius / 0.94;

const ease = (t: number) => t * t * (3 - 2 * t);

function readColors(): VaultColors {
  const css = getComputedStyle(document.documentElement);
  const ground = parseColor(css.getPropertyValue("--ground"), [10, 15, 33]);
  return {
    ground,
    tone: parseColor(css.getPropertyValue("--vault-tone"), [36, 56, 122]),
    line: parseColor(css.getPropertyValue("--accent"), [205, 171, 82]),
    lightGround: ground[0] + ground[1] + ground[2] > 382,
  };
}

/**
 * Abb. 1: the muqarnas vault. It starts as its ground plan and rises into the
 * vault while the visitor scrolls through the track around it.
 */
export function Muqarnas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!track || !sticky || !canvas || !ctx) return;

    const scene = createScene(vault);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    let colors = readColors();
    let size = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let spin = 0;
    let lastTime = performance.now();
    let lastDraw = 0;
    let lastProgress = -1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.round(canvas.clientWidth * dpr);
      canvas.width = size;
      canvas.height = size;
      lastProgress = -1;
    };

    // How far the visitor has scrolled through the track, from 0 to 1.
    const progress = () => {
      if (still.matches) return 1;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const distance = track.offsetHeight - sticky.offsetHeight;
      if (distance <= 1) return 1;
      return Math.min(1, Math.max(0, (top - track.getBoundingClientRect().top) / distance));
    };

    const draw = (now: number) => {
      const p = progress();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;
      if (!still.matches) spin += dt * 0.03;
      // Redraw at full rate while the vault is rising, otherwise at about 30 frames a second.
      if (p !== lastProgress || now - lastDraw > 32) {
        const e = ease(p);
        drawVault(
          ctx,
          scene,
          { lift: e, tilt: 0.34 * e, spin: spin + 0.45 * e, persp: 0.9 * e },
          size,
          dpr,
          colors,
        );
        lastProgress = p;
        lastDraw = now;
      }
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !still.matches ? requestAnimationFrame(loop) : 0;
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      lastProgress = -1;
      // Draw once right away, so the figure never depends on the next animation frame.
      draw(lastTime);
      frame = visible && !still.matches ? requestAnimationFrame(loop) : 0;
    };

    const recolor = () => {
      colors = readColors();
      restart();
    };

    const onResize = () => {
      resize();
      restart();
    };

    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) restart();
    });
    viewObserver.observe(canvas);

    window.addEventListener("agentism:theme", recolor);
    scheme.addEventListener("change", recolor);
    still.addEventListener("change", restart);

    resize();
    restart();
    // The canvas now shows the same plan, so the server-rendered one can go.
    if (planRef.current) planRef.current.style.display = "none";

    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("agentism:theme", recolor);
      scheme.removeEventListener("change", recolor);
      still.removeEventListener("change", restart);
    };
  }, []);

  return (
    <div ref={trackRef} className="muq-track">
      <figure ref={stickyRef} className="muq-sticky">
        <div className="muq-canvas">
          {/* The ground plan, rendered on the server so it is there before any script runs. */}
          <svg
            ref={planRef}
            viewBox={`${-extent} ${-extent} ${2 * extent} ${2 * extent}`}
            aria-hidden="true"
          >
            <path
              d={plan}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Muqarnas-Gewölbe, aus seinem Grundriss errechnet"
          />
        </div>
        <figcaption className="figcap">
          <span className="smallcaps">Abb.&nbsp;1</span> — Muqarnas. Ein Gewölbe aus einzelnen
          Zellen, nach einer Regel aus seinem Grundriss errechnet: hier von Ihrem Browser. Beim
          Scrollen hebt sich der Grundriss zum Gewölbe.
        </figcaption>
      </figure>
    </div>
  );
}
