/* ======================================================
   Interactive Hero Stack
   Replaces the static layer-image.png with a CSS-3D
   isometric diagram of the public-AI resource stack.
   ====================================================== */

(function () {
  'use strict';

  /* ---------- Data model: five layers, top → bottom ----------
     Order matters: index 0 is the TOP plane (Apps & Tools),
     index 4 is the BOTTOM plane (Infrastructure).
     Z positions are assigned so bottom sits deepest. */

  const LAYERS = [
    {
      id: 'apps',
      name: 'Apps & Tools',
      count: 6,
      desc: 'End-user surfaces — IDE plugins, APIs, playgrounds and CLI wrappers built on top of the open stack.',
      items: ['Aina Kit', 'ALIA Kit', 'Playground', 'REST API', 'CLI', 'SDK'],
      z: 120,
      glyphs: [
        { x: 25, y: 50, kind: 'chat' },
        { x: 50, y: 50, kind: 'browser' },
        { x: 75, y: 50, kind: 'terminal' },
      ],
    },
    {
      id: 'benchmarks',
      name: 'Benchmarks',
      count: 8,
      desc: 'Evaluation suites used to compare models across tasks, languages and fairness dimensions.',
      items: ['LinguaBench', 'SpeechBench', 'VisionEval', 'TranslatEval'],
      z: 60,
      glyphs: [
        { x: 25, y: 50, kind: 'barchart' },
        { x: 50, y: 50, kind: 'gauge' },
        { x: 75, y: 50, kind: 'medal' },
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
        { x: 25, y: 50, kind: 'nn' },
        { x: 50, y: 50, kind: 'transformer' },
        { x: 75, y: 50, kind: 'tokens' },
      ],
    },
    {
      id: 'datasets',
      name: 'Datasets',
      count: 40,
      desc: 'Curated, documented, license-checked corpora across text, speech, translation and multimodal data.',
      items: ['Aina Speech', 'Multilingual MT Set', 'MultiModal Commons', 'Visual Scenes', 'Parallel Corpora'],
      z: -60,
      glyphs: [
        { x: 25, y: 50, kind: 'document' },
        { x: 50, y: 50, kind: 'db' },
        { x: 75, y: 50, kind: 'waveform' },
      ],
    },
    {
      id: 'infra',
      name: 'Infrastructure',
      count: 12,
      desc: 'Public supercomputing capacity — GPU & TPU clusters, storage, and networking run by BSC-CNS.',
      items: ['MareNostrum 5', 'GPU Nodes', 'TPU Pods', 'Storage', 'Interconnect'],
      z: -120,
      glyphs: [
        { x: 25, y: 50, kind: 'rack' },
        { x: 50, y: 50, kind: 'gpu' },
        { x: 75, y: 50, kind: 'storage' },
      ],
    },
  ];

  /* ---------- SVG glyph library ----------
     Each glyph is a small isometric-ish line drawing,
     stroked in ink-blue with occasional green accent.
     They're tiny — keep them simple. */

  const GLYPH = {
    /* ---- Apps & Tools ---- */
    browser: `<svg viewBox="0 0 40 40"><rect class="fill" x="5" y="8" width="30" height="24" rx="2"/><path class="stroke" d="M5 14 h30"/><circle class="accent" cx="9" cy="11" r="1.2"/><circle class="accent" cx="13" cy="11" r="1.2"/><circle class="accent" cx="17" cy="11" r="1.2"/><path class="stroke" d="M10 21 h20 M10 25 h14"/></svg>`,
    chat: `<svg viewBox="0 0 40 40"><path class="fill" d="M6 10 h24 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-14 l-6 5 v-5 h-4 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4 z"/><circle class="accent" cx="14" cy="19" r="1.5"/><circle class="accent" cx="20" cy="19" r="1.5"/><circle class="accent" cx="26" cy="19" r="1.5"/></svg>`,
    terminal: `<svg viewBox="0 0 40 40"><rect class="fill" x="5" y="9" width="30" height="22" rx="2"/><path class="stroke" d="M5 15 h30"/><circle class="accent" cx="9" cy="12" r="1"/><circle class="accent" cx="13" cy="12" r="1"/><path class="stroke" d="M10 22 l4 3 -4 3 M17 26 l8 0" stroke-width="1.8"/></svg>`,

    /* ---- Benchmarks ---- */
    barchart: `<svg viewBox="0 0 40 40"><rect class="fill" x="5" y="6" width="30" height="28" rx="2"/><rect class="accent" x="10" y="22" width="5" height="8"/><rect class="accent" x="17" y="16" width="5" height="14"/><rect class="accent" x="24" y="19" width="5" height="11"/><rect class="accent" x="31" y="12" width="3" height="18" opacity="0"/><path class="stroke" d="M9 10 h12" stroke-width="1.2"/></svg>`,
    gauge: `<svg viewBox="0 0 40 40"><path class="fill" d="M5 28 a15 15 0 0 1 30 0 z"/><path class="stroke" d="M20 28 l8 -10" stroke-width="2.2"/><circle class="fill" cx="20" cy="28" r="2.2"/><path class="stroke" d="M7 26 l2 -1 M33 26 l-2 -1 M20 15 v1.5"/></svg>`,
    medal: `<svg viewBox="0 0 40 40"><path class="fill" d="M13 4 l-4 10 l11 4 l11 -4 l-4 -10 z"/><circle class="accent" cx="20" cy="26" r="8"/><path class="stroke" d="M16 26 l3 3 l5 -6" stroke-width="1.8"/></svg>`,

    /* ---- Models ---- */
    nn: `<svg viewBox="0 0 40 40"><circle class="fill" cx="7" cy="10" r="2.2"/><circle class="fill" cx="7" cy="20" r="2.2"/><circle class="fill" cx="7" cy="30" r="2.2"/><circle class="fill" cx="20" cy="14" r="2.2"/><circle class="fill" cx="20" cy="26" r="2.2"/><circle class="accent" cx="33" cy="20" r="2.5"/><path class="stroke" d="M9 10 L18 14 M9 20 L18 14 M9 20 L18 26 M9 30 L18 26 M22 14 L31 20 M22 26 L31 20"/></svg>`,
    transformer: `<svg viewBox="0 0 40 40"><rect class="fill" x="5" y="6" width="30" height="9" rx="1.5"/><rect class="accent" x="5" y="17" width="30" height="9" rx="1.5"/><rect class="fill" x="5" y="28" width="30" height="6" rx="1.5"/><path class="stroke" d="M10 6 v-2 M20 6 v-2 M30 6 v-2 M10 34 v2 M20 34 v2 M30 34 v2" stroke-width="1.2"/><circle class="fill" cx="12" cy="10.5" r="0.8"/><circle class="fill" cx="20" cy="10.5" r="0.8"/><circle class="fill" cx="28" cy="10.5" r="0.8"/></svg>`,
    tokens: `<svg viewBox="0 0 40 40"><rect class="fill" x="4" y="15" width="8" height="10" rx="1.5"/><rect class="accent" x="14" y="13" width="12" height="14" rx="1.5"/><rect class="fill" x="28" y="15" width="8" height="10" rx="1.5"/><path class="stroke" d="M6 20 h4 M17 18 h6 M17 22 h6 M30 20 h4" stroke-width="1.2"/></svg>`,

    /* ---- Datasets ---- */
    document: `<svg viewBox="0 0 40 40"><path class="fill" d="M10 4 h15 l7 7 v25 h-22 z"/><path class="stroke" d="M25 4 v7 h7"/><path class="stroke" d="M14 18 h14 M14 23 h14 M14 28 h10" stroke-width="1.4"/></svg>`,
    db: `<svg viewBox="0 0 40 40"><ellipse class="fill" cx="20" cy="8" rx="13" ry="4"/><path class="stroke" d="M7 8 v24 a13 4 0 0 0 26 0 v-24"/><path class="stroke" d="M7 16 a13 4 0 0 0 26 0 M7 24 a13 4 0 0 0 26 0"/><path class="accent" d="M7 8 a13 4 0 0 0 26 0 a13 4 0 0 0 -26 0 z" opacity="0.4"/></svg>`,
    waveform: `<svg viewBox="0 0 40 40"><rect class="fill" x="4" y="10" width="32" height="20" rx="2"/><path class="stroke" d="M8 20 v-3 M11 20 v-5 M14 20 v-2 M17 20 v-7 M20 20 v-4 M23 20 v-8 M26 20 v-3 M29 20 v-6 M32 20 v-4 M8 20 v3 M11 20 v5 M14 20 v2 M17 20 v7 M20 20 v4 M23 20 v8 M26 20 v3 M29 20 v6 M32 20 v4" stroke-width="1.6"/></svg>`,

    /* ---- Infrastructure ---- */
    rack: `<svg viewBox="0 0 40 40"><rect class="fill" x="10" y="4" width="20" height="32" rx="1.5"/><path class="stroke" d="M13 10 h14 M13 15 h14 M13 20 h14 M13 25 h14 M13 30 h14" stroke-width="1.3"/><circle class="accent" cx="15" cy="12.5" r="0.9"/><circle class="accent" cx="15" cy="22.5" r="0.9"/><circle class="accent" cx="15" cy="32.5" r="0.9"/></svg>`,
    gpu: `<svg viewBox="0 0 40 40"><rect class="fill" x="3" y="12" width="34" height="14" rx="1.5"/><rect class="accent" x="7" y="15" width="11" height="8" rx="0.5"/><rect class="accent" x="22" y="15" width="11" height="8" rx="0.5"/><path class="stroke" d="M6 26 v6 M10 26 v6 M30 26 v6 M34 26 v6" stroke-width="1.2"/></svg>`,
    storage: `<svg viewBox="0 0 40 40"><rect class="fill" x="5" y="6" width="30" height="9" rx="1.5"/><rect class="fill" x="5" y="17" width="30" height="9" rx="1.5"/><rect class="fill" x="5" y="28" width="30" height="7" rx="1.5"/><circle class="accent" cx="10" cy="10.5" r="1.1"/><circle class="accent" cx="10" cy="21.5" r="1.1"/><circle class="accent" cx="10" cy="31.5" r="1.1"/><path class="stroke" d="M15 10.5 h15 M15 21.5 h15 M15 31.5 h12" stroke-width="1.2"/></svg>`,
  };

  /* ---------- Build the DOM ---------- */

  function buildStack(host) {
    host.innerHTML = '';
    host.classList.add('has-interactive');

    const scene = document.createElement('div');
    scene.className = 'stack-scene';
    scene.setAttribute('data-mode', 'stack');
    scene.setAttribute('data-flow', 'off');

    // Hint text
    const hint = document.createElement('div');
    hint.className = 'stack-hint';
    hint.innerHTML = '<span class="stack-hint-dot"></span> Hover or tap a layer';
    scene.appendChild(hint);

    // 3D world
    const world = document.createElement('div');
    world.className = 'stack-world';

    // Layers
    LAYERS.forEach((layer, i) => {
      const el = document.createElement('div');
      el.className = 'stack-layer';
      el.dataset.layer = layer.id;
      el.dataset.state = 'idle';
      el.style.setProperty('--z', layer.z + 'px');

      // plane
      const plane = document.createElement('div');
      plane.className = 'stack-plane';
      el.appendChild(plane);

      // glyphs
      const glyphs = document.createElement('div');
      glyphs.className = 'stack-glyphs';
      layer.glyphs.forEach(g => {
        const gel = document.createElement('div');
        gel.className = 'glyph';
        gel.style.left = g.x + '%';
        gel.style.top = g.y + '%';
        gel.innerHTML = GLYPH[g.kind] || GLYPH.window;
        glyphs.appendChild(gel);
      });
      el.appendChild(glyphs);

      // label
      const label = document.createElement('div');
      label.className = 'stack-label';
      label.textContent = layer.name;
      el.appendChild(label);

      // count badge (hidden until active)
      const count = document.createElement('div');
      count.className = 'stack-count';
      count.textContent = layer.count + (layer.id === 'infra' ? ' PFLOPS' : '+');
      el.appendChild(count);

      world.appendChild(el);
    });

    // Flow connectors + dots (for Flow mode)
    for (let i = 0; i < 4; i++) {
      const dot = document.createElement('div');
      dot.className = 'flow-dot';
      // lateral placement; each traverses up the full stack height
      const col = [28, 50, 72, 40][i];
      const row = [40, 55, 45, 60][i];
      dot.style.setProperty('--cx', col + '%');
      dot.style.setProperty('--cy', row + '%');
      dot.style.setProperty('--flow-z', '440px');
      dot.style.setProperty('--flow-dur', (2.4 + i * 0.35) + 's');
      dot.style.setProperty('--flow-delay', (i * 0.4) + 's');
      world.appendChild(dot);
    }

    scene.appendChild(world);

    // Legend
    const legend = document.createElement('div');
    legend.className = 'stack-legend';
    legend.textContent = 'The open AI stack';
    scene.appendChild(legend);

    host.appendChild(scene);
    return { scene, world };
  }

  /* ---------- Interactions ---------- */

  function wireInteractions({ scene, world }) {
    const layerEls = scene.querySelectorAll('.stack-layer');
    let activeId = null;
    let pinned = false;

    function setState(layerId) {
      activeId = layerId;
      if (!layerId) {
        scene.setAttribute('data-hastooltip', '0');
        layerEls.forEach(el => (el.dataset.state = 'idle'));
        return;
      }
      scene.setAttribute('data-hastooltip', '1');
      layerEls.forEach(el => {
        el.dataset.state = el.dataset.layer === layerId ? 'active' : 'dim';
      });
    }

    layerEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (pinned) return;
        setState(el.dataset.layer);
      });
      el.addEventListener('mouseleave', () => {
        if (pinned) return;
        // short delay before clearing, so moving between layers is smooth
        // handled at scene-level below
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pinned && activeId === el.dataset.layer) {
          pinned = false;
          setState(null);
        } else {
          pinned = true;
          setState(el.dataset.layer);
        }
      });
    });

    scene.addEventListener('mouseleave', () => {
      if (!pinned) setState(null);
    });

    // Click outside the layers (but inside scene) deselects
    scene.addEventListener('click', (e) => {
      if (e.target.closest('.stack-layer')) return;
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
      targetTiltY = nx * 6;   // rotateZ delta
      targetTiltX = -ny * 4;  // rotateX delta
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
