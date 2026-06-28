document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (!hamburger || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
    }

    hamburger.addEventListener("click", function (e) {
        navMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
        e.stopPropagation();
    });

    document.addEventListener("click", function (e) {
        if (!navMenu.contains(e.target) && e.target !== hamburger) {
            closeMenu();
        }
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

});

window.addEventListener("scroll", function () {
    document.querySelector(".navbar").classList.toggle(
        "scrolled",
        window.scrollY > 50
    );
});

function openModal(name, position, phone, email, bio) {

    document.getElementById("modalName").innerText = name;
    document.getElementById("modalPosition").innerText = position;
    document.getElementById("modalPhone").innerText = phone;
    document.getElementById("modalEmail").innerText = email;
    document.getElementById("modalBio").innerText = bio;

    document.getElementById("teamModal").style.display = "block";
}

function closeModal() {
    document.getElementById("teamModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("teamModal");

    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Testimonials Slider
const testSlides = document.querySelectorAll('.testimonial-slide');
const testDots = document.querySelectorAll('.testimonial-dot');
let testCurrent = 0;

function goToTestimonial(index) {
  testSlides[testCurrent].classList.remove('active');
  testDots[testCurrent].classList.remove('active');
  testCurrent = (index + testSlides.length) % testSlides.length;
  testSlides[testCurrent].classList.add('active');
  testDots[testCurrent].classList.add('active');
}

testDots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToTestimonial(parseInt(dot.dataset.index));
  });
});

setInterval(() => goToTestimonial(testCurrent + 1), 6000);

// ========== PAGE LOADER ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
});

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== FADE IN SECTIONS ==========
const fadeSections = document.querySelectorAll('.fade-in-section');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeSections.forEach(section => fadeObserver.observe(section));