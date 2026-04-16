const key = "YOUR_API_KEY";
const endpoint = "YOUR_ENDPOINT";
const region = "YOUR_REGION";

// Load supported languages
async function loadLanguages() {
  const response = await fetch(`${endpoint}/languages?api-version=3.0&scope=translation`);

  const data = await response.json();
  const languages = data.translation;

  const dropdown = document.getElementById("toLang");

  for (let code in languages) {
    let option = document.createElement("option");
    option.value = code;
    option.textContent = languages[code].name;
    dropdown.appendChild(option);
  }

  // Default to Hindi
  dropdown.value = "hi";
}

// Call on load
loadLanguages();
let timeout;

document.getElementById("inputText").addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    translateText();
  }, 500); // auto translate after typing stops
});

async function translateText() {
  const input = document.getElementById("inputText").value;
  const to = document.getElementById("toLang").value;

  if (!input.trim()) return;

  document.getElementById("outputText").value = "Translating...";

  const key = "YOUR_API_KEY";
  const endpoint = "YOUR_ENDPOINT";
  const region = "YOUR_REGION";

  const url = `${endpoint}/translate?api-version=3.0&to=${to}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": region,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{ Text: input }])
  });

  const data = await response.json();

  // Auto-detected language
  const detected = data[0].detectedLanguage.language;
  document.getElementById("detectedLang").innerText =
    "Detected: " + detected.toUpperCase();

  document.getElementById("outputText").value =
    data[0].translations[0].text;
}

// Swap languages
function swapLang() {
  const detected = document.getElementById("detectedLang").innerText.split(": ")[1]?.toLowerCase();
  const to = document.getElementById("toLang");

  if (detected) {
    to.value = detected;
  }
}

// Copy output
function copyText() {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
}