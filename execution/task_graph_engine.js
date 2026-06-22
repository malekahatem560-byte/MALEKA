export class TaskGraphEngine {

  execute(state) {

    state.runtime.taskGraph = [];

    const walk = (node) => {

      state.runtime.taskGraph.push({
        id: node.id,
        type: node.type,
        priority: node.priority
      });

      if (node.children) {
        for (const child of node.children) {
          walk(child);
        }
      }
    };

    for (const goal of state.goals) {
      walk(goal);
    }
  }
}
