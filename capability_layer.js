export class CapabilityEngine {
  constructor() {
    this.capabilities = {
      reduce_entropy: 0.7,
      increase_stability: 0.6,
      preserve_signal: 0.4
    };
  }

  evaluate(goal) {
    if (!goal) return 0;

    return this.capabilities[goal.type] ?? 0;
  }

  filter(goals) {
    return goals.filter(g => {
      const c = this.evaluate(g);
      g.feasibility = c;
      return c > 0.3;
    });
  }

  best(goals) {
    if (!goals.length) return null;

    return goals
      .sort((a, b) => (b.weight * b.feasibility) - (a.weight * a.feasibility))[0];
  }
}
