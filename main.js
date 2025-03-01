const menu = document.querySelector(".main-nav");
const menuBtn = document.querySelector(".header-menu-btn");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

const navLinks = document.querySelectorAll(".nav-item a");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const sliderSpeed = 700; // ms
slider.style.transition = `transform ${sliderSpeed}ms ease-out`;

let currentSlide = 0;
let isScrolling = false;
let startY = 0; // Начальная позиция свайпа
let endY = 0; // Конечная позиция свайпа
const swipeThreshold = 50; // Порог свайпа

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentSlide = index;
  const offset = -currentSlide * 100;
  slider.style.transform = `translateY(${offset}vh)`;

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("data-slide") == currentSlide
    );
  });
}

// Обработчик скролла
window.addEventListener("wheel", (e) => {
  if (isScrolling) return; // debounce
  isScrolling = true;

  e.deltaY > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1);

  setTimeout(() => {
    isScrolling = false;
  }, 500);
});

slider.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

slider.addEventListener("touchmove", (e) => {
  endY = e.touches[0].clientY;
});

slider.addEventListener("touchend", () => {
  const deltaY = startY - endY;

  if (deltaY > swipeThreshold) {
    goToSlide(currentSlide + 1);
  } else if (deltaY < -swipeThreshold) {
    goToSlide(currentSlide - 1);
  }
});

// Обработчики для навигационных ссылок
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const slideNum = +link.getAttribute("data-slide");
    goToSlide(slideNum);
  });
});
