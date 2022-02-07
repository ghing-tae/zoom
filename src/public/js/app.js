const connectSocketServer = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

connectSocketServer.addEventListener("open", () => {
  console.log("Connected to Server ✓");
});
connectSocketServer.addEventListener("close", () => {
  console.log("Disconnected from the Server 𐄂");
});

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

connectSocketServer.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

function handleNickname(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  connectSocketServer.send(makeMessage("nickname", input.value));
}

function handleMessage(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  connectSocketServer.send(makeMessage("newMessage", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleMessage);
nicknameForm.addEventListener("submit", handleNickname);
