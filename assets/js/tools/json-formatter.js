// JSON Formatter logic.
const jsonInput = document.getElementById("json-input");
const jsonFormat = document.getElementById("json-format");
const jsonCopy = document.getElementById("json-copy");
const jsonOutput = document.getElementById("json-output");
const jsonStatus = document.getElementById("json-status");

const formatJson = () => {
  const raw = jsonInput.value;

  if (!raw.trim()) {
    jsonOutput.textContent = "Enter JSON to format.";
    jsonStatus.textContent = "";
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const formatted = JSON.stringify(parsed, null, 2);
    jsonOutput.textContent = formatted;
    jsonStatus.textContent = "JSON formatted successfully.";
  } catch (error) {
    jsonOutput.textContent = "Invalid JSON. Please check your input.";
    jsonStatus.textContent = "";
  }
};

jsonFormat.addEventListener("click", formatJson);

jsonCopy.addEventListener("click", async () => {
  const output = jsonOutput.textContent.trim();

  if (!output || output.startsWith("Enter") || output.startsWith("Invalid")) {
    jsonStatus.textContent = "Format JSON before copying.";
    return;
  }

  try {
    await navigator.clipboard.writeText(output);
    jsonStatus.textContent = "Formatted JSON copied.";
  } catch (error) {
    jsonStatus.textContent = "Clipboard access denied by the browser.";
  }
});
