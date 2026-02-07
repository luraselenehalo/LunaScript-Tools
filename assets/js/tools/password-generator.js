// Password Generator logic for LunaScript Tools.
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const uppercaseOption = document.getElementById("uppercase");
const lowercaseOption = document.getElementById("lowercase");
const numbersOption = document.getElementById("numbers");
const symbolsOption = document.getElementById("symbols");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const passwordOutput = document.getElementById("password-output");
const strengthBars = Array.from(document.querySelectorAll(".strength span"));
const strengthLabel = document.getElementById("strength-label");
const copyStatus = document.getElementById("copy-status");

const CHARSET = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]=<>?,./~",
};

const updateStrength = (length, optionsCount) => {
  const strengthScore = Math.min(4, Math.floor((length + optionsCount * 6) / 10));
  strengthBars.forEach((bar, index) => {
    bar.classList.toggle("active", index < strengthScore);
  });

  const labels = ["Low", "Balanced", "Strong", "Very Strong"];
  const labelIndex = Math.max(0, strengthScore - 1);
  strengthLabel.textContent = `Strength: ${labels[labelIndex]}`;
};

const getOptionsCount = () =>
  [uppercaseOption, lowercaseOption, numbersOption, symbolsOption].filter(
    (option) => option.checked
  ).length;

const buildCharacterPool = () => {
  let pool = "";

  if (uppercaseOption.checked) pool += CHARSET.uppercase;
  if (lowercaseOption.checked) pool += CHARSET.lowercase;
  if (numbersOption.checked) pool += CHARSET.numbers;
  if (symbolsOption.checked) pool += CHARSET.symbols;

  return pool;
};

const generatePassword = () => {
  const length = Number(lengthSlider.value);
  const pool = buildCharacterPool();
  const optionsCount = getOptionsCount();

  if (!pool) {
    passwordOutput.textContent = "Select at least one character option.";
    updateStrength(length, 1);
    return;
  }

  // Use the Web Crypto API for stronger randomness.
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  let password = "";
  randomValues.forEach((value) => {
    password += pool[value % pool.length];
  });

  passwordOutput.textContent = password;
  copyStatus.textContent = "";
  updateStrength(length, optionsCount);
};

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
  updateStrength(Number(lengthSlider.value), getOptionsCount());
});

[uppercaseOption, lowercaseOption, numbersOption, symbolsOption].forEach((option) => {
  option.addEventListener("change", () =>
    updateStrength(Number(lengthSlider.value), getOptionsCount())
  );
});

generateButton.addEventListener("click", generatePassword);

copyButton.addEventListener("click", async () => {
  const password = passwordOutput.textContent.trim();

  if (!password || password.startsWith("Select")) {
    copyStatus.textContent = "Generate a password first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(password);
    copyStatus.textContent = "Password copied to clipboard.";
  } catch (error) {
    copyStatus.textContent = "Clipboard access denied by the browser.";
  }
});

// Generate an initial password on load for convenience.
generatePassword();
