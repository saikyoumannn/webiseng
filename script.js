document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("menu-open-button");
    const closeBtn = document.getElementById("menu-close-button");
    const navMenu = document.querySelector(".nav-menu");

    // buka menu
    openBtn.addEventListener("click", () => {
        document.body.classList.add("show-mobile-menu");

        // debug
        console.log("Menu dibuka");
    });

    // tutup menu
    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");

        // debug
        console.log("Menu ditutup");
    });

    // klik di luar menu = tutup
    document.addEventListener("click", (e) => {
        if (
            document.body.classList.contains("show-mobile-menu") &&
            !navMenu.contains(e.target) &&
            !openBtn.contains(e.target)
        ) {
            document.body.classList.remove("show-mobile-menu");
        }
    });

    // tekan ESC = tutup menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            document.body.classList.remove("show-mobile-menu");
        }
    });
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical', // <-- Hapus atau jadikan komentar baris ini
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});