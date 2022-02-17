import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enterRoom", (roomname) => console.log(roomname));
});

// const wss = new WebSocket.Server({ server });
// const eventArray = [];
// wss.on("connection", (event) => {
//   eventArray.push(event);
//   eventArray["nickname"] = "Anon";
//   console.log("Connected to Browser ✓");
//   event.on("close", () => {
//     console.log("Disconnected from the Browser 𐄂");
//   });
//   event.on("message", (message) => {
//     const parsed = JSON.parse(message.toString("utf-8"));
//     switch (parsed.type) {
//       case "newMessage":
//         eventArray.forEach((eventA) => {
//           eventA.send(
//             `${eventArray["nickname"]}: ${parsed.payload.toString("utf-8")}`
//           );
//         });
//         break;
//       case "nickname":
//         eventArray["nickname"] = parsed.payload.toString("utf-8");
//         break;
//     }
//   });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
