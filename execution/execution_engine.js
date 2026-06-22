export class ExecutionEngine {

  execute(state) {

    const graph = state.runtime.taskGraph || [];

    const tasks = graph
      .filter(n => n.type === "task")
      .sort((a, b) => b.priority - a.priority);

    if (tasks.length === 0) {

      state.runtime.activeTask = null;
      return;
    }

    state.runtime.activeTask = tasks[0].id;
  }
}
