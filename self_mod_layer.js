export class SelfModificationEngine {
  constructor() {
    this.pressure = 0;
    this.events = [];
  }

  evaluate(state, memory, score) {
    const entropy = state.world.entropy;
    const stability = state.self.stability;

    // instability + poor performance creates modification pressure
    this.pressure =
      (entropy * 0.4) +
      ((1 - stability) * 0.4) +
      ((score < 0) ? 0.2 : 0);

    return this.pressure;
  }

  shouldMutate() {
    return this.pressure > 0.65;
  }

  proposeMutation(state) {
    return {
      type: "tune_parameters",
      deltaEntropyFactor: (Math.random() - 0.5) * 0.02,
      deltaStabilityGain: (Math.random() - 0.5) * 0.02
    };
  }
}
