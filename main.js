const header = document.querySelector(".main-header");
const menu = document.querySelector(".main-nav");
const menuBtn = document.querySelector(".header-menu-btn");
const navLinks = document.querySelectorAll(".nav-item a");
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const effectivenessSlides = document.querySelector(".effectiveness-slides");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Открыть/закрыть меню
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

// Настройки слайдера
const sliderSpeed = 700; // скорость пролистывания в ms
const sliderDelay = 150; // скорость отклика на скролл в ms
slider.style.transition = `transform ${sliderSpeed}ms ease-out ${sliderDelay}ms`;
header.style.transition = `background-color 200ms ease-out ${
  sliderSpeed - 100
}ms`;

let currentSlide = 0;
let isScrolling = false;

// Настройки свайпа на тач устройствах
let startY = 0;
let endY = 0;
const swipeThreshold = 80; // необходимая длина свайпа для скролла на тач устройствах

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
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
    const slideNum = +link.getAttribute("data-slide");
    goToSlide(slideNum);
  });
});

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  if (index == 2 || index == 6) {
    header.classList.add("accent-bg");
  } else {
    header.classList.remove("accent-bg");
  }
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

// горизонтальный слайдер в блоке effectiveness

let currentIndex = 0;

function updateSlider() {
  const slideWidth = document.querySelector(".effectiveness-slide").offsetWidth;
  const screenWidth = window.innerWidth;
  if (screenWidth <= 1079 && screenWidth > 767) {
    effectivenessSlides.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  } else if (screenWidth <= 767) {
    effectivenessSlides.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
  } else {
    effectivenessSlides.style.transform = "translateX(0)";
  }
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextButton.addEventListener("click", () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 1079 && screenWidth > 767 && currentIndex < 1) {
    currentIndex++;
    updateSlider();
  } else if (
    screenWidth <= 767 &&
    currentIndex < effectivenessSlides.childElementCount - 1
  ) {
    currentIndex++;
    updateSlider();
  }
});

window.addEventListener("resize", updateSlider);
