import { RuntimeKernel } from "./runtime/runtime_kernel.js";

import { loadState } from "./runtime/state_loader.js";
import { StatePersistence } from "./runtime/state_persistence.js";

import { IdentityEngine } from "./identity/identity_engine.js";

import { GoalHierarchyEngine } from "./goals/goal_hierarchy_engine.js";

import { PlannerEngine } from "./cognition/planner_engine.js";
import { ReasoningEngine } from "./cognition/reasoning_engine.js";

import { MemoryEngine } from "./memory/memory_engine.js";
import { PlanMemory } from "./memory/plan_memory.js";

import { KnowledgeStore } from "./knowledge/knowledge_store.js";
import { RelationEngine } from "./knowledge/relation_engine.js";

import { CapabilityRegistry } from "./execution/capability_registry.js";
import { CapabilityGraph } from "./execution/capability_graph.js";

import { DecisionEngine } from "./cognition/decision_engine.js";

import { TaskGraphEngine } from "./execution/task_graph_engine.js";

import { ExecutionEngine } from "./execution/execution_engine.js";

import { ExecutorQueue } from "./execution/executor_queue.js";

import { ActionEngine } from "./execution/action_engine.js";

const kernel = new RuntimeKernel();

loadState(kernel);

kernel.register(new IdentityEngine());

kernel.register(new GoalHierarchyEngine());

kernel.register(new PlannerEngine());

kernel.register(new MemoryEngine());

kernel.register(new PlanMemory());

kernel.register(new CapabilityRegistry());

kernel.register(new CapabilityGraph());

kernel.register(new DecisionEngine());

kernel.register(new TaskGraphEngine());

kernel.register(new ExecutionEngine());

kernel.register(new ExecutorQueue());

kernel.register(new ActionEngine());

kernel.register(new KnowledgeStore());

kernel.register(new RelationEngine());

kernel.register(new ReasoningEngine());

kernel.register(new StatePersistence());

setInterval(() => {

  const state = kernel.step();

  console.clear();

  console.log(
    JSON.stringify(
      {
        tick: state.runtime.tick,

        plans:
          state.runtime.generatedTasks?.length || 0,

        queue:
          state.runtime.executionQueue?.length || 0,

        nodes:
          state.knowledge.nodes?.length || 0,

        edges:
          state.knowledge.edges?.length || 0,

        saved: true
      },
      null,
      2
    )
  );

}, 1000);
