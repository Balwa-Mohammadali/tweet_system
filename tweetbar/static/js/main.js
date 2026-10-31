/* =====================================================
   TWEETBAR — main.js
   Particles · Ripple · Typewriter · Interactions
   ===================================================== */

'use strict';

/* -------------------------------------------------------
   1. PARTICLE NETWORK BACKGROUND
------------------------------------------------------- */
(function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, animId;
  const COLORS = ['#1d9bf0', '#794bc4', '#1d9bf0', '#5b9cf6'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.vx   = (Math.random() - 0.5) * 0.38;
    this.vy   = (Math.random() - 0.5) * 0.38;
    this.r    = Math.random() * 1.6 + 0.4;
    this.a    = Math.random() * 0.45 + 0.08;
    this.c    = COLORS[Math.floor(Math.random() * COLORS.length)];
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };

  function initArr() {
    const n = Math.min(Math.floor((W * H) / 11000), 110);
    particles = Array.from({ length: n }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw dots
    particles.forEach(p => {
      p.update();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = p.a;
      ctx.fill();
    });

    // Draw lines between nearby particles
    ctx.globalAlpha = 1;
    const DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          const alpha = (1 - dist / DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(29,155,240,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  resize();
  initArr();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initArr();
    }, 200);
  });
})();

/* -------------------------------------------------------
   2. NAVBAR SCROLL SHADOW
------------------------------------------------------- */
(function initNavScroll() {
  const nav = document.querySelector('.tb-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
})();

/* -------------------------------------------------------
   3. RIPPLE EFFECT ON INTERACTIVE ELEMENTS
------------------------------------------------------- */
(function initRipple() {
  const SELECTORS = '.tb-submit, .tb-compose-btn, .tb-hero-btn-primary, .tb-hero-btn-secondary, .tb-btn-del, .tb-btn-cancel, .tb-compose-btn';

  document.addEventListener('click', e => {
    const target = e.target.closest(SELECTORS);
    if (!target) return;

    const rect   = target.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');

    Object.assign(ripple.style, {
      position: 'absolute',
      width:    size + 'px',
      height:   size + 'px',
      left:     (e.clientX - rect.left - size / 2) + 'px',
      top:      (e.clientY - rect.top  - size / 2) + 'px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.22)',
      transform: 'scale(0)',
      animation: 'tb-ripple 0.6s linear',
      pointerEvents: 'none',
    });

    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
})();

/* -------------------------------------------------------
   4. TYPEWRITER EFFECT (hero page)
------------------------------------------------------- */
(function initTypewriter() {
  const el = document.getElementById('tb-typewriter');
  if (!el) return;

  const words   = ['Thoughts', 'Ideas', 'Stories', 'Moments', 'Dreams'];
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi % words.length];
    el.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);

    let delay = deleting ? 55 : 95;

    if (!deleting && ci === word.length) {
      delay     = 1800;
      deleting  = true;
    } else if (deleting && ci === 0) {
      deleting  = false;
      wi++;
      delay     = 350;
    }
    setTimeout(type, delay);
  }
  type();
})();

/* -------------------------------------------------------
   5. CHARACTER COUNTER FOR TWEET TEXTAREA
------------------------------------------------------- */
(function initCharCounter() {
  const MAX = 240;
  // Find the tweet text textarea (name="text")
  const ta = document.querySelector('textarea[name="text"]');
  if (!ta) return;

  const counter = document.createElement('div');
  counter.className = 'tb-char-count';
  ta.parentNode.insertBefore(counter, ta.nextSibling);

  function update() {
    const len  = ta.value.length;
    const left = MAX - len;
    counter.textContent = `${len} / ${MAX}`;
    counter.className   = 'tb-char-count';
    if (left < 40) counter.classList.add('warn');
    if (left < 0)  { counter.classList.remove('warn'); counter.classList.add('over'); }
  }

  ta.addEventListener('input', update);
  update();
})();

/* -------------------------------------------------------
   6. IMAGE UPLOAD PREVIEW + DRAG & DROP
------------------------------------------------------- */
(function initUpload() {
  const zone   = document.querySelector('.tb-upload');
  const input  = zone && zone.querySelector('input[type="file"]');
  const preview = document.getElementById('tb-img-preview');
  if (!zone || !input) return;

  function showPreview(file) {
    if (!file || !preview) return;
    const reader = new FileReader();
    reader.onload = e => {
      preview.src   = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  input.addEventListener('change', () => showPreview(input.files[0]));

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    showPreview(file);
  });
})();

/* -------------------------------------------------------
   7. TWEET CARD SCROLL REVEAL (IntersectionObserver)
------------------------------------------------------- */
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const cards = document.querySelectorAll('.tb-tweet');
  if (!cards.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(c => io.observe(c));
})();

/* -------------------------------------------------------
   8. LIKE BUTTON ANIMATION
------------------------------------------------------- */
window.tbLike = function (btn) {
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    btn.style.transform = 'scale(1.45)';
    setTimeout(() => { btn.style.transform = ''; }, 350);
  }
};

/* -------------------------------------------------------
   9. AUTO-STYLE DJANGO FORM WIDGETS
   (adds .tb-input class to all raw inputs/textareas/selects)
------------------------------------------------------- */
(function styleWidgets() {
  document.querySelectorAll(
    '.tb-form-card input:not([type="file"]):not([type="submit"]):not([type="checkbox"]),' +
    '.tb-form-card textarea,' +
    '.tb-form-card select,' +
    '.tb-compose-card input:not([type="file"]):not([type="submit"]),' +
    '.tb-compose-card textarea'
  ).forEach(el => el.classList.add('tb-input'));
})();
