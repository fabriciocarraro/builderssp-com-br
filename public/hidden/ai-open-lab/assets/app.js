/* ======================================================
   The AI Open Lab — Application
   ====================================================== */

(function () {
  'use strict';

  /* ---------- DATA ---------- */

  const resources = [
    { id: 1, name: 'ALIA 40B', type: 'model', modality: 'text', desc: 'A 40-billion parameter language model trained on diverse multilingual corpora, optimized for underrepresented languages.', params: '40B', year: 2025 },
    { id: 2, name: 'ALIA 7B', type: 'model', modality: 'text', desc: 'A 7-billion parameter language model designed for efficient deployment while maintaining strong multilingual capabilities.', params: '7B', year: 2024 },
    { id: 3, name: 'Aina Speech Corpus', type: 'dataset', modality: 'speech', desc: 'A comprehensive speech dataset covering multiple underrepresented languages, annotated for ASR and TTS tasks.', year: 2023 },
    { id: 4, name: 'Multilingual Translation Set', type: 'dataset', modality: 'translation', desc: 'Parallel translation corpus spanning 12 languages, curated for training and evaluating machine translation systems.', year: 2024 },
    { id: 5, name: 'Aina Kit', type: 'tool', modality: 'text', desc: 'A comprehensive toolkit for language technology development, providing tools for text processing, corpus analysis, and model training.', year: 2023 },
    { id: 6, name: 'ALIA Kit', type: 'tool', modality: 'text', desc: 'Suite of tools for deploying and fine-tuning public AI models, with built-in evaluation and benchmarking capabilities.', year: 2024 },
    { id: 7, name: 'LinguaBench', type: 'benchmark', modality: 'text', desc: 'A benchmark suite for evaluating language models across diverse linguistic tasks, including low-resource language understanding.', year: 2024 },
    { id: 8, name: 'VisionEval', type: 'benchmark', modality: 'vision', desc: 'Benchmark for evaluating computer vision models on tasks including object detection, segmentation, and classification.', year: 2025 },
    { id: 9, name: 'MultiModal Commons', type: 'dataset', modality: 'multimodal', desc: 'A curated dataset combining text, image, and audio data for training and evaluating multimodal AI systems.', year: 2025 },
    { id: 10, name: 'SpeechBench', type: 'benchmark', modality: 'speech', desc: 'Benchmark for automatic speech recognition and text-to-speech systems across multiple languages and dialects.', year: 2024 },
    { id: 11, name: 'TranslatEval', type: 'benchmark', modality: 'translation', desc: 'Evaluation framework for machine translation quality across language pairs, with focus on low-resource directions.', year: 2025 },
    { id: 12, name: 'Visual Scene Dataset', type: 'dataset', modality: 'vision', desc: 'Large-scale annotated visual dataset for scene understanding, including culturally diverse imagery.', year: 2025 },
  ];

  const faqData = [
    { q: 'What is the AI Open Lab?', a: 'The AI Open Lab is a platform that unifies and provides access to public AI resources — open models, datasets, benchmarks, and tools — developed by public research centers. It promotes ethical, transparent, and accessible AI.' },
    { q: 'Who can use the resources?', a: 'The resources are available to researchers, developers, organizations, and governments. Most resources are released under open licenses, allowing free use for both research and commercial purposes.' },
    { q: 'How do I access the models and datasets?', a: 'You can browse the Resources page to explore available assets. Each resource includes documentation, licensing information, and download or API access instructions.' },
    { q: 'Are the models suitable for production use?', a: 'Yes. The models are developed with production readiness in mind, including comprehensive evaluation, documentation, and deployment guides. Many organizations already use them in production environments.' },
    { q: 'What languages are supported?', a: 'The initiative focuses on supporting non-global and underrepresented languages alongside major languages. Currently, resources cover 12+ languages, with ongoing efforts to expand coverage.' },
    { q: 'How can my organization contribute?', a: 'Organizations can contribute datasets, models, benchmarks, or tools. Visit the Join page to learn about partnership opportunities and how to submit resources for inclusion.' },
    { q: 'Is there technical support available?', a: 'Yes. Participants in the AI Open Lab can access infrastructure consulting, technical documentation, and community support channels for help with deployment and customization.' },
    { q: 'What makes these resources different from commercial alternatives?', a: 'These resources are developed by public research institutions with a focus on transparency, ethical AI, and cultural diversity. They come with full documentation of training data and methodologies, no vendor lock-in, and open licenses.' },
    { q: 'How is data privacy handled?', a: 'All datasets follow strict ethical guidelines and privacy regulations. Personal data is anonymized or excluded, and data collection processes are fully documented and auditable.' },
    { q: 'Can I fine-tune the models for my specific use case?', a: 'Absolutely. The models are released with fine-tuning support and documentation. The ALIA Kit provides tools specifically designed to help you adapt models to your domain and language requirements.' },
  ];

  /* ---------- ROUTER ---------- */

  function getPage() {
    const hash = window.location.hash.replace('#', '') || 'home';
    return hash;
  }

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Close mobile nav
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', () => showPage(getPage()));

  /* ---------- INIT ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    showPage(getPage());
    initHeader();
    initMobileMenu();
    initGlobe();
    initCountUp();
    initResources();
    initFaq();
    initForms();
  });

  /* ---------- HEADER SCROLL ---------- */

  function initHeader() {
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- MOBILE MENU ---------- */

  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  /* ---------- GLOBE (Canvas) ---------- */

  function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 460;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = 180;
    let rotation = 0;

    // Simplified continent points (lon, lat) in degrees
    const points = [
      // Europe
      { lon: 0, lat: 51 }, { lon: 2, lat: 48 }, { lon: 10, lat: 52 }, { lon: 12, lat: 41 },
      { lon: -3, lat: 40 }, { lon: 15, lat: 46 }, { lon: 24, lat: 56 }, { lon: 21, lat: 42 },
      { lon: 14, lat: 50 }, { lon: 18, lat: 59 }, { lon: 25, lat: 60 }, { lon: 30, lat: 50 },
      // Africa
      { lon: 3, lat: 6 }, { lon: 32, lat: -1 }, { lon: 28, lat: -26 }, { lon: -17, lat: 14 },
      { lon: 36, lat: -6 }, { lon: 47, lat: -19 },
      // Asia
      { lon: 55, lat: 25 }, { lon: 77, lat: 28 }, { lon: 100, lat: 13 }, { lon: 116, lat: 39 },
      { lon: 139, lat: 35 }, { lon: 127, lat: 37 }, { lon: 106, lat: -6 },
      // Americas
      { lon: -74, lat: 40 }, { lon: -99, lat: 19 }, { lon: -43, lat: -22 }, { lon: -58, lat: -34 },
      { lon: -77, lat: -12 }, { lon: -79, lat: 4 }, { lon: -122, lat: 37 }, { lon: -73, lat: 45 },
      // Oceania
      { lon: 151, lat: -33 }, { lon: 174, lat: -41 },
    ];

    // Research center highlights
    const centers = [
      { lon: 2.15, lat: 41.39, label: 'BSC' },    // Barcelona
      { lon: 12.5, lat: 41.9, label: 'CINECA' },   // Italy
      { lon: 9.18, lat: 48.78, label: 'HLRS' },    // Stuttgart
      { lon: 24.94, lat: 60.17, label: 'CSC' },    // Finland
    ];

    function project(lon, lat, rot) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + rot) * Math.PI / 180;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta);
      return { x: cx + x, y: cy - y, z: z, visible: z > 0 };
    }

    function drawFrame() {
      ctx.clearRect(0, 0, size, size);

      // Globe background circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#e8eef8';
      ctx.fill();

      // Grid lines (meridians)
      ctx.strokeStyle = 'rgba(0,49,127,0.07)';
      ctx.lineWidth = 0.5;
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = project(lon, lat, rotation);
          if (p.visible) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lon, lat, rotation);
          if (p.visible) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Data points
      points.forEach(pt => {
        const p = project(pt.lon, pt.lat, rotation);
        if (p.visible) {
          const alpha = 0.15 + 0.45 * (p.z / R);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,49,127,${alpha})`;
          ctx.fill();
        }
      });

      // Research centers (larger, with pulse)
      const pulse = 1 + 0.2 * Math.sin(Date.now() / 500);
      centers.forEach(c => {
        const p = project(c.lon, c.lat, rotation);
        if (p.visible) {
          // Outer glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,49,127,0.1)';
          ctx.fill();
          // Inner dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#00317f';
          ctx.fill();
          // Label
          ctx.font = '500 11px Urbanist, sans-serif';
          ctx.fillStyle = '#00317f';
          ctx.fillText(c.label, p.x + 10, p.y + 4);
        }
      });

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,49,127,0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      rotation += 0.12;
      requestAnimationFrame(drawFrame);
    }

    drawFrame();
  }

  /* ---------- COUNT UP ---------- */

  function initCountUp() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            const duration = 1200;
            const start = performance.now();
            function tick(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased);
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) observer.observe(statsBar);
  }

  /* ---------- RESOURCES ---------- */

  function initResources() {
    const grid = document.getElementById('resources-grid');
    const noResults = document.getElementById('no-results');
    if (!grid) return;

    let activeType = 'all';
    let activeModality = 'all';

    function renderResources() {
      const filtered = resources.filter(r => {
        if (activeType !== 'all' && r.type !== activeType) return false;
        if (activeModality !== 'all' && r.modality !== activeModality) return false;
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
      }

      noResults.style.display = 'none';
      grid.innerHTML = filtered.map(r => `
        <div class="resource-card">
          <div class="resource-tags">
            <span class="resource-tag tag-${r.type}">${r.type}</span>
            <span class="resource-tag tag-${r.modality}">${r.modality}</span>
          </div>
          <h3>${r.name}</h3>
          <p>${r.desc}</p>
          <div class="resource-meta">${r.params ? r.params + ' parameters · ' : ''}Released ${r.year}</div>
        </div>
      `).join('');
    }

    function setupFilters(containerId, setter) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.addEventListener('click', e => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        setter(chip.dataset.filter);
        renderResources();
      });
    }

    setupFilters('filter-type', v => { activeType = v; });
    setupFilters('filter-modality', v => { activeModality = v; });

    renderResources();
  }

  /* ---------- FAQ ---------- */

  function initFaq() {
    const list = document.getElementById('faq-list');
    const searchInput = document.getElementById('faq-search');
    const noResults = document.getElementById('faq-no-results');
    if (!list) return;

    function renderFaq(filter) {
      const term = (filter || '').toLowerCase().trim();
      const filtered = faqData.filter(f =>
        !term || f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)
      );

      if (filtered.length === 0) {
        list.innerHTML = '';
        noResults.style.display = 'block';
        return;
      }

      noResults.style.display = 'none';
      list.innerHTML = filtered.map((f, i) => `
        <div class="faq-item" data-index="${i}">
          <button class="faq-question" type="button">
            <span>${f.q}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">${f.a}</div>
          </div>
        </div>
      `).join('');
    }

    list.addEventListener('click', e => {
      const btn = e.target.closest('.faq-question');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      list.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => renderFaq(searchInput.value));
    }

    renderFaq('');
  }

  /* ---------- FORMS ---------- */

  function initForms() {
    // Newsletter
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
      nlForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = nlForm.querySelector('input[type="email"]').value;
        if (email) {
          nlForm.innerHTML = '<p style="font-weight:600;color:#00317f;">Thank you! You have been subscribed.</p>';
        }
      });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();

        // Honeypot check
        const honeypot = document.getElementById('contact-website');
        if (honeypot && honeypot.value) return;

        // Basic validation
        const name = document.getElementById('contact-name').value.trim();
        const org = document.getElementById('contact-org').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const interest = document.getElementById('contact-interest').value;
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !org || !email || !interest || !message) return;

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        // In production, this would POST to a server endpoint
        const mailto = 'ai-open-lab@bsc.es';
        const subject = encodeURIComponent(`AI Open Lab Contact: ${interest}`);
        const body = encodeURIComponent(`Name: ${name}\nOrganization: ${org}\nEmail: ${email}\nRole: ${document.getElementById('contact-role').value}\nInterest: ${interest}\n\nMessage:\n${message}`);
        window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;

        contactForm.reset();
        const btn = contactForm.querySelector('.btn-lg');
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.disabled = false;
        }, 3000);
      });
    }
  }

})();
