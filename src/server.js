import http from "http";
import WebSocket from "ws";
import express from "express";
import { Socket } from "dgram";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (event) => {
  console.log("Connected to Browser ✓");
  event.send("hello browser");
  event.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  event.on("close", () => {
    console.log("Disconnected from the Browser 𐄂");
  });
});

server.listen(3000, handleListen);
