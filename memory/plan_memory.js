export class PlanMemory {

  execute(state) {

    if (!state.memory.plans) {
      state.memory.plans = [];
    }

    const generated =
      state.runtime.generatedTasks || [];

    for (const task of generated) {

      const exists =
        state.memory.plans.find(
          p => p.id === task.id
        );

      if (!exists) {
        state.memory.plans.push(task);
      }
    }
  }
}
