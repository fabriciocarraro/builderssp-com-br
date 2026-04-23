/* ======================================================
   The AI Open Lab — Application (v2 — Visual Overhaul)
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

    // Re-check scroll-based reveals after page switch
    requestAnimationFrame(() => {
      checkScrollReveals();
      checkTimeline();
      checkJoinCards();
    });
  }

  window.addEventListener('hashchange', () => showPage(getPage()));

  /* ---------- INIT ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    showPage(getPage());
    initHeader();
    initMobileMenu();
    initHeroParticles();
    initInfraCountUp();
    initCountUp();
    initResources();
    initFaq();
    initForms();
    initScrollReveals();
    initTimeline();
    initJoinParallax();
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

  /* ---------- HERO PARTICLES ---------- */

  function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(63, 166, 120, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(63, 166, 120, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }

  /* ---------- INFRASTRUCTURE DIAGRAM COUNT UP ---------- */

  function initInfraCountUp() {
    const nodes = document.querySelectorAll('.infra-node-count');
    if (!nodes.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.infra-node-count').forEach(el => {
            const target = parseInt(el.dataset.count, 10);
            const duration = 1500;
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

    const diagram = document.getElementById('infra-diagram');
    if (diagram) observer.observe(diagram);
  }

  /* ---------- COUNT UP ---------- */

  function initCountUp() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    function animateStats() {
      statsBar.querySelectorAll('.stat-number').forEach(el => {
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
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
        } else {
          // Reset numbers when the stats bar leaves the viewport so that
          // the animation replays on the next entry.
          statsBar.querySelectorAll('.stat-number').forEach(el => {
            el.textContent = '0';
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsBar);
  }

  /* ---------- SCROLL REVEAL ---------- */

  function checkScrollReveals() {
    document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('revealed');
      }
    });
  }

  function initScrollReveals() {
    window.addEventListener('scroll', checkScrollReveals, { passive: true });
    checkScrollReveals();
  }

  /* ---------- TIMELINE PROGRESSIVE REVEAL ---------- */

  function checkTimeline() {
    const timeline = document.getElementById('timeline');
    const progress = document.getElementById('timeline-progress');
    if (!timeline || !progress) return;

    const items = timeline.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const section = timeline.closest('.timeline-section');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Mobile / small screens: fall back to per-item viewport reveal (vertical).
    if (isMobile || !section) {
      const viewportHeight = window.innerHeight;
      let lastRevealedOffset = 0;
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.75) {
          if (!item.classList.contains('revealed')) {
            item.style.transitionDelay = '0.15s';
            item.classList.add('revealed');
          }
          lastRevealedOffset = rect.bottom - timeline.getBoundingClientRect().top;
        }
      });
      progress.style.width = '';
      progress.style.height = Math.min(lastRevealedOffset, timeline.scrollHeight) + 'px';
      return;
    }

    // Desktop: horizontal timeline driven by scroll progress through the
    // sticky-pinned section. Each item appears as the user scrolls one
    // viewport further through the section.
    const sectionRect = section.getBoundingClientRect();
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-sectionRect.top, 0), scrollableDistance);
    const rawProgress = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;

    // Reserve the first slice so only the first point is visible at the start,
    // then reveal the remaining items across the rest of the scroll range.
    const startThreshold = 0.08;
    const activeProgress = Math.max(0, (rawProgress - startThreshold) / (1 - startThreshold));
    const revealCount = 1 + Math.floor(activeProgress * items.length);

    items.forEach((item, index) => {
      if (index < revealCount) {
        if (!item.classList.contains('revealed')) {
          item.style.transitionDelay = (index === 0 ? 0 : 0.05) + 's';
          item.classList.add('revealed');
        }
      } else {
        item.classList.remove('revealed');
      }
    });

    // Horizontal progress line: stretches across revealed markers.
    const firstItem = items[0];
    const lastRevealed = items[Math.min(revealCount, items.length) - 1];
    if (firstItem && lastRevealed) {
      const timelineRect = timeline.getBoundingClientRect();
      const startRect = firstItem.getBoundingClientRect();
      const endRect = lastRevealed.getBoundingClientRect();
      const left = (startRect.left + startRect.width / 2) - timelineRect.left;
      const right = (endRect.left + endRect.width / 2) - timelineRect.left;
      progress.style.height = '';
      progress.style.left = left + 'px';
      progress.style.width = Math.max(0, right - left) + 'px';
    }
  }

  function initTimeline() {
    window.addEventListener('scroll', checkTimeline, { passive: true });
    window.addEventListener('resize', checkTimeline, { passive: true });
    checkTimeline();
  }

  /* ---------- JOIN PAGE — PARALLAX BACKGROUND & CARD REVEAL ---------- */

  function checkJoinCards() {
    const section = document.getElementById('join-benefits');
    if (!section) return;

    const cards = section.querySelectorAll('.join-card');
    const viewportHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.8) {
        if (!card.classList.contains('revealed')) {
          card.style.transitionDelay = (index * 0.15) + 's';
          card.classList.add('revealed');
        }
      }
    });

    // Parallax: shift background opacity based on scroll
    const bg = document.getElementById('join-benefits-bg');
    const title = document.getElementById('join-title');
    if (!bg) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const scrolled = Math.max(0, -sectionRect.top);
    const progress = Math.min(scrolled / (sectionHeight * 0.6), 1);

    // Fade the dark background as user scrolls down
    bg.style.opacity = 1 - progress * 0.7;

    // Shift title color from dark (top cream bg) to light (bottom navy bg)
    if (title) {
      const r = Math.round(17 + progress * (255 - 17));
      const g = Math.round(24 + progress * (255 - 24));
      const b = Math.round(39 + progress * (255 - 39));
      title.style.color = `rgb(${r}, ${g}, ${b})`;
    }
  }

  function initJoinParallax() {
    window.addEventListener('scroll', checkJoinCards, { passive: true });
    checkJoinCards();
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

  /* ---------- FAQ (multiple items can be open) ---------- */

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

      // Toggle individually — no longer closes others
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
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
          nlForm.innerHTML = '<p style="font-weight:600;color:var(--accent);">Thank you! You have been subscribed.</p>';
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
