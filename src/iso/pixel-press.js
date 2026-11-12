// Fig 1 · Pixel press.
// A gantry plotter that inscribes a 24 x 24 Satoshi Punk onto a bed, one block per pixel.
// The gantry runs along x on two rails, the head runs along y on the beam, and the nozzle
// presses down to set each block. Block height encodes the sprite's tone: darker is taller.
import * as k from "./iso-kit.mjs";
import { PUNK } from "./punk.js";

const N = 24;
const C = 4.4; // one pixel, in world units
const G0 = (-N * C) / 2; // grid origin
const cx = (i) => G0 + i * C + C / 2;
const BED_Z = 3;

// Material of each sprite pixel: block height and finish.
const MAT = {
  f: { h: 1.4, cls: "px-f" },
  s: { h: 1.0, cls: "px-s" },
  m: { h: 1.9, cls: "px-m" },
  k: { h: 3.0, cls: "px-k" },
  e: { h: 3.6, cls: "px-e" },
  u: { h: 3.0, cls: "px-k" }, // a pixel the visitor stamps
};

const WIDTH = 720;
const HEIGHT = 480;
const PLATE = { x: -86, y: -92, w: 172, d: 184, r: 9 };
const PLATE_H = 10;
const FOOT_H = 5;
const BED = { x: -56.4, y: -56.4, w: 112.8, d: 112.8, r: 3 };
const RAIL_Y = 72;
const RAIL = { from: -80, to: 80 };
const BEAM_OFF = -9; // beam centre sits 9 behind the nozzle
const POST_TOP = 46;
const BEAM = { z: 46, h: 8 };
const NOZZLE_REST = 14; // tip height at rest
const HEAD_Y = { min: cx(0), max: cx(N - 1) };
const GX = { min: cx(0), max: cx(N - 1) };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [GX.min + BEAM_OFF - 7, -RAIL_Y - 6, 66],
    [GX.max + BEAM_OFF + 7, RAIL_Y + 6, 58],
    [GX.max + BEAM_OFF - 7, -RAIL_Y - 6, 66],
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 42 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// ---------- static parts ----------

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
    out.push(S(k.cylinder(x, y, 7.5, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.8, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 9, 1.6), { tone: "mid", inner: L(k.sideSeam(PLATE, -PLATE_H + 3, P, 9), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 4.5), 0, P, 9), { tone: "faint" }));
  const screws = k.corners(PLATE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // Column ruler along the near edge: one tick per pixel, a major tick every 6.
  const strip = { x: G0 - 3, y: 80, w: N * C + 6, d: 6.5, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(G0, G0 + N * C, C, 6, strip.y + 0.6, 0.6, [1.8, 3.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  out.push(D([at([strip.x + 1.5, strip.y + 3.2, 0.6]), at([strip.x + strip.w - 1.5, strip.y + 3.2, 0.6])], { size: 0.4 }));

  // Row ruler along the right edge.
  const rowStrip = { x: 70, y: G0 - 3, w: 6.5, d: N * C + 6, r: 1 };
  out.push(S(k.slabOf(rowStrip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const rt = k.topTicks(G0, G0 + N * C, C, 6, rowStrip.x + 0.6, 0.6, [1.8, 3.4], P, "y");
  out.push(L(rt.minor, { tone: "lo" }), L(rt.major, { tone: "mid" }));

  // Label plate, far right corner: three rule lines that stand for printed text.
  const label = { x: 62, y: -84, w: 18, d: 13, r: 1.4 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.4), 0.8, P, 4), { tone: "faint" }));
  [[4, 14, -80], [4, 11, -77.6], [4, 8, -75.2]].forEach(([x0, x1, y]) =>
    out.push(L(k.lineOnTop([label.x + x0, y], [label.x + x1, y], 0.8, P), { tone: "lo", free: true })),
  );
  out.push(D([at([label.x + 2.2, label.y + label.d - 2.2, 0.8]), at([label.x + label.w - 2.2, label.y + label.d - 2.2, 0.8])], { size: 0.4 }));

  // Rails with their end stops.
  for (const y of [-RAIL_Y, RAIL_Y]) {
    out.push(S(k.slabOf({ x: RAIL.from, y: y - 2.5, w: RAIL.to - RAIL.from, d: 5, r: 1 }, 0, 3, P, 3, 0.4), { tone: "mid" }));
    out.push(L(k.lineOnTop([RAIL.from, y], [RAIL.to, y], 3, P), { tone: "faint" }));
    out.push(D([RAIL.from + 6, 0, RAIL.to - 6].map((x) => at([x, y + 1.6, 3])), { size: 0.4 }));
    for (const x of [RAIL.from - 4, RAIL.to]) {
      out.push(S(k.slabOf({ x, y: y - 5, w: 4, d: 10, r: 1 }, 0, 7, P, 3, 0.4), { tone: "mid" }));
      out.push(D([at([x + 2, y - 2.6, 7]), at([x + 2, y + 2.6, 7])], { size: 0.4 }));
    }
  }
  return out.join("");
}

function bed() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(BED, 2), 0, 0.1, P)}" style="filter:blur(5px)"/>`];
  const grid = { x: G0, y: G0, w: N * C, d: N * C, r: 0 };
  const lines = [];
  for (let i = 1; i < N; i++) {
    const v = G0 + i * C;
    lines.push(k.lineOnTop([v, G0], [v, G0 + N * C], BED_Z, P), k.lineOnTop([G0, v], [G0 + N * C, v], BED_Z, P));
  }
  out.push(
    S(k.slabOf(BED, 0, BED_Z, P, 4, 0.6), {
      tone: "mid",
      inner: L(lines.join(""), { tone: "faint" }) + L(k.planOutline(grid, BED_Z, P, 1), { tone: "lo" }),
    }),
  );
  out.push(D(k.corners(BED, 1.6).map(([x, y]) => at([x, y, BED_Z])), { size: 0.4 }));
  return out.join("");
}

// The gantry is built at nozzle x = 0 and moved along x as one carriage, but drawn in three slots.
function gantryFar() {
  const bx = BEAM_OFF;
  const out = [];
  const y = -RAIL_Y;
  out.push(S(k.slabOf({ x: bx - 7, y: y - 6, w: 14, d: 12, r: 2 }, 3, 6, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([bx - 4, y - 3, 9]), at([bx + 4, y - 3, 9]), at([bx - 4, y + 3, 9]), at([bx + 4, y + 3, 9])], { size: 0.4 }));
  out.push(S(k.slabOf({ x: bx - 3.5, y: y - 3.5, w: 7, d: 7, r: 1.2 }, 9, POST_TOP - 9 - 2, P, 3, 0.4), { tone: "mid" }));
  // Far end bracket and the stepper motor on it.
  const bracket = { x: bx - 5.5, y: -RAIL_Y - 5, w: 11, d: 15, r: 1.6 };
  out.push(S(k.slabOf(bracket, POST_TOP - 2, BEAM.h + 4, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([bx - 3, -RAIL_Y - 2.4, POST_TOP + BEAM.h + 2]), at([bx + 3, -RAIL_Y - 2.4, POST_TOP + BEAM.h + 2])], { size: 0.4 }));
  const mz = POST_TOP + BEAM.h + 2;
  out.push(S(k.slabOf({ x: bx - 4.5, y: -RAIL_Y - 1, w: 9, d: 9, r: 1 }, mz, 7, P, 3, 0.4), { tone: "mid", inner: L(k.sideSeam({ x: bx - 4.5, y: -RAIL_Y - 1, w: 9, d: 9, r: 1 }, mz + 3.5, P, 3), { tone: "faint" }) }));
  out.push(S(k.cylinder(bx, -RAIL_Y + 3.5, 2.2, mz + 7, 1.6, P, 20), { tone: "mid" }));
  out.push(L(k.ring(bx, -RAIL_Y + 3.5, 1, mz + 8.6, P, 12), { tone: "lo" }));
  return out.join("");
}

function beam() {
  const bx = BEAM_OFF;
  const plan = { x: bx - 4, y: -RAIL_Y + 10, w: 8, d: RAIL_Y * 2 - 20, r: 1.4 };
  const out = [];
  out.push(
    S(k.slabOf(plan, BEAM.z, BEAM.h, P, 3, 0.5), {
      tone: "mid",
      inner: L(k.sideSeam(plan, BEAM.z + 3.2, P, 3), { tone: "faint" }),
    }),
  );
  // Timing belt groove along the top, ending on both brackets.
  out.push(L(k.lineOnTop([bx + 1.6, plan.y], [bx + 1.6, plan.y + plan.d], BEAM.z + BEAM.h, P), { tone: "lo" }));
  out.push(L(k.lineOnTop([bx - 1.6, plan.y], [bx - 1.6, plan.y + plan.d], BEAM.z + BEAM.h, P), { tone: "faint" }));
  return out.join("");
}

function gantryNear() {
  const bx = BEAM_OFF;
  const y = RAIL_Y;
  const out = [];
  out.push(S(k.slabOf({ x: bx - 7, y: y - 6, w: 14, d: 12, r: 2 }, 3, 6, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([bx - 4, y - 3, 9]), at([bx + 4, y - 3, 9]), at([bx - 4, y + 3, 9]), at([bx + 4, y + 3, 9])], { size: 0.4 }));
  // Knurled hand wheel on the near truck.
  out.push(S(k.slabOf({ x: bx + 7, y: y - 1.4, w: 2.4, d: 2.8, r: 0.6 }, 5, 2.2, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(bx + 12, y, 3.2, 3.2, 5, P, 24), { tone: "mid" }));
  out.push(L(k.knurl(bx + 12, y, 3.2, 3.2, 8.2, 22, P), { tone: "lo" }));
  out.push(S(k.slabOf({ x: bx - 3.5, y: y - 3.5, w: 7, d: 7, r: 1.2 }, 9, POST_TOP - 9 - 2, P, 3, 0.4), { tone: "mid" }));
  const bracket = { x: bx - 5.5, y: RAIL_Y - 10, w: 11, d: 15, r: 1.6 };
  out.push(S(k.slabOf(bracket, POST_TOP - 2, BEAM.h + 4, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([bx - 3, RAIL_Y + 2.4, POST_TOP + BEAM.h + 2]), at([bx + 3, RAIL_Y + 2.4, POST_TOP + BEAM.h + 2])], { size: 0.4 }));
  return out.join("");
}

// The head rides the beam's near face. Built at nozzle (0, 0).
function head() {
  const out = [];
  const carriage = { x: BEAM_OFF + 4, y: -7, w: 7, d: 14, r: 1.4 };
  // Nozzle first: its top end is hidden inside the body, its tip is the lit part.
  out.push(`<g data-part="nozzle">${S(k.cylinder(0, 0, 1.2, NOZZLE_REST, 30, P, 18), { tone: "hi", crease: "none", lit: true })}${S(k.cylinder(0, 0, 0.6, NOZZLE_REST - 1.2, 1.2, P, 12), { tone: "hi", lit: true })}</g>`);
  out.push(S(k.cylinder(0, 0, 2.6, 24, 4, P, 24), { tone: "mid", inner: L(k.sideArc(0, 0, 2.6, 26, P, 16), { tone: "faint" }) }));
  const body = { x: -4.2, y: -4.2, w: 8.4, d: 8.4, r: 1.6 };
  out.push(S(k.slabOf(body, 28, 12, P, 4, 0.5), { tone: "mid", inner: L(k.sideSeam(body, 34, P, 4), { tone: "faint" }) }));
  out.push(S(k.slabOf(carriage, 40, 18, P, 4, 0.5), { tone: "mid" }));
  out.push(D([at([carriage.x + carriage.w - 1.8, -4.4, 58]), at([carriage.x + carriage.w - 1.8, 4.4, 58])], { size: 0.45 }));
  // Status window on the carriage top.
  out.push(L(k.planOutline({ x: carriage.x + 1.4, y: -2.6, w: 3, d: 5.2, r: 0.8 }, 58, P, 3), { tone: "lo" }));
  return out.join("");
}

function pixelSvg(i, j, kind) {
  const m = MAT[kind];
  const plan = { x: G0 + i * C + 0.3, y: G0 + j * C + 0.3, w: C - 0.6, d: C - 0.6, r: 0.5 };
  return S(k.slabOf(plan, BED_Z, m.h, P, 2, 0.3), { tone: "hi", crease: "lo", className: m.cls });
}

// ---------- live ----------

export function mountPixelPress(root, { bare = false } = {}) {
  const sprite = PUNK.map((row) => [...row]);
  const cells = []; // { i, j, kind, on, el, appear }
  const target = [];
  // Print order: column by column, rows alternating, like the real plotter.
  for (let i = 0; i < N; i++) {
    const rows = [...Array(N).keys()];
    if (i % 2) rows.reverse();
    for (const j of rows) if (sprite[j][i] !== ".") target.push([i, j]);
  }

  const svgBody = [
    base(),
    `<g data-slot="far">${gantryFar()}</g>`,
    bed(),
    `<path data-part="cursor" class="iso-line" data-tone="mid" d="${k.planOutline({ x: G0 + 0.3, y: G0 + 0.3, w: C - 0.6, d: C - 0.6, r: 0.6 }, BED_Z + 0.05, P, 2)}"/>`,
    `<g data-layer="pixels"></g>`,
  ].join("");

  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      "A gantry pixel press on a base plate. Two rails carry a gantry across a 24 by 24 grid; a head on the gantry beam carries a nozzle that presses down to set one block per pixel. The blocks build a Satoshi Punk in relief: darker pixels are taller blocks.",
    body: svgBody,
  });

  const plate = k.plateHtml({
    fig: "Fig 1",
    title: "Pixel press",
    hint: "Hover to steer · click to stamp",
    readout: "",
    keys: [
      { mark: "lit", label: "Nozzle: one press, one pixel" },
      { mark: "raised", label: "Blocks: the darker the pixel, the taller the block" },
    ],
    caption:
      "A Satoshi Punk is 24 × 24 pixels, and every one was placed by hand. This press sets them the same way, one block per pixel, column by column. Steer the head and stamp your own.",
    body: `<div class="iso-stage" tabindex="0" role="application" aria-label="Pixel press. Arrow keys move the head, Enter or Space stamps a pixel.">${svg}</div>`,
  });

  root.innerHTML = bare
    ? `<div class="press-bare"><div class="iso-stage" tabindex="0" role="application" aria-label="Pixel press. Arrow keys move the head, Enter or Space stamps a pixel.">${svg}</div></div>`
    : plate;
  const stage = root.querySelector(".iso-stage");
  const svgEl = stage.querySelector("svg");
  const layer = svgEl.querySelector('[data-layer="pixels"]');
  const readout = root.querySelector("[data-readout]");
  const cursor = svgEl.querySelector('[data-part="cursor"]');
  const NS = "http://www.w3.org/2000/svg";

  // Dynamic groups, inserted in painter's order inside the pixel layer.
  const mk = (html, part) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("data-part", part);
    g.innerHTML = html;
    return g;
  };
  const beamG = mk(beam(), "beam");
  const headG = mk(head(), "head");
  const nearG = mk(gantryNear(), "near");
  const farG = svgEl.querySelector('[data-slot="far"]');
  const nozzle = headG.querySelector('[data-part="nozzle"]');

  const cellAt = (i, j) => cells[i * N + j];
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      const kind = sprite[j][i];
      cells.push({ i, j, kind: kind === "." ? null : kind, on: false, el: null, appear: 1 });
    }
  const ensureEl = (cell, kind) => {
    if (cell.el && cell.elKind === kind) return cell.el;
    if (cell.el) cell.el.remove();
    cell.el = mk(pixelSvg(cell.i, cell.j, kind), "px");
    cell.elKind = kind;
    return cell.el;
  };

  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  // Screen -> bed inverse of the projection at z = BED_Z.
  const o = at([0, 0, BED_Z]);
  const ex = at([1, 0, BED_Z]);
  const ey = at([0, 1, BED_Z]);
  const a = ex[0] - o[0], b = ey[0] - o[0], c = ex[1] - o[1], d = ey[1] - o[1];
  const det = a * d - b * c;
  const toBed = (sx, sy) => {
    const u = sx - o[0], v = sy - o[1];
    return [(d * u - b * v) / det, (-c * u + a * v) / det];
  };
  const cellOf = (x, y) => [Math.round((x - cx(0)) / C), Math.round((y - cx(0)) / C)];

  // State
  let gx = cx(0), hy = cx(0); // nozzle position
  let goal = [0, 0]; // target cell
  let drop = 0; // nozzle travel down
  let press = null; // { cell, t, kind, on }
  let mode = "tour"; // tour | user | wipe | hold
  let tourIndex = 0;
  let holdUntil = 0;
  let idleTimer = 0;
  let frame = 0, last = 0, visible = false, clock = 0;
  let order = "";

  // Start with most of the punk already set, so the page never opens on an empty bed.
  const preset = Math.floor(target.length * 0.62);
  for (let n = 0; n < preset; n++) {
    const [i, j] = target[n];
    const cell = cellAt(i, j);
    cell.on = true;
    ensureEl(cell, cell.kind);
  }
  tourIndex = preset;
  if (still.matches) {
    for (const [i, j] of target) {
      const cell = cellAt(i, j);
      cell.on = true;
      ensureEl(cell, cell.kind);
    }
    tourIndex = target.length;
    mode = "hold";
  }
  if (tourIndex < target.length) {
    goal = target[tourIndex];
    gx = cx(goal[0]);
    hy = cx(goal[1]);
  }

  const count = () => cells.reduce((n, cell) => n + (cell.on ? 1 : 0), 0);

  function reorder(ci, cj) {
    const key = ci + ":" + cj;
    if (key === order) return;
    order = key;
    const frag = document.createDocumentFragment();
    const push = (cell) => cell.el && (cell.on || cell.appear < 1) && frag.appendChild(cell.el);
    for (let i = 0; i < ci; i++) for (let j = 0; j < N; j++) push(cellAt(i, j));
    frag.appendChild(beamG);
    if (ci >= 0 && ci < N) for (let j = 0; j <= cj; j++) push(cellAt(ci, j));
    frag.appendChild(headG);
    if (ci >= 0 && ci < N) for (let j = cj + 1; j < N; j++) push(cellAt(ci, j));
    for (let i = Math.max(ci + 1, 0); i < N; i++) for (let j = 0; j < N; j++) push(cellAt(i, j));
    frag.appendChild(nearG);
    layer.replaceChildren(frag);
  }

  function draw() {
    const gantry = k.translateAlong(P, [gx, 0, 0]);
    farG.setAttribute("transform", gantry);
    beamG.setAttribute("transform", gantry);
    nearG.setAttribute("transform", gantry);
    headG.setAttribute("transform", k.translateAlong(P, [gx, hy, 0]));
    nozzle.setAttribute("transform", k.translateAlong(P, [0, 0, -drop]));
    cursor.setAttribute("transform", k.translateAlong(P, [goal[0] * C, goal[1] * C, 0]));
    for (const cell of cells) {
      if (!cell.el) continue;
      const show = cell.on ? cell.appear : 1 - cell.appear;
      const lift = cell.on ? (1 - cell.appear) * 5 : 0;
      cell.el.style.opacity = show >= 0.999 ? "" : String(Math.max(0, show));
      cell.el.setAttribute("transform", lift > 0.01 ? k.translateAlong(P, [0, 0, lift]) : "");
    }
    // The column under the nozzle decides the painter's order.
    const ci = clamp(Math.round((gx - cx(0)) / C), 0, N - 1);
    const cj = clamp(Math.round((hy - cx(0)) / C), 0, N - 1);
    reorder(ci, cj);
    const text = `${String(count()).padStart(3, "0")} / ${N * N} px · col ${String(goal[0] + 1).padStart(2, "0")} row ${String(goal[1] + 1).padStart(2, "0")}`;
    if (readout && readout.textContent !== text) readout.textContent = text;
  }

  function startPress(cell, kind, on) {
    press = { cell, kind, on, t: 0 };
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    clock += dt;
    const calm = still.matches;

    if (mode === "tour" && !press) {
      if (tourIndex >= target.length) {
        mode = "hold";
        holdUntil = clock + 3;
      } else {
        goal = target[tourIndex];
        const [i, j] = goal;
        if (Math.abs(gx - cx(i)) < 0.25 && Math.abs(hy - cx(j)) < 0.25) {
          const cell = cellAt(i, j);
          startPress(cell, cell.kind, true);
          tourIndex++;
        }
      }
    } else if (mode === "hold" && !calm && clock > holdUntil && tourIndex >= target.length) {
      mode = "wipe";
      goal = [N - 1, goal[1]];
    } else if (mode === "wipe") {
      // The gantry sweeps back to column 0 and lifts every block it passes.
      goal = [0, goal[1]];
      const ci = Math.round((gx - cx(0)) / C);
      for (const cell of cells) if (cell.on && cell.i >= ci + 1) {
        cell.on = false;
        cell.appear = 0;
      }
      if (Math.abs(gx - cx(0)) < 0.3) {
        for (const cell of cells) if (cell.on) { cell.on = false; cell.appear = 0; }
        mode = "tour";
        tourIndex = 0;
      }
    }

    // Motion: exponential follow, faster on the head than on the heavy gantry.
    const fx = cx(goal[0]), fy = cx(goal[1]);
    const gTau = mode === "wipe" ? 0.5 : mode === "tour" ? 0.07 : 0.16;
    const hTau = mode === "tour" ? 0.05 : 0.12;
    gx = calm ? fx : gx + (fx - gx) * (1 - Math.exp(-dt / gTau));
    hy = calm ? fy : hy + (fy - hy) * (1 - Math.exp(-dt / hTau));
    if (Math.abs(fx - gx) < 0.01) gx = fx;
    if (Math.abs(fy - hy) < 0.01) hy = fy;

    // The press: down to the block top, set the block, back up.
    if (press) {
      const DUR = calm ? 0 : mode === "tour" ? 0.16 : 0.24;
      press.t += DUR ? dt / DUR : 1;
      const cell = press.cell;
      const surface = BED_Z + (cell.on || press.on ? MAT[press.kind || "u"].h : 0);
      const reach = NOZZLE_REST - surface - 0.25;
      const s = Math.min(press.t, 1);
      drop = reach * Math.sin(Math.PI * s);
      if (press.t >= 0.5 && !press.done) {
        press.done = true;
        if (press.on) {
          cell.on = true;
          ensureEl(cell, press.kind || "u");
          cell.appear = calm ? 1 : 0;
          order = "";
        } else {
          cell.on = false;
          cell.appear = calm ? 1 : 0;
        }
      }
      if (press.t >= 1) {
        press = null;
        drop = 0;
      }
    }
    for (const cell of cells) if (cell.appear < 1) cell.appear = Math.min(1, cell.appear + dt / 0.22);

    draw();
    const busy = mode === "tour" || mode === "wipe" || press || cells.some((cell) => cell.appear < 1) || Math.abs(fx - gx) > 0 || Math.abs(fy - hy) > 0 || (mode === "hold" && !calm);
    frame = visible && busy ? requestAnimationFrame(tick) : 0;
  }

  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };

  const resumeLater = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (still.matches) return;
      // Carry on printing whatever of the punk is still missing.
      tourIndex = target.findIndex(([i, j]) => !cellAt(i, j).on);
      if (tourIndex < 0) tourIndex = target.length;
      mode = "tour";
      run();
    }, 5000);
  };

  let locked = false; // a click holds the head on its cell until the press is done
  const steer = (i, j, force = false) => {
    mode = "user";
    if (locked && !force) return;
    goal = [clamp(i, 0, N - 1), clamp(j, 0, N - 1)];
    resumeLater();
    run();
  };

  const stamp = () => {
    if (press) return;
    const cell = cellAt(goal[0], goal[1]);
    if (cell.on) startPress(cell, cell.elKind || cell.kind || "u", false);
    else startPress(cell, cell.kind || "u", true);
    resumeLater();
    run();
  };

  const pointToCell = (event) => {
    const box = svgEl.getBoundingClientRect();
    const sx = ((event.clientX - box.left) / box.width) * WIDTH;
    const sy = ((event.clientY - box.top) / box.height) * HEIGHT;
    const [x, y] = toBed(sx, sy);
    return cellOf(x, y);
  };

  const onMove = (event) => {
    const [i, j] = pointToCell(event);
    steer(i, j);
  };
  const onClick = (event) => {
    const [i, j] = pointToCell(event);
    if (i < 0 || j < 0 || i >= N || j >= N || locked) return;
    steer(i, j, true);
    locked = true;
    // Wait for the head to arrive, press, then let hover steer again.
    const waitThenStamp = () => {
      if (!locked) return;
      if (press) return requestAnimationFrame(waitThenStamp);
      if (Math.abs(gx - cx(i)) < 0.3 && Math.abs(hy - cx(j)) < 0.3) {
        stamp();
        const release = () => (press ? requestAnimationFrame(release) : (locked = false));
        release();
      } else requestAnimationFrame(waitThenStamp);
    };
    waitThenStamp();
  };
  const onKey = (event) => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (moves[event.key]) {
      event.preventDefault();
      steer(goal[0] + moves[event.key][0], goal[1] + moves[event.key][1]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (mode !== "user") steer(goal[0], goal[1]);
      stamp();
    }
  };

  stage.addEventListener("pointermove", onMove);
  stage.addEventListener("click", onClick);
  stage.addEventListener("keydown", onKey);
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) run();
    },
    { rootMargin: "120px 0px" },
  );
  io.observe(stage);
  order = "";
  draw();

  return () => {
    io.disconnect();
    clearTimeout(idleTimer);
    if (frame) cancelAnimationFrame(frame);
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("click", onClick);
    stage.removeEventListener("keydown", onKey);
    root.innerHTML = "";
  };
}
