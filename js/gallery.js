// ========== GALLERY FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
    updateLightboxItems();
  });
});

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxOverlay = document.getElementById('lightboxOverlay');

let currentIndex = 0;
let visibleItems = [];

function updateLightboxItems() {
  visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  currentIndex = index;
  const img = visibleItems[currentIndex].querySelector('img');
  const caption = visibleItems[currentIndex].querySelector('.gallery-item-overlay span');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox(currentIndex);
}

// Open on click
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    updateLightboxItems();
    const visibleIndex = visibleItems.indexOf(item);
    openLightbox(visibleIndex);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'Escape') closeLightbox();
});

// Init
updateLightboxItems();