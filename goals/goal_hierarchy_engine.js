export class GoalHierarchyEngine {

  execute(state) {

    if (state.goals.length > 0) {
      return;
    }

    state.goals.push({
      id: "mission_preserve_maleka",
      type: "mission",
      priority: 100,

      children: [
        {
          id: "objective_maintain_identity",
          type: "objective",
          priority: 90,

          children: [
            {
              id: "task_measure_coherence",
              type: "task",
              priority: 80,
              status: "pending"
            }
          ]
        },

        {
          id: "objective_expand_knowledge",
          type: "objective",
          priority: 70,

          children: [
            {
              id: "task_record_runtime",
              type: "task",
              priority: 60,
              status: "pending"
            }
          ]
        }
      ]
    });
  }
}
