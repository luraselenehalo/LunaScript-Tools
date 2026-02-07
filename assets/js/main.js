// Shared UI helpers for LunaScript Tools.
const yearTargets = document.querySelectorAll("[data-year]");
const currentYear = new Date().getFullYear();

yearTargets.forEach((node) => {
  node.textContent = currentYear;
});
