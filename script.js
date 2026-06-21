/* ================================================
   FELIZ DÍA DEL PADRE — script.js
   Animaciones, música, galería y efectos
   ================================================ */

// ============================================================
// 1. REPRODUCTOR DE MÚSICA
// ============================================================
const bgm     = document.getElementById('bgm');
const playBtn = document.getElementById('play-btn');
const musicIcon = document.getElementById('music-icon');
let musicPlaying = false;

/**
 * Alterna reproducción / pausa del audio de fondo.
 * Para agregar música: coloca tu archivo MP3 en la misma
 * carpeta que index.html y añade dentro del <audio id="bgm">:
 *   <source src="viejo_mi_querido_viejo.mp3" type="audio/mpeg">
 */
function toggleMusic() {
  if (musicPlaying) {
    bgm.pause();
    playBtn.textContent = '▶';
    musicIcon.style.animationPlayState = 'paused';
  } else {
    bgm.play().catch(() => {
      // El navegador bloqueó la reproducción automática — el usuario
      // puede pulsar el botón para iniciarla manualmente.
    });
    playBtn.textContent = '⏸';
    musicIcon.style.animationPlayState = 'running';
  }
  musicPlaying = !musicPlaying;
}

// Intento de reproducción automática al primer clic del usuario
window.addEventListener('click', function autoPlayOnce() {
  if (!musicPlaying && bgm.readyState >= 2) {
    bgm.play()
      .then(() => {
        musicPlaying = true;
        playBtn.textContent = '⏸';
        musicIcon.style.animationPlayState = 'running';
      })
      .catch(() => {});
  }
  window.removeEventListener('click', autoPlayOnce);
}, { once: true });


// ============================================================
// 2. CORAZONES FLOTANTES (sección hero)
// ============================================================
const HEART_EMOJIS = ['❤️', '💛', '🧡', '💕', '✨', '💫'];
const heartsContainer = document.getElementById('fhc');

function createFloatingHeart() {
  const el = document.createElement('div');
  el.className = 'floating-heart';
  el.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  el.style.left     = Math.random() * 100 + '%';
  el.style.fontSize = (12 + Math.random() * 14) + 'px';
  const duration    = 6 + Math.random() * 6;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay   = Math.random() * 3 + 's';
  heartsContainer.appendChild(el);
  // Eliminar cuando termine la animación
  setTimeout(() => el.remove(), (duration + 3) * 1000);
}

setInterval(createFloatingHeart, 900);


// ============================================================
// 3. CONFETTI (sección final)
// ============================================================
const CONFETTI_COLORS = ['#c9963a', '#e8b96a', '#f5e6c8', '#ffffff', '#ffd700', '#ff9ff3', '#a8edea'];

function createConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left            = Math.random() * 100 + '%';
    piece.style.background      = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.width           = (5 + Math.random() * 8) + 'px';
    piece.style.height          = (5 + Math.random() * 8) + 'px';
    piece.style.animationDuration = (3 + Math.random() * 4) + 's';
    piece.style.animationDelay  = Math.random() * 6 + 's';
    piece.style.borderRadius    = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.opacity         = 0.7 + Math.random() * 0.3;
    container.appendChild(piece);
  }
}

createConfetti();


// ============================================================
// 4. LIGHTBOX DE GALERÍA
// ============================================================
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');

/**
 * Abre el lightbox mostrando la imagen del elemento clicado.
 * @param {HTMLElement} el — elemento .gallery-item
 */
function openLightbox(el) {
  const img     = el.querySelector('img');
  const caption = el.querySelector('.gallery-caption');
  lbImg.src             = img.src;
  lbCaption.textContent = caption ? caption.textContent.trim() : '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


// ============================================================
// 5. ANIMACIONES AL HACER SCROLL (IntersectionObserver)
// ============================================================
const ANIMATED_SELECTORS = [
  '.timeline-item',
  '.gallery-item',
  '.quality-card',
  '.teaching-item',
  '.secret-phrase',
];

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Pequeño retardo escalonado por elemento
      const delay = (index % 6) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Registrar todos los elementos animables
document.querySelectorAll(ANIMATED_SELECTORS.join(',')).forEach((el, i) => {
  // Transición con ligero escalonado visual
  el.style.transitionDelay = (i % 6 * 0.07) + 's';
  scrollObserver.observe(el);
});


// ============================================================
// 6. SMOOTH SCROLL para los enlaces del menú
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ============================================================
// 7. NAVBAR — ocultar en móvil con menú hamburguesa (opcional)
//    Por ahora el menú se oculta con CSS en pantallas pequeñas.
// ============================================================


// ============================================================
// FIN DE script.js
// ============================================================