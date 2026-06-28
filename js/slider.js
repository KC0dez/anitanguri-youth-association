// Hero Slider
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
const prevBtn = document.getElementById('heroPrev');
const nextBtn = document.getElementById('heroNext');
let current = 0;
let autoSlide;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  autoSlide = setInterval(() => goToSlide(current + 1), 5000);
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

// Only trigger slide change on the arrow buttons and dots
// NOT on any clicks inside hero-content (so links work normally)
if (prevBtn) {
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(current - 1);
    resetAuto();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(current + 1);
    resetAuto();
  });
}

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    goToSlide(parseInt(dot.dataset.index));
    resetAuto();
  });
});

// Make sure all hero buttons navigate normally
document.querySelectorAll('.hero-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = link.getAttribute('href');
  });
});

startAuto();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}