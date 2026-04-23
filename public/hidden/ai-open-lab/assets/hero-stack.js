/* ======================================================
   Interactive Hero Stack — v4
   One flat isometric SVG, authored with true projection.
   Replaces the CSS-3D approach entirely.
   ====================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     ISOMETRIC PROJECTION
     Grid space (gx, gy) -> screen (sx, sy).
     Shallow 20° isometric (matches the reference's squashed rhombus).
     ------------------------------------------------------------------ */

  const ISO_ANGLE_DEG = 20;
  const ISO_COS = Math.cos(ISO_ANGLE_DEG * Math.PI / 180);   // ~0.9397
  const ISO_SIN = Math.sin(ISO_ANGLE_DEG * Math.PI / 180);   // ~0.3420

  // Grid unit size in SVG units. Each grid cell projects to
  // GRID * ISO_COS wide and GRID * ISO_SIN tall.
  const GRID = 5.8;
  const IX = GRID * ISO_COS;   // per-unit horizontal
  const IY = GRID * ISO_SIN;   // per-unit vertical

  // Scene layout
  const SCENE_W = 1100;
  const SCENE_H = 1280;
  const CENTER_X = SCENE_W / 2;

  // Plane: rhombus in grid space from (0,0) to (PLANE,PLANE),
  // where (0,0) = back tip, (PLANE,0) = right tip,
  // (PLANE,PLANE) = front tip, (0,PLANE) = left tip.
  const PLANE = 62;

  // Vertical offset (in SVG units) of each layer's "grid origin"
  // (which is its back tip). Layers descend the page.
  const LAYER_Y = [170, 390, 610, 830, 1050];

  // Project grid (gx, gy) on layer `li` to screen (sx, sy)
  function iso(gx, gy, li) {
    const sx = CENTER_X + (gx - gy) * IX;
    const sy = LAYER_Y[li] + (gx + gy) * IY;
    return { x: sx, y: sy };
  }

  // Short form: returns "x,y" string
  function P(gx, gy, li) {
    const p = iso(gx, gy, li);
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }

  /* ------------------------------------------------------------------
     ILLUSTRATION LIBRARY
     Each illustration is a <symbol> drawn in its own local coordinate
     system (0..100, 0..60 typical). We then <use> it at a grid
     position, scaled to a given grid footprint.
     Palette:
       --ink   : dark stroke    (#e8efff on dark bg)
       --fill  : cream fill     (rgba(255,252,244,0.92))
       --accent: beige accent   (#c9b788)
     Classes on paths:  s (stroke only), f (fill+stroke), a (accent+stroke)
     ------------------------------------------------------------------ */

  const SYMBOLS = {
    /* ========================== APPS & TOOLS ========================== */

    // App icon: rounded square containing a gear
    appIcon: `
      <symbol id="sym-appIcon" viewBox="0 0 100 100">
        <rect class="f" x="14" y="18" width="72" height="72" rx="12" ry="12"/>
        <g transform="translate(50 54)">
          <circle class="a" r="16"/>
          <circle class="f" r="6"/>
          <g class="s" fill="none" stroke-width="2.2">
            <path d="M0 -22 v6 M0 16 v6 M-22 0 h6 M16 0 h6
                     M-15.5 -15.5 l4 4 M11.5 11.5 l4 4
                     M-15.5 15.5 l4 -4 M11.5 -11.5 l4 -4"/>
          </g>
        </g>
      </symbol>`,

    // Browser window (split panel) — iso-faked with parallelogram shelf
    browserWin1: `
      <symbol id="sym-browserWin1" viewBox="0 0 120 100">
        <rect class="f" x="10" y="18" width="100" height="70" rx="3"/>
        <line class="s" x1="10" y1="30" x2="110" y2="30"/>
        <circle class="a" cx="18" cy="24" r="1.8"/>
        <circle class="a" cx="25" cy="24" r="1.8"/>
        <circle class="a" cx="32" cy="24" r="1.8"/>
        <rect class="a" x="18" y="38" width="32" height="42" rx="2"/>
        <line class="s" x1="58" y1="42" x2="100" y2="42"/>
        <line class="s" x1="58" y1="50" x2="96" y2="50"/>
        <line class="s" x1="58" y1="58" x2="100" y2="58"/>
        <line class="s" x1="58" y1="66" x2="88" y2="66"/>
        <line class="s" x1="58" y1="74" x2="92" y2="74"/>
      </symbol>`,

    // Browser window with code symbol overlay
    browserWin2: `
      <symbol id="sym-browserWin2" viewBox="0 0 120 100">
        <!-- back window -->
        <rect class="f" x="8" y="12" width="78" height="56" rx="3"/>
        <line class="s" x1="8" y1="22" x2="86" y2="22"/>
        <circle class="a" cx="15" cy="17" r="1.4"/>
        <circle class="a" cx="21" cy="17" r="1.4"/>
        <circle class="a" cx="27" cy="17" r="1.4"/>
        <line class="s" x1="16" y1="32" x2="78" y2="32"/>
        <line class="s" x1="16" y1="40" x2="70" y2="40"/>
        <line class="s" x1="16" y1="48" x2="78" y2="48"/>
        <line class="s" x1="16" y1="56" x2="60" y2="56"/>
        <!-- front window with </> -->
        <rect class="f" x="54" y="36" width="56" height="52" rx="3"/>
        <line class="s" x1="54" y1="46" x2="110" y2="46"/>
        <circle class="a" cx="62" cy="41" r="1.4"/>
        <circle class="a" cx="68" cy="41" r="1.4"/>
        <g class="s" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M72 60 l-6 6 l6 6"/>
          <path d="M92 60 l6 6 l-6 6"/>
          <path d="M82 58 l-4 16"/>
        </g>
      </symbol>`,

    // API window with globe
    apiGlobe: `
      <symbol id="sym-apiGlobe" viewBox="0 0 100 100">
        <rect class="f" x="10" y="20" width="80" height="60" rx="3"/>
        <line class="s" x1="10" y1="32" x2="90" y2="32"/>
        <circle class="a" cx="18" cy="26" r="1.8"/>
        <circle class="a" cx="25" cy="26" r="1.8"/>
        <circle class="a" cx="32" cy="26" r="1.8"/>
        <!-- API text pill -->
        <rect class="a" x="26" y="46" width="48" height="20" rx="3"/>
        <text x="50" y="60" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="13" font-weight="700" fill="var(--ink)" font-style="italic">&lt;API&gt;</text>
      </symbol>`,

    // Laptop (iso projection)
    laptop: `
      <symbol id="sym-laptop" viewBox="0 0 140 100">
        <!-- screen back -->
        <path class="f" d="M30 12 L110 12 L110 62 L30 62 Z"/>
        <!-- screen interior -->
        <path class="a" d="M36 18 L104 18 L104 56 L36 56 Z"/>
        <g class="s" fill="none" stroke-width="2" stroke-linecap="round">
          <path d="M44 32 l8 6 l-8 6"/>
          <line x1="56" y1="40" x2="74" y2="40"/>
        </g>
        <!-- base (parallelogram) -->
        <path class="f" d="M14 62 L126 62 L114 78 L26 78 Z"/>
        <path class="s" d="M60 70 L80 70"/>
      </symbol>`,

    // Search + code-snippet card
    searchCard: `
      <symbol id="sym-searchCard" viewBox="0 0 120 100">
        <rect class="f" x="14" y="12" width="82" height="72" rx="4"/>
        <!-- search bar -->
        <rect class="a" x="22" y="22" width="66" height="22" rx="3"/>
        <g class="s" fill="none" stroke-width="2">
          <circle cx="32" cy="33" r="5"/>
          <line x1="36" y1="37" x2="40" y2="41"/>
        </g>
        <line class="s" x1="46" y1="33" x2="82" y2="33"/>
        <!-- result rows -->
        <line class="s" x1="22" y1="54" x2="82" y2="54"/>
        <line class="s" x1="22" y1="62" x2="72" y2="62"/>
        <line class="s" x1="22" y1="70" x2="80" y2="70"/>
        <line class="s" x1="22" y1="78" x2="66" y2="78"/>
        <!-- </> badge -->
        <g transform="translate(92 72)">
          <rect class="a" x="0" y="0" width="26" height="20" rx="3"/>
          <text x="13" y="14.5" text-anchor="middle" font-family="'Urbanist', sans-serif"
                font-size="10" font-weight="700" fill="var(--ink)">&lt;/&gt;</text>
        </g>
      </symbol>`,

    // Gear stack (gear on an iso platform)
    gearStack: `
      <symbol id="sym-gearStack" viewBox="0 0 120 100">
        <!-- iso platform (top face) -->
        <path class="f" d="M20 58 L60 38 L100 58 L60 78 Z"/>
        <!-- left face -->
        <path class="a" d="M20 58 L20 68 L60 88 L60 78 Z"/>
        <!-- right face -->
        <path class="a" d="M100 58 L100 68 L60 88 L60 78 Z"/>
        <!-- gear on top -->
        <g transform="translate(60 42)">
          <circle class="a" r="16"/>
          <circle class="f" r="6"/>
          <g class="s" fill="none" stroke-width="2">
            <path d="M0 -22 v6 M0 16 v6 M-22 0 h6 M16 0 h6
                     M-15.5 -15.5 l4 4 M11.5 11.5 l4 4
                     M-15.5 15.5 l4 -4 M11.5 -11.5 l4 -4"/>
          </g>
        </g>
      </symbol>`,

    /* ========================== BENCHMARKS ========================== */

    // Line chart card
    lineChart: `
      <symbol id="sym-lineChart" viewBox="0 0 120 100">
        <rect class="f" x="12" y="12" width="96" height="66" rx="3"/>
        <g class="s" fill="none" stroke-width="1.2" stroke-dasharray="2 2">
          <line x1="20" y1="28" x2="100" y2="28"/>
          <line x1="20" y1="44" x2="100" y2="44"/>
          <line x1="20" y1="60" x2="100" y2="60"/>
        </g>
        <path class="a" d="M20 66 L30 56 L44 60 L58 40 L72 48 L86 30 L100 40 L100 70 L20 70 Z"/>
        <path class="s" fill="none" stroke-width="2"
              d="M20 66 L30 56 L44 60 L58 40 L72 48 L86 30 L100 40"/>
      </symbol>`,

    // Second line chart with smooth curve
    lineChartCurve: `
      <symbol id="sym-lineChartCurve" viewBox="0 0 120 100">
        <rect class="f" x="12" y="12" width="96" height="66" rx="3"/>
        <g class="s" fill="none" stroke-width="1.2" stroke-dasharray="2 2">
          <line x1="20" y1="28" x2="100" y2="28"/>
          <line x1="20" y1="44" x2="100" y2="44"/>
          <line x1="20" y1="60" x2="100" y2="60"/>
        </g>
        <path class="a" d="M20 60 Q 36 26 52 52 Q 70 78 88 34 L100 44 L100 70 L20 70 Z"/>
        <path class="s" fill="none" stroke-width="2"
              d="M20 60 Q 36 26 52 52 Q 70 78 88 34 L100 44"/>
      </symbol>`,

    // Bar chart card
    barChart: `
      <symbol id="sym-barChart" viewBox="0 0 100 100">
        <rect class="f" x="8" y="10" width="84" height="78" rx="3"/>
        <line class="s" x1="14" y1="78" x2="86" y2="78" stroke-width="1.4"/>
        <rect class="a" x="20" y="52" width="10" height="26"/>
        <rect class="s" x="20" y="52" width="10" height="26" fill="none"/>
        <rect class="a" x="34" y="38" width="10" height="40"/>
        <rect class="s" x="34" y="38" width="10" height="40" fill="none"/>
        <rect class="a" x="48" y="46" width="10" height="32"/>
        <rect class="s" x="48" y="46" width="10" height="32" fill="none"/>
        <rect class="a" x="62" y="26" width="10" height="52"/>
        <rect class="s" x="62" y="26" width="10" height="52" fill="none"/>
        <rect class="a" x="76" y="44" width="10" height="34"/>
        <rect class="s" x="76" y="44" width="10" height="34" fill="none"/>
      </symbol>`,

    // Clipboard with checkmarks
    clipboard: `
      <symbol id="sym-clipboard" viewBox="0 0 90 100">
        <rect class="f" x="10" y="14" width="70" height="80" rx="3"/>
        <rect class="a" x="28" y="6" width="34" height="16" rx="2"/>
        <g>
          <rect class="a" x="18" y="30" width="10" height="10"/>
          <rect class="s" x="18" y="30" width="10" height="10" fill="none"/>
          <path class="s" d="M20 35 l3 3 l5 -6" fill="none" stroke-width="2"/>
          <line class="s" x1="32" y1="36" x2="72" y2="36" stroke-width="1.8"/>
        </g>
        <g>
          <rect class="a" x="18" y="46" width="10" height="10"/>
          <rect class="s" x="18" y="46" width="10" height="10" fill="none"/>
          <path class="s" d="M20 51 l3 3 l5 -6" fill="none" stroke-width="2"/>
          <line class="s" x1="32" y1="52" x2="72" y2="52" stroke-width="1.8"/>
        </g>
        <g>
          <rect class="a" x="18" y="62" width="10" height="10"/>
          <rect class="s" x="18" y="62" width="10" height="10" fill="none"/>
          <line class="s" x1="32" y1="68" x2="72" y2="68" stroke-width="1.8"/>
        </g>
        <g>
          <rect class="a" x="18" y="78" width="10" height="10"/>
          <rect class="s" x="18" y="78" width="10" height="10" fill="none"/>
          <path class="s" d="M20 83 l3 3 l5 -6" fill="none" stroke-width="2"/>
          <line class="s" x1="32" y1="84" x2="72" y2="84" stroke-width="1.8"/>
        </g>
      </symbol>`,

    // Scoreboard cube (iso)
    scoreboard: `
      <symbol id="sym-scoreboard" viewBox="0 0 160 120">
        <!-- Top plane -->
        <path class="a" d="M20 54 L80 28 L140 54 L80 80 Z"/>
        <path class="s" d="M20 54 L80 28 L140 54 L80 80 Z" fill="none"/>
        <text x="80" y="60" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-style="italic" font-size="13" font-weight="700" fill="var(--ink)">Accuracy</text>
        <!-- Middle section (two faces) -->
        <path class="a" d="M20 54 L20 70 L80 96 L80 80 Z"/>
        <path class="s" d="M20 54 L20 70 L80 96 L80 80 Z" fill="none"/>
        <path class="a" d="M140 54 L140 70 L80 96 L80 80 Z"/>
        <path class="s" d="M140 54 L140 70 L80 96 L80 80 Z" fill="none"/>
        <!-- Bottom strip -->
        <path class="a" d="M20 70 L20 82 L80 108 L80 96 Z"/>
        <path class="s" d="M20 70 L20 82 L80 108 L80 96 Z" fill="none"/>
        <path class="a" d="M140 70 L140 82 L80 108 L80 96 Z"/>
        <path class="s" d="M140 70 L140 82 L80 108 L80 96 Z" fill="none"/>
      </symbol>`,

    // Leaderboard (iso block, "Scoreboards" label, row bars)
    leaderboard: `
      <symbol id="sym-leaderboard" viewBox="0 0 140 120">
        <!-- top face -->
        <path class="f" d="M14 42 L74 14 L128 42 L68 70 Z"/>
        <text x="56" y="44" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">Scoreboards</text>
        <!-- left face -->
        <path class="a" d="M14 42 L14 84 L68 112 L68 70 Z"/>
        <g class="s" fill="none" stroke-width="1.4" stroke-linecap="round">
          <line x1="20" y1="54" x2="62" y2="78"/>
          <line x1="20" y1="66" x2="62" y2="90"/>
          <line x1="20" y1="78" x2="52" y2="96"/>
          <line x1="20" y1="90" x2="58" y2="110"/>
        </g>
        <!-- right face -->
        <path class="a" d="M128 42 L128 84 L68 112 L68 70 Z" opacity="0.85"/>
        <g class="s" fill="none" stroke-width="1.4" stroke-linecap="round">
          <line x1="120" y1="54" x2="78" y2="78"/>
          <line x1="120" y1="66" x2="78" y2="90"/>
          <line x1="120" y1="78" x2="78" y2="102"/>
        </g>
      </symbol>`,

    /* ========================== MODELS ========================== */

    // Fully-connected neural net
    neuralNet: `
      <symbol id="sym-neuralNet" viewBox="0 0 120 110">
        <g class="s" fill="none" stroke-width="1">
          <!-- edges -->
          <line x1="20" y1="18" x2="50" y2="34"/>
          <line x1="20" y1="18" x2="50" y2="56"/>
          <line x1="20" y1="18" x2="50" y2="78"/>
          <line x1="20" y1="46" x2="50" y2="34"/>
          <line x1="20" y1="46" x2="50" y2="56"/>
          <line x1="20" y1="46" x2="50" y2="78"/>
          <line x1="20" y1="74" x2="50" y2="34"/>
          <line x1="20" y1="74" x2="50" y2="56"/>
          <line x1="20" y1="74" x2="50" y2="78"/>
          <line x1="50" y1="34" x2="90" y2="22"/>
          <line x1="50" y1="34" x2="90" y2="48"/>
          <line x1="50" y1="34" x2="90" y2="76"/>
          <line x1="50" y1="56" x2="90" y2="22"/>
          <line x1="50" y1="56" x2="90" y2="48"/>
          <line x1="50" y1="56" x2="90" y2="76"/>
          <line x1="50" y1="78" x2="90" y2="22"/>
          <line x1="50" y1="78" x2="90" y2="48"/>
          <line x1="50" y1="78" x2="90" y2="76"/>
        </g>
        <!-- nodes (front pass, so edges hide behind) -->
        <circle class="f" cx="20" cy="18" r="7"/>
        <circle class="f" cx="20" cy="46" r="7"/>
        <circle class="f" cx="20" cy="74" r="7"/>
        <circle class="a" cx="50" cy="34" r="7"/>
        <circle class="a" cx="50" cy="56" r="7"/>
        <circle class="a" cx="50" cy="78" r="7"/>
        <circle class="f" cx="90" cy="22" r="7"/>
        <circle class="f" cx="90" cy="48" r="7"/>
        <circle class="f" cx="90" cy="76" r="7"/>
      </symbol>`,

    // CNN / RNN labeled network
    cnnRnnNet: `
      <symbol id="sym-cnnRnnNet" viewBox="0 0 140 120">
        <text x="40" y="12" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">CNN</text>
        <text x="100" y="12" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">RNN</text>
        <g class="s" fill="none" stroke-width="1">
          <!-- edges between 3 layers x 3 nodes -->
          <line x1="24" y1="30" x2="70" y2="46"/>
          <line x1="24" y1="30" x2="70" y2="72"/>
          <line x1="24" y1="60" x2="70" y2="46"/>
          <line x1="24" y1="60" x2="70" y2="72"/>
          <line x1="24" y1="90" x2="70" y2="46"/>
          <line x1="24" y1="90" x2="70" y2="72"/>
          <line x1="70" y1="46" x2="116" y2="30"/>
          <line x1="70" y1="46" x2="116" y2="60"/>
          <line x1="70" y1="46" x2="116" y2="90"/>
          <line x1="70" y1="72" x2="116" y2="30"/>
          <line x1="70" y1="72" x2="116" y2="60"/>
          <line x1="70" y1="72" x2="116" y2="90"/>
        </g>
        <circle class="f" cx="24" cy="30" r="6"/>
        <circle class="f" cx="24" cy="60" r="6"/>
        <circle class="f" cx="24" cy="90" r="6"/>
        <circle class="a" cx="70" cy="46" r="6"/>
        <circle class="a" cx="70" cy="72" r="6"/>
        <circle class="f" cx="116" cy="30" r="6"/>
        <circle class="f" cx="116" cy="60" r="6"/>
        <circle class="f" cx="116" cy="90" r="6"/>
      </symbol>`,

    // Transformer/RNN block stack
    transformerStack: `
      <symbol id="sym-transformerStack" viewBox="0 0 130 130">
        <rect class="a" x="15" y="14" width="100" height="18" rx="2"/>
        <rect class="s" x="15" y="14" width="100" height="18" rx="2" fill="none"/>
        <text x="65" y="27" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">Transformers</text>
        <path class="s" d="M65 35 l0 5 M62 40 l3 3 l3 -3" fill="none" stroke-width="1.5"/>

        <rect class="f" x="15" y="44" width="100" height="18" rx="2"/>
        <text x="65" y="57" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">RNN</text>
        <path class="s" d="M65 65 l0 5 M62 70 l3 3 l3 -3" fill="none" stroke-width="1.5"/>

        <rect class="a" x="15" y="74" width="100" height="18" rx="2"/>
        <rect class="s" x="15" y="74" width="100" height="18" rx="2" fill="none"/>
        <text x="65" y="87" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">Transformers</text>
        <path class="s" d="M65 95 l0 5 M62 100 l3 3 l3 -3" fill="none" stroke-width="1.5"/>

        <rect class="f" x="15" y="104" width="100" height="18" rx="2"/>
        <text x="65" y="117" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" font-weight="700" fill="var(--ink)">Corpuses</text>
      </symbol>`,

    // Training flow
    trainingFlow: `
      <symbol id="sym-trainingFlow" viewBox="0 0 160 110">
        <text x="22" y="34" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="11" fill="var(--ink)">Training</text>
        <rect class="a" x="64" y="18" width="40" height="18" rx="3"/>
        <rect class="s" x="64" y="18" width="40" height="18" rx="3" fill="none"/>
        <!-- arrow down -->
        <path class="s" d="M84 40 l0 8" fill="none" stroke-width="1.4"/>
        <polygon class="s" points="82,46 84,50 86,46" fill="var(--ink)"/>
        <!-- diamond -->
        <path class="f" d="M84 56 L112 74 L84 92 L56 74 Z"/>
        <!-- side options -->
        <rect class="a" x="18" y="70" width="30" height="14" rx="3"/>
        <rect class="s" x="18" y="70" width="30" height="14" rx="3" fill="none"/>
        <rect class="a" x="120" y="70" width="30" height="14" rx="3"/>
        <rect class="s" x="120" y="70" width="30" height="14" rx="3" fill="none"/>
        <rect class="a" x="64" y="96" width="40" height="14" rx="3"/>
        <rect class="s" x="64" y="96" width="40" height="14" rx="3" fill="none"/>
        <!-- dashed connector back -->
        <g class="s" fill="none" stroke-width="1" stroke-dasharray="3 2">
          <path d="M22 38 Q 22 62 32 70"/>
          <path d="M148 84 Q 148 62 120 52"/>
        </g>
      </symbol>`,

    // Algorithm flow (diamond)
    algorithmFlow: `
      <symbol id="sym-algorithmFlow" viewBox="0 0 120 120">
        <rect class="a" x="34" y="10" width="54" height="16" rx="3"/>
        <rect class="s" x="34" y="10" width="54" height="16" rx="3" fill="none"/>
        <text x="61" y="21" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="10" font-weight="600" fill="var(--ink)">Algorithm</text>
        <line class="s" x1="61" y1="28" x2="61" y2="42" stroke-width="1.3"/>
        <polygon class="s" points="58,40 61,46 64,40" fill="var(--ink)"/>
        <!-- diamond -->
        <path class="f" d="M61 48 L96 74 L61 100 L26 74 Z"/>
        <!-- loop-back arrow on right -->
        <path class="s" d="M96 74 Q 112 72 108 92 Q 96 100 82 94" fill="none" stroke-width="1.2" stroke-dasharray="3 2"/>
        <polygon class="s" points="82,96 78,93 84,91" fill="var(--ink)"/>
      </symbol>`,

    /* ========================== DATASETS ========================== */

    // Stacked database cylinders
    dbStack: `
      <symbol id="sym-dbStack" viewBox="0 0 160 110">
        <!-- left cylinder -->
        <g>
          <ellipse class="f" cx="44" cy="18" rx="30" ry="8"/>
          <path class="f" d="M14 18 L14 66 A 30 8 0 0 0 74 66 L74 18"/>
          <g class="s" fill="none">
            <path d="M14 18 L14 66 A 30 8 0 0 0 74 66 L74 18"/>
            <ellipse cx="44" cy="18" rx="30" ry="8"/>
            <path d="M14 34 A 30 8 0 0 0 74 34" stroke-dasharray="3 2" opacity="0.7"/>
            <path d="M14 50 A 30 8 0 0 0 74 50"/>
          </g>
          <circle class="a" cx="58" cy="26" r="1.6"/>
          <circle class="a" cx="58" cy="42" r="1.6"/>
          <circle class="a" cx="58" cy="58" r="1.6"/>
        </g>
        <!-- right cylinder -->
        <g>
          <ellipse class="a" cx="114" cy="30" rx="30" ry="8"/>
          <path class="a" d="M84 30 L84 76 A 30 8 0 0 0 144 76 L144 30"/>
          <g class="s" fill="none">
            <path d="M84 30 L84 76 A 30 8 0 0 0 144 76 L144 30"/>
            <ellipse cx="114" cy="30" rx="30" ry="8"/>
            <path d="M84 46 A 30 8 0 0 0 144 46" stroke-dasharray="3 2" opacity="0.7"/>
            <path d="M84 62 A 30 8 0 0 0 144 62"/>
          </g>
          <circle class="f" cx="128" cy="38" r="1.8"/>
          <circle class="f" cx="128" cy="54" r="1.8"/>
          <circle class="f" cx="128" cy="70" r="1.8"/>
        </g>
      </symbol>`,

    // Data lake (wide cylinder with liquid line)
    dataLake: `
      <symbol id="sym-dataLake" viewBox="0 0 160 110">
        <ellipse class="f" cx="80" cy="22" rx="60" ry="14"/>
        <path class="f" d="M20 22 L20 74 A 60 14 0 0 0 140 74 L140 22"/>
        <g class="s" fill="none">
          <path d="M20 22 L20 74 A 60 14 0 0 0 140 74 L140 22"/>
          <ellipse cx="80" cy="22" rx="60" ry="14"/>
        </g>
        <!-- liquid surface -->
        <path class="a" d="M22 44 Q 52 52 80 44 T 138 44 L138 74 A 58 12 0 0 1 22 74 Z" opacity="0.85"/>
        <path class="s" fill="none" d="M22 44 Q 52 52 80 44 T 138 44"/>
      </symbol>`,

    // Image tiles (two stacked picture frames)
    imageTiles: `
      <symbol id="sym-imageTiles" viewBox="0 0 130 110">
        <!-- back -->
        <rect class="f" x="10" y="14" width="68" height="52" rx="3"/>
        <circle class="a" cx="24" cy="28" r="4"/>
        <path class="a" d="M14 62 L30 46 L44 58 L56 50 L74 62 L74 64 L14 64 Z"/>
        <path class="s" fill="none" d="M14 62 L30 46 L44 58 L56 50 L74 62"/>
        <text x="14" y="74" font-family="'Urbanist', sans-serif" font-size="9" fill="var(--ink)">image</text>
        <!-- front -->
        <rect class="f" x="42" y="40" width="76" height="60" rx="3"/>
        <circle class="a" cx="56" cy="54" r="5"/>
        <path class="a" d="M46 94 L64 74 L80 86 L94 76 L114 96 L114 98 L46 98 Z"/>
        <path class="s" fill="none" d="M46 94 L64 74 L80 86 L94 76 L114 96"/>
        <text x="46" y="108" font-family="'Urbanist', sans-serif" font-size="9" fill="var(--ink)">image</text>
      </symbol>`,

    // Text docs (two windows, with big "T" glyph on back one)
    textDocs: `
      <symbol id="sym-textDocs" viewBox="0 0 130 110">
        <!-- back doc -->
        <rect class="f" x="8" y="10" width="70" height="64" rx="3"/>
        <line class="s" x1="8" y1="22" x2="78" y2="22"/>
        <circle class="a" cx="15" cy="16" r="1.4"/>
        <circle class="a" cx="21" cy="16" r="1.4"/>
        <text x="43" y="48" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="22" font-weight="800" fill="var(--ink)">T</text>
        <line class="s" x1="14" y1="56" x2="70" y2="56"/>
        <line class="s" x1="14" y1="64" x2="60" y2="64"/>
        <!-- front doc -->
        <rect class="f" x="44" y="34" width="76" height="70" rx="3"/>
        <line class="s" x1="44" y1="46" x2="120" y2="46"/>
        <circle class="a" cx="52" cy="40" r="1.4"/>
        <circle class="a" cx="58" cy="40" r="1.4"/>
        <line class="s" x1="50" y1="58" x2="114" y2="58"/>
        <line class="s" x1="50" y1="66" x2="108" y2="66"/>
        <line class="s" x1="50" y1="74" x2="114" y2="74"/>
        <line class="s" x1="50" y1="82" x2="98" y2="82"/>
        <line class="s" x1="50" y1="90" x2="110" y2="90"/>
      </symbol>`,

    // Spreadsheet (two tables)
    spreadsheet: `
      <symbol id="sym-spreadsheet" viewBox="0 0 140 110">
        <!-- back -->
        <rect class="f" x="6" y="12" width="60" height="50" rx="2"/>
        <g class="s" fill="none" stroke-width="1">
          <line x1="6" y1="22" x2="66" y2="22"/>
          <line x1="6" y1="32" x2="66" y2="32"/>
          <line x1="6" y1="42" x2="66" y2="42"/>
          <line x1="6" y1="52" x2="66" y2="52"/>
          <line x1="21" y1="12" x2="21" y2="62"/>
          <line x1="36" y1="12" x2="36" y2="62"/>
          <line x1="51" y1="12" x2="51" y2="62"/>
        </g>
        <!-- front -->
        <rect class="f" x="36" y="36" width="98" height="64" rx="2"/>
        <g class="s" fill="none" stroke-width="1">
          <line x1="36" y1="48" x2="134" y2="48"/>
          <line x1="36" y1="60" x2="134" y2="60"/>
          <line x1="36" y1="72" x2="134" y2="72"/>
          <line x1="36" y1="84" x2="134" y2="84"/>
          <line x1="36" y1="96" x2="134" y2="96"/>
          <line x1="56" y1="36" x2="56" y2="100"/>
          <line x1="76" y1="36" x2="76" y2="100"/>
          <line x1="96" y1="36" x2="96" y2="100"/>
          <line x1="116" y1="36" x2="116" y2="100"/>
        </g>
        <rect class="a" x="56" y="48" width="20" height="12"/>
        <rect class="a" x="76" y="60" width="20" height="12"/>
        <rect class="a" x="96" y="72" width="20" height="12"/>
      </symbol>`,

    /* ========================== INFRASTRUCTURE ========================== */

    // Server-rack cluster (iso)
    serverRacks: `
      <symbol id="sym-serverRacks" viewBox="0 0 180 150">
        <!-- three racks side by side, slightly staggered -->
        <g>
          <!-- rack 1 (back-left) -->
          <path class="f" d="M12 44 L44 30 L44 108 L12 122 Z"/>
          <path class="a" d="M44 30 L64 40 L64 118 L44 108 Z"/>
          <path class="f" d="M12 44 L44 30 L64 40 L32 54 Z"/>
          <g class="s" fill="none" stroke-width="0.9">
            <line x1="18" y1="60" x2="38" y2="52"/>
            <line x1="18" y1="72" x2="38" y2="64"/>
            <line x1="18" y1="84" x2="38" y2="76"/>
            <line x1="18" y1="96" x2="38" y2="88"/>
            <line x1="18" y1="108" x2="38" y2="100"/>
            <line x1="46" y1="56" x2="62" y2="64"/>
            <line x1="46" y1="68" x2="62" y2="76"/>
            <line x1="46" y1="80" x2="62" y2="88"/>
            <line x1="46" y1="92" x2="62" y2="100"/>
          </g>
        </g>
        <g>
          <!-- rack 2 (center) -->
          <path class="f" d="M60 38 L94 24 L94 104 L60 118 Z"/>
          <path class="a" d="M94 24 L116 34 L116 114 L94 104 Z"/>
          <path class="f" d="M60 38 L94 24 L116 34 L82 48 Z"/>
          <g class="s" fill="none" stroke-width="0.9">
            <line x1="66" y1="54" x2="88" y2="46"/>
            <line x1="66" y1="66" x2="88" y2="58"/>
            <line x1="66" y1="78" x2="88" y2="70"/>
            <line x1="66" y1="90" x2="88" y2="82"/>
            <line x1="66" y1="102" x2="88" y2="94"/>
            <line x1="96" y1="50" x2="114" y2="58"/>
            <line x1="96" y1="62" x2="114" y2="70"/>
            <line x1="96" y1="74" x2="114" y2="82"/>
            <line x1="96" y1="86" x2="114" y2="94"/>
          </g>
        </g>
        <g>
          <!-- rack 3 (back-right) -->
          <path class="f" d="M112 44 L142 32 L142 106 L112 120 Z"/>
          <path class="a" d="M142 32 L160 40 L160 114 L142 106 Z"/>
          <path class="f" d="M112 44 L142 32 L160 40 L130 54 Z"/>
          <g class="s" fill="none" stroke-width="0.9">
            <line x1="118" y1="60" x2="138" y2="52"/>
            <line x1="118" y1="72" x2="138" y2="64"/>
            <line x1="118" y1="84" x2="138" y2="76"/>
            <line x1="118" y1="96" x2="138" y2="88"/>
            <line x1="144" y1="56" x2="158" y2="62"/>
            <line x1="144" y1="68" x2="158" y2="74"/>
            <line x1="144" y1="80" x2="158" y2="86"/>
          </g>
        </g>
      </symbol>`,

    // Smaller server-node pair
    serverNodes: `
      <symbol id="sym-serverNodes" viewBox="0 0 160 120">
        <g>
          <path class="f" d="M16 38 L58 24 L58 92 L16 106 Z"/>
          <path class="a" d="M58 24 L86 36 L86 104 L58 92 Z"/>
          <path class="f" d="M16 38 L58 24 L86 36 L44 50 Z"/>
          <rect class="a" x="62" y="40" width="18" height="3"/>
          <rect class="a" x="62" y="50" width="18" height="3"/>
          <rect class="a" x="62" y="60" width="18" height="3"/>
          <rect class="a" x="62" y="70" width="18" height="3"/>
          <rect class="a" x="62" y="80" width="18" height="3"/>
          <rect class="a" x="62" y="90" width="18" height="3"/>
          <g class="s" fill="none" stroke-width="0.9">
            <line x1="22" y1="52" x2="42" y2="46"/>
            <line x1="22" y1="62" x2="42" y2="56"/>
            <line x1="22" y1="72" x2="42" y2="66"/>
            <line x1="22" y1="82" x2="42" y2="76"/>
            <line x1="22" y1="92" x2="42" y2="86"/>
          </g>
        </g>
        <g>
          <path class="f" d="M80 34 L124 20 L124 86 L80 100 Z" opacity="0.88"/>
          <path class="a" d="M124 20 L152 32 L152 98 L124 86 Z"/>
          <path class="f" d="M80 34 L124 20 L152 32 L108 46 Z"/>
          <rect class="a" x="128" y="36" width="18" height="3"/>
          <rect class="a" x="128" y="46" width="18" height="3"/>
          <rect class="a" x="128" y="56" width="18" height="3"/>
          <rect class="a" x="128" y="66" width="18" height="3"/>
          <rect class="a" x="128" y="76" width="18" height="3"/>
        </g>
      </symbol>`,

    // TPU card (iso PCB with label)
    tpuCard: `
      <symbol id="sym-tpuCard" viewBox="0 0 180 100">
        <!-- top face -->
        <path class="f" d="M10 52 L130 24 L170 38 L50 66 Z"/>
        <!-- side face -->
        <path class="a" d="M10 52 L10 68 L50 82 L50 66 Z"/>
        <!-- front face -->
        <path class="a" d="M50 66 L50 82 L170 54 L170 38 Z"/>
        <!-- chip grid on top -->
        <path class="a" d="M42 54 L116 36 L132 42 L58 60 Z"/>
        <path class="s" d="M42 54 L116 36 L132 42 L58 60 Z" fill="none"/>
        <g class="s" fill="none" stroke-width="0.6">
          <line x1="48" y1="56" x2="120" y2="38"/>
          <line x1="50" y1="58" x2="122" y2="40"/>
          <line x1="52" y1="60" x2="124" y2="42"/>
          <line x1="54" y1="62" x2="126" y2="44"/>
          <line x1="56" y1="64" x2="128" y2="46"/>
        </g>
        <!-- label -->
        <text x="136" y="68" text-anchor="middle" font-family="'Urbanist', sans-serif"
              font-size="13" font-style="italic" font-weight="700" fill="var(--ink)">TPUs</text>
      </symbol>`,

    // Ethernet cable (iso)
    cableLoop: `
      <symbol id="sym-cableLoop" viewBox="0 0 180 120">
        <!-- plug 1 -->
        <path class="a" d="M10 70 L32 56 L46 62 L24 76 Z"/>
        <path class="s" d="M10 70 L32 56 L46 62 L24 76 Z" fill="none"/>
        <rect class="s" x="38" y="60" width="6" height="4" fill="none"/>
        <!-- cable loop -->
        <path class="s" d="M32 64 Q 40 20 90 34 Q 140 48 150 92" fill="none" stroke-width="2.6" stroke-linecap="round"/>
        <!-- plug 2 -->
        <path class="a" d="M140 90 L162 76 L176 82 L154 96 Z"/>
        <path class="s" d="M140 90 L162 76 L176 82 L154 96 Z" fill="none"/>
      </symbol>`,

    // Short cable
    cableShort: `
      <symbol id="sym-cableShort" viewBox="0 0 180 110">
        <path class="a" d="M14 70 L36 56 L50 62 L28 76 Z"/>
        <path class="s" d="M14 70 L36 56 L50 62 L28 76 Z" fill="none"/>
        <path class="s" d="M36 64 Q 90 110 146 50" fill="none" stroke-width="2.6" stroke-linecap="round"/>
        <path class="a" d="M136 48 L158 34 L172 40 L150 54 Z"/>
        <path class="s" d="M136 48 L158 34 L172 40 L150 54 Z" fill="none"/>
      </symbol>`,

    // GPU / chip on an iso platform
    gpuChip: `
      <symbol id="sym-gpuChip" viewBox="0 0 140 110">
        <!-- iso base (socket) -->
        <path class="f" d="M20 60 L70 32 L120 60 L70 88 Z"/>
        <!-- left side face -->
        <path class="a" d="M20 60 L20 72 L70 100 L70 88 Z"/>
        <!-- right side face -->
        <path class="a" d="M120 60 L120 72 L70 100 L70 88 Z"/>
        <!-- chip on top -->
        <path class="a" d="M46 60 L70 46 L94 60 L70 74 Z"/>
        <path class="s" d="M46 60 L70 46 L94 60 L70 74 Z" fill="none"/>
        <!-- chip grid lines -->
        <g class="s" fill="none" stroke-width="0.8">
          <line x1="55" y1="55" x2="79" y2="69"/>
          <line x1="64" y1="50" x2="88" y2="64"/>
          <line x1="61" y1="67" x2="85" y2="53"/>
          <line x1="52" y1="62" x2="76" y2="48"/>
        </g>
        <!-- pins along the base edge -->
        <g class="s" fill="none" stroke-width="1.2">
          <line x1="34" y1="63" x2="34" y2="70"/>
          <line x1="44" y1="58" x2="44" y2="65"/>
          <line x1="96" y1="58" x2="96" y2="65"/>
          <line x1="106" y1="63" x2="106" y2="70"/>
        </g>
      </symbol>`,

    // Storage disk array — stacked iso trays (clean, no floating details)
    storageArray: `
      <symbol id="sym-storageArray" viewBox="0 0 140 110">
        <g>
          <path class="f" d="M18 78 L70 52 L122 78 L70 104 Z"/>
          <path class="s" d="M18 78 L70 52 L122 78 L70 104 Z" fill="none"/>
        </g>
        <g>
          <path class="f" d="M18 60 L70 34 L122 60 L70 86 Z"/>
          <path class="s" d="M18 60 L70 34 L122 60 L70 86 Z" fill="none"/>
        </g>
        <g>
          <path class="a" d="M18 42 L70 16 L122 42 L70 68 Z"/>
          <path class="s" d="M18 42 L70 16 L122 42 L70 68 Z" fill="none"/>
        </g>
        <!-- side verticals showing depth -->
        <g class="s" fill="none" stroke-width="1.2">
          <line x1="18" y1="42" x2="18" y2="78"/>
          <line x1="122" y1="42" x2="122" y2="78"/>
        </g>
      </symbol>`,
  };

  /* ------------------------------------------------------------------
     LAYER LAYOUT
     Each layer has a list of items placed at grid coordinates.
     Each item: { kind, gx, gy, w, h } -- w,h are the footprint in
     grid units. The symbol is rendered via <foreignObject>-free
     pure SVG by positioning an outer <svg viewBox ...> inside a <g>.

     Intra-layer arrows connect items by index.
     ------------------------------------------------------------------ */

  const LAYERS = [
    // Layout strategy: 3 items per plane. Placed along the rhombus's
    // long axis — one near the left tip, one in the center, one near
    // the right tip. Items are small (w,h ~12) so they fit inside the
    // plane with visible space around them.
    {
      id: 'apps',
      name: 'Apps & Tools',
      count: 6,
      desc: 'End-user surfaces — IDE plugins, APIs, playgrounds and CLI wrappers.',
      items: ['Aina Kit', 'ALIA Kit', 'Playground', 'REST API', 'CLI', 'SDK'],
      objects: [
        { kind: 'browserWin1', gx: 14, gy: 46, w: 12, h: 12 },   // left
        { kind: 'apiGlobe',    gx: 31, gy: 31, w: 14, h: 12 },   // center
        { kind: 'laptop',      gx: 48, gy: 14, w: 14, h: 10 },   // right
      ],
      links: [[0, 1], [1, 2]],
    },
    {
      id: 'benchmarks',
      name: 'Benchmarks',
      count: 8,
      desc: 'Evaluation suites across tasks, languages and fairness dimensions.',
      items: ['LinguaBench', 'SpeechBench', 'VisionEval', 'TranslatEval'],
      objects: [
        { kind: 'lineChart',   gx: 14, gy: 46, w: 12, h: 10 },   // left
        { kind: 'scoreboard',  gx: 31, gy: 31, w: 16, h: 14 },   // center
        { kind: 'clipboard',   gx: 46, gy: 14, w: 10, h: 12 },   // right
      ],
      links: [[0, 1], [1, 2]],
    },
    {
      id: 'models',
      name: 'Models',
      count: 15,
      desc: 'Open language, speech, vision and multimodal models — trained in public.',
      items: ['ALIA 40B', 'ALIA 7B', 'Aina-MT', 'Whisper-cat', 'Vision-OC'],
      objects: [
        { kind: 'neuralNet',        gx: 14, gy: 46, w: 12, h: 12 },   // left
        { kind: 'transformerStack', gx: 31, gy: 31, w: 14, h: 16 },   // center
        { kind: 'algorithmFlow',    gx: 46, gy: 14, w: 12, h: 14 },   // right
      ],
      links: [[0, 1], [1, 2]],
    },
    {
      id: 'datasets',
      name: 'Datasets',
      count: 40,
      desc: 'Curated open corpora across text, speech, translation and multimodal data.',
      items: ['Aina Speech', 'Multilingual MT Set', 'MultiModal Commons', 'Visual Scenes', 'Parallel Corpora'],
      objects: [
        { kind: 'dbStack',     gx: 14, gy: 46, w: 14, h: 10 },   // left
        { kind: 'spreadsheet', gx: 31, gy: 31, w: 14, h: 12 },   // center
        { kind: 'textDocs',    gx: 46, gy: 14, w: 12, h: 12 },   // right
      ],
      links: [[0, 1], [1, 2]],
    },
    {
      id: 'infra',
      name: 'Infrastructure',
      count: 12,
      desc: 'Public supercomputing — GPU & TPU clusters, storage, networking run by BSC-CNS.',
      items: ['MareNostrum 5', 'GPU Nodes', 'TPU Pods', 'Storage', 'Interconnect'],
      objects: [
        { kind: 'serverRacks', gx: 14, gy: 46, w: 14, h: 14 },   // left
        { kind: 'gpuChip',     gx: 31, gy: 31, w: 14, h: 12 },   // center
        { kind: 'storageArray',gx: 46, gy: 14, w: 12, h: 12 },   // right
      ],
      links: [[0, 1], [1, 2]],
    },
  ];

  /* ------------------------------------------------------------------
     SVG BUILDER
     ------------------------------------------------------------------ */

  // Build plane rhombus path for layer index `li`
  function planePath(li) {
    const a = iso(0, 0, li);
    const b = iso(PLANE, 0, li);
    const c = iso(PLANE, PLANE, li);
    const d = iso(0, PLANE, li);
    return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)} L ${c.x.toFixed(2)} ${c.y.toFixed(2)} L ${d.x.toFixed(2)} ${d.y.toFixed(2)} Z`;
  }

  // Build a checkerboard pattern on a plane as a set of tiny diamonds.
  // Cheaper than a real SVG pattern for this geometry: tile every 4 grid units.
  function planeCheckerboard(li) {
    const tile = 4;
    const parts = [];
    for (let gx = 0; gx < PLANE; gx += tile) {
      for (let gy = 0; gy < PLANE; gy += tile) {
        if (((gx / tile) + (gy / tile)) % 2 !== 0) continue;
        const p1 = iso(gx, gy, li);
        const p2 = iso(gx + tile, gy, li);
        const p3 = iso(gx + tile, gy + tile, li);
        const p4 = iso(gx, gy + tile, li);
        parts.push(
          `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} L ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} L ${p4.x.toFixed(1)} ${p4.y.toFixed(1)} Z`
        );
      }
    }
    return parts.join(' ');
  }

  // Place a symbol on a plane. The symbol has its own viewBox and renders
  // inside a bounding rect sized to fit the w × h grid footprint PLUS
  // vertical headroom for the illustration's 3D height (items stand above
  // the plane in screen space, so they need room above their base).
  function placeSymbol(kind, gx, gy, w, h, li) {
    const ctr = iso(gx, gy, li);
    // Footprint bounding box (the rhombus footprint projected to screen).
    const boxW = (w + h) * IX;
    const boxH = (w + h) * IY;
    // Render the illustration in a box roughly the size of the footprint,
    // centered on the iso center. A square box (boxW × boxW) works well
    // because illustrations are authored with roughly 1:1 aspect.
    const renderSize = boxW;
    const x = ctr.x - renderSize / 2;
    const y = ctr.y - renderSize / 2;

    return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${renderSize.toFixed(1)}" height="${renderSize.toFixed(1)}" overflow="visible">
              <use href="#sym-${kind}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"/>
            </svg>`;
  }

  // Draw a dashed arrow between two grid points on the same layer.
  function gridArrow(gx1, gy1, gx2, gy2, li) {
    const a = iso(gx1, gy1, li);
    const b = iso(gx2, gy2, li);
    // Slight mid-control bend
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 6;
    // Arrowhead direction at b
    const dx = b.x - mx, dy = b.y - my;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const hx = b.x - ux * 5, hy = b.y - uy * 5;
    const px = -uy * 3, py = ux * 3;
    return `
      <path class="arrow-line" d="M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}"/>
      <polygon class="arrow-head" points="${b.x.toFixed(1)},${b.y.toFixed(1)} ${(hx + px).toFixed(1)},${(hy + py).toFixed(1)} ${(hx - px).toFixed(1)},${(hy - py).toFixed(1)}"/>`;
  }

  // Build one layer <g>
  function buildLayer(layer, li) {
    // Intra-layer arrows (behind illustrations but above plane)
    const arrows = layer.links.map(([i, j]) => {
      const a = layer.objects[i];
      const b = layer.objects[j];
      if (!a || !b) return '';
      return gridArrow(a.gx, a.gy, b.gx, b.gy, li);
    }).join('');

    // Symbols
    const objects = layer.objects.map(o =>
      placeSymbol(o.kind, o.gx - o.w / 2, o.gy - o.h / 2, o.w, o.h, li)
    ).join('');

    return `
      <g class="stack-layer" data-layer="${layer.id}">
        <path class="plane-fill" d="${planePath(li)}"/>
        <path class="plane-checker" d="${planeCheckerboard(li)}"/>
        <path class="plane-edge" d="${planePath(li)}"/>
        <g class="layer-arrows">${arrows}</g>
        <g class="layer-objects">${objects}</g>
      </g>`;
  }

  // Build the side-label pills (at the left tip of each rhombus)
  function buildLabels() {
    return LAYERS.map((layer, li) => {
      const tip = iso(0, PLANE, li); // left (front-left) tip of rhombus
      const pillW = 220;
      const pillH = 52;
      const pillX = tip.x - pillW - 16;   // to the left of the tip
      const pillY = tip.y - pillH / 2;
      return `
        <g class="side-label" data-layer="${layer.id}">
          <rect class="pill" x="${pillX}" y="${pillY}" width="${pillW}" height="${pillH}" rx="${pillH / 2}"/>
          <text x="${pillX + pillW / 2}" y="${pillY + pillH / 2 + 8}" text-anchor="middle">${layer.name}</text>
          <!-- dashed leader from pill to tip -->
          <path class="leader" stroke-dasharray="3 3" d="M ${pillX + pillW + 4} ${pillY + pillH / 2} L ${tip.x - 6} ${tip.y}"/>
        </g>`;
    }).join('');
  }

  // Vertical dashed rails connecting all layers: draw on the extreme left
  // (front-left tips) and extreme right (front-right tips) of the diagram.
  function buildVerticalRails() {
    const leftTop = iso(0, PLANE, 0);
    const leftBot = iso(0, PLANE, LAYERS.length - 1);
    const rightTop = iso(PLANE, 0, 0);
    const rightBot = iso(PLANE, 0, LAYERS.length - 1);

    // Bend the rails away from the diagram slightly so they sit outside the planes
    const pad = 20;
    const lx = leftTop.x - pad;
    const rx = rightTop.x + pad;

    function rail(x, y1, y2) {
      const arrowSize = 6;
      return `
        <path class="vrail-line" stroke-dasharray="4 4" d="M ${x} ${y1 + arrowSize + 4} L ${x} ${y2 - arrowSize - 4}"/>
        <!-- top arrow pointing up -->
        <polygon class="vrail-head" points="${x},${y1} ${x - arrowSize},${y1 + arrowSize} ${x + arrowSize},${y1 + arrowSize}"/>
        <!-- bottom arrow pointing down -->
        <polygon class="vrail-head" points="${x},${y2} ${x - arrowSize},${y2 - arrowSize} ${x + arrowSize},${y2 - arrowSize}"/>`;
    }
    return rail(lx, leftTop.y - 20, leftBot.y + 20) + rail(rx, rightTop.y - 20, rightBot.y + 20);
  }

  // Presentation-attribute substitution.
  // Our symbols were authored with short class names (s / f / a) but those
  // don't reliably reach inside <use> shadow DOM. Before rendering, rewrite
  // them to concrete fill/stroke presentation attributes. SVG presentation
  // attributes DO inherit through <use> shadow DOM.
  function inkify(svgString) {
    return svgString
      // Stroke-only lines: class="s"
      .replace(/class="s"/g,
        'fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"')
      // Filled shapes (cream body, ink outline)
      .replace(/class="f"/g,
        'fill="var(--fill-strong)" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"')
      // Accent-filled shapes (warm beige, ink outline)
      .replace(/class="a"/g,
        'fill="var(--accent)" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round"');
  }

  // Build the whole SVG string
  function buildSVG() {
    const symbols = inkify(Object.values(SYMBOLS).join(''));
    const layers = LAYERS.map(buildLayer).join('');
    const rails = buildVerticalRails();
    const labels = buildLabels();

    return `
      <svg class="stack-svg"
           viewBox="0 0 ${SCENE_W} ${SCENE_H}"
           preserveAspectRatio="xMidYMid meet"
           xmlns="http://www.w3.org/2000/svg">
        <defs>${symbols}</defs>
        <g class="rails">${rails}</g>
        <g class="layers">${layers}</g>
        <g class="labels">${labels}</g>
      </svg>`;
  }

  /* ------------------------------------------------------------------
     INTERACTIONS
     ------------------------------------------------------------------ */

  function wire(host) {
    const scene = host.querySelector('.stack-svg');
    if (!scene) return;

    const layerEls = scene.querySelectorAll('g.stack-layer');
    const labelEls = scene.querySelectorAll('g.side-label');
    let pinned = false;
    let activeId = null;

    function setActive(id) {
      activeId = id;
      host.setAttribute('data-active', id || '');
      layerEls.forEach(el => {
        const on = el.dataset.layer === id;
        el.classList.toggle('is-active', !!id && on);
        el.classList.toggle('is-dim', !!id && !on);
      });
      labelEls.forEach(el => {
        const on = el.dataset.layer === id;
        el.classList.toggle('is-active', !!id && on);
        el.classList.toggle('is-dim', !!id && !on);
      });
    }

    function bind(el, id) {
      el.style.cursor = 'pointer';
      el.addEventListener('mouseenter', () => {
        if (pinned) return;
        setActive(id);
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pinned && activeId === id) {
          pinned = false;
          setActive(null);
        } else {
          pinned = true;
          setActive(id);
        }
      });
    }

    layerEls.forEach(el => bind(el, el.dataset.layer));
    labelEls.forEach(el => bind(el, el.dataset.layer));

    scene.addEventListener('mouseleave', () => {
      if (!pinned) setActive(null);
    });
    scene.addEventListener('click', (e) => {
      if (e.target.closest('g.stack-layer')) return;
      if (e.target.closest('g.side-label')) return;
      pinned = false;
      setActive(null);
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */

  function boot() {
    const host = document.getElementById('hero-image');
    if (!host) return;
    host.classList.add('has-interactive');
    host.innerHTML = buildSVG();
    wire(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
