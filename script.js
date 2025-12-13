document.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
const burger = document.getElementById("burgerButton");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
// Menu boards fly-in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const menuSection = document.querySelector("#menu");
  const boards = document.querySelectorAll(".menu-board");

  if (!menuSection || boards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          boards.forEach((b) => b.classList.add("is-in"));
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(menuSection);
});

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });
}

  // BURGER MENU
  const burger = document.getElementById("burgerButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.classList.toggle("open");
      mobileMenu.style.display = isOpen ? "flex" : "none";
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.style.display = "none";
      });
    });
  }

  // CONTACT FORM (frontend only)
  const contactForm = document.getElementById("contactForm");
  const contactResult = document.getElementById("contactResult");

  if (contactForm && contactResult) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (
        !name.value.trim() ||
        !email.value.trim() ||
        !message.value.trim()
      ) {
        contactResult.textContent = "Please fill in all required fields.";
        contactResult.style.color = "#ff4d4d";
        return;
      }

      contactResult.textContent =
        "Thanks! Your message has been sent (simulated). Smoke Spot will get back to you soon.";
      contactResult.style.color = "#ffffff";
      contactForm.reset();
    });
  }
});
