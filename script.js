
const chat = document.getElementById("chat");
const input = document.getElementById("user-input");

async function sendMessage() {
  const text = input.value;
  if (!text) return;
  appendMessage("Du", text);
  input.value = "";

  const reply = await getBotReply(text);
  appendMessage("FckMe", reply);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerText = sender + ": " + text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function getBotReply(userText) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer DEIN_OPENROUTER_KEY"
    },
    body: JSON.stringify({
      model: "openchat/openchat-3.5",
      messages: [
        { role: "system", content: "Du bist FckMe, ein sexy Flirtbot." },
        { role: "user", content: userText }
      ]
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";
}
