export class MemoryEngine {
  constructor() {
    this.trajectory = [];
  }

  record(state, goal, score) {
    this.trajectory.push({
      tick: state.tick,
      entropy: state.world.entropy,
      signal: state.world.signal,
      stability: state.self.stability,
      integrity: state.self.integrity,
      goal: goal?.type ?? null,
      score
    });

    if (this.trajectory.length > 200) {
      this.trajectory.shift();
    }
  }

  summarize() {
    if (this.trajectory.length < 2) return null;

    const recent = this.trajectory.slice(-20);

    const avgEntropy =
      recent.reduce((a, b) => a + b.entropy, 0) / recent.length;

    const avgStability =
      recent.reduce((a, b) => a + b.stability, 0) / recent.length;

    const goalCounts = {};

    for (const t of recent) {
      if (!t.goal) continue;
      goalCounts[t.goal] = (goalCounts[t.goal] || 0) + 1;
    }

    return {
      avgEntropy,
      avgStability,
      dominantGoal: Object.entries(goalCounts)
        .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
    };
  }
}
