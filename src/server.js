import http from "http";
import WebSocket from "ws";
import express from "express";
import { Socket } from "dgram";
import { parse } from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const eventArray = [];

wss.on("connection", (event) => {
  eventArray.push(event);
  eventArray["nickname"] = "Anon";
  console.log("Connected to Browser ✓");
  event.on("close", () => {
    console.log("Disconnected from the Browser 𐄂");
  });
  event.on("message", (message) => {
    const parsed = JSON.parse(message.toString("utf-8"));
    switch (parsed.type) {
      case "newMessage":
        eventArray.forEach((eventA) => {
          eventA.send(
            `${eventArray["nickname"]}: ${parsed.payload.toString("utf-8")}`
          );
        });
        break;
      case "nickname":
        eventArray["nickname"] = parsed.payload.toString("utf-8");
        break;
    }
  });
});

server.listen(3000, handleListen);
