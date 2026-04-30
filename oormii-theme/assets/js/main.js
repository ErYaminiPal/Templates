/* ===========================================================
   OORMII JEWELS — shared site JS
   Handles: loader, cursor, scroll, reveal, cart, search,
   testimonials, FAQ, tabs, parallax, particles, etc.
   =========================================================== */

(() => {
  'use strict';

  /* ---------- LOADER ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1400);
  });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursor && cursorRing && window.matchMedia('(min-width: 801px)').matches) {
    let cx = 0, cy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    }, { passive: true });
    (function animRing() {
      rx += (cx - rx) * 0.14;
      ry += (cy - ry) * 0.14;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    const hoverTargets = 'a, button, .product-card, .cat-card, .ig-item, .blog-card, .team-card, .faq-item, .tab-btn, .filter-option, label, input, select, textarea, [data-cursor]';
    const attachCursor = el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
        if (el.matches('input, textarea, select')) {
          cursor.classList.add('text');
          cursorRing.classList.add('text');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover', 'text');
        cursorRing.classList.remove('hover', 'text');
      });
    };
    document.querySelectorAll(hoverTargets).forEach(attachCursor);

    // Re-bind for elements added later (lightweight observer)
    const mo = new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.matches?.(hoverTargets)) attachCursor(n);
        n.querySelectorAll?.(hoverTargets).forEach(attachCursor);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = ''; cursorRing.style.opacity = ''; });
  }

  /* ---------- SCROLL PROGRESS + NAV ---------- */
  const scrollBar = document.getElementById('scroll-bar');
  const mainNav = document.querySelector('nav.main-nav');
  const backToTop = document.getElementById('back-to-top');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const s = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar) scrollBar.style.width = (s / h * 100) + '%';
    if (mainNav && !mainNav.classList.contains('solid')) {
      mainNav.classList.toggle('scrolled', s > 60);
    }
    if (backToTop) backToTop.classList.toggle('show', s > 600);
    lastScroll = s;
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- HERO SLIDER ---------- */
  let currentSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length) {
    window.goToSlide = function (n) {
      slides[currentSlide]?.classList.remove('active');
      dots[currentSlide]?.classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide]?.classList.add('active');
    };
    setInterval(() => window.goToSlide(currentSlide + 1), 5500);
  }

  /* ---------- PARTICLE CANVAS ---------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 40;
        this.size = Math.random() * 1.8 + 0.5;
        this.opacity = Math.random() * 0.55 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = -Math.random() * 0.55 - 0.1;
        this.life = Math.random() * 220 + 100;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.life--;
        if (this.life <= 0 || this.y < -20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${this.opacity})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < 70; i++) particles.push(new Particle());
    (function animParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animParticles);
    })();
  }

  /* ---------- SCROLL REVEAL ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.stagger,.split-text-reveal').forEach(el => observer.observe(el));

  /* ---------- SPLIT TEXT ---------- */
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = text.split(' ').map(w =>
      `<span class="word"><span style="display:inline-block">${w}</span></span>`
    ).join(' ');
    el.classList.add('split-text-reveal');
    observer.observe(el);
  });

  /* ---------- COUNTER ANIMATION ---------- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || 0, 10);
    const duration = 1800;
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const v = target * (1 - Math.pow(1 - p, 3));
          el.textContent = v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counterObs.observe(el);
  });

  /* ---------- MOBILE NAV ---------- */
  let navOpen = false;
  window.toggleNav = function () {
    const mn = document.getElementById('mobile-nav');
    const h = document.getElementById('hamburger');
    if (!mn || !h) return;
    navOpen = !navOpen;
    mn.classList.toggle('open', navOpen);
    document.body.style.overflow = navOpen ? 'hidden' : '';
    if (navOpen) {
      h.children[0].style.transform = 'rotate(45deg) translate(4px,4px)';
      h.children[1].style.opacity = '0';
      h.children[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
    } else {
      h.children[0].style.transform = '';
      h.children[1].style.opacity = '';
      h.children[2].style.transform = '';
    }
  };

  /* ---------- CART ---------- */
  let cartCount = parseInt(localStorage.getItem('oormii-cart') || '0', 10);
  const cartCountEl = document.querySelector('.cart-count');
  if (cartCountEl) cartCountEl.textContent = cartCount;

  window.openCart = function () {
    document.getElementById('cart-drawer')?.classList.add('open');
    document.getElementById('drawer-overlay')?.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  window.closeCart = function () {
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('drawer-overlay')?.classList.remove('show');
    document.body.style.overflow = '';
  };
  window.addToCart = function (name, price) {
    cartCount++;
    localStorage.setItem('oormii-cart', cartCount);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount);
    showToast(`◆  ${name} added to bag`);
  };

  /* ---------- TOAST ---------- */
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => t.classList.remove('show'), 2800);
  }
  window.showToast = showToast;

  /* ---------- SEARCH ---------- */
  window.openSearch = function () {
    document.getElementById('search-overlay')?.classList.add('open');
    setTimeout(() => document.getElementById('search-input')?.focus(), 250);
  };
  window.closeSearch = function () {
    document.getElementById('search-overlay')?.classList.remove('open');
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSearch?.(); closeCart?.(); closeVideo?.();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch?.();
    }
  });

  /* ---------- TESTIMONIALS ---------- */
  const testTrack = document.getElementById('test-track');
  if (testTrack) {
    let testPos = 0;
    const visibleCount = window.matchMedia('(max-width: 800px)').matches ? 1 : 3;
    const move = (dir) => {
      const cardW = testTrack.firstElementChild.offsetWidth + 32;
      const maxPos = Math.max(0, testTrack.children.length - visibleCount);
      testPos = Math.max(0, Math.min(maxPos, testPos + dir));
      testTrack.style.transform = `translateX(-${testPos * cardW}px)`;
    };
    window.moveTest = move;
    setInterval(() => {
      const maxPos = Math.max(0, testTrack.children.length - visibleCount);
      const cardW = testTrack.firstElementChild.offsetWidth + 32;
      testPos = testPos >= maxPos ? 0 : testPos + 1;
      testTrack.style.transform = `translateX(-${testPos * cardW}px)`;
    }, 5500);
  }

  /* ---------- NEW ARRIVALS FILTER ---------- */
  window.filterNA = function (type, btn) {
    document.querySelectorAll('.na-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('#na-grid .product-card').forEach(card => {
      const show = type === 'all' || card.dataset.type === type;
      card.style.display = show ? '' : 'none';
      card.style.opacity = '0';
      if (show) setTimeout(() => card.style.opacity = '1', 60);
    });
  };

  /* ---------- VIDEO MODAL ---------- */
  window.openVideo = function (url) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (!modal || !iframe) return;
    modal.classList.add('open');
    iframe.src = url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
    document.body.style.overflow = 'hidden';
  };
  window.closeVideo = function () {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (!modal || !iframe) return;
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  };

  /* ---------- NEWSLETTER ---------- */
  window.subscribeNewsletter = function () {
    const input = document.getElementById('nl-email');
    if (!input) return;
    const email = input.value;
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Welcome! Check your email for 10% off code.');
      input.value = '';
    } else {
      showToast('Please enter a valid email address');
    }
  };

  /* ---------- PARALLAX HERO ---------- */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * 0.22}px)`;
        heroContent.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.7));
      }
    }, { passive: true });
  }

  /* ---------- WISHLIST ---------- */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    e.stopPropagation();
    e.preventDefault();
    const filled = btn.dataset.filled === '1';
    btn.dataset.filled = filled ? '0' : '1';
    btn.textContent = filled ? '♡' : '♥';
    btn.style.color = filled ? '' : '#e88888';
    showToast(filled ? 'Removed from wishlist' : '♥ Added to wishlist');
  });

  /* ---------- FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* FAQ category filter */
  document.querySelectorAll('.faq-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      document.querySelectorAll('.faq-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  /* ---------- BLOG CATEGORY FILTER ---------- */
  document.querySelectorAll('.blog-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.blog-listing-grid .blog-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- PRODUCT TABS ---------- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* ---------- PRODUCT GALLERY THUMBS ---------- */
  document.querySelectorAll('.product-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = thumb.querySelector('img')?.src;
      if (!img) return;
      const main = document.querySelector('.product-main-img img');
      if (main) main.src = img;
      thumb.parentElement.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  /* ---------- PRODUCT QUANTITY ---------- */
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const input = ctrl.querySelector('input');
    const btns = ctrl.querySelectorAll('button');
    btns[0]?.addEventListener('click', () => { input.value = Math.max(1, parseInt(input.value || '1', 10) - 1); });
    btns[1]?.addEventListener('click', () => { input.value = parseInt(input.value || '1', 10) + 1; });
  });

  /* ---------- PRODUCT OPTIONS ---------- */
  document.querySelectorAll('.option-swatches').forEach(group => {
    group.querySelectorAll('.option-swatch').forEach(s => {
      s.addEventListener('click', () => {
        group.querySelectorAll('.option-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
      });
    });
  });

  /* ---------- AUTH TABS ---------- */
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tab.parentElement.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.auth-form').forEach(f => f.style.display = 'none');
      const form = document.getElementById(target);
      if (form) form.style.display = '';
    });
  });

  /* ---------- FILTER COLLAPSE ---------- */
  document.querySelectorAll('.filter-title').forEach(t => {
    t.addEventListener('click', () => t.parentElement.classList.toggle('collapsed'));
  });

  /* ---------- SHOP GRID/LIST TOGGLE ---------- */
  document.querySelectorAll('.shop-grid-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('.shop-grid-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector('.shop-products-grid')?.classList.toggle('list-view', view === 'list');
    });
  });

  /* ---------- TILT EFFECT ---------- */
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - .5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - .5) * 2;
      el.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ---------- IMAGE LAZY LOAD ---------- */
  document.querySelectorAll('img[data-src]').forEach(img => {
    const lazy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          lazy.unobserve(img);
        }
      });
    });
    lazy.observe(img);
  });

  /* ---------- STRUCTURED DATA ---------- */
  if (!document.querySelector('script[type="application/ld+json"]')) {
    const ldJSON = {
      "@context": "https://schema.org",
      "@type": "JewelryStore",
      "name": "Oormii Jewels",
      "url": "https://www.oormiijewels.in",
      "description": "Premium handcrafted jewellery — earrings, necklaces, bracelets & rings. Anti-tarnish 925 silver.",
      "logo": "https://www.oormiijewels.in/cdn/shop/files/Tear_Drop_Pendant_Necklace.png",
      "sameAs": [
        "https://www.instagram.com/oormii_jewels",
        "https://www.facebook.com/oormiijewel",
        "https://www.youtube.com/@OORMII_Jewels"
      ],
      "address": { "@type": "PostalAddress", "addressCountry": "IN" }
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ldJSON);
    document.head.appendChild(s);
  }

  /* =========================================================
     2026 TRENDS · grain · lenis · magnetic · quick-view · 3D ·
     AR try-on · sticky ATC · recently viewed · wishlist sync
     ========================================================= */

  /* ---------- IMAGE ERROR FALLBACK ---------- */
  // Any <img> that fails to load is swapped with an on-brand placeholder.
  // Useful if a CDN goes down or you swap default images for your own.
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName !== 'IMG' || img.dataset.fallback) return;
    img.dataset.fallback = '1';
    const w = Math.max(img.naturalWidth || 600, 400);
    const h = Math.max(img.naturalHeight || 800, 300);
    img.src = `https://placehold.co/${w}x${h}/0d0e11/c9a96e?text=Oormii&font=playfair`;
  }, true);

  /* ---------- GRAIN OVERLAY ---------- */
  if (!document.querySelector('.grain')) {
    const g = document.createElement('div');
    g.className = 'grain';
    document.body.appendChild(g);
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  document.querySelectorAll('.btn-primary, .btn-ghost, .play-btn, .test-btn, .nav-actions button, .nav-actions a').forEach(btn => {
    if (btn.closest('#sticky-atc, #ar-modal, #quickview-modal, #cart-drawer')) return;
    btn.classList.add('magnetic');
    const strength = 0.35;
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---------- QUICK VIEW ---------- */
  // Inject quick-view buttons into product cards
  document.querySelectorAll('.product-card .product-img-wrap').forEach(wrap => {
    if (wrap.querySelector('.quickview-btn')) return;
    const card = wrap.closest('.product-card');
    const name = card.querySelector('.product-name')?.textContent.trim();
    const price = card.querySelector('.product-price')?.textContent.trim();
    const img = wrap.querySelector('img:not(.product-img-back)')?.src;
    const btn = document.createElement('button');
    btn.className = 'quickview-btn';
    btn.title = 'Quick view';
    btn.innerHTML = '⌕';
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      openQuickView({ name, price, img });
    });
    wrap.appendChild(btn);
  });

  function ensureQuickViewModal() {
    if (document.getElementById('quickview-modal')) return;
    const m = document.createElement('div');
    m.id = 'quickview-modal';
    m.innerHTML = `
      <div class="qv-content">
        <div class="qv-img"><img id="qv-img" src="" alt=""></div>
        <div class="qv-info">
          <p class="product-tag" id="qv-tag">Necklaces</p>
          <h2 id="qv-name"></h2>
          <p class="product-rating" style="margin-bottom:.8rem">★★★★★ <span style="font-family:var(--font-sans);font-size:.65rem;color:rgba(250,246,240,.45);letter-spacing:.12em">  128 reviews</span></p>
          <p class="qv-price" id="qv-price"></p>
          <p class="qv-desc">A delicate piece in 925 sterling silver, sealed with our signature anti-tarnish layer. Designed to be worn every day, treasured forever.</p>
          <div class="product-options">
            <div class="option-group">
              <span class="option-label">Finish</span>
              <div class="option-swatches"><button class="option-swatch active">Silver</button><button class="option-swatch">Gold</button><button class="option-swatch">Rose</button></div>
            </div>
          </div>
          <div class="product-cta-row">
            <button class="btn-primary" id="qv-add" style="flex:1;justify-content:center">Add to Bag</button>
            <button class="btn-icon wishlist-btn">♡</button>
          </div>
          <a href="product.html" class="btn-link" style="margin-top:1rem">View full details →</a>
        </div>
        <button class="qv-close" onclick="closeQuickView()">×</button>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) closeQuickView(); });
    m.querySelectorAll('.option-swatch').forEach(s => {
      s.addEventListener('click', () => {
        s.parentElement.querySelectorAll('.option-swatch').forEach(x => x.classList.remove('active'));
        s.classList.add('active');
      });
    });
  }

  function openQuickView(p) {
    ensureQuickViewModal();
    const m = document.getElementById('quickview-modal');
    document.getElementById('qv-name').textContent = p.name;
    document.getElementById('qv-price').textContent = p.price;
    document.getElementById('qv-img').src = p.img || '';
    document.getElementById('qv-add').onclick = () => { addToCart(p.name, p.price); closeQuickView(); };
    requestAnimationFrame(() => m.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  window.openQuickView = openQuickView;
  window.closeQuickView = function () {
    document.getElementById('quickview-modal')?.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ---------- STICKY ADD-TO-BAG (product page) ---------- */
  (function setupStickyATC() {
    const pdpTitle = document.querySelector('.product-info-detail .product-title-detail');
    const pdpImg = document.querySelector('.product-main-img img');
    const pdpPrice = document.querySelector('.product-price-detail');
    const pdpAddBtn = document.querySelector('.product-cta-row .btn-primary');
    if (!pdpTitle || !pdpImg || !pdpPrice || !pdpAddBtn) return;
    const bar = document.createElement('div');
    bar.id = 'sticky-atc';
    bar.innerHTML = `
      <div class="sticky-atc-info">
        <div class="sticky-atc-thumb"><img src="${pdpImg.src}" alt=""></div>
        <div style="min-width:0">
          <div class="sticky-atc-name">${pdpTitle.textContent}</div>
          <div class="sticky-atc-price">${pdpPrice.textContent.replace(/Save.*$/, '').trim()}</div>
        </div>
      </div>
      <div class="sticky-atc-actions">
        <button class="btn-ghost" onclick="document.querySelector('.product-info-detail').scrollIntoView({behavior:'smooth',block:'center'})">View Options</button>
        <button class="btn-primary">Add to Bag</button>
      </div>`;
    document.body.appendChild(bar);
    bar.querySelector('.btn-primary').addEventListener('click', () => {
      addToCart(pdpTitle.textContent, pdpPrice.textContent.replace(/Save.*$/, '').trim());
    });

    const trigger = pdpAddBtn.getBoundingClientRect ? pdpAddBtn : null;
    const checkVisible = () => {
      if (!trigger) return;
      const rect = pdpAddBtn.getBoundingClientRect();
      // Show when the main ATC button has scrolled out of view (above viewport)
      bar.classList.toggle('show', rect.bottom < 0);
    };
    window.addEventListener('scroll', checkVisible, { passive: true });
    checkVisible();
  })();

  /* ---------- 3D VIEWER (Three.js, lazy-loaded) ---------- */
  window.initViewer3D = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container || container.dataset.inited) return;
    container.dataset.inited = '1';
    const loadThree = () => new Promise(resolve => {
      if (window.THREE) return resolve(window.THREE);
      const s = document.createElement('script');
      s.src = 'https://unpkg.com/three@0.160.0/build/three.min.js';
      s.onload = () => resolve(window.THREE);
      document.head.appendChild(s);
    });
    loadThree().then(THREE => {
      const w = container.clientWidth;
      const h = container.clientHeight || w;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
      camera.position.set(0, 0, 5.5);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      container.appendChild(renderer.domElement);

      // procedural gem geometry — octahedron extruded
      const geo = new THREE.OctahedronGeometry(1.4, 0);
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xc9a96e,
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.5,
        flatShading: true
      });
      const gem = new THREE.Mesh(geo, mat);
      scene.add(gem);

      // ring around the gem
      const ringGeo = new THREE.TorusGeometry(2.1, 0.05, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xe8d5b0, metalness: 1, roughness: 0.25 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);

      // lights
      const key = new THREE.DirectionalLight(0xfff0d4, 1.6); key.position.set(5, 5, 4); scene.add(key);
      const fill = new THREE.DirectionalLight(0xc9a96e, 0.7); fill.position.set(-4, -2, 3); scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.5); rim.position.set(0, -4, -3); scene.add(rim);
      scene.add(new THREE.AmbientLight(0x331a08, 0.4));

      // interaction
      let dragging = false, lastX = 0, lastY = 0;
      let rotX = 0, rotY = 0, autoRot = true;
      const dom = renderer.domElement;
      dom.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; autoRot = false; });
      window.addEventListener('pointerup', () => { dragging = false; setTimeout(() => autoRot = true, 1800); });
      window.addEventListener('pointermove', e => {
        if (!dragging) return;
        rotY += (e.clientX - lastX) * 0.01;
        rotX += (e.clientY - lastY) * 0.01;
        lastX = e.clientX; lastY = e.clientY;
      });

      const resize = () => {
        const ww = container.clientWidth, hh = container.clientHeight || ww;
        renderer.setSize(ww, hh);
        camera.aspect = ww / hh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', resize);

      const animate = () => {
        if (autoRot) { rotY += 0.005; rotX += 0.001; }
        gem.rotation.x = rotX;
        gem.rotation.y = rotY;
        ring.rotation.z += 0.003;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    });
  };

  /* ---------- VIEWER TABS (image / 3D / AR) ---------- */
  document.querySelectorAll('.viewer-tabs').forEach(tabs => {
    tabs.querySelectorAll('.viewer-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.viewer;
        tabs.querySelectorAll('.viewer-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.viewer-pane').forEach(p => p.classList.remove('active'));
        const pane = document.getElementById('viewer-pane-' + target);
        pane?.classList.add('active');
        if (target === '3d') window.initViewer3D?.('viewer-3d-canvas');
        if (target === 'ar') window.openAR?.();
      });
    });
  });

  /* ---------- AR TRY-ON ---------- */
  window.openAR = function () {
    const m = document.getElementById('ar-modal') || createARModal();
    m.classList.add('open');
    startARStream();
  };
  window.closeAR = function () {
    document.getElementById('ar-modal')?.classList.remove('open');
    stopARStream();
  };

  function createARModal() {
    const m = document.createElement('div');
    m.id = 'ar-modal';
    m.innerHTML = `
      <div class="ar-header">
        <h3>Virtual <em>Try-On</em></h3>
        <button class="ar-close" onclick="closeAR()">×</button>
      </div>
      <div class="ar-stage">
        <video class="ar-video" id="ar-video" autoplay playsinline muted></video>
        <div class="ar-overlay"><canvas id="ar-canvas"></canvas></div>
        <p class="ar-status" id="ar-status">◆ Asking for camera permission…</p>
      </div>
      <div class="ar-controls">
        <span class="ar-product-pill" id="ar-pill">◆ Tear Drop Pendant</span>
        <div class="ar-actions">
          <button class="ar-snap" onclick="captureAR()" title="Capture"></button>
        </div>
      </div>`;
    document.body.appendChild(m);
    return m;
  }

  let arStream = null;
  let arRaf = null;
  function startARStream() {
    const video = document.getElementById('ar-video');
    const status = document.getElementById('ar-status');
    if (!navigator.mediaDevices?.getUserMedia) {
      status.textContent = 'Camera not available on this device';
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 1280, height: 720 } })
      .then(stream => {
        arStream = stream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          status.classList.add('hidden');
          drawARLoop();
        };
      })
      .catch(() => {
        status.textContent = 'Camera permission denied. Try again with camera access enabled.';
      });
  }
  function stopARStream() {
    if (arStream) { arStream.getTracks().forEach(t => t.stop()); arStream = null; }
    if (arRaf) cancelAnimationFrame(arRaf);
  }
  function drawARLoop() {
    const video = document.getElementById('ar-video');
    const canvas = document.getElementById('ar-canvas');
    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');
    const fit = () => {
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
    };
    fit();
    const productImg = document.querySelector('.product-main-img img')?.src
      || 'https://www.oormiijewels.in/cdn/shop/files/Tear_Drop_Pendant_Necklace.png?v=1757605328&width=400';
    const overlay = new Image();
    overlay.crossOrigin = 'anonymous';
    overlay.src = productImg;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Stub overlay placement: two earring positions estimated from face-area heuristic
      // Real implementation would use MediaPipe FaceLandmarker — this is a UX placeholder.
      const w = canvas.width, h = canvas.height;
      const earSize = w * 0.13;
      const cx = w * 0.5;
      const cy = h * 0.55;
      const earOffsetX = w * 0.13;
      const earOffsetY = h * 0.04;
      if (overlay.complete && overlay.naturalWidth) {
        ctx.globalAlpha = 0.92;
        ctx.drawImage(overlay, cx - earOffsetX - earSize / 2, cy + earOffsetY, earSize, earSize);
        ctx.drawImage(overlay, cx + earOffsetX - earSize / 2, cy + earOffsetY, earSize, earSize);
        ctx.globalAlpha = 1;
      }
      // crosshair markers (subtle)
      ctx.strokeStyle = 'rgba(201,169,110,0.5)';
      ctx.lineWidth = 1.5;
      [-earOffsetX, earOffsetX].forEach(dx => {
        ctx.beginPath();
        ctx.arc(cx + dx, cy + earOffsetY, 14, 0, Math.PI * 2);
        ctx.stroke();
      });
      arRaf = requestAnimationFrame(draw);
    };
    draw();
  }
  window.captureAR = function () {
    const video = document.getElementById('ar-video');
    const canvas = document.getElementById('ar-canvas');
    if (!video) return;
    const out = document.createElement('canvas');
    out.width = video.videoWidth; out.height = video.videoHeight;
    const ctx = out.getContext('2d');
    ctx.translate(out.width, 0); ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (canvas) ctx.drawImage(canvas, 0, 0);
    out.toBlob(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'oormii-tryon.png';
      a.click();
      showToast('◆ Snapshot saved');
    });
  };

  /* ---------- BUNDLE BUILDER ---------- */
  const bundleGrid = document.querySelector('.bundle-grid');
  if (bundleGrid) {
    const items = bundleGrid.querySelectorAll('.bundle-item');
    const totalEl = bundleGrid.querySelector('.bundle-total');
    const saveEl = bundleGrid.querySelector('.bundle-save');
    const recalc = () => {
      let total = 0;
      items.forEach(it => {
        const cb = it.querySelector('input');
        const priceText = it.querySelector('p')?.textContent || '0';
        const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
        it.classList.toggle('selected', cb.checked);
        if (cb.checked) total += price;
      });
      const discounted = Math.round(total * 0.85);
      const saved = total - discounted;
      if (totalEl) totalEl.textContent = '₹' + discounted.toLocaleString('en-IN');
      if (saveEl) saveEl.textContent = 'You Save ₹' + saved.toLocaleString('en-IN');
    };
    items.forEach(it => it.querySelector('input').addEventListener('change', recalc));
    recalc();
  }

  /* ---------- RECENTLY VIEWED ---------- */
  const RV_KEY = 'oormii-recent';
  function getRecent() { try { return JSON.parse(localStorage.getItem(RV_KEY) || '[]'); } catch { return []; } }
  function pushRecent(item) {
    let list = getRecent().filter(x => x.name !== item.name);
    list.unshift(item);
    list = list.slice(0, 8);
    localStorage.setItem(RV_KEY, JSON.stringify(list));
  }
  // Track on PDP
  const pdpName = document.querySelector('.product-title-detail')?.textContent.trim();
  if (pdpName) {
    const img = document.querySelector('.product-main-img img')?.src;
    const price = document.querySelector('.product-price-detail')?.textContent.trim().replace(/Save.*$/, '').trim();
    pushRecent({ name: pdpName, img, price, url: 'product.html' });
  }
  // Track on quick-view open too
  const _origOQ = window.openQuickView;
  window.openQuickView = function (p) {
    if (p.name) pushRecent({ name: p.name, img: p.img, price: p.price, url: 'product.html' });
    _origOQ(p);
  };

  // Render recently viewed strip if a placeholder exists
  const rvHost = document.getElementById('recently-viewed-grid');
  if (rvHost) {
    const list = getRecent();
    if (list.length === 0) {
      rvHost.parentElement.style.display = 'none';
    } else {
      rvHost.innerHTML = list.map(it => `
        <a href="${it.url || 'product.html'}" class="rv-card">
          <img src="${it.img}" alt="">
          <div class="rv-card-overlay">
            <span class="rv-card-name">${it.name}</span>
            <span class="rv-card-price">${it.price || ''}</span>
          </div>
        </a>`).join('');
    }
  }

  /* ---------- INJECT WISHLIST NAV LINK (every page) ---------- */
  document.querySelectorAll('.nav-actions').forEach(actions => {
    if (actions.querySelector('.wishlist-nav')) return;
    const cartBtn = actions.querySelector('button[onclick*="openCart"]');
    const link = document.createElement('a');
    link.href = 'wishlist.html';
    link.className = 'wishlist-nav';
    link.title = 'Wishlist';
    link.innerHTML = '♡<span class="wishlist-count" style="background:var(--gold);color:var(--ink);font-size:.58rem;font-weight:600;padding:1px 5px;border-radius:10px;margin-left:-6px;margin-top:-14px;display:none;min-width:16px;text-align:center"></span>';
    if (cartBtn) actions.insertBefore(link, cartBtn);
    else actions.appendChild(link);
  });

  /* ---------- WISHLIST PERSISTENCE ---------- */
  const WL_KEY = 'oormii-wishlist';
  function getWL() { try { return JSON.parse(localStorage.getItem(WL_KEY) || '[]'); } catch { return []; } }
  function setWL(list) { localStorage.setItem(WL_KEY, JSON.stringify(list)); updateWLBadge(); }
  function updateWLBadge() {
    const c = getWL().length;
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = c;
      el.style.display = c > 0 ? '' : 'none';
    });
  }
  updateWLBadge();

  // Wire wishlist hearts to persistence
  document.querySelectorAll('.product-card .wishlist-btn').forEach(btn => {
    const card = btn.closest('.product-card');
    const name = card?.querySelector('.product-name')?.textContent.trim();
    if (!name) return;
    const inList = getWL().some(x => x.name === name);
    if (inList) { btn.dataset.filled = '1'; btn.textContent = '♥'; btn.style.color = '#e88888'; }
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      let list = getWL();
      const has = list.some(x => x.name === name);
      if (has) {
        list = list.filter(x => x.name !== name);
      } else {
        const img = card.querySelector('.product-img-wrap img')?.src;
        const price = card.querySelector('.product-price')?.textContent.trim();
        list.push({ name, img, price, url: 'product.html' });
      }
      setWL(list);
    });
  });

  // Render wishlist page items if grid present
  const wlGrid = document.getElementById('wishlist-grid');
  if (wlGrid) {
    const list = getWL();
    if (list.length === 0) {
      wlGrid.parentElement.querySelector('.wishlist-empty')?.classList.remove('hidden-init');
    } else {
      wlGrid.parentElement.querySelector('.wishlist-empty')?.remove();
      wlGrid.innerHTML = list.map(it => `
        <a href="${it.url || 'product.html'}" class="product-card">
          <div class="product-img-wrap">
            <img src="${it.img}" alt="${it.name}">
            <div class="product-actions">
              <button onclick="event.preventDefault();addToCart('${it.name.replace(/'/g, "\\'")}','${it.price || ''}')">Add to Bag</button>
              <button class="wishlist-btn" data-filled="1" style="color:#e88">♥</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">${it.name}</h3>
            <p class="product-price">${it.price || ''}</p>
          </div>
        </a>`).join('');
    }
  }
})();
