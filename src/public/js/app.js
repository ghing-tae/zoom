const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(backendMsg) {
  console.log(`backend message:`, backendMsg);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enterRoom", input.value, backendDone);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
