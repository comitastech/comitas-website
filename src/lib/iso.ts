/**
 * Small isometric drawing kit for the site's technical illustrations.
 *
 * Coordinates: x runs right-down, y runs left-down, z runs up (drawing
 * units). Every projected point is recorded, so `viewBox()` can fit the
 * drawing exactly. Create one kit per figure.
 */

export type Point = [number, number];

/** Shared canvas of the step figures (4:3, matching the figure frame). */
export const CANVAS_W = 320;
export const CANVAS_H = 240;

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;

export const fmt = (n: number) => String(Math.round(n * 100) / 100);
const pt = ([x, y]: Point) => `${fmt(x)} ${fmt(y)}`;

export function createIso() {
  const seen: Point[] = [];

  const project = (x: number, y: number, z: number): Point => {
    const p: Point = [(x - y) * COS, (x + y) * SIN - z];
    seen.push(p);
    return p;
  };

  /** Registers a screen point (for text and other non-projected marks). */
  const include = (p: Point) => {
    seen.push(p);
    return p;
  };

  const closed = (points: Point[]) => `M${points.map(pt).join("L")}Z`;
  const open = (points: Point[]) => `M${points.map(pt).join("L")}`;

  /** Straight segment on the horizontal plane at height z. */
  const seg = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    open([project(x0, y0, z), project(x1, y1, z)]);

  /** Polyline on the horizontal plane at height z. */
  const poly = (points: [number, number][], z: number) =>
    open(points.map(([x, y]) => project(x, y, z)));

  /** Axis-aligned rectangle on the horizontal plane at height z. */
  const rect = (x0: number, y0: number, x1: number, y1: number, z: number) =>
    closed([
      project(x0, y0, z),
      project(x1, y0, z),
      project(x1, y1, z),
      project(x0, y1, z),
    ]);

  /** Circle on the horizontal plane (an ellipse on screen). */
  const circle = (cx: number, cy: number, r: number, z: number, steps = 40) =>
    closed(
      Array.from({ length: steps }, (_, i) => {
        const t = (i / steps) * Math.PI * 2;
        return project(cx + r * Math.cos(t), cy + r * Math.sin(t), z);
      }),
    );

  /** Arc of a horizontal circle, from angle t0 to t1 (radians). */
  const arc = (
    cx: number,
    cy: number,
    r: number,
    z: number,
    t0: number,
    t1: number,
    steps = 24,
  ) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = t0 + ((t1 - t0) * i) / steps;
      return project(cx + r * Math.cos(t), cy + r * Math.sin(t), z);
    });

  /**
   * Point on an upright plane facing the viewer, standing at (x, y, z):
   * `a` runs screen-horizontally, `b` runs straight up.
   */
  const upright = (x: number, y: number, z: number, a: number, b: number) =>
    project(x + a / Math.SQRT2, y - a / Math.SQRT2, z + b);

  /**
   * Box (rectangular prism) standing on (x, y, z), size w × d × h.
   * Returns the three visible faces: top, left (y + d) and right (x + w).
   */
  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number,
  ) => ({
    top: rect(x, y, x + w, y + d, z + h),
    left: closed([
      project(x, y + d, z + h),
      project(x + w, y + d, z + h),
      project(x + w, y + d, z),
      project(x, y + d, z),
    ]),
    right: closed([
      project(x + w, y, z + h),
      project(x + w, y + d, z + h),
      project(x + w, y + d, z),
      project(x + w, y, z),
    ]),
  });

  /**
   * Vertical cylinder standing on (cx, cy, z): the side (front half) and
   * the top ellipse.
   */
  const cylinder = (
    cx: number,
    cy: number,
    z: number,
    r: number,
    h: number,
  ) => {
    // Screen extremes of a horizontal circle are at -45° and 135°.
    const t0 = -Math.PI / 4;
    const t1 = (3 * Math.PI) / 4;
    const bottomFront = arc(cx, cy, r, z, t0, t1);
    const topFront = arc(cx, cy, r, z + h, t1, t0);
    return {
      side: closed([...bottomFront, ...topFront]),
      top: circle(cx, cy, r, z + h, 48),
    };
  };

  /** View box string that fits everything drawn so far, plus padding. */
  const viewBox = (pad = 8) => {
    const xs = seen.map((p) => p[0]);
    const ys = seen.map((p) => p[1]);
    const minX = Math.min(...xs) - pad;
    const minY = Math.min(...ys) - pad;
    const w = Math.max(...xs) - Math.min(...xs) + pad * 2;
    const h = Math.max(...ys) - Math.min(...ys) + pad * 2;
    return [minX, minY, w, h].map(fmt).join(" ");
  };

  /**
   * Fixed canvas shared by the step figures: the same size for all of them,
   * so one drawing unit is the same number of pixels everywhere (equal scale,
   * equal inner margin). The content is centered in it; `dy` nudges it
   * vertically (negative = up). Throws when the content leaves less than
   * `margin` units free on any side, so a drawing can't silently crowd the
   * frame.
   */
  const canvas = (dy = 0, margin = 20) => {
    const xs = seen.map((p) => p[0]);
    const ys = seen.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    if (w > CANVAS_W - margin * 2 || h > CANVAS_H - margin * 2) {
      throw new Error(
        `Figure content ${fmt(w)}×${fmt(h)} exceeds the ${CANVAS_W}×${CANVAS_H} canvas minus a ${margin} margin`,
      );
    }
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2 + dy;
    return [cx - CANVAS_W / 2, cy - CANVAS_H / 2, CANVAS_W, CANVAS_H]
      .map(fmt)
      .join(" ");
  };

  return {
    project,
    include,
    closed,
    open,
    seg,
    poly,
    rect,
    circle,
    arc,
    upright,
    box,
    cylinder,
    viewBox,
    canvas,
    pt,
  };
}
