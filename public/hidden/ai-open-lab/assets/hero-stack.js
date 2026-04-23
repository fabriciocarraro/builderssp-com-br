/* ======================================================
   Interactive Hero Stack — v3, faithful to reference image
   CSS-3D isometric diagram of the public-AI resource stack.
   ====================================================== */

(function () {
  'use strict';

  /* ---------- Isometric SVG illustration library ----------
     Each drawing uses a shared cream/ink palette and a viewBox
     of 0 0 100 100. Stroke uses class "s", fill cream "f",
     accent beige fill "a". The palette is set in CSS. */

  const G = {
    /* === APPS & TOOLS === */

    // Browser window with code snippet
    browserCode: `<svg viewBox="0 0 100 100">
      <!-- back window -->
      <path class="f" d="M18 22 L78 22 L78 58 L18 58 Z"/>
      <path class="s" d="M18 22 L78 22 L78 58 L18 58 Z M18 30 L78 30"/>
      <circle class="a" cx="23" cy="26" r="1.2"/><circle class="a" cx="28" cy="26" r="1.2"/><circle class="a" cx="33" cy="26" r="1.2"/>
      <path class="s" d="M24 37 h30 M24 42 h22 M24 47 h26 M24 52 h18"/>
      <!-- front window with code brackets -->
      <path class="f" d="M40 42 L92 42 L92 80 L40 80 Z"/>
      <path class="s" d="M40 42 L92 42 L92 80 L40 80 Z M40 50 L92 50"/>
      <circle class="a" cx="45" cy="46" r="1.2"/><circle class="a" cx="50" cy="46" r="1.2"/>
      <path class="s" d="M55 62 l-4 4 l4 4 M77 62 l4 4 l-4 4 M63 70 l6 -6"/>
    </svg>`,

    // Browser window with UI
    browserUI: `<svg viewBox="0 0 100 100">
      <path class="f" d="M12 18 L86 18 L86 70 L12 70 Z"/>
      <path class="s" d="M12 18 L86 18 L86 70 L12 70 Z M12 28 L86 28"/>
      <circle class="a" cx="18" cy="23" r="1.3"/><circle class="a" cx="23" cy="23" r="1.3"/><circle class="a" cx="28" cy="23" r="1.3"/>
      <rect class="a" x="17" y="35" width="20" height="28" rx="1"/>
      <path class="s" d="M42 35 h38 M42 41 h30 M42 47 h34 M42 53 h24 M42 59 h30"/>
    </svg>`,

    // API window with globe
    apiGlobe: `<svg viewBox="0 0 100 100">
      <path class="f" d="M8 20 L78 20 L78 62 L8 62 Z"/>
      <path class="s" d="M8 20 L78 20 L78 62 L8 62 Z M8 28 L78 28"/>
      <circle class="a" cx="14" cy="24" r="1.2"/><circle class="a" cx="19" cy="24" r="1.2"/>
      <!-- API text area -->
      <path class="a" d="M20 36 L38 36 L38 44 L20 44 Z"/>
      <path class="s" d="M20 36 L38 36 L38 44 L20 44 Z"/>
      <text x="29" y="42" text-anchor="middle" font-size="6" font-weight="700" fill="#001a47" font-family="monospace">&lt;API&gt;</text>
      <!-- globe -->
      <circle class="f" cx="55" cy="50" r="11"/>
      <circle class="s" cx="55" cy="50" r="11" fill="none"/>
      <path class="s" d="M44 50 h22 M55 39 v22 M46 44 q9 4 18 0 M46 56 q9 -4 18 0 M48 42 q7 16 0 16 M62 42 q-7 16 0 16" fill="none" stroke-width="0.8"/>
    </svg>`,

    // Laptop with terminal
    laptop: `<svg viewBox="0 0 100 100">
      <path class="f" d="M14 25 L80 25 L80 65 L14 65 Z"/>
      <path class="s" d="M14 25 L80 25 L80 65 L14 65 Z"/>
      <path class="a" d="M19 30 L75 30 L75 60 L19 60 Z"/>
      <path class="s" d="M19 30 L75 30 L75 60 L19 60 Z"/>
      <path class="s" stroke-width="1.3" d="M25 42 l4 3 l-4 3 M33 47 h8"/>
      <!-- keyboard base -->
      <path class="f" d="M6 65 L88 65 L82 75 L12 75 Z"/>
      <path class="s" d="M6 65 L88 65 L82 75 L12 75 Z M42 70 h10"/>
    </svg>`,

    // Search / doc viewer card
    searchDoc: `<svg viewBox="0 0 100 100">
      <path class="f" d="M18 22 L78 22 L78 72 L18 72 Z"/>
      <path class="s" d="M18 22 L78 22 L78 72 L18 72 Z"/>
      <path class="a" d="M26 30 L72 30 L72 50 L26 50 Z"/>
      <path class="s" d="M26 30 L72 30 L72 50 L26 50 Z"/>
      <circle class="f" cx="36" cy="40" r="6"/>
      <path class="s" d="M36 40 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M40 44 l5 5"/>
      <path class="s" d="M26 56 h40 M26 62 h30 M26 68 h36"/>
      <!-- code tag callout -->
      <path class="a" d="M55 62 L76 62 L76 70 L55 70 Z"/>
      <path class="s" d="M55 62 L76 62 L76 70 L55 70 Z"/>
      <text x="65" y="68" text-anchor="middle" font-size="5" font-weight="700" fill="#001a47" font-family="monospace">&lt;/&gt;</text>
    </svg>`,

    // App icon (rounded square with gear)
    appIcon: `<svg viewBox="0 0 100 100">
      <path class="f" d="M20 30 L72 30 L72 72 L20 72 Z" rx="6"/>
      <path class="s" d="M20 36 a6 6 0 0 1 6 -6 L66 30 a6 6 0 0 1 6 6 L72 66 a6 6 0 0 1 -6 6 L26 72 a6 6 0 0 1 -6 -6 Z"/>
      <g transform="translate(46 51)">
        <circle class="a" cx="0" cy="0" r="8"/>
        <circle class="f" cx="0" cy="0" r="3"/>
        <path class="s" d="M0 -11 v3 M0 8 v3 M-11 0 h3 M8 0 h3 M-8 -8 l2 2 M6 6 l2 2 M-8 8 l2 -2 M6 -6 l2 -2" stroke-width="1"/>
      </g>
    </svg>`,

    // Gear stack (settings box)
    gearStack: `<svg viewBox="0 0 100 100">
      <!-- stacked platform -->
      <path class="f" d="M24 48 L56 38 L88 48 L56 58 Z"/>
      <path class="s" d="M24 48 L56 38 L88 48 L56 58 Z"/>
      <path class="f" d="M24 48 L24 54 L56 64 L56 58 Z"/>
      <path class="s" d="M24 48 L24 54 L56 64 L56 58 Z"/>
      <path class="f" d="M88 48 L88 54 L56 64 L56 58 Z"/>
      <path class="s" d="M88 48 L88 54 L56 64 L56 58 Z"/>
      <!-- gear -->
      <g transform="translate(56 34)">
        <circle class="a" r="11"/>
        <circle class="f" r="4.5"/>
        <path class="s" d="M0 -14 v4 M0 10 v4 M-14 0 h4 M10 0 h4 M-10 -10 l3 3 M7 7 l3 3 M-10 10 l3 -3 M7 -7 l3 -3"/>
      </g>
    </svg>`,

    /* === BENCHMARKS === */

    // Line chart (area)
    lineChart: `<svg viewBox="0 0 100 100">
      <path class="f" d="M14 22 L84 22 L84 66 L14 66 Z"/>
      <path class="s" d="M14 22 L84 22 L84 66 L14 66 Z"/>
      <path class="a" d="M20 60 L30 45 L42 52 L55 32 L68 40 L80 28 L80 60 Z"/>
      <path class="s" d="M20 60 L30 45 L42 52 L55 32 L68 40 L80 28" fill="none" stroke-width="1.3"/>
      <path class="s" d="M20 30 L20 60 L80 60" fill="none" stroke-width="1"/>
    </svg>`,

    // Line chart (curve)
    lineChartCurve: `<svg viewBox="0 0 100 100">
      <path class="f" d="M14 22 L84 22 L84 66 L14 66 Z"/>
      <path class="s" d="M14 22 L84 22 L84 66 L14 66 Z"/>
      <path class="a" d="M20 58 Q 34 30 50 48 T 80 32 L80 60 L20 60 Z"/>
      <path class="s" d="M20 58 Q 34 30 50 48 T 80 32" fill="none" stroke-width="1.3"/>
      <path class="s" d="M20 30 L20 60 L80 60" fill="none" stroke-width="1"/>
    </svg>`,

    // Bar chart
    barChart: `<svg viewBox="0 0 100 100">
      <path class="f" d="M18 18 L80 18 L80 74 L18 74 Z"/>
      <path class="s" d="M18 18 L80 18 L80 74 L18 74 Z"/>
      <rect class="a" x="26" y="50" width="8" height="18"/>
      <path class="s" d="M26 50 L34 50 L34 68 L26 68 Z" fill="none"/>
      <rect class="a" x="38" y="38" width="8" height="30"/>
      <path class="s" d="M38 38 L46 38 L46 68 L38 68 Z" fill="none"/>
      <rect class="a" x="50" y="44" width="8" height="24"/>
      <path class="s" d="M50 44 L58 44 L58 68 L50 68 Z" fill="none"/>
      <rect class="a" x="62" y="30" width="8" height="38"/>
      <path class="s" d="M62 30 L70 30 L70 68 L62 68 Z" fill="none"/>
      <path class="s" d="M24 26 L72 26" stroke-width="0.8"/>
    </svg>`,

    // Checklist clipboard
    clipboard: `<svg viewBox="0 0 100 100">
      <path class="f" d="M28 18 L72 18 L72 82 L28 82 Z"/>
      <path class="s" d="M28 18 L72 18 L72 82 L28 82 Z"/>
      <path class="a" d="M38 12 L62 12 L62 22 L38 22 Z"/>
      <path class="s" d="M38 12 L62 12 L62 22 L38 22 Z"/>
      <rect class="a" x="34" y="32" width="6" height="6"/>
      <path class="s" d="M34 32 h6 v6 h-6 z M36 35 l1.5 1.5 L40 32"/>
      <path class="s" d="M44 36 h22" stroke-width="1.2"/>
      <rect class="a" x="34" y="44" width="6" height="6"/>
      <path class="s" d="M34 44 h6 v6 h-6 z M36 47 l1.5 1.5 L40 44"/>
      <path class="s" d="M44 48 h22" stroke-width="1.2"/>
      <rect class="a" x="34" y="56" width="6" height="6"/>
      <path class="s" d="M34 56 h6 v6 h-6 z"/>
      <path class="s" d="M44 60 h22" stroke-width="1.2"/>
      <rect class="a" x="34" y="68" width="6" height="6"/>
      <path class="s" d="M34 68 h6 v6 h-6 z M36 71 l1.5 1.5 L40 68"/>
      <path class="s" d="M44 72 h22" stroke-width="1.2"/>
    </svg>`,

    // Scoreboard cube (Accuracy / Precision / Recall stack)
    scoreboard: `<svg viewBox="0 0 100 100">
      <!-- top -->
      <path class="a" d="M22 40 L54 28 L86 40 L54 52 Z"/>
      <path class="s" d="M22 40 L54 28 L86 40 L54 52 Z"/>
      <text x="54" y="44" text-anchor="middle" font-size="6.5" font-weight="700" fill="#001a47" font-style="italic">Scoreboards</text>
      <!-- middle -->
      <path class="a" d="M22 40 L22 52 L54 64 L54 52 Z"/>
      <path class="s" d="M22 40 L22 52 L54 64 L54 52 Z"/>
      <path class="a" d="M86 40 L86 52 L54 64 L54 52 Z"/>
      <path class="s" d="M86 40 L86 52 L54 64 L54 52 Z"/>
      <text x="38" y="60" text-anchor="middle" font-size="5.5" font-weight="700" fill="#001a47">Accuracy</text>
      <text x="70" y="60" text-anchor="middle" font-size="5.5" font-weight="700" fill="#001a47">Precision</text>
      <!-- bottom layer -->
      <path class="a" d="M22 52 L22 62 L54 74 L54 64 Z"/>
      <path class="s" d="M22 52 L22 62 L54 74 L54 64 Z"/>
      <path class="a" d="M86 52 L86 62 L54 74 L54 64 Z"/>
      <path class="s" d="M86 52 L86 62 L54 74 L54 64 Z"/>
      <text x="54" y="72" text-anchor="middle" font-size="5.5" font-weight="700" fill="#001a47">Recall</text>
    </svg>`,

    // Leaderboard table
    leaderboard: `<svg viewBox="0 0 100 100">
      <!-- isometric table -->
      <path class="f" d="M12 34 L54 22 L88 32 L46 44 Z"/>
      <path class="s" d="M12 34 L54 22 L88 32 L46 44 Z"/>
      <!-- side -->
      <path class="f" d="M12 34 L12 72 L46 82 L46 44 Z"/>
      <path class="s" d="M12 34 L12 72 L46 82 L46 44 Z"/>
      <path class="f" d="M46 44 L46 82 L88 70 L88 32 Z"/>
      <path class="s" d="M46 44 L46 82 L88 70 L88 32 Z"/>
      <text x="28" y="41" text-anchor="middle" font-size="5.5" font-weight="700" fill="#001a47">Scoreboards</text>
      <!-- rows -->
      <path class="s" d="M16 52 L44 60 M16 60 L44 68 M16 68 L44 76" stroke-width="1"/>
      <path class="s" d="M50 54 L84 44 M50 62 L84 52 M50 70 L84 60" stroke-width="1"/>
    </svg>`,

    /* === MODELS === */

    // Fully-connected NN blob
    neuralNet: `<svg viewBox="0 0 100 100">
      <circle class="f" cx="28" cy="22" r="5"/><circle class="s" cx="28" cy="22" r="5" fill="none"/>
      <circle class="f" cx="18" cy="42" r="5"/><circle class="s" cx="18" cy="42" r="5" fill="none"/>
      <circle class="f" cx="34" cy="56" r="5"/><circle class="s" cx="34" cy="56" r="5" fill="none"/>
      <circle class="a" cx="52" cy="36" r="5"/><circle class="s" cx="52" cy="36" r="5" fill="none"/>
      <circle class="f" cx="62" cy="56" r="5"/><circle class="s" cx="62" cy="56" r="5" fill="none"/>
      <circle class="f" cx="76" cy="32" r="5"/><circle class="s" cx="76" cy="32" r="5" fill="none"/>
      <circle class="a" cx="80" cy="56" r="5"/><circle class="s" cx="80" cy="56" r="5" fill="none"/>
      <circle class="f" cx="44" cy="72" r="5"/><circle class="s" cx="44" cy="72" r="5" fill="none"/>
      <path class="s" d="M28 22 L52 36 M18 42 L52 36 M34 56 L52 36 M52 36 L62 56 M52 36 L76 32 M52 36 L80 56 M34 56 L62 56 M62 56 L44 72 M80 56 L76 32" fill="none" stroke-width="0.9"/>
    </svg>`,

    // Labelled CNN / RNN network
    cnnRnnNet: `<svg viewBox="0 0 100 100">
      <text x="32" y="16" text-anchor="middle" font-size="7" font-weight="700" fill="#001a47">CNN</text>
      <text x="68" y="16" text-anchor="middle" font-size="7" font-weight="700" fill="#001a47">RNN</text>
      <circle class="f" cx="24" cy="32" r="4"/><circle class="s" cx="24" cy="32" r="4" fill="none"/>
      <circle class="f" cx="24" cy="52" r="4"/><circle class="s" cx="24" cy="52" r="4" fill="none"/>
      <circle class="f" cx="24" cy="72" r="4"/><circle class="s" cx="24" cy="72" r="4" fill="none"/>
      <circle class="a" cx="50" cy="42" r="4"/><circle class="s" cx="50" cy="42" r="4" fill="none"/>
      <circle class="a" cx="50" cy="62" r="4"/><circle class="s" cx="50" cy="62" r="4" fill="none"/>
      <circle class="f" cx="76" cy="32" r="4"/><circle class="s" cx="76" cy="32" r="4" fill="none"/>
      <circle class="f" cx="76" cy="52" r="4"/><circle class="s" cx="76" cy="52" r="4" fill="none"/>
      <circle class="f" cx="76" cy="72" r="4"/><circle class="s" cx="76" cy="72" r="4" fill="none"/>
      <path class="s" fill="none" stroke-width="0.8"
        d="M24 32 L50 42 M24 32 L50 62 M24 52 L50 42 M24 52 L50 62 M24 72 L50 42 M24 72 L50 62
           M50 42 L76 32 M50 42 L76 52 M50 42 L76 72 M50 62 L76 32 M50 62 L76 52 M50 62 L76 72"/>
    </svg>`,

    // Transformers/RNN block stack
    transformerStack: `<svg viewBox="0 0 100 100">
      <path class="a" d="M20 22 L80 22 L80 34 L20 34 Z"/>
      <path class="s" d="M20 22 L80 22 L80 34 L20 34 Z"/>
      <text x="50" y="31" text-anchor="middle" font-size="6.5" font-weight="700" fill="#001a47">Transformers</text>
      <path class="s" d="M50 38 L50 42 M47 42 l3 -3 l3 3" fill="none" stroke-width="1.1"/>
      <path class="f" d="M20 44 L80 44 L80 56 L20 56 Z"/>
      <path class="s" d="M20 44 L80 44 L80 56 L20 56 Z"/>
      <text x="50" y="53" text-anchor="middle" font-size="6.5" font-weight="700" fill="#001a47">RNN</text>
      <path class="a" d="M20 60 L80 60 L80 72 L20 72 Z"/>
      <path class="s" d="M20 60 L80 60 L80 72 L20 72 Z"/>
      <text x="50" y="69" text-anchor="middle" font-size="6.5" font-weight="700" fill="#001a47">Transformers</text>
      <path class="f" d="M20 76 L80 76 L80 86 L20 86 Z"/>
      <path class="s" d="M20 76 L80 76 L80 86 L20 86 Z"/>
      <text x="50" y="83" text-anchor="middle" font-size="6.5" font-weight="700" fill="#001a47">Corpuses</text>
    </svg>`,

    // Training flow diagram
    trainingFlow: `<svg viewBox="0 0 100 100">
      <text x="22" y="32" text-anchor="middle" font-size="6" fill="#001a47">Training</text>
      <path class="a" d="M44 38 L62 38 L62 50 L44 50 Z"/>
      <path class="s" d="M44 38 L62 38 L62 50 L44 50 Z"/>
      <path class="f" d="M53 58 L68 68 L53 78 L38 68 Z"/>
      <path class="s" d="M53 58 L68 68 L53 78 L38 68 Z"/>
      <path class="a" d="M22 66 L34 66 L34 74 L22 74 Z"/>
      <path class="s" d="M22 66 L34 66 L34 74 L22 74 Z"/>
      <path class="a" d="M74 66 L86 66 L86 74 L74 74 Z"/>
      <path class="s" d="M74 66 L86 66 L86 74 L74 74 Z"/>
      <path class="a" d="M44 84 L62 84 L62 92 L44 92 Z"/>
      <path class="s" d="M44 84 L62 84 L62 92 L44 92 Z"/>
      <path class="s" d="M53 50 L53 58 M38 68 L34 70 M68 68 L74 70 M53 78 L53 84
                         M28 66 Q 28 54 44 50 M80 66 Q 80 54 62 50" fill="none" stroke-dasharray="2 2" stroke-width="0.9"/>
    </svg>`,

    // Algorithm flowchart with diamond
    algorithm: `<svg viewBox="0 0 100 100">
      <path class="a" d="M38 14 L70 14 L70 24 L38 24 Z"/>
      <path class="s" d="M38 14 L70 14 L70 24 L38 24 Z"/>
      <text x="54" y="21" text-anchor="middle" font-size="6" font-weight="700" fill="#001a47">Algorithm</text>
      <path class="s" d="M54 26 L54 34" stroke-width="1" fill="none"/>
      <path class="f" d="M54 36 L76 54 L54 72 L32 54 Z"/>
      <path class="s" d="M54 36 L76 54 L54 72 L32 54 Z"/>
      <path class="s" d="M54 72 L54 80" stroke-width="1" fill="none"/>
      <path class="a" d="M38 80 L70 80 L70 92 L38 92 Z"/>
      <path class="s" d="M38 80 L70 80 L70 92 L38 92 Z"/>
      <path class="s" d="M70 54 Q 82 72 54 80" fill="none" stroke-dasharray="2 2"/>
    </svg>`,

    /* === DATASETS === */

    // Stacked cylindrical DBs (pair)
    databasePair: `<svg viewBox="0 0 100 100">
      <!-- left db -->
      <ellipse class="f" cx="30" cy="22" rx="14" ry="5"/>
      <path class="s" d="M16 22 v40 a14 5 0 0 0 28 0 v-40" fill="none"/>
      <ellipse class="s" cx="30" cy="22" rx="14" ry="5" fill="none"/>
      <path class="s" d="M16 34 a14 5 0 0 0 28 0 M16 46 a14 5 0 0 0 28 0" fill="none"/>
      <ellipse class="a" cx="30" cy="22" rx="14" ry="5" opacity="0.55"/>
      <!-- right db -->
      <ellipse class="f" cx="66" cy="30" rx="14" ry="5"/>
      <path class="s" d="M52 30 v40 a14 5 0 0 0 28 0 v-40" fill="none"/>
      <ellipse class="s" cx="66" cy="30" rx="14" ry="5" fill="none"/>
      <path class="s" d="M52 42 a14 5 0 0 0 28 0 M52 54 a14 5 0 0 0 28 0" fill="none"/>
      <ellipse class="a" cx="66" cy="30" rx="14" ry="5" opacity="0.55"/>
    </svg>`,

    // Data lake (wide cylinder)
    dataLake: `<svg viewBox="0 0 100 100">
      <ellipse class="f" cx="50" cy="28" rx="28" ry="8"/>
      <path class="s" d="M22 28 v26 a28 8 0 0 0 56 0 v-26" fill="none"/>
      <ellipse class="s" cx="50" cy="28" rx="28" ry="8" fill="none"/>
      <!-- liquid line -->
      <path class="a" d="M22 44 q 14 6 28 0 t 28 0 v10 a28 8 0 0 1 -56 0 Z" opacity="0.85"/>
      <path class="s" d="M22 44 q 14 6 28 0 t 28 0" fill="none"/>
    </svg>`,

    // Image tiles
    imageTiles: `<svg viewBox="0 0 100 100">
      <!-- back tile -->
      <path class="f" d="M18 20 L64 20 L64 54 L18 54 Z"/>
      <path class="s" d="M18 20 L64 20 L64 54 L18 54 Z"/>
      <circle class="a" cx="28" cy="30" r="3"/>
      <path class="a" d="M22 50 L34 38 L44 48 L52 42 L60 50 L60 52 L22 52 Z"/>
      <path class="s" d="M22 50 L34 38 L44 48 L52 42 L60 50" fill="none"/>
      <text x="22" y="60" font-size="5" fill="#001a47">image</text>
      <!-- front tile -->
      <path class="f" d="M36 40 L82 40 L82 74 L36 74 Z"/>
      <path class="s" d="M36 40 L82 40 L82 74 L36 74 Z"/>
      <circle class="a" cx="46" cy="50" r="3"/>
      <path class="a" d="M40 70 L52 58 L62 68 L70 62 L78 70 L78 72 L40 72 Z"/>
      <path class="s" d="M40 70 L52 58 L62 68 L70 62 L78 70" fill="none"/>
      <text x="40" y="80" font-size="5" fill="#001a47">image</text>
    </svg>`,

    // Text docs (two windows)
    textDocs: `<svg viewBox="0 0 100 100">
      <!-- back doc -->
      <path class="f" d="M14 18 L64 18 L64 60 L14 60 Z"/>
      <path class="s" d="M14 18 L64 18 L64 60 L14 60 Z M14 26 L64 26"/>
      <circle class="a" cx="19" cy="22" r="1.2"/><circle class="a" cx="24" cy="22" r="1.2"/>
      <text x="39" y="39" text-anchor="middle" font-size="14" font-weight="700" fill="#001a47">T</text>
      <path class="s" d="M20 46 h38 M20 52 h30" stroke-width="1.1"/>
      <!-- front doc -->
      <path class="f" d="M36 30 L86 30 L86 74 L36 74 Z"/>
      <path class="s" d="M36 30 L86 30 L86 74 L36 74 Z M36 38 L86 38"/>
      <circle class="a" cx="41" cy="34" r="1.2"/><circle class="a" cx="46" cy="34" r="1.2"/>
      <path class="s" d="M42 46 h38 M42 52 h30 M42 58 h36 M42 64 h28 M42 70 h34"/>
    </svg>`,

    // Spreadsheet / table
    spreadsheet: `<svg viewBox="0 0 100 100">
      <!-- back sheet -->
      <path class="f" d="M14 22 L56 22 L56 58 L14 58 Z"/>
      <path class="s" d="M14 22 L56 22 L56 58 L14 58 Z"/>
      <path class="s" d="M14 30 L56 30 M14 38 L56 38 M14 46 L56 46 M14 54 L56 54 M24 22 L24 58 M36 22 L36 58 M46 22 L46 58"/>
      <!-- front sheet -->
      <path class="f" d="M34 38 L86 38 L86 78 L34 78 Z"/>
      <path class="s" d="M34 38 L86 38 L86 78 L34 78 Z"/>
      <path class="s" d="M34 46 L86 46 M34 54 L86 54 M34 62 L86 62 M34 70 L86 70 M46 38 L46 78 M58 38 L58 78 M70 38 L70 78"/>
      <rect class="a" x="46" y="46" width="12" height="8"/>
      <rect class="a" x="58" y="54" width="12" height="8"/>
    </svg>`,

    /* === INFRASTRUCTURE === */

    // Server rack cluster (three racks in iso)
    serverRacks: `<svg viewBox="0 0 100 100">
      <!-- left rack -->
      <path class="f" d="M12 26 L28 22 L28 82 L12 86 Z"/>
      <path class="s" d="M12 26 L28 22 L28 82 L12 86 Z"/>
      <path class="f" d="M28 22 L40 26 L40 86 L28 82 Z"/>
      <path class="s" d="M28 22 L40 26 L40 86 L28 82 Z"/>
      <path class="s" d="M14 38 L28 34 M14 48 L28 44 M14 58 L28 54 M14 68 L28 64 M14 78 L28 74" stroke-width="0.8"/>
      <path class="s" d="M28 34 L40 38 M28 44 L40 48 M28 54 L40 58 M28 64 L40 68 M28 74 L40 78" stroke-width="0.8"/>
      <rect class="a" x="30" y="28" width="8" height="3"/>
      <rect class="a" x="30" y="40" width="8" height="3"/>
      <!-- middle rack -->
      <path class="f" d="M42 22 L58 18 L58 78 L42 82 Z"/>
      <path class="s" d="M42 22 L58 18 L58 78 L42 82 Z"/>
      <path class="f" d="M58 18 L70 22 L70 82 L58 78 Z"/>
      <path class="s" d="M58 18 L70 22 L70 82 L58 78 Z"/>
      <path class="s" d="M44 34 L58 30 M44 44 L58 40 M44 54 L58 50 M44 64 L58 60 M44 74 L58 70" stroke-width="0.8"/>
      <path class="s" d="M58 30 L70 34 M58 40 L70 44 M58 50 L70 54 M58 60 L70 64 M58 70 L70 74" stroke-width="0.8"/>
      <rect class="a" x="60" y="24" width="8" height="3"/>
      <rect class="a" x="60" y="36" width="8" height="3"/>
      <!-- right rack -->
      <path class="f" d="M72 26 L86 22 L86 78 L72 82 Z"/>
      <path class="s" d="M72 26 L86 22 L86 78 L72 82 Z"/>
      <path class="s" d="M74 38 L86 34 M74 48 L86 44 M74 58 L86 54 M74 68 L86 64" stroke-width="0.8"/>
    </svg>`,

    // Smaller server node pair
    serverNodes: `<svg viewBox="0 0 100 100">
      <path class="f" d="M18 32 L40 26 L40 78 L18 84 Z"/>
      <path class="s" d="M18 32 L40 26 L40 78 L18 84 Z"/>
      <path class="f" d="M40 26 L58 32 L58 84 L40 78 Z"/>
      <path class="s" d="M40 26 L58 32 L58 84 L40 78 Z"/>
      <path class="s" d="M22 44 L40 40 M22 56 L40 52 M22 68 L40 64" stroke-width="0.8"/>
      <rect class="a" x="42" y="36" width="14" height="3"/>
      <rect class="a" x="42" y="48" width="14" height="3"/>
      <rect class="a" x="42" y="60" width="14" height="3"/>
      <!-- second node behind -->
      <path class="f" d="M56 28 L74 24 L74 72 L56 76 Z" opacity="0.85"/>
      <path class="s" d="M56 28 L74 24 L74 72 L56 76 Z"/>
      <path class="f" d="M74 24 L86 28 L86 76 L74 72 Z"/>
      <path class="s" d="M74 24 L86 28 L86 76 L74 72 Z"/>
      <rect class="a" x="76" y="32" width="8" height="3"/>
      <rect class="a" x="76" y="42" width="8" height="3"/>
    </svg>`,

    // TPU card with ports
    tpuCard: `<svg viewBox="0 0 100 100">
      <!-- board -->
      <path class="f" d="M8 42 L70 30 L90 38 L28 50 Z"/>
      <path class="s" d="M8 42 L70 30 L90 38 L28 50 Z"/>
      <path class="f" d="M8 42 L8 54 L28 62 L28 50 Z"/>
      <path class="s" d="M8 42 L8 54 L28 62 L28 50 Z"/>
      <path class="f" d="M28 50 L28 62 L90 50 L90 38 Z"/>
      <path class="s" d="M28 50 L28 62 L90 50 L90 38 Z"/>
      <!-- chip grid on top -->
      <path class="a" d="M20 44 L60 36 L68 40 L28 48 Z"/>
      <path class="s" d="M20 44 L60 36 L68 40 L28 48 Z"/>
      <path class="s" stroke-width="0.6" d="M24 44 L64 36 M26 45 L66 37 M28 46 L68 38 M30 47 L70 39"/>
      <!-- label -->
      <text x="72" y="58" text-anchor="middle" font-size="7" font-weight="700" fill="#001a47" font-style="italic">TPUs</text>
    </svg>`,

    // Network cable loop
    cable: `<svg viewBox="0 0 100 100">
      <!-- connector left -->
      <path class="a" d="M10 70 L22 62 L30 66 L18 74 Z"/>
      <path class="s" d="M10 70 L22 62 L30 66 L18 74 Z"/>
      <!-- cable curve -->
      <path class="s" d="M20 68 Q 40 20 60 30 Q 80 40 84 58" fill="none" stroke-width="2"/>
      <!-- connector right -->
      <path class="a" d="M78 56 L90 48 L98 52 L86 60 Z"/>
      <path class="s" d="M78 56 L90 48 L98 52 L86 60 Z"/>
    </svg>`,

    // Short cable (second one)
    cableShort: `<svg viewBox="0 0 100 100">
      <path class="a" d="M14 60 L26 52 L34 56 L22 64 Z"/>
      <path class="s" d="M14 60 L26 52 L34 56 L22 64 Z"/>
      <path class="s" d="M24 58 Q 50 84 72 58" fill="none" stroke-width="2"/>
      <path class="a" d="M66 56 L78 48 L86 52 L74 60 Z"/>
      <path class="s" d="M66 56 L78 48 L86 52 L74 60 Z"/>
    </svg>`,
  };

  /* ---------- Layer definitions ----------
     Each layer has a set of positioned items. Coordinates
     are 0–100 (%). Connectors are optional dashed arrows
     drawn between items on the same plane. */

  const LAYERS = [
    {
      id: 'apps',
      name: 'Apps & Tools',
      count: 6,
      desc: 'End-user surfaces — IDE plugins, APIs, playgrounds and CLI wrappers built on top of the open stack.',
      items: ['Aina Kit', 'ALIA Kit', 'Playground', 'REST API', 'CLI', 'SDK'],
      z: 160,
      glyphs: [
        { x: 28, y: 30, size: 22, kind: 'appIcon' },
        { x: 46, y: 22, size: 22, kind: 'browserUI' },
        { x: 66, y: 26, size: 22, kind: 'browserCode' },
        { x: 38, y: 50, size: 24, kind: 'gearStack' },
        { x: 58, y: 46, size: 22, kind: 'apiGlobe' },
        { x: 76, y: 50, size: 22, kind: 'searchDoc' },
        { x: 50, y: 68, size: 22, kind: 'laptop' },
      ],
      connectors: [
        { from: 0, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 4, to: 6 },
      ],
    },
    {
      id: 'benchmarks',
      name: 'Benchmarks',
      count: 8,
      desc: 'Evaluation suites used to compare models across tasks, languages and fairness dimensions.',
      items: ['LinguaBench', 'SpeechBench', 'VisionEval', 'TranslatEval'],
      z: 80,
      glyphs: [
        { x: 24, y: 30, size: 22, kind: 'lineChart' },
        { x: 38, y: 48, size: 22, kind: 'lineChartCurve' },
        { x: 54, y: 32, size: 22, kind: 'barChart' },
        { x: 74, y: 30, size: 22, kind: 'clipboard' },
        { x: 58, y: 60, size: 26, kind: 'scoreboard' },
        { x: 36, y: 70, size: 22, kind: 'leaderboard' },
      ],
      connectors: [
        { from: 0, to: 2 },
        { from: 2, to: 4 },
        { from: 4, to: 3 },
        { from: 5, to: 4 },
      ],
    },
    {
      id: 'models',
      name: 'Models',
      count: 15,
      desc: 'Open language, speech, vision and multimodal models — trained, documented and versioned in public.',
      items: ['ALIA 40B', 'ALIA 7B', 'Aina-MT', 'Whisper-cat', 'Vision-OC'],
      z: 0,
      glyphs: [
        { x: 26, y: 34, size: 24, kind: 'neuralNet' },
        { x: 42, y: 56, size: 22, kind: 'cnnRnnNet' },
        { x: 56, y: 50, size: 22, kind: 'transformerStack' },
        { x: 70, y: 60, size: 22, kind: 'trainingFlow' },
        { x: 82, y: 34, size: 20, kind: 'algorithm' },
      ],
      connectors: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    {
      id: 'datasets',
      name: 'Datasets',
      count: 40,
      desc: 'Curated, documented, license-checked corpora across text, speech, translation and multimodal data.',
      items: ['Aina Speech', 'Multilingual MT Set', 'MultiModal Commons', 'Visual Scenes', 'Parallel Corpora'],
      z: -80,
      glyphs: [
        { x: 24, y: 34, size: 22, kind: 'databasePair' },
        { x: 42, y: 56, size: 22, kind: 'dataLake' },
        { x: 58, y: 50, size: 22, kind: 'imageTiles' },
        { x: 70, y: 34, size: 22, kind: 'textDocs' },
        { x: 82, y: 52, size: 22, kind: 'spreadsheet' },
      ],
      connectors: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    {
      id: 'infra',
      name: 'Infrastructure',
      count: 12,
      desc: 'Public supercomputing capacity — GPU & TPU clusters, storage, and networking run by BSC-CNS.',
      items: ['MareNostrum 5', 'GPU Nodes', 'TPU Pods', 'Storage', 'Interconnect'],
      z: -160,
      glyphs: [
        { x: 22, y: 44, size: 26, kind: 'serverRacks' },
        { x: 46, y: 46, size: 24, kind: 'serverNodes' },
        { x: 72, y: 42, size: 22, kind: 'tpuCard' },
        { x: 38, y: 74, size: 22, kind: 'cableShort' },
        { x: 72, y: 70, size: 22, kind: 'cable' },
      ],
      connectors: [
        { from: 0, to: 1 },
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
      ],
    },
  ];

  /* ---------- Build the DOM ---------- */

  function buildStack(host) {
    host.innerHTML = '';
    host.classList.add('has-interactive');

    const scene = document.createElement('div');
    scene.className = 'stack-scene';
    scene.setAttribute('data-mode', 'stack');

    // Hint text
    const hint = document.createElement('div');
    hint.className = 'stack-hint';
    hint.innerHTML = '<span class="stack-hint-dot"></span> Hover or tap a layer';
    scene.appendChild(hint);

    // Side-label rails (outside the 3D world so text stays upright)
    const railL = document.createElement('div');
    railL.className = 'stack-rail stack-rail-left';
    const railR = document.createElement('div');
    railR.className = 'stack-rail stack-rail-right';
    scene.appendChild(railL);
    scene.appendChild(railR);

    // 3D world
    const world = document.createElement('div');
    world.className = 'stack-world';

    // Layers
    LAYERS.forEach((layer, layerIdx) => {
      const el = document.createElement('div');
      el.className = 'stack-layer';
      el.dataset.layer = layer.id;
      el.dataset.state = 'idle';
      el.style.setProperty('--z', layer.z + 'px');

      // plane
      const plane = document.createElement('div');
      plane.className = 'stack-plane';
      el.appendChild(plane);

      // intra-layer dashed connector arrows (as SVG overlay)
      if (layer.connectors && layer.connectors.length) {
        const connSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        connSvg.setAttribute('class', 'stack-connectors');
        connSvg.setAttribute('viewBox', '0 0 100 100');
        connSvg.setAttribute('preserveAspectRatio', 'none');
        layer.connectors.forEach(c => {
          const a = layer.glyphs[c.from];
          const b = layer.glyphs[c.to];
          if (!a || !b) return;
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          // Curve slightly for visual interest
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - 3;
          line.setAttribute('d', `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`);
          line.setAttribute('class', 'conn-path');
          connSvg.appendChild(line);
          // arrowhead
          const dx = b.x - mx, dy = b.y - my;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len, uy = dy / len;
          const ax = b.x - ux * 2.4, ay = b.y - uy * 2.4;
          const px = -uy, py = ux;
          const head = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          head.setAttribute('d',
            `M ${b.x} ${b.y} L ${ax + px * 1.2} ${ay + py * 1.2} L ${ax - px * 1.2} ${ay - py * 1.2} Z`);
          head.setAttribute('class', 'conn-head');
          connSvg.appendChild(head);
        });
        el.appendChild(connSvg);
      }

      // glyphs
      const glyphs = document.createElement('div');
      glyphs.className = 'stack-glyphs';
      layer.glyphs.forEach((g, gIdx) => {
        const gel = document.createElement('div');
        gel.className = 'glyph';
        gel.style.left = g.x + '%';
        gel.style.top = g.y + '%';
        gel.style.width = (g.size || 22) + '%';
        gel.style.height = (g.size || 22) + '%';
        gel.style.marginLeft = '-' + ((g.size || 22) / 2) + '%';
        gel.style.marginTop = '-' + ((g.size || 22) / 2) + '%';
        gel.innerHTML = G[g.kind] || '';
        // gentle stagger for reveal
        gel.style.setProperty('--glyph-delay', (gIdx * 0.04) + 's');
        glyphs.appendChild(gel);
      });
      el.appendChild(glyphs);

      // count badge (hidden until active)
      const count = document.createElement('div');
      count.className = 'stack-count';
      count.textContent = layer.count + (layer.id === 'infra' ? ' PFLOPS' : '+');
      el.appendChild(count);

      world.appendChild(el);

      // Side tags in screen space (not 3D) — one on left rail, one on right
      const tagL = document.createElement('div');
      tagL.className = 'rail-tag rail-tag-left';
      tagL.dataset.layer = layer.id;
      tagL.textContent = layer.name;
      railL.appendChild(tagL);
    });

    // Vertical dashed rails connecting all layers (purely decorative, SVG)
    const railSvgL = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    railSvgL.setAttribute('class', 'rail-svg');
    railSvgL.setAttribute('viewBox', '0 0 10 100');
    railSvgL.setAttribute('preserveAspectRatio', 'none');
    railSvgL.innerHTML = `
      <path d="M5 6 L5 94" class="rail-line"/>
      <path d="M5 6 L2 10 M5 6 L8 10" class="rail-arrow"/>
      <path d="M5 94 L2 90 M5 94 L8 90" class="rail-arrow"/>`;
    railL.appendChild(railSvgL);

    const railSvgR = railSvgL.cloneNode(true);
    railR.appendChild(railSvgR);

    scene.appendChild(world);

    host.appendChild(scene);
    return { scene, world };
  }

  /* ---------- Interactions ---------- */

  function wireInteractions({ scene, world }) {
    const layerEls = scene.querySelectorAll('.stack-layer');
    const tagEls = scene.querySelectorAll('.rail-tag');
    let activeId = null;
    let pinned = false;

    function setState(layerId) {
      activeId = layerId;
      if (!layerId) {
        scene.setAttribute('data-hastooltip', '0');
        layerEls.forEach(el => (el.dataset.state = 'idle'));
        tagEls.forEach(t => (t.dataset.state = 'idle'));
        return;
      }
      scene.setAttribute('data-hastooltip', '1');
      layerEls.forEach(el => {
        el.dataset.state = el.dataset.layer === layerId ? 'active' : 'dim';
      });
      tagEls.forEach(t => {
        t.dataset.state = t.dataset.layer === layerId ? 'active' : 'dim';
      });
    }

    function bindHover(el, layerId) {
      el.addEventListener('mouseenter', () => {
        if (pinned) return;
        setState(layerId);
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pinned && activeId === layerId) {
          pinned = false;
          setState(null);
        } else {
          pinned = true;
          setState(layerId);
        }
      });
    }

    layerEls.forEach(el => bindHover(el, el.dataset.layer));
    tagEls.forEach(t => bindHover(t, t.dataset.layer));

    scene.addEventListener('mouseleave', () => {
      if (!pinned) setState(null);
    });

    // Click outside the layers (but inside scene) deselects
    scene.addEventListener('click', (e) => {
      if (e.target.closest('.stack-layer')) return;
      if (e.target.closest('.rail-tag')) return;
      pinned = false;
      setState(null);
    });

    // Cursor-based parallax tilt
    let rafId = 0;
    let targetTiltX = 0, targetTiltY = 0;
    let curTiltX = 0, curTiltY = 0;
    scene.addEventListener('mousemove', (e) => {
      const r = scene.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetTiltY = nx * 4;
      targetTiltX = -ny * 3;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });
    scene.addEventListener('mouseleave', () => {
      targetTiltX = 0; targetTiltY = 0;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });
    function loop() {
      curTiltX += (targetTiltX - curTiltX) * 0.08;
      curTiltY += (targetTiltY - curTiltY) * 0.08;
      scene.style.setProperty('--tilt-x', curTiltX.toFixed(2) + 'deg');
      scene.style.setProperty('--tilt-y', curTiltY.toFixed(2) + 'deg');
      if (Math.abs(targetTiltX - curTiltX) > 0.05 || Math.abs(targetTiltY - curTiltY) > 0.05) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    }
  }

  /* ---------- Boot ---------- */

  function boot() {
    const host = document.getElementById('hero-image');
    if (!host) return;
    const parts = buildStack(host);
    wireInteractions(parts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
