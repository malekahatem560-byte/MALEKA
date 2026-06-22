export class WorldModel {
  constructor() {
    this.model = {
      entropyTrend: 0,
      signalTrend: 0,
      stabilityTrend: 0
    };
  }

  update(state) {
    this.model.entropyTrend =
      this.model.entropyTrend * 0.8 + (state.world.entropy - 1);

    this.model.signalTrend =
      this.model.signalTrend * 0.8 + (state.world.signal - 1);

    this.model.stabilityTrend =
      this.model.stabilityTrend * 0.8 + (state.self.stability - 0.5);

    return this.model;
  }

  predict(state, goal) {
    const m = this.model;

    const projectedEntropy =
      state.world.entropy + m.entropyTrend;

    const projectedSignal =
      state.world.signal + m.signalTrend;

    const projectedStability =
      state.self.stability + m.stabilityTrend;

    let score = projectedStability * 0.6;

    if (goal?.type === "reduce_entropy") {
      score -= projectedEntropy * 0.4;
    }

    if (goal?.type === "increase_stability") {
      score += projectedStability * 0.5;
    }

    if (goal?.type === "preserve_signal") {
      score += projectedSignal * 0.3;
    }

    return {
      projectedEntropy,
      projectedSignal,
      projectedStability,
      score
    };
  }
}
