/**
 * A muqarnas vault generated from a ground plan.
 *
 * The plan is a set of concentric rings, each with `n` points and each turned
 * half a step against the ring below it. This is the plan type of the early
 * conical muqarnas domes of Iraq and Syria. One rule raises it into a vault:
 * every cell stands on two neighbouring points of a ring (its feet), reaches
 * up and inward to the point between them on the next ring (its apex), and
 * leans back against the point between them on the previous ring (its back
 * corner). See docs/design-language.md, section 4.15.
 *
 * The cell shape is a simplification of the cells al-Kashi describes: two
 * upright back walls with a curved top, and a roof of two curved webs that
 * meet in a ridge.
 */

export type Vec3 = readonly [number, number, number];

export interface VaultParams {
  /** Points per ring. */
  n: number;
  /** Number of tiers. */
  tiers: number;
  /** Radius of each ring as a fraction of the ring below it. */
  shrink: number;
  /** Radius of the wall the lowest tier leans against, as a multiple of the lowest ring. */
  wall: number;
  /** Rise per unit of radius. Higher values give a steeper vault. */
  slope: number;
  /** Fraction of a tier's height that the arches stand upright before they curve. */
  stilt: number;
  /** Height of a cell's back corner as a fraction of the tier's height. */
  back: number;
  /** Opening angle of the arch profile in radians. Below a quarter turn the arches are pointed. */
  arc: number;
  /** Straight segments per arch. */
  steps: number;
}

export const VAULT: VaultParams = {
  n: 16,
  tiers: 7,
  shrink: 0.77,
  wall: 1.13,
  slope: 1.05,
  stilt: 0.16,
  back: 0.72,
  arc: 1.12,
  steps: 6,
};

export type FaceKind = "web" | "wall";
export type LineKind = "arch" | "arc" | "ridge" | "edge" | "base";

export interface Face {
  kind: FaceKind;
  pts: Vec3[];
  /** A point on the side of the face that is open to the room. */
  inside: Vec3;
}

export interface Line {
  kind: LineKind;
  pts: Vec3[];
  /** Indices of the faces this line borders. It is drawn in full when one of them is visible. */
  faces: number[];
}

export interface Vault {
  faces: Face[];
  lines: Line[];
  /** Line segments of the ground plan as [x1, y1, x2, y2]. */
  plan: [number, number, number, number][];
  /** Radius of the outermost ring. */
  radius: number;
  height: number;
}

export function buildVault(p: VaultParams = VAULT): Vault {
  const { n, tiers, shrink, wall, slope, stilt, back, arc, steps } = p;
  const step = (2 * Math.PI) / n;

  // Ring -1 is the wall the lowest tier leans against; ring `tiers` is the centre.
  const radius = (k: number) => (k >= tiers ? 0 : k < 0 ? wall : Math.pow(shrink, k));
  const level: number[] = [0];
  for (let k = 0; k < tiers; k++) level.push(level[k] + slope * (radius(k) - radius(k + 1)));

  const at = (k: number, j: number, z: number): Vec3 => {
    const a = (j + k / 2) * step;
    const r = radius(k);
    return [r * Math.cos(a), r * Math.sin(a), z];
  };

  // The arch profile: how far along (u) and how high (v) the curve is at each step.
  const profile: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * arc;
    profile.push([(1 - Math.cos(phi)) / (1 - Math.cos(arc)), Math.sin(phi) / Math.sin(arc)]);
  }

  const curve = (from: Vec3, to: Vec3, z0: number, rise: number): Vec3[] =>
    profile.map(([u, v]) => [
      from[0] + u * (to[0] - from[0]),
      from[1] + u * (to[1] - from[1]),
      z0 + v * rise,
    ]);

  const faces: Face[] = [];
  const lines: Line[] = [];
  const plan: [number, number, number, number][] = [];
  const seg = (a: Vec3, b: Vec3) => plan.push([a[0], a[1], b[0], b[1]]);

  for (let k = 0; k < tiers; k++) {
    const z0 = level[k];
    const z1 = level[k + 1];
    const h = z1 - z0;
    const spring = z0 + stilt * h;
    const backTop = z0 + back * h;

    for (let j = 0; j < n; j++) {
      const corner = at(k - 1, j + 1, z0);
      const cornerTop: Vec3 = [corner[0], corner[1], backTop];
      const apex = at(k + 1, j, z1);

      seg(corner, apex);

      const feet = [at(k, j, z0), at(k, j + 1, z0)];
      const lastWeb: number[] = [];
      const backWall: number[] = [];

      feet.forEach((foot, side) => {
        const other = feet[1 - side];
        const mid = z0 + h / 2;
        const front = curve(foot, apex, spring, z1 - spring);
        const rear = curve(foot, corner, spring, backTop - spring);

        // Roof web: a ruled surface between the rear arc and the front arch.
        // The room is below it and towards the axis.
        const under: Vec3 = [foot[0] * 0.6, foot[1] * 0.6, z0 - h / 2];
        for (let i = 0; i < steps; i++) {
          faces.push({
            kind: "web",
            pts:
              i === 0
                ? [front[0], front[1], rear[1]]
                : [rear[i], front[i], front[i + 1], rear[i + 1]],
            inside: under,
          });
        }
        lastWeb.push(faces.length - 1);

        // Back wall below the rear arc. It faces into its own cell.
        faces.push({
          kind: "wall",
          pts: [foot, corner, ...rear.slice().reverse()],
          inside: [other[0], other[1], mid],
        });
        backWall.push(faces.length - 1);

        // Wall above the front arch, up to the floor of the next tier. It faces away from its own cell.
        faces.push({
          kind: "wall",
          pts: [...front, [foot[0], foot[1], z1]],
          inside: [2 * foot[0] - other[0], 2 * foot[1] - other[1], mid],
        });

        lines.push({
          kind: "arch",
          pts: [foot, ...front],
          faces: [faces.length - 3, faces.length - 1],
        });
        lines.push({ kind: "arc", pts: rear, faces: [faces.length - 3, faces.length - 2] });
        lines.push({ kind: "base", pts: [corner, foot], faces: [faces.length - 2] });
        seg(foot, apex);
        if (k === 0) seg(foot, corner);
      });

      lines.push({ kind: "ridge", pts: [cornerTop, apex], faces: lastWeb });
      lines.push({ kind: "edge", pts: [corner, cornerTop], faces: backWall });
    }
  }

  return { faces, lines, plan, radius: radius(-1), height: level[tiers] };
}

/** The ground plan as SVG path data, in a square of side `2 * vault.radius` centred on 0. */
export function planPath(vault: Vault): string {
  const f = (v: number) => (Math.round(v * 1000) / 1000).toString();
  return vault.plan.map(([a, b, c, d]) => `M${f(a)} ${f(b)}L${f(c)} ${f(d)}`).join("");
}
