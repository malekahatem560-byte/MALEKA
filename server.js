import { WebSocketServer } from "ws";
import http from "http";

import { MemoryGraph } from "./core/memory_graph.js";
import { WorldModel } from "./core/world_model.js";
import { IdentityEngine } from "./core/identity_engine.js";

import { SemanticWorldModel } from "./cognition/semantic_world_model.js";
import { GoalOriginEngine } from "./cognition/goal_origin_engine.js";
import { CognitiveOrganism } from "./organism/state_organism.js";
import { GoalEcosystem } from "./cognition/goal_ecosystem.js";

import { IOGateway } from "./bridge/io_gateway.js";
import { SafeActuator } from "./execution/safe_actuator.js";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const memory = new MemoryGraph();
const world = new WorldModel();
const identity = new IdentityEngine();

const semantic = new SemanticWorldModel();
const goalEngine = new GoalOriginEngine();

const organism = new CognitiveOrganism();
const ecosystem = new GoalEcosystem();

const io = new IOGateway();
const actuator = new SafeActuator();

let goals = [];

function tick() {

  // 1. world step
  const worldState = world.step(0.1);

  // 2. ingest external signals
  const externalEvents = io.read();

  // 3. identity + semantics
  const idState = identity.evaluate({ world: worldState, goals });
  const semanticState = semantic.embed(worldState, idState, {});

  const signal = {
    entropy: worldState.entropy,
    structure: semanticState.magnitude,
    stability: idState.coherence
  };

  // 4. organism cognition
  const layers = organism.update(signal);

  // 5. goal generation
  ecosystem.spawn(layers.meaning);
  const ecosystemGoals = ecosystem.evolve();

  const generatedGoals = goalEngine.generate({
    tension: layers.meaning.tension,
    entropy: signal.entropy,
    drift: idState.drift
  });

  goals = [...ecosystemGoals, ...generatedGoals];

  // 6. memory
  memory.addEvent({
    id: "event-" + Date.now(),
    type: "bridge_tick",
    intensity: layers.meaning.tension,
    externalEvents: externalEvents.length
  });

  // 7. OUTPUT TO EXTERNAL WORLD (SAFE)
  const proposedActions = goals.map(g => ({
    type: "log",
    payload: g.type
  }));

  for (const a of proposedActions) {
    io.propose(a);
  }

  const executed = io.flush().map(actuator.execute.bind(actuator));

  return {
    tick: Date.now(),
    world: worldState,
    identity: idState,
    organism: layers,
    goals,
    externalEvents,
    executed
  };
}

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    ws.send(JSON.stringify(tick()));
  }, 500);

  ws.on("close", () => clearInterval(interval));
});

server.listen(3000, () => {
  console.log("MALEKA PHASE 11 ACTIVE — BRIDGE LAYER ONLINE");
});
