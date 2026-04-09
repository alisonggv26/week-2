'use strict';

const animBtn = document.getElementById('animBtn');
const learnBtn = document.getElementById('learnBtn');
const toast = document.getElementById('toast');

let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

animBtn.addEventListener('click', () => {
  const messages = [
    'Ready when you are!',
    'The journey begins here.',
    'Something great is coming.',
    'Let\'s build something amazing.',
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  showToast(msg);

  animBtn.style.transform = 'scale(0.94)';
  setTimeout(() => (animBtn.style.transform = ''), 150);
});

learnBtn.addEventListener('click', () => {
  showToast('You already know everything you need. Go build!');
});

// Intersection Observer: animate feature cards when they enter the viewport
const cards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => {
  card.style.opacity = '0';
  observer.observe(card);
});

// Subtle cursor-tracking tilt on the main card
const mainCard = document.querySelector('.card');

mainCard.addEventListener('mousemove', (e) => {
  const rect = mainCard.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);
  mainCard.style.transform = `perspective(800px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
});

mainCard.addEventListener('mouseleave', () => {
  mainCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  mainCard.style.transition = 'transform 0.5s ease';
  setTimeout(() => (mainCard.style.transition = ''), 500);
});
