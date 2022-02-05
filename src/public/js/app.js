const connectSocketServer = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

connectSocketServer.addEventListener("open", () => {
  console.log("Connected to Server ✓");
});

connectSocketServer.addEventListener("message", (message) => {
  console.log("Server Message:", message.data);
});

connectSocketServer.addEventListener("close", () => {
  console.log("Disconnected from the Server 𐄂");
});

function handleMessage(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  connectSocketServer.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleMessage);
