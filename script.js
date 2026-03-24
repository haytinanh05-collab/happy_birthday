document.addEventListener('DOMContentLoaded', () => {
  // Loading page script
  const bar = document.getElementById('bar');
  const heart = document.getElementById('heart');
  if (bar && heart) {
    let pct = 0;
    const interval = setInterval(() => {
      pct += 1;
      if (pct > 100) { clearInterval(interval); setTimeout(() => { window.location.href = 'main.html'; }, 500); return; }
      bar.style.width = pct + '%';
      const container = document.querySelector('.loader-wrap');
      if (!container) return;
      const max = container.clientWidth;
      heart.style.left = `calc(${pct}% + ${Math.min(16, max * 0.01)}px)`;
    }, 60);
  }

  // Main page script
  const slides = document.getElementById('slides');
  if (slides) {
    const total = slides.children.length;
    let idx = 0;
    const setSlide = () => { slides.style.transform = `translateX(-${idx * 100}%)`; };
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slideInterval = 2000;
    let autoPlay = setInterval(() => { idx = (idx + 1) % total; setSlide(); }, slideInterval);

    const restartAutoPlay = () => {
      clearInterval(autoPlay);
      autoPlay = setInterval(() => { idx = (idx + 1) % total; setSlide(); }, slideInterval);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { idx = (idx - 1 + total) % total; setSlide(); restartAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { idx = (idx + 1) % total; setSlide(); restartAutoPlay(); });

    const sliderEl = document.getElementById('slider');
    if (sliderEl) {
      sliderEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
      sliderEl.addEventListener('mouseleave', () => restartAutoPlay());
    }

    const createHeart = () => {
      const h = document.createElement('div');
      h.className = 'heart-drift';
      h.style.left = '55px';
      h.style.bottom = '90px';
      document.body.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transition = 'transform 1.2s ease-out, opacity 1.2s ease-out';
        h.style.opacity = '1';
        h.style.transform = 'translate(-14px, -120px) scale(1.2)';
      });
      setTimeout(() => h.remove(), 1300);
    };

    const bus = document.getElementById('bus');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    const ctaBtn = document.getElementById('ctaBtn');

    if (bus && overlay && closeBtn) {
      const openModal = () => {
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        for (let i = 0; i < 4; i++) setTimeout(createHeart, i * 180);
      };

      bus.addEventListener('click', openModal);
      if (ctaBtn) ctaBtn.addEventListener('click', openModal);

      closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
      });

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          overlay.classList.remove('active');
          overlay.setAttribute('aria-hidden', 'true');
        }
      });

      setInterval(createHeart, 1500);
    }
  }
});