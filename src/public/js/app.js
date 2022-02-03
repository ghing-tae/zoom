const connectSocketServer = new WebSocket(`ws://${window.location.host}`);

connectSocketServer.addEventListener("open", () => {
  console.log("Connected to Server ✓");
});

connectSocketServer.addEventListener("message", (message) => {
  console.log("Server Message:", message.data);
});

connectSocketServer.addEventListener("close", () => {
  console.log("Disconnected from the Server 𐄂");
});

setTimeout(() => {
  connectSocketServer.send("hello Server from the browser");
}, 5000);
