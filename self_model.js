export class SelfModel {
  constructor() {
    this.model = {
      stabilityDrift: 0,
      integrityDrift: 0,
      entropySensitivity: 0
    };
  }

  update(state) {
    this.model.stabilityDrift =
      this.model.stabilityDrift * 0.85 + (state.self.stability - 0.5);

    this.model.integrityDrift =
      this.model.integrityDrift * 0.85 + (state.self.integrity - 0.5);

    this.model.entropySensitivity =
      this.model.entropySensitivity * 0.85 + (state.world.entropy - 1);

    return this.model;
  }

  predict(state, goal) {
    const m = this.model;

    let projectedStability =
      state.self.stability + m.stabilityDrift * 0.1;

    let projectedIntegrity =
      state.self.integrity + m.integrityDrift * 0.1;

    let risk =
      Math.abs(m.entropySensitivity) * 0.5;

    if (goal?.type === "increase_stability") {
      projectedStability += 0.05;
    }

    if (goal?.type === "reduce_entropy") {
      risk -= 0.02;
    }

    const score =
      projectedStability * 0.6 +
      projectedIntegrity * 0.4 -
      risk * 0.3;

    return {
      projectedStability,
      projectedIntegrity,
      risk,
      score
    };
  }
}
