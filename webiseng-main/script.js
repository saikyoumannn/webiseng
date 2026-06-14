document.addEventListener("DOMContentLoaded", () => {
  /* ================= MOBILE MENU LOGIC ================= */
  const openBtn = document.getElementById("menu-open-button");
  const closeBtn = document.getElementById("menu-close-button");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      document.body.classList.add("show-mobile-menu");
    });
  }

  const closeMenu = () => {
    document.body.classList.remove("show-mobile-menu");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (document.body.classList.contains("show-mobile-menu") && navMenu && !navMenu.contains(e.target) && openBtn && !openBtn.contains(e.target)) {
      closeMenu();
    }
  });

  /* ================= NAVBAR SCROLL EFFECT ================= */
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /* ================= SCROLL ANIMATION (FADE IN) ================= */
  const faders = document.querySelectorAll(".fade-in");
  if (faders.length > 0) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });
  }

  /* ================= SWIPER JS INIT ================= */
  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* ================= MODAL (POP-UP) LOGIC ================= */
  const heroReadBtn = document.querySelector(".hero-details .order-now");
  const heroContactBtn = document.querySelector(".hero-details .contact-us");
  const detailBtns = document.querySelectorAll(".read-more");

  const readModal = document.getElementById("read-modal");
  const contactModal = document.getElementById("contact-modal");
  const bookModal = document.getElementById("book-modal");
  const closeBtns = document.querySelectorAll(".close-btn");

  function openModal(modal) {
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }

  if (heroReadBtn && readModal) {
    heroReadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(readModal);
    });
  }

  if (heroContactBtn && contactModal) {
    heroContactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  }

  if (closeBtns.length > 0) {
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        if (targetId) {
          const modalToClose = document.getElementById(targetId);
          closeModal(modalToClose);
        }
      });
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(e.target);
    }
  });

  /* ================= FITUR BUKA BUKU PDF ================= */
  if (detailBtns.length > 0) {
    detailBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Mencegah web reload saat klik "Lihat Detail"

        const card = e.currentTarget.closest(".library-item");
        // Ambil link PDF dari HTML yang sudah kamu pasang
        const pdfLink = e.currentTarget.getAttribute("data-pdf");

        if (card && bookModal) {
          const imgEl = card.querySelector(".library-image");
          const titleEl = card.querySelector(".library-title");
          const descEl = card.querySelector(".text");

          const modalImg = document.getElementById("modal-book-img");
          const modalTitle = document.getElementById("modal-book-title");
          const modalDesc = document.getElementById("modal-book-desc");

          // Ini yang mengatur tombol "Baca Sekarang"
          const modalReadBtn = document.getElementById("modal-read-btn");

          if (imgEl && modalImg) modalImg.src = imgEl.src;
          if (titleEl && modalTitle) modalTitle.innerText = titleEl.innerText;
          if (descEl && modalDesc) modalDesc.innerText = descEl.innerText;

          // Mengisi link PDF ke tombol Baca Sekarang
          if (modalReadBtn) {
            if (pdfLink) {
              // Jika link PDF ada, masukkan ke dalam href
              modalReadBtn.href = pdfLink;
              modalReadBtn.style.display = "inline-block";
            } else {
              // Jika tidak ada, kembalikan ke #
              modalReadBtn.href = "#";
              modalReadBtn.style.display = "none";
            }
          }

          openModal(bookModal);
        }
      });
    });
  }
});
