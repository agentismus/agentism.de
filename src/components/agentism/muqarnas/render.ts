import type { Vault, Vec3, LineKind } from "./geometry";

export interface View {
  /** 0 shows the flat ground plan, 1 the full vault. */
  lift: number;
  /** Tilt of the viewing direction in radians. */
  tilt: number;
  /** Rotation around the vault's axis in radians. */
  spin: number;
  /** Strength of the perspective. 0 is a parallel projection. */
  persp: number;
}

export type Rgb = [number, number, number];

export interface VaultColors {
  ground: Rgb;
  tone: Rgb;
  line: Rgb;
  /** True when the ground is light, so shaded faces get the tone instead of lit ones. */
  lightGround: boolean;
}

const LINE_ALPHA: Record<LineKind, number> = {
  arch: 0.95,
  ridge: 0.6,
  arc: 0.5,
  edge: 0.55,
  base: 0.45,
};

const LINE_WIDTH: Record<LineKind, number> = {
  arch: 1.15,
  ridge: 0.8,
  arc: 0.75,
  edge: 0.8,
  base: 0.7,
};

/** Opacity of lines whose faces are turned away from the viewer, relative to their normal opacity. */
const GHOST = 0.16;

// Direction of the light in view space (unit length).
const LIGHT: Vec3 = [-0.42, -0.56, -0.71];

interface Item {
  face: boolean;
  index: number;
  depth: number;
}

/** Reusable drawing state, so that a frame allocates nothing. */
export interface Scene {
  vault: Vault;
  items: Item[];
  /** Per face: 1 when it is turned towards the viewer. */
  shown: Uint8Array;
  /** Per face: how much light it catches, from 0 to 1. */
  lit: Float32Array;
}

export function createScene(vault: Vault): Scene {
  const items: Item[] = [];
  vault.faces.forEach((_, index) => items.push({ face: true, index, depth: 0 }));
  vault.lines.forEach((_, index) => items.push({ face: false, index, depth: 0 }));
  return {
    vault,
    items,
    shown: new Uint8Array(vault.faces.length),
    lit: new Float32Array(vault.faces.length),
  };
}

export function drawVault(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  view: View,
  size: number,
  dpr: number,
  colors: VaultColors,
) {
  const { vault, items, shown, lit } = scene;
  const { lift, tilt, spin, persp } = view;
  const cs = Math.cos(spin);
  const sn = Math.sin(spin);
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const R = vault.radius;
  const half = (vault.height * lift) / 2;
  // Perspective is measured from the nearest point of the rim, so nothing grows beyond the plan.
  const nearest = -(R * st + half * ct);
  const shrinkAt = (z: number) => 1 / (1 + (persp * (z - nearest)) / R);
  // Fit the figure to the canvas: its sides and its near and far rim must stay inside.
  const yTop = -(R * ct - half * st);
  const yBottom = (R * ct + half * st) * shrinkAt(R * st - half * ct);
  const fit = Math.min(1 / shrinkAt(-half * ct), (2 * R) / (yBottom - yTop));
  const scale = (size / 2 / R) * 0.94 * fit;
  const cx = size / 2;
  const cy = size / 2 - ((yTop + yBottom) / 2) * scale;

  // View space: x to the right, y down the screen, z away from the viewer.
  let vx = 0;
  let vy = 0;
  let vz = 0;
  const toView = (p: Vec3) => {
    const y = p[0] * sn + p[1] * cs;
    const z = p[2] * lift - half;
    vx = p[0] * cs - p[1] * sn;
    vy = y * ct - z * st;
    vz = y * st + z * ct;
  };

  // Pass 1: which faces are turned towards the viewer, how bright they are, how far away.
  let item = 0;
  for (let f = 0; f < vault.faces.length; f++) {
    const face = vault.faces[f];
    const pts = face.pts;
    toView(pts[0]);
    const ox = vx;
    const oy = vy;
    const oz = vz;
    toView(pts[1]);
    const ax = vx - ox;
    const ay = vy - oy;
    const az = vz - oz;
    toView(pts[pts.length - 1]);
    const bx = vx - ox;
    const by = vy - oy;
    const bz = vz - oz;
    let nx = ay * bz - az * by;
    let ny = az * bx - ax * bz;
    let nz = ax * by - ay * bx;
    const len = Math.hypot(nx, ny, nz);
    if (len < 1e-9) {
      // Seen exactly edge-on, as every wall is in the ground plan.
      shown[f] = 1;
      lit[f] = 0;
    } else {
      nx /= len;
      ny /= len;
      nz /= len;
      // Turn the normal towards the room.
      toView(face.inside);
      if (nx * (vx - ox) + ny * (vy - oy) + nz * (vz - oz) < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      shown[f] = nz < 0.03 ? 1 : 0;
      lit[f] = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
    }
    let depth = 0;
    for (let i = 0; i < pts.length; i++) {
      toView(pts[i]);
      depth += vz;
    }
    items[item].face = true;
    items[item].index = f;
    items[item].depth = depth / pts.length;
    item++;
  }
  for (let l = 0; l < vault.lines.length; l++) {
    const pts = vault.lines[l].pts;
    let depth = 0;
    for (let i = 0; i < pts.length; i++) {
      toView(pts[i]);
      depth += vz;
    }
    items[item].face = false;
    items[item].index = l;
    // Lines sit slightly in front of the faces they border.
    items[item].depth = depth / pts.length - 0.03 * R;
    item++;
  }

  // Painter's algorithm: far things first.
  items.sort((a, b) => b.depth - a.depth);

  ctx.clearRect(0, 0, size, size);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const [gr, gg, gb] = colors.ground;
  const [tr, tg, tb] = colors.tone;
  const [lr, lg, lb] = colors.line;

  const trace = (pts: readonly Vec3[], close: boolean) => {
    ctx.beginPath();
    for (let i = 0; i < pts.length; i++) {
      toView(pts[i]);
      const s = shrinkAt(vz) * scale;
      if (i === 0) ctx.moveTo(cx + vx * s, cy + vy * s);
      else ctx.lineTo(cx + vx * s, cy + vy * s);
    }
    if (close) ctx.closePath();
  };

  for (const it of items) {
    if (it.face) {
      if (lift < 0.002 || !shown[it.index]) continue;
      const light = lit[it.index];
      const amount = lift * (0.14 + 0.86 * (colors.lightGround ? 1 - light : light));
      const fill = `rgb(${Math.round(gr + (tr - gr) * amount)},${Math.round(gg + (tg - gg) * amount)},${Math.round(gb + (tb - gb) * amount)})`;
      trace(vault.faces[it.index].pts, true);
      ctx.fillStyle = fill;
      ctx.fill();
      // A hairline in the fill colour closes the seams between neighbouring faces.
      ctx.strokeStyle = fill;
      ctx.lineWidth = dpr * 0.6;
      ctx.stroke();
    } else {
      const line = vault.lines[it.index];
      let visible = false;
      for (const f of line.faces) if (shown[f]) visible = true;
      // Lines of faces turned away fade to a ghost as the vault rises.
      const alpha = LINE_ALPHA[line.kind] * (visible ? 1 : 1 - lift * (1 - GHOST));
      trace(line.pts, false);
      ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
      ctx.lineWidth = dpr * LINE_WIDTH[line.kind];
      ctx.stroke();
    }
  }
}

export function parseColor(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = value.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return fallback;
}
