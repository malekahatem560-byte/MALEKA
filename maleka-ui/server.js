import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer();
const wss = new WebSocketServer({ server });

let goals = [
  { id: "g1", pressure: 0.5, vitality: 1.0 },
  { id: "g2", pressure: 0.7, vitality: 1.0 }
];

let reasoningEdges = [];

function step() {

  // evolve goals
  goals = goals.map(g => {
    g.pressure += (Math.random() - 0.5) * 0.1;
    g.vitality -= 0.005;
    return g;
  }).filter(g => g.vitality > 0);

  // random new goal
  if (Math.random() > 0.7) {
    goals.push({
      id: "g" + Date.now(),
      pressure: Math.random(),
      vitality: 1.0
    });
  }

  // rebuild edges
  reasoningEdges = [];
  for (let a of goals) {
    for (let b of goals) {
      if (a.id !== b.id && Math.random() > 0.7) {
        reasoningEdges.push({
          from: a.id,
          to: b.id,
          weight: Math.random()
        });
      }
    }
  }

  return {
    tick: Date.now(),
    goals,
    reasoningEdges,
    entropy: Math.random(),
    signal: Math.random(),
    stability: Math.random()
  };
}

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    ws.send(JSON.stringify(step()));
  }, 1000);

  ws.on("close", () => clearInterval(interval));
});

server.listen(3000, () => {
  console.log("MALEKA CORE SERVER RUNNING ON 3000");
});
