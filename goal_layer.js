export class GoalEngine {
  constructor() {
    this.goals = [];
  }

  detect(state) {
    const g = [];

    const entropyPressure = state.world.entropy;
    const stabilityPressure = 1 - state.self.stability;

    if (entropyPressure > 1.2) {
      g.push({ type: "reduce_entropy", weight: entropyPressure });
    }

    if (stabilityPressure > 0.4) {
      g.push({ type: "increase_stability", weight: stabilityPressure });
    }

    if (state.world.signal < 1) {
      g.push({ type: "preserve_signal", weight: 1 - state.world.signal });
    }

    this.goals = g;
    return g;
  }

  select(goals) {
    if (!goals.length) return null;
    return goals.sort((a, b) => b.weight - a.weight)[0];
  }
}
