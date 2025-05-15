
let character = {};

document.getElementById("config-form").addEventListener("submit", function (e) {
  e.preventDefault();
  character = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    intro: document.getElementById("intro").value
  };
  alert("Charakter gespeichert: " + character.name);
});

document.getElementById("send-btn").addEventListener("click", async function () {
  const input = document.getElementById("user-input").value;
  appendToChat("Du", input);
  const response = await askFlirtbot(input);
  appendToChat(character.name || "Flirtbot", response);
  document.getElementById("user-input").value = "";
});

document.getElementById("generate-image").addEventListener("click", async function () {
  const description = prompt("Was soll dein Bot darstellen?");
  if (!description) return;
  const imageUrl = await generateImage(description);
  appendToChat(character.name || "Flirtbot", `<img src='${imageUrl}' style='max-width:100%; border-radius:8px;'>`);
});

function appendToChat(sender, message) {
  const chatWindow = document.getElementById("chat-window");
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function askFlirtbot(message) {
  const prompt = `Der Flirtbot heißt ${character.name}, ist ${character.gender} und wurde so beschrieben: ${character.intro}. Nutzer fragt: ${message}`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";
  } catch (e) {
    return "Fehler bei der Anfrage.";
  }
}

async function generateImage(promptText) {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        prompt: promptText,
        n: 1,
        size: "512x512"
      })
    });
    const data = await response.json();
    return data.data[0].url;
  } catch (e) {
    return "Bild konnte nicht generiert werden.";
  }
}
