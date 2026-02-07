// UUID Generator logic.
const uuidOutput = document.getElementById("uuid-output");
const uuidGenerate = document.getElementById("uuid-generate");
const uuidCopy = document.getElementById("uuid-copy");
const uuidStatus = document.getElementById("uuid-status");

const fallbackUuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.random() * 16;
    const value = char === "x" ? random : (random % 4) + 8;
    return Math.floor(value).toString(16);
  });

const generateUuid = () => {
  const uuid = window.crypto.randomUUID ? window.crypto.randomUUID() : fallbackUuid();
  uuidOutput.textContent = uuid;
  uuidStatus.textContent = "UUID generated locally.";
};

uuidGenerate.addEventListener("click", generateUuid);

uuidCopy.addEventListener("click", async () => {
  const uuid = uuidOutput.textContent.trim();

  if (!uuid || uuid.startsWith("Ready")) {
    uuidStatus.textContent = "Generate a UUID first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(uuid);
    uuidStatus.textContent = "UUID copied to clipboard.";
  } catch (error) {
    uuidStatus.textContent = "Clipboard access denied by the browser.";
  }
});

// Generate a UUID on load for quick access.
generateUuid();
