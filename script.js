// YEAR
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// BURGER MENU
const burgerButton = document.getElementById("burgerButton");
const mobileMenu = document.getElementById("mobileMenu");

if (burgerButton && mobileMenu) {
  burgerButton.addEventListener("click", () => {
    const isOpen = burgerButton.classList.toggle("open");
    mobileMenu.style.display = isOpen ? "flex" : "none";
    burgerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close on link click
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burgerButton.classList.remove("open");
      burgerButton.setAttribute("aria-expanded", "false");
      mobileMenu.style.display = "none";
    });
  });
}

// TESTIMONIAL SLIDER
const testimonials = [
  {
    quote: "“Easiest catering we’ve ever done. Everyone raved about the brisket and we had zero leftovers.”",
    name: "Jess & Tom",
    meta: "40th birthday party",
  },
  {
    quote: "“The food truck was the star of our wedding. Huge portions, insanely good meat and the team were legends.”",
    name: "Mia & Luke",
    meta: "Wedding feast for 110 guests",
  },
  {
    quote: "“Perfect for our staff shout. Arrived on time, fed everyone fast and the feedback was 10/10.”",
    name: "Claire",
    meta: "Corporate lunch, 60 staff",
  },
];

const quoteEl = document.getElementById("testimonialQuote");
const nameEl = document.getElementById("testimonialName");
const metaEl = document.getElementById("testimonialMeta");
const dots = document.querySelectorAll(".testimonial-dot");

function setTestimonial(index) {
  const t = testimonials[index];
  if (!t || !quoteEl || !nameEl || !metaEl) return;
  quoteEl.textContent = t.quote;
  nameEl.textContent = t.name;
  metaEl.textContent = t.meta;

  dots.forEach((d) => d.classList.remove("active"));
  const activeDot = document.querySelector(`.testimonial-dot[data-index="${index}"]`);
  if (activeDot) activeDot.classList.add("active");
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index || 0);
    setTestimonial(index);
  });
});

// Auto rotate
let testimonialIndex = 0;
if (dots.length) {
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    setTestimonial(testimonialIndex);
  }, 8000);
}

// FAQ ACCORDION
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    const answer = btn.nextElementSibling;

    // close others
    faqQuestions.forEach((otherBtn) => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute("aria-expanded", "false");
        const otherAnswer = otherBtn.nextElementSibling;
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
          const icon = otherBtn.querySelector(".faq-icon");
          if (icon) icon.textContent = "+";
        }
      }
    });

    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (answer) {
      if (!expanded) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
      const icon = btn.querySelector(".faq-icon");
      if (icon) icon.textContent = expanded ? "+" : "−";
    }
  });
});

// INSTANT QUOTE CALCULATOR
const quoteForm = document.getElementById("quoteForm");
const quoteResult = document.getElementById("quoteResult");

if (quoteForm && quoteResult) {
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const guests = Number(document.getElementById("guestCount").value);
    const packageType = document.getElementById("packageType").value;
    const serviceStyle = document.getElementById("serviceStyle").value;

    if (!guests || guests < 10 || !packageType || !serviceStyle) {
      quoteResult.textContent = "Please enter at least 10 guests and choose a package + service style.";
      return;
    }

    let basePerPerson = 0;

    if (packageType === "classic") basePerPerson = 22;
    if (packageType === "feast") basePerPerson = 30;
    if (packageType === "premium") basePerPerson = 38;

    let serviceMultiplier = 1;

    if (serviceStyle === "dropoff") serviceMultiplier = 1;
    if (serviceStyle === "buffet") serviceMultiplier = 1.15;
    if (serviceStyle === "truck") serviceMultiplier = 1.25;

    const rawTotal = guests * basePerPerson * serviceMultiplier;
    const rounded = Math.round(rawTotal / 10) * 10;

    quoteResult.textContent = `Rough estimate: ~$${rounded.toLocaleString()} inc. food & basic service. We’ll confirm once we know your venue & timings.`;
  });
}

// CONTACT FORM (simple front-end validation only)
const contactForm = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

if (contactForm && contactResult) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const requiredIds = ["name", "email", "phone", "message"];
    let valid = true;

    requiredIds.forEach((id) => {
      const field = document.getElementById(id);
      if (!field) return;
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = "#ef4444";
      } else {
        field.style.borderColor = "rgba(75, 85, 99, 0.9)";
      }
    });

    if (!valid) {
      contactResult.textContent = "Please fill in the required fields.";
      contactResult.style.color = "#fecaca";
      return;
    }

    // Here you would integrate with Formspree, backend, etc.
    contactResult.textContent = "Thanks! Your enquiry has been sent. We’ll get back to you shortly.";
    contactResult.style.color = "#bbf7d0";
    contactForm.reset();
  });
}

// NEWSLETTER
const newsletterForm = document.getElementById("newsletterForm");
const newsletterResult = document.getElementById("newsletterResult");
const newsletterEmail = document.getElementById("newsletterEmail");

if (newsletterForm && newsletterResult && newsletterEmail) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!newsletterEmail.value.trim()) {
      newsletterResult.textContent = "Please add your email to join.";
      newsletterResult.style.color = "#fecaca";
      return;
    }

    // Hook to email provider later
    newsletterResult.textContent = "You’re on the list! 🔥";
    newsletterResult.style.color = "#bbf7d0";
    newsletterEmail.value = "";
  });
}

