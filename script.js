document.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Burger menu
  const burger = document.getElementById("burgerButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      mobileMenu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Menu boards fly-in on scroll
  const menuSection = document.querySelector("#menu");
  const boards = document.querySelectorAll(".menu-board");
  if (!menuSection || boards.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          boards.forEach((b) => b.classList.add("is-in"));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(menuSection);

  // Remove contact form code unless adding form
});
