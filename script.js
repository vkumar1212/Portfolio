const chk = document.getElementById("chk");

chk.addEventListener("change", () => {
  document.body.classList.toggle("body");
});

// Floating purple dots effect for about-me section
window.addEventListener("DOMContentLoaded", function () {
  const dotCount = 18;
  const floatingDots = document.querySelector(".floating-dots");
  const aboutMeSection = document.getElementById("about-me");
  if (!floatingDots || !aboutMeSection) return;
  // Ensure floatingDots fills the section
  floatingDots.style.width = "100%";
  floatingDots.style.height = "100%";
  // Use getBoundingClientRect for accurate width/height after layout
  const sectionRect = aboutMeSection.getBoundingClientRect();
  const sectionWidth = sectionRect.width;
  const sectionHeight = sectionRect.height;
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.className = "floating-dot";
    // Make dots very tiny: 4px to 10px
    const size = Math.random() * 6 + 4;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    // Use sectionRect.width/height for full coverage
    dot.style.left = `${Math.random() * (sectionWidth - size)}px`;
    dot.style.top = `${Math.random() * (sectionHeight - size)}px`;
    dot.style.animationDelay = `${Math.random() * 8}s`;
    floatingDots.appendChild(dot);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  // Rotating greetings in different languages
  const greetings = [
    "Bonjour!",
    "Hallo!",
    "Ciao!",
    "Hola!",
    "Olá!",
    "नमस्ते!",
    "こんにちは!",
    "你好!",
    "안녕하세요!",
    "Hej!",
    "Salam!",
    "Hey!",
  ];
  let greetIndex = 0;
  const greetingEl = document.getElementById("greeting");
  function rotateGreeting() {
    if (greetIndex < greetings.length * 1) {
      greetingEl.textContent = greetings[greetIndex % greetings.length];
      greetIndex++;
      setTimeout(rotateGreeting, 150);
    } else {
      // Start typewriter effect only after greeting rotation is done
      setTimeout(typeWriter, 100);
    }
  }
  rotateGreeting();

  // Typewriter effect for experience text with backspace effect and repeat button
  const typewriterText = "I have experience in healthcare and healthcare tech.";
  const typewriterEl = document.getElementById("typewriter");
  let typeIndex = 0;
  let deleting = false;
  let showRepeat = false;
  const toggle = document.getElementById("chk");
  // Ensure repeat button is purple with white text on creation
  function typeWriter() {
    if (!deleting && typeIndex <= typewriterText.length) {
      typewriterEl.textContent = typewriterText.slice(0, typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 30);
    } else if (!deleting && typeIndex > typewriterText.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
    } else if (deleting && typeIndex > 0) {
      typeIndex--;
      typewriterEl.textContent = typewriterText.slice(0, typeIndex);
      setTimeout(typeWriter, 18);
    } else if (deleting && typeIndex === 0) {
      showRepeat = true;
      // Show repeat button with blue background in light mode, white in dark mode
      typewriterEl.innerHTML = `<button id="repeat-typewriter" style="background:#4fc3f7;color:#fff;border:none;border-radius:8px;padding:6px 18px;font-size:1em;cursor:pointer;font-weight:bold;">Repeat</button>`;
      const repeatBtn = document.getElementById("repeat-typewriter");
      repeatBtn.addEventListener("click", function () {
        // Set to current theme color on click
        if (document.body.classList.contains("dark-mode")) {
          repeatBtn.style.background = "#fff";
          repeatBtn.style.color = "#111";
        } else {
          repeatBtn.style.background = "#4fc3f7";
          repeatBtn.style.color = "#fff";
        }
        showRepeat = false;
        typeIndex = 0;
        deleting = false;
        setTimeout(typeWriter, 100);
      });

      // Set repeat button color based on current mode
      if (document.body.classList.contains("dark-mode")) {
        repeatBtn.style.background = "#fff";
        repeatBtn.style.color = "#111";
      } else {
        repeatBtn.style.background = "#4fc3f7";
        repeatBtn.style.color = "#fff";
      }
    }
  }
  const greetingDuration = greetings.length * 2 * 200;
  setTimeout(typeWriter, greetingDuration + 100);

  // Listen for toggle (dark mode) changes and update repeat button if present
  if (toggle) {
    toggle.addEventListener("change", function () {
      const repeatBtn = document.getElementById("repeat-typewriter");
      if (repeatBtn) {
        if (toggle.checked) {
          repeatBtn.style.background = "#fff";
          repeatBtn.style.color = "#111";
        } else {
          repeatBtn.style.background = "#4fc3f7";
          repeatBtn.style.color = "#fff";
        }
      }
    });
    toggle.addEventListener("change", function () {
      if (toggle.checked) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
  }

  // Show/hide Top button above footer based on section in view
  function handleFooterTopBtn() {
    const educationSection = document.getElementById("education");
    const footerTopBtn = document.getElementById("footer-top-btn");
    if (!educationSection || !footerTopBtn) return;
    const rect = educationSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      footerTopBtn.style.display = "none";
    } else {
      footerTopBtn.style.display = "flex";
    }
  }
  window.addEventListener("scroll", handleFooterTopBtn);
  handleFooterTopBtn();

  // Hide footer when Education section is in view
  function handleFooterVisibility() {
    const educationSection = document.getElementById("education");
    const footer = document.querySelector("footer.thiswork");
    if (!educationSection || !footer) return;
    const rect = educationSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      footer.style.display = "none";
    } else {
      footer.style.display = "";
    }
  }
  window.addEventListener("scroll", handleFooterVisibility);
  handleFooterVisibility();

  // Make Education section Top button scroll to top
  const eduTopBtn = document.querySelector(".footer__anchor--education-top");
  if (eduTopBtn) {
    eduTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Make Education nav button scroll all the way to the bottom
  const eduNavBtn = document.querySelector('a[href="#education"]');
  if (eduNavBtn) {
    eduNavBtn.addEventListener("click", function (e) {
      e.preventDefault();
      setTimeout(function () {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    });
  }
});
