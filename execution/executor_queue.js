export class ExecutorQueue {

  execute(state) {

    const plans =
      state.memory.plans || [];

    const queue =
      plans
        .slice()
        .sort((a,b) => b.priority - a.priority);

    state.runtime.executionQueue = queue;
  }
}
