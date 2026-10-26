// Line drawings for the Home hero (Hero.jsx, SketchStage.jsx): one scene per service, each drawn from designs
// in the catalogue (`codes`, linked from the caption). Drawn in 0 0 800 450 (the ground line at y = 410) and
// shown through VIEWBOX, which crops the empty sky.
// Every object is drawn around its own origin (the middle of its base, y up is negative) and placed at `x`.
// A person stands in every scene for scale.

export const GROUND = 410;
export const VIEWBOX = '10 115 780 310';

const r = (n) => Math.round(n * 10) / 10;
const ellipse = (cx, cy, rx, ry = rx) =>
  `M ${r(cx - rx)} ${r(cy)} a ${rx} ${ry} 0 1 0 ${r(2 * rx)} 0 a ${rx} ${ry} 0 1 0 ${r(-2 * rx)} 0`;

/** A pointed leaf from (x, y): `angle` in degrees (-90 is straight up), `len` long, `w` wide. */
function leaf(x, y, angle, len, w) {
  const a = (angle * Math.PI) / 180;
  const tx = x + len * Math.cos(a);
  const ty = y + len * Math.sin(a);
  const mx = (x + tx) / 2;
  const my = (y + ty) / 2;
  const nx = -Math.sin(a) * w;
  const ny = Math.cos(a) * w;
  return `M ${r(x)} ${r(y)} Q ${r(mx + nx)} ${r(my + ny)} ${r(tx)} ${r(ty)} Q ${r(mx - nx)} ${r(my - ny)} ${r(x)} ${r(y)}`;
}

/** Small teeth under a cornice: one path, from x0 to x1 at height y. */
function dentils(x0, x1, y, step = 10, size = 5) {
  let d = '';
  for (let x = x0; x + size <= x1; x += step) d += `M ${x} ${y} L ${x} ${y + size} L ${x + size} ${y + size} L ${x + size} ${y} `;
  return d.trim();
}

const person = {
  figure: true,
  d: [
    ellipse(0, -176, 10, 13),
    'M 5 -187 c 3 -5 10 -3 9 3 c -1 4 -5 5 -8 3',
    'M -4 -163 L -4 -157 M 4 -163 L 4 -157',
    'M -4 -157 C -17 -155 -26 -150 -28 -139 L -25 -92 C -8 -88 8 -88 25 -92 L 28 -139 C 26 -150 17 -155 4 -157',
    'M -28 -139 C -33 -120 -35 -100 -34 -82 C -34 -77 -30 -76 -29 -81 C -29 -98 -28 -114 -26 -126',
    'M 28 -139 C 33 -120 35 -100 34 -82 C 34 -77 30 -76 29 -81 C 29 -98 28 -114 26 -126',
    'M -25 -92 L -21 0',
    'M -3 -89 L -6 0',
    'M 3 -89 L 6 0',
    'M 25 -92 L 21 0',
  ],
};
const at = (x, obj) => ({ ...obj, x });

// ---------- 01 Sculptures: garden chess (SC-017), Seated Buddha (SC-012), twisted ribbon (SC-070) ----------
const chessKing = {
  d: [
    'M -40 0 L -40 -12 L 40 -12 L 40 0',
    'M -34 -12 C -32 -22 32 -22 34 -12',
    'M -22 -19 C -14 -50 -12 -82 -14 -108',
    'M 22 -19 C 14 -50 12 -82 14 -108',
    'M -22 -108 L 22 -108 L 18 -118 L -18 -118 Z',
    'M -16 -118 C -24 -132 -20 -146 0 -150 C 20 -146 24 -132 16 -118',
    'M 0 -150 L 0 -172 M -9 -162 L 9 -162',
  ],
};
const chessPawn = {
  d: [
    'M -22 0 L -22 -10 L 22 -10 L 22 0',
    'M -18 -10 C -16 -18 16 -18 18 -10',
    'M -11 -16 C -6 -30 -6 -40 -8 -48',
    'M 11 -16 C 6 -30 6 -40 8 -48',
    'M -13 -48 L 13 -48 L 10 -54 L -10 -54 Z',
    ellipse(0, -66, 12),
  ],
};
const buddha = {
  d: [
    'M -80 0 L -80 -56 L 80 -56 L 80 0',
    'M -88 -56 L 88 -56 L 88 -64 L -88 -64 Z',
    'M -66 -64 C -66 -86 -44 -98 0 -98 C 44 -98 66 -86 66 -64',
    'M -30 -80 C -18 -88 -2 -86 10 -76',
    'M -32 -98 C -40 -116 -40 -140 -30 -156',
    'M 32 -98 C 40 -116 40 -140 30 -156',
    'M -30 -156 C -46 -146 -50 -120 -44 -104 C -38 -96 -22 -96 -12 -98',
    'M 30 -156 C 46 -146 50 -120 44 -104 C 38 -96 22 -96 12 -98',
    'M -14 -98 C -8 -106 8 -106 14 -98',
    'M -30 -156 C -24 -164 -14 -167 -6 -168 M 30 -156 C 24 -164 14 -167 6 -168',
    'M -6 -168 C 4 -146 16 -128 36 -118',
    'M -6 -168 L -6 -174 M 6 -168 L 6 -174',
    ellipse(0, -192, 15, 19),
    'M -8 -209 C -8 -221 8 -221 8 -209',
    'M -15 -196 C -21 -194 -21 -182 -16 -178 M 15 -196 C 21 -194 21 -182 16 -178',
    'M -10 -193 q 4 3 8 0 M 2 -193 q 4 3 8 0 M -4 -182 q 4 2 8 0',
  ],
};
const ribbon = {
  d: [
    'M -26 0 L -26 -70 L 26 -70 L 26 0',
    'M -32 -70 L 32 -70 L 32 -76 L -32 -76 Z',
    'M -10 -76 C -46 -102 -44 -132 -4 -152 C 36 -172 36 -202 0 -226',
    'M 2 -76 C -32 -102 -30 -132 8 -150 C 48 -170 48 -202 12 -226 L 0 -226',
    'M 10 -76 C 46 -102 44 -132 4 -152 C -36 -172 -36 -202 0 -226',
    'M -2 -76 C 32 -102 30 -132 -8 -150 C -48 -170 -48 -202 -12 -226 L 0 -226',
  ],
};

// ---------- 02 Designer Planters: faceted (PL-001), classical urn (PL-002), elephant (PL-003), face (PL-004) ----------
const faceted = {
  d: [
    'M -55 0 L -60 -50 L -30 -78 L 20 -72 L 55 -46 L 50 0 Z',
    'M -60 -50 L -16 -40 L 55 -46',
    'M -16 -40 L -30 -78 M -16 -40 L 20 -72',
    'M -16 -40 L -8 0 M 24 -44 L 30 0',
    'M -22 -62 L -8 -136 L 6 -64',
    'M -19 -78 L -2 -84 M -16 -96 L -3 -101 M -12 -114 L -5 -118',
    'M 14 -66 L 27 -118 L 38 -60',
    'M 17 -80 L 31 -86 M 20 -96 L 30 -100',
  ],
};
const urn = {
  d: [
    'M -24 0 L -18 -10 L 18 -10 L 24 0',
    'M -10 -10 L -8 -22 M 10 -10 L 8 -22',
    'M -16 -22 L 16 -22 L 16 -28 L -16 -28 Z',
    'M -16 -28 C -40 -40 -50 -70 -44 -96',
    'M 16 -28 C 40 -40 50 -70 44 -96',
    'M -8 -30 C -18 -44 -24 -58 -26 -72 M 0 -30 L 0 -74 M 8 -30 C 18 -44 24 -58 26 -72',
    'M -46 -76 C -20 -82 20 -82 46 -76',
    'M -52 -96 L 52 -96 L 48 -106 L -48 -106 Z',
    'M -40 -106 C -46 -124 -28 -140 -12 -134 C -6 -150 20 -150 26 -134 C 40 -138 52 -122 42 -106',
  ],
};
const elephant = {
  d: [
    'M -70 0 L -70 -24 L 70 -24 L 70 0',
    'M -76 -24 L 76 -24',
    'M -40 -54 C -46 -82 -30 -100 0 -102 C 34 -104 52 -86 48 -56',
    'M -36 -56 C -10 -50 20 -50 46 -56',
    'M -36 -56 L -36 -24 M -22 -52 L -22 -24 M 32 -52 L 32 -24 M 46 -56 L 46 -24',
    'M -38 -72 C -56 -74 -64 -92 -54 -104 C -48 -110 -36 -106 -30 -100',
    'M -60 -96 C -74 -86 -76 -62 -70 -44 C -68 -38 -62 -40 -63 -46 C -67 -62 -64 -76 -54 -84',
    'M -38 -96 C -28 -96 -20 -84 -22 -72 C -26 -64 -36 -66 -38 -72',
    'M -50 -94 L -49 -94',
    'M 48 -76 C 55 -72 57 -64 55 -58',
    'M -32 -118 L 32 -118 M -30 -118 C -28 -104 -14 -100 0 -100 C 14 -100 28 -104 30 -118',
    leaf(0, -118, -160, 58, 7),
    leaf(0, -118, -128, 62, 7),
    leaf(0, -118, -96, 66, 6),
    leaf(0, -118, -64, 62, 7),
    leaf(0, -118, -26, 56, 7),
  ],
};
const facePot = {
  d: [
    'M -40 0 C -56 -14 -60 -50 -48 -74 L 48 -74 C 60 -50 56 -14 40 0 Z',
    'M -51 -74 C -51 -83 51 -83 51 -74',
    'M -26 -54 C -20 -58 -12 -58 -8 -54 M 8 -54 C 12 -58 20 -58 26 -54',
    'M -24 -46 C -20 -42 -14 -42 -10 -46 M 10 -46 C 14 -42 20 -42 24 -46',
    'M 0 -50 L -4 -33 L 4 -33',
    'M -14 -22 C -6 -16 6 -16 14 -22',
    leaf(-6, -80, -125, 44, 8),
    leaf(4, -80, -82, 50, 7),
    leaf(10, -80, -50, 42, 8),
  ],
};

// ---------- 03 GRC Products: 3D façade (GRC-002), heritage façade (GRC-007), lotus relief (GRC-011) ----------
function pyramidWall(w, h, cols, rows) {
  const cw = w / cols;
  const ch = h / rows;
  const d = [`M 0 0 L 0 ${-h} L ${w} ${-h} L ${w} 0`];
  for (let c = 1; c < cols; c++) d.push(`M ${r(c * cw)} 0 L ${r(c * cw)} ${-h}`);
  for (let k = 0; k < rows; k++) {
    const y0 = -k * ch;
    const y1 = -(k + 1) * ch;
    if (k > 0) d.push(`M 0 ${r(y0)} L ${w} ${r(y0)}`);
    let a = `M 0 ${r(y0)}`;
    let b = `M 0 ${r(y1)}`;
    for (let c = 1; c <= cols; c++) {
      a += ` L ${r(c * cw)} ${r(c % 2 ? y1 : y0)}`;
      b += ` L ${r(c * cw)} ${r(c % 2 ? y0 : y1)}`;
    }
    // each cell is a pyramid: its two diagonals
    let x = '';
    for (let c = 0; c < cols; c++) x += `M ${r(c * cw)} ${r(y0)} L ${r((c + 1) * cw)} ${r(y1)} M ${r((c + 1) * cw)} ${r(y0)} L ${r(c * cw)} ${r(y1)} `;
    d.push(x.trim());
  }
  return { d };
}
const heritage = {
  d: [
    'M -84 0 L -84 -10 L -62 -10 L -62 0 M 62 0 L 62 -10 L 84 -10 L 84 0',
    'M -80 -10 L -80 -170 M -66 -10 L -66 -170',
    'M 66 -10 L 66 -170 M 80 -10 L 80 -170',
    'M -60 0 L -60 -104 Q -56 -150 0 -170 Q 56 -150 60 -104 L 60 0',
    'M -50 0 L -50 -100 A 12 12 0 0 1 -44 -122 A 14 14 0 0 1 -26 -140 A 15 15 0 0 1 0 -151 A 15 15 0 0 1 26 -140 A 14 14 0 0 1 44 -122 A 12 12 0 0 1 50 -100 L 50 0',
    ellipse(-52, -150, 6) + ' ' + ellipse(52, -150, 6),
    'M -92 -170 L 92 -170 L 92 -180 L -92 -180 Z',
    dentils(-86, 86, -170, 10, 5),
    'M -30 -180 L -30 -186 L 30 -186 L 30 -180',
    'M -22 -186 L -22 -208 M 22 -186 L 22 -208',
    'M -30 -208 L 30 -208 L 26 -214 L -26 -214 Z',
    'M -22 -214 C -22 -236 -8 -246 0 -248 C 8 -246 22 -236 22 -214',
    'M 0 -248 L 0 -258',
  ],
};
const lotus = {
  d: [
    'M -66 0 L -66 -14 L 66 -14 L 66 0',
    'M -60 -14 L -60 -124 L 60 -124 L 60 -14 Z',
    'M -52 -22 L -52 -116 L 52 -116 L 52 -22 Z',
    'M -22 -22 C -24 -40 -28 -54 -32 -64',
    ellipse(-32, -72, 16, 8),
    'M -32 -72 L -20 -69',
    'M 6 -22 C 8 -40 12 -56 14 -68',
    leaf(14, -68, -90, 34, 6),
    leaf(14, -68, -125, 28, 6),
    leaf(14, -68, -55, 28, 6),
    leaf(14, -68, -160, 22, 4),
    leaf(14, -68, -20, 22, 4),
    'M 32 -22 C 34 -32 36 -40 38 -46',
    leaf(38, -46, -90, 18, 4),
    ellipse(-6, -38, 13, 6),
  ],
};

// ---------- 04 GRC Grilles: geometric jali (GRL-003), jali boundary screen (GRL-006) ----------
function triangleJali(w, h, rows, cols) {
  const inset = 9;
  const iw = w - 2 * inset;
  const ih = h - 2 * inset;
  const rh = ih / rows;
  const cw = iw / cols;
  const d = [`M ${-w / 2} 0 L ${-w / 2} ${-h} L ${w / 2} ${-h} L ${w / 2} 0 Z`, `M ${-iw / 2} ${-inset} L ${-iw / 2} ${-h + inset} L ${iw / 2} ${-h + inset} L ${iw / 2} ${-inset} Z`];
  for (let k = 0; k < rows; k++) {
    const yb = -inset - k * rh;
    const yt = yb - rh;
    if (k > 0) d.push(`M ${r(-iw / 2)} ${r(yb)} L ${r(iw / 2)} ${r(yb)}`);
    // zigzag: triangles pointing up and down, offset on alternate rows; a smaller triangle inside each
    const pts = [];
    for (let c = 0; c <= cols; c++) pts.push([-iw / 2 + c * cw, (c + k) % 2 === 0 ? yb : yt]);
    const z = 'M ' + pts.map(([x, y]) => `${r(x)} ${r(y)}`).join(' L ');
    let inner = '';
    for (let i = 0; i + 2 < pts.length; i++) {
      const tri = pts.slice(i, i + 3);
      const gx = (tri[0][0] + tri[1][0] + tri[2][0]) / 3;
      const gy = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
      inner += 'M ' + tri.map(([x, y]) => `${r(gx + (x - gx) * 0.45)} ${r(gy + (y - gy) * 0.45)}`).join(' L ') + ' Z ';
    }
    d.push(z, inner.trim());
  }
  return { d };
}
function boundaryScreen(w, h) {
  const pw = 26;
  const ph = h + 46;
  const gx0 = -w / 2;
  const gx1 = w / 2;
  const wall = 30;
  const step = 22;
  const d = [
    // pillars with caps and ball finials
    `M ${gx0 - pw} 0 L ${gx0 - pw} ${-ph} L ${gx0} ${-ph} L ${gx0} 0`,
    `M ${gx0 - pw - 5} ${-ph} L ${gx0 + 5} ${-ph} L ${gx0 + 5} ${-ph - 7} L ${gx0 - pw - 5} ${-ph - 7} Z`,
    ellipse(gx0 - pw / 2, -ph - 17, 10),
    `M ${gx1} 0 L ${gx1} ${-ph} L ${gx1 + pw} ${-ph} L ${gx1 + pw} 0`,
    `M ${gx1 - 5} ${-ph} L ${gx1 + pw + 5} ${-ph} L ${gx1 + pw + 5} ${-ph - 7} L ${gx1 - 5} ${-ph - 7} Z`,
    ellipse(gx1 + pw / 2, -ph - 17, 10),
    // low wall and the grille frame
    `M ${gx0} ${-wall} L ${gx1} ${-wall}`,
    `M ${gx0 + 6} ${-wall} L ${gx0 + 6} ${-wall - h} L ${gx1 - 6} ${-wall - h} L ${gx1 - 6} ${-wall}`,
  ];
  // traditional pattern: a circle in every cell with a four-point star where four circles meet
  const cols = Math.floor((w - 20) / step);
  const rows = Math.floor((h - 8) / step);
  const ox = -((cols - 1) * step) / 2;
  for (let k = 0; k < rows; k++) {
    const y = -wall - 11 - k * step - 4;
    let row = '';
    for (let c = 0; c < cols; c++) row += ellipse(ox + c * step, y, 9) + ' ';
    d.push(row.trim());
    if (k < rows - 1) {
      let stars = '';
      for (let c = 0; c < cols - 1; c++) {
        const sx = ox + c * step + step / 2;
        const sy = y - step / 2;
        stars += `M ${r(sx)} ${r(sy - 4)} L ${r(sx + 4)} ${r(sy)} L ${r(sx)} ${r(sy + 4)} L ${r(sx - 4)} ${r(sy)} Z `;
      }
      d.push(stars.trim());
    }
  }
  return { d };
}

// ---------- 05 FRP Products: lobby installation (FRP-002), sphere and curved wall (FRP-007) ----------
const spires = {
  d: [
    'M -130 0 L -130 -12 L 130 -12 L 130 0',
    'M -102 -12 L -78 -232 L -54 -12',
    'M -78 -232 L -80 -12',
    'M -24 -12 L 0 -280 L 24 -12',
    'M 0 -280 L 4 -12',
    'M 54 -12 L 78 -212 L 102 -12',
    'M 78 -212 L 76 -12',
    'M -132 -150 C -84 -194 -44 -110 0 -152 C 44 -194 84 -110 132 -152',
    'M -132 -138 C -84 -182 -44 -98 0 -140 C 44 -182 84 -98 132 -140',
    'M -132 -150 L -132 -138 M 132 -152 L 132 -140',
  ],
};
function curvedWall(radius, h) {
  const d = [`M ${-radius} 0 L ${-radius} ${-h}`, `M ${radius} 0 L ${radius} ${-h}`, `M ${-radius} ${-h} Q 0 ${-h - 30} ${radius} ${-h}`];
  // vertical slats on a curve: closer together towards the edges
  let fins = '';
  for (let deg = -75; deg <= 75; deg += 9.4) {
    const x = radius * Math.sin((deg * Math.PI) / 180);
    const top = -h - 15 * (1 - (x / radius) ** 2) * 1.02;
    fins += `M ${r(x)} 0 L ${r(x)} ${r(top)} `;
  }
  d.push(fins.trim());
  return { d };
}
const sphere = {
  d: [ellipse(0, -44, 44), 'M -30 -66 C -22 -78 -10 -84 4 -84', 'M -44 -44 C -30 -36 30 -36 44 -44'],
};

const pyramid = pyramidWall(240, 220, 6, 5);
const jali = triangleJali(150, 250, 9, 7);
const boundary = boundaryScreen(220, 120);
const curved = curvedWall(110, 200);

// A wall feature: a framed wall panel set with rows of discs (like the teal disc and tile walls in the murals photos).
function discWall(w, h, cols, rows) {
  const d = [`M 0 0 L 0 ${-h} L ${w} ${-h} L ${w} 0`, `M -8 ${-h} L ${w + 8} ${-h}`];
  const cw = w / cols;
  const rh = (h - 20) / rows;
  for (let k = 0; k < rows; k++) {
    let row = '';
    for (let c = 0; c < cols; c++) row += ellipse(cw * (c + 0.5), -10 - rh * (k + 0.5), Math.min(cw, rh) * 0.34) + ' ';
    d.push(row.trim());
  }
  return { d };
}
const discs = discWall(230, 210, 5, 5);

// One scene per service (the 2026-10-24 restructure). Redrawn from the client's own photos in Phase B (TASKS.md B3).
export const sketches = [
  {
    line: 'sculptures',
    codes: ['IFA-SC-017', 'IFA-SC-012', 'IFA-SC-070'],
    objects: [at(112, chessKing), at(186, chessPawn), at(330, buddha), at(526, ribbon), at(690, person)],
  },
  {
    line: 'planters',
    codes: ['IFA-PL-001', 'IFA-PL-002', 'IFA-PL-003', 'IFA-PL-004'],
    objects: [at(112, faceted), at(256, urn), at(420, elephant), at(568, facePot), at(700, person)],
  },
  {
    line: 'murals-wall-features',
    codes: ['IFA-GRC-011', 'IFA-MU-027'],
    objects: [at(60, discs), at(470, lotus), at(680, person)],
  },
  {
    line: 'customised-products',
    codes: ['IFA-GRL-003', 'IFA-GRC-007'],
    objects: [at(150, jali), at(400, heritage), at(620, person)],
  },
];

// One drawing per design code, for the hover view on catalogue cards (HoverView.jsx). Every photo of the same piece
// (designs.js SAME_PIECE) gets the piece's drawing. `box` is the drawing's extent [x0, y0, x1, y1], ground at y = 0.
const drawing = (box, ...objects) => ({ box, objects: objects.map(([x, o]) => at(x, o)) });
const chess = drawing([-40, -172, 96, 0], [0, chessKing], [74, chessPawn]);
const facade = drawing([0, -220, 240, 0], [0, pyramid]);
const screen = drawing([-141, -193, 141, 0], [0, boundary]);
const interior = drawing([-110, -232, 206, 0], [0, curved], [162, sphere]);
export const drawings = {
  'IFA-SC-016': chess,
  'IFA-SC-017': chess,
  'IFA-SC-012': drawing([-88, -222, 88, 0], [0, buddha]),
  'IFA-SC-070': drawing([-48, -226, 48, 0], [0, ribbon]),
  'IFA-PL-001': drawing([-60, -136, 55, 0], [0, faceted]),
  'IFA-PL-002': drawing([-52, -150, 52, 0], [0, urn]),
  'IFA-PL-003': drawing([-76, -184, 76, 0], [0, elephant]),
  'IFA-PL-004': drawing([-56, -130, 56, 0], [0, facePot]),
  'IFA-GRC-001': facade,
  'IFA-GRC-002': facade,
  'IFA-GRC-003': facade,
  'IFA-GRC-007': drawing([-92, -258, 92, 0], [0, heritage]),
  'IFA-GRC-011': drawing([-66, -124, 66, 0], [0, lotus]),
  'IFA-GRL-003': drawing([-75, -250, 75, 0], [0, jali]),
  'IFA-GRL-005': screen,
  'IFA-GRL-006': screen,
  'IFA-FRP-002': drawing([-132, -280, 132, 0], [0, spires]),
  'IFA-FRP-005': interior,
  'IFA-FRP-006': interior,
  'IFA-FRP-007': interior,
};
