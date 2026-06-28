// Animated Counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current + suffix;
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

// Only animate when section is visible
const counters = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => animateCounter(counter));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (statsSection) observer.observe(statsSection);