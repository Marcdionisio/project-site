/* Simple slideshow + music + petals (your existing code kept) */

let current = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
document.querySelector('.prev').onclick = () => showSlide(current - 1);
document.querySelector('.next').onclick = () => showSlide(current + 1);
setInterval(() => showSlide(current + 1), 5000);

/* music player */
const audio = document.getElementById('audio');
const btn = document.getElementById('playBtn');
const thumb = document.getElementById('thumb');
btn.onclick = () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = 'Pause';
    thumb.classList.add('playing');
  } else {
    audio.pause();
    btn.textContent = 'Play';
    thumb.classList.remove('playing');
  }
};

/* falling petals */
const petalArea = document.querySelector('.petal-area');
const petals = ['❀','✿','❁','✾'];
function createPetal() {
  const el = document.createElement('span');
  el.className = 'petal';
  el.textContent = petals[Math.floor(Math.random()*petals.length)];
  el.style.left = Math.random()*100 + 'vw';
  el.style.fontSize = 14 + Math.random()*14 + 'px';
  el.style.animationDuration = 6 + Math.random()*6 + 's';
  petalArea.appendChild(el);
  el.addEventListener('animationend',()=>el.remove());
}
setInterval(createPetal,800);

/* ===========================
   LOVE ENVELOPE (Letters)
   - opens on seal click
   - keyboard-accessible (Enter/Space)
   - respects prefers-reduced-motion
   =========================== */

(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const envelopeRoot = document.getElementById('loveEnvelope');
  if (!envelopeRoot) return;

  const sealBtn = document.getElementById('heartSeal');
  const letter = document.getElementById('letterContent');

  const setOpenState = (open) => {
    if (open) {
      envelopeRoot.classList.add('open');
      envelopeRoot.setAttribute('aria-expanded', 'true');
      envelopeRoot.setAttribute('aria-pressed', 'true');
      if (letter) letter.setAttribute('aria-hidden','false');
    } else {
      envelopeRoot.classList.remove('open');
      envelopeRoot.setAttribute('aria-expanded', 'false');
      envelopeRoot.setAttribute('aria-pressed', 'false');
      if (letter) letter.setAttribute('aria-hidden','true');
      if (sealBtn) sealBtn.focus();
    }
  };

  // start closed by default (unless reduced motion)
  if (prefersReduced) {
    setOpenState(true);
    if (sealBtn) sealBtn.setAttribute('aria-hidden','true');
    return;
  } else {
    setOpenState(false);
  }

  // Click toggles persistent open / closed state (seal only)
  if (sealBtn) {
    sealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = envelopeRoot.classList.contains('open');
      setOpenState(!isOpen);
    });

    // Keyboard accessibility for seal (Enter / Space)
    sealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const isOpen = envelopeRoot.classList.contains('open');
        setOpenState(!isOpen);
      }
    });
  }

  // clicking the envelope background closes it (if open)
  envelopeRoot.addEventListener('click', (e) => {
    if (!envelopeRoot.classList.contains('open')) return;
    if (sealBtn && (sealBtn === e.target || sealBtn.contains(e.target))) return;
    setOpenState(false);
  });

  // Prevent accidental text selection on double-click
  envelopeRoot.addEventListener('mousedown', (e) => e.preventDefault());
})();
