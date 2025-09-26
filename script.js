/* ============================= */
/* Footer Tahun Otomatis         */
/* ============================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ============================= */
/* Toggle Menu Mobile            */
/* ============================= */
const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* ============================= */
/* Smooth Scroll Navbar          */
/* ============================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
    if (window.innerWidth <= 768) navLinks.classList.remove("active");
  });
});

/* ============================= */
/* Reveal On Scroll (IntersectionObserver) */
/* ============================= */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ============================= */
/* Typing Effect Hero            */
/* ============================= */
const typingEl = document.querySelector(".typing");
const typingTexts = ["Calon Web Developer", "Front-End Enthusiast", "UI/UX Designer"];
let typingIndex = 0;
let charIndex = 0;
const typingDelay = 100;
const erasingDelay = 50;
const pauseDelay = 1500;

function type() {
  if (!typingEl) return;
  if (charIndex < typingTexts[typingIndex].length) {
    typingEl.textContent += typingTexts[typingIndex].charAt(charIndex++);
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, pauseDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = typingTexts[typingIndex].substring(0, --charIndex);
    setTimeout(erase, erasingDelay);
  } else {
    typingIndex = (typingIndex + 1) % typingTexts.length;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", () => setTimeout(type, pauseDelay));

/* ============================= */
/* Project Filter                */
/* ============================= */
const filterBtns = document.querySelectorAll(".project-filters button");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.style.display = (filter === "all" || card.dataset.category === filter) ? "block" : "none";
    });
  });
});

/* ============================= */
/* EmailJS Contact Form          */
/* ============================= */
const SERVICE_ID = "service_23790fp";   // ganti dengan milikmu
const TEMPLATE_ID = "template_edix562"; // ganti dengan milikmu
const PUBLIC_KEY = "Sw_LTJWEIoqWziK5B"; // ganti dengan milikmu

if (emailjs) emailjs.init(PUBLIC_KEY);

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  statusEl.textContent = "Mengirim pesan...";
  statusEl.className = "form-status";

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
    .then(() => {
      statusEl.textContent = "Pesan berhasil dikirim! ✅";
      statusEl.className = "form-status success";
      form.reset();
    })
    .catch(err => {
      statusEl.textContent = "Gagal mengirim pesan ❌";
      statusEl.className = "form-status error";
      console.error("EmailJS Error:", err);
    });
});

