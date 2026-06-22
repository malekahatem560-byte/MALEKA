export class GoalEngine {

  execute(state) {

    if (state.goals.length === 0) {

      state.goals.push({
        id: "preserve_continuity",
        priority: 1
      });
    }
  }
}
