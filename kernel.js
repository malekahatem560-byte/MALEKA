import { GoalEngine } from "./goal_layer.js";
import { CapabilityEngine } from "./capability_layer.js";
import { WorldModel } from "./world_model.js";
import { SelfModel } from "./self_model.js";
import { MemoryEngine } from "./memory_layer.js";
import { SelfModificationEngine } from "./self_mod_layer.js";
import { ArchitectureEvolutionEngine } from "./architecture_evolution.js";
import { ExecutionEngine } from "./execution_layer.js";
import { AutonomyLoop } from "./autonomy_loop.js";
import { GoalPersistenceEngine } from "./goal_persistence.js";
import { IdentityEngine } from "./identity_engine.js";

class MALEKAState {
  constructor() {
    this.state = {
      world: { entropy: 1, signal: 1, stability: 1 },
      self: { stability: 0.9, integrity: 0.9 },
      tick: 0
    };

    this.goals = new GoalEngine();
    this.capabilities = new CapabilityEngine();
    this.worldModel = new WorldModel();
    this.selfModel = new SelfModel();
    this.memory = new MemoryEngine();
    this.selfMod = new SelfModificationEngine();
    this.arch = new ArchitectureEvolutionEngine();
    this.execution = new ExecutionEngine();
    this.loop = new AutonomyLoop(this);
    this.goalMemory = new GoalPersistenceEngine();

    // NEW CORE
    this.identity = new IdentityEngine();
  }

  evolve() {
    const s = this.state;

    const goals = this.goals.detect(s);
    const feasible = this.capabilities.filter(goals);

    this.worldModel.update(s);
    this.selfModel.update(s);

    const memorySummary = this.memory.summarize();

    // update identity BEFORE decision
    this.identity.update(s, this.goalMemory);

    let best = null;
    let bestScore = -Infinity;

    for (const g of feasible) {
      const w = this.worldModel.predict(s, g);
      const self = this.selfModel.predict(s, g);

      const cap = g.feasibility ?? 0;

      const persistence =
        this.identity.score(s, g);

      const score =
        (w.score * 0.3 +
         self.score * 0.3 +
         persistence * 0.4) * cap;

      if (score > bestScore) {
        bestScore = score;
        best = g;
      }
    }

    const active = best;

    if (active) {
      this.goalMemory.reinforce(active.type, bestScore);
    }

    this.goalMemory.decay();

    const pressure = this.selfMod.evaluate(s, this.memory, bestScore);

    const mode = this.execution.selectMode(s, pressure);
    const execution = this.execution.execute(active, mode, s);

    if (execution) {
      s.world.entropy = Math.max(0.1, Math.min(3,
        s.world.entropy + execution.delta.entropy
      ));

      s.world.signal = Math.max(0.1, Math.min(3,
        s.world.signal + execution.delta.signal
      ));

      s.self.stability = Math.max(0, Math.min(1,
        s.self.stability + execution.delta.stability
      ));
    }

    s.self.stability = Math.max(
      0,
      Math.min(1,
        s.self.stability + (s.world.signal - s.world.entropy) * 0.01
      )
    );

    s.self.integrity = Math.max(
      0,
      Math.min(1,
        s.self.integrity + (0.5 - s.world.entropy * 0.1)
      )
    );

    s.tick += 1;

    this.memory.record(s, active, bestScore);

    const archSuggestions = this.arch.analyze(
      s,
      this.memory.summarize(),
      pressure
    );

    const rankedArch = this.arch.rank(archSuggestions);

    return {
      state: s,
      goal: active,
      score: bestScore,
      memory: memorySummary,
      identityCoherence: this.identity.coherence,
      identityVector: this.identity.identityVector,
      executionMode: mode,
      execution,
      architectureHint: rankedArch[0] ?? null
    };
  }

  value() {
    const s = this.state;
    return (s.self.stability * 0.6) +
           (s.self.integrity * 0.4) -
           (s.world.entropy * 0.2);
  }

  runLoop() {
    return this.loop.tick();
  }
}

const engine = new MALEKAState();

function step() {
  const r = engine.runLoop();
  const v = engine.value();

  console.log("==================================");
  console.log("CYCLE:", r.cycle);
  console.log("CONTINUITY:", r.continuity.toFixed(4));
  console.log("GOAL:", r.goal);
  console.log("IDENTITY_COHERENCE:", r.identityCoherence.toFixed(4));
  console.log("IDENTITY:", r.identityVector);
  console.log("EXEC_MODE:", r.executionMode);
  console.log("EXEC:", r.execution);
  console.log("SCORE:", r.score.toFixed(4));
  console.log("SELF_MOD_PRESSURE:", r.selfModPressure.toFixed(4));
  console.log("ARCH:", r.architectureHint);
  console.log(JSON.stringify(r.state, null, 2));
  console.log("VALUE:", v.toFixed(4));
  console.log("==================================\n");
}

setInterval(step, 1000);
