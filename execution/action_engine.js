export class ActionEngine {

  execute(state) {

    const queue =
      state.runtime.executionQueue || [];

    if (queue.length === 0) {
      state.runtime.lastAction = null;
      return;
    }

    const action = queue[0];

    state.runtime.lastAction = {
      id: action.id,
      action: action.action,
      objective: action.objective,
      executedAt: Date.now()
    };
  }
}
