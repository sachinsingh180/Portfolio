// Highlight active nav link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Project search
const searchInput = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const noResult = document.getElementById("noResult");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  let matchFound = false;

  projectCards.forEach((card) => {
    const title = card.getAttribute("data-title").toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
      matchFound = true;
    } else {
      card.style.display = "none";
    }
  });

  noResult.style.display = matchFound ? "none" : "block";
});

// Dark / Light mode toggle
const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  modeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Contact form submit (AJAX, no page reload)
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btnText");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  sendBtn.disabled = true;
  btnText.textContent = "Sending...";
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("https://formspree.io/f/mvzegzgp", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      formStatus.textContent = "Message sent successfully!";
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    formStatus.textContent = "Something went wrong. Try again.";
    formStatus.classList.add("error");
  } finally {
    btnText.textContent = "Send Message";
    sendBtn.disabled = false;
  }
});