document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuLinks = document.querySelectorAll(".header__menu__item");
  const topButton = document.querySelector(".arrow-up");

  /* ---------------- Smooth scroll for menu links (click-based active only) ---------------- */
  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Move blue box to the clicked tab only
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Smooth scroll to target section
      const targetId = link.getAttribute("href"); // e.g. "#skills"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------------- Smooth scroll for TOP button ---------------- */
  if (topButton) {
    topButton.addEventListener("click", (event) => {
      event.preventDefault();

      const homeSection = document.querySelector("#home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }

      // Make Home tab active when clicking the top button
      menuLinks.forEach((l) => l.classList.remove("active"));
      const homeLink = document.querySelector(
        '.header__menu__item[href="#home"]'
      );
      if (homeLink) {
        homeLink.classList.add("active");
      }
    });
  }

  /* ---------------- Simple fade-in for sections on scroll ---------------- */
  const fadeTargets = [
    document.querySelector("#home"),
    ...document.querySelectorAll(".section"),
  ].filter(Boolean);

  function handleScrollReveal() {
    const revealPoint = window.innerHeight * 0.8;

    fadeTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < revealPoint) {
        el.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", handleScrollReveal);
  handleScrollReveal(); // run once on load

  /* ---------------- Time-based greeting ---------------- */
  const greetingElement = document.getElementById("greetingText");

  if (greetingElement) {
    const hour = new Date().getHours();
    let message = "Hello!";

    if (hour >= 5 && hour < 12) {
      message = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
      message = "Good afternoon!";
    } else {
      message = "Good evening!";
    }

    greetingElement.textContent = message;
  }

  /* ---------------- Project modal popup ---------------- */
  const projectCards = document.querySelectorAll(".project");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalCloseButton = document.getElementById("modalClose");

  function openModal(title, description) {
    if (!modal) return;

    modalTitle.textContent = title || "Project";
    modalText.textContent = description || "";
    modal.classList.add("open");
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
    }
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();

      const title = card.querySelector(".project__title")?.textContent.trim();
      const description = card.querySelector("p")?.textContent.trim();

      openModal(title, description);
    });
  });

  // Close modal when clicking the dark background
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  // Close modal with the X button
  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", closeModal);
  }

  // Close modal with ESC key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
