// SHA-256 Hash Generator logic.
const hashInput = document.getElementById("hash-input");
const hashButton = document.getElementById("hash-button");
const hashOutput = document.getElementById("hash-output");
const hashCopy = document.getElementById("hash-copy");
const hashStatus = document.getElementById("hash-status");

const bufferToHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const generateHash = async () => {
  const text = hashInput.value;

  if (!text.trim()) {
    hashOutput.textContent = "Enter text to generate a hash.";
    hashStatus.textContent = "";
    return;
  }

  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    hashOutput.textContent = bufferToHex(hashBuffer);
    hashStatus.textContent = "Hash generated locally.";
  } catch (error) {
    hashOutput.textContent = "Unable to generate hash.";
    hashStatus.textContent = "";
  }
};

hashButton.addEventListener("click", generateHash);

hashCopy.addEventListener("click", async () => {
  const hash = hashOutput.textContent.trim();

  if (!hash || hash.startsWith("Enter") || hash.startsWith("Unable")) {
    hashStatus.textContent = "Generate a hash first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(hash);
    hashStatus.textContent = "Hash copied to clipboard.";
  } catch (error) {
    hashStatus.textContent = "Clipboard access denied by the browser.";
  }
});
