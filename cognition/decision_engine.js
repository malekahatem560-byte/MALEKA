export class DecisionEngine {

  execute(state) {

    const goal = state.goals[0];

    if (!goal) {
      state.runtime.lastDecision = "idle";
      return;
    }

    switch (goal.id) {

      case "preserve_continuity":
        state.runtime.lastDecision =
          "maintain_identity";
        break;

      default:
        state.runtime.lastDecision =
          "observe";
    }
  }
}
