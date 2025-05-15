
const passInput = document.getElementById("admin-pass");
const adminPanel = document.getElementById("admin-panel");

function checkPassword() {
  if (passInput.value === "schwanz") {
    adminPanel.style.display = "block";
  } else {
    alert("Falsches Passwort!");
  }
}

function saveBotConfig() {
  alert("Bot-Einstellungen gespeichert (nur lokal)!");
}
