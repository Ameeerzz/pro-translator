function swapLang() {
  let from = document.getElementById("fromLang");
  let to = document.getElementById("toLang");

  let temp = from.value;
  from.value = to.value;
  to.value = temp;
}

async function translateText() {
  document.getElementById("outputText").value = "Translating...";

  // add your Azure API here later
}