import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { spawn } from "child_process";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let kernel = null;

function broadcast(data) {
  wss.clients.forEach(c => {
    if (c.readyState === 1) c.send(data);
  });
}

app.get("/start", (req, res) => {
  if (kernel) return res.send("RUNNING");

  kernel = spawn("node", ["kernel.js"]);

  kernel.stdout.on("data", d => broadcast(d.toString()));
  kernel.stderr.on("data", d => broadcast("ERR: " + d.toString()));

  res.send("STARTED");
});

app.get("/stop", (req, res) => {
  if (kernel) {
    kernel.kill();
    kernel = null;
  }
  res.send("STOPPED");
});

app.get("/status", (req, res) => {
  res.json({ running: !!kernel });
});

server.listen(3000, () => {
  console.log("MALEKA CONTROL PLANE running on :3000");
});
