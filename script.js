// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Typing effect
const roles = [
  "Aspiring Web Developer",
  "HTML & CSS Enthusiast",
  "JavaScript Learner",
  "Database Diploma Holder",
];

const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 80);
}

typeLoop();

// Animate skill bars when visible
const skillFills = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.level + "%";
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Download CV button (placeholder - link to a CV file if added later)
document.getElementById("downloadCv").addEventListener("click", (e) => {
  e.preventDefault();
  window.print();
});

// Theme toggle (light/dark, persisted)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

function applyTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// Scroll reveal animations
const revealTargets = document.querySelectorAll(".section");
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// Active nav link highlighting
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id], header[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form validation + mailto send
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setFieldError(field, message) {
  const group = field.closest(".form-group");
  const errorEl = group.querySelector(".form-error");
  group.classList.toggle("invalid", Boolean(message));
  errorEl.textContent = message || "";
}

function validateField(field) {
  if (field.validity.valueMissing) {
    setFieldError(field, "This field is required.");
    return false;
  }
  if (field.type === "email" && field.validity.typeMismatch) {
    setFieldError(field, "Please enter a valid email address.");
    return false;
  }
  setFieldError(field, "");
  return true;
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("message"),
  ];

  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    return;
  }

  const name = fields[0].value.trim();
  const email = fields[1].value.trim();
  const message = fields[2].value.trim();

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

  window.location.href = `mailto:turanwahid@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email client...";
  contactForm.reset();
});
