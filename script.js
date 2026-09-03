/**
 * CLIENT SCRIPTS — SHELAS A L PORTFOLIO
 * High-performance, zero-dependency vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initPaletteTheme();
  initActiveScrollSpy();
  initModalListeners();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (Dark & Warm Beige/Brown)
   -------------------------------------------------------------------------- */
function initPaletteTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Retrieve stored theme or default to dark
  const storedTheme = localStorage.getItem('shelas-portfolio-theme') || 'dark';
  htmlEl.setAttribute('data-theme', storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('shelas-portfolio-theme', nextTheme);
    });
  }
}

/* --------------------------------------------------------------------------
   2. SCROLL SPY & ACTIVE NAVIGATION
   -------------------------------------------------------------------------- */
function initActiveScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   3. HIGH-RES CERTIFICATE LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function openLightbox(imageSrc, certTitle) {
  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxLabel = document.getElementById('lightbox-label');

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    lightboxImg.alt = certTitle;
    if (lightboxLabel) lightboxLabel.textContent = certTitle;
    
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('cert-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   4. CONTACT MESSAGE DISPATCH
   -------------------------------------------------------------------------- */
function handleMessageSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !message) {
    if (feedback) {
      feedback.textContent = 'Please fill out all required fields.';
      feedback.className = 'form-feedback-box';
      feedback.style.color = '#ef4444';
      feedback.classList.remove('hidden');
    }
    return;
  }

  const mailtoLink = `mailto:shelasastray@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Hello Shelas,\n\nFrom: ${name} (${email})\n\nMessage:\n${message}`)}`;

  if (feedback) {
    feedback.textContent = '✓ Opening default email client to send to shelasastray@gmail.com...';
    feedback.className = 'form-feedback-box success';
    feedback.classList.remove('hidden');
  }

  setTimeout(() => {
    window.location.href = mailtoLink;
  }, 600);

  form.reset();
}
