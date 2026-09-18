const phrases = [
  "Article Writer",
  "Web Content Writer",
  "Technical Content Writer",
  "Research-driven Storyteller"
];

const typed = document.getElementById("typed");
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  typed.textContent = deleting ? phrase.slice(0, --charIndex) : phrase.slice(0, ++charIndex);

  let delay = deleting ? 45 : 85;
  if (!deleting && charIndex === phrase.length) { delay = 1500; deleting = true; }
  else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 350; }
  setTimeout(typeLoop, delay);
}
typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".article-link, .round-arrow").forEach(link => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href") === "#") {
      e.preventDefault();
      alert("Replace this placeholder link with your article or project URL.");
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry: ${data.get("type")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("type")}\n\n${data.get("message")}`
  );
  const status = document.getElementById("formStatus");
  status.textContent = "Opening your email app…";
  window.location.href = `mailto:tasfiahabib.chy@gmail.com?subject=${subject}&body=${body}`;
});
