const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

let roomName;

room.hidden = true;

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("newMessage", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  welcome.hidden = true;
  room.hidden = false;
  const input = welcome.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", value);
  socket.emit("enterRoom", roomName, showMessage);
  input.value = "";
}

function showMessage() {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room name: ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  const nameForm = welcome.querySelector("#name");
  roomName = input.value;
  nameForm.addEventListener("submit", handleNicknameSubmit);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} joined`);
});

socket.on("bye", (user) => {
  addMessage(`${user} left`);
});

socket.on("newMessage", (msg) => {
  addMessage(msg);
});
