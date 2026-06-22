export class PlannerEngine {

  execute(state) {

    state.runtime.generatedTasks = [];

    const visit = (node) => {

      if (node.type === "objective") {

        state.runtime.generatedTasks.push({
          id: "plan_" + node.id,
          objective: node.id,
          action: "analyze",
          priority: node.priority
        });

        state.runtime.generatedTasks.push({
          id: "execute_" + node.id,
          objective: node.id,
          action: "execute",
          priority: node.priority - 10
        });

        state.runtime.generatedTasks.push({
          id: "verify_" + node.id,
          objective: node.id,
          action: "verify",
          priority: node.priority - 20
        });
      }

      if (node.children) {
        for (const child of node.children) {
          visit(child);
        }
      }
    };

    for (const goal of state.goals) {
      visit(goal);
    }
  }
}
