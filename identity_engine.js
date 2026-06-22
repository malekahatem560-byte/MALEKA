export class IdentityEngine {
  constructor() {
    this.identityVector = {
      stabilityBias: 0.5,
      entropyAversion: 0.5,
      signalPreference: 0.5
    };

    this.coherence = 1.0;
  }

  update(state, goalMemory) {
    const drift =
      state.world.entropy -
      state.self.stability;

    // identity resists drift
    this.coherence = Math.max(
      0,
      Math.min(1,
        this.coherence - Math.abs(drift) * 0.01
      )
    );

    // slow adaptation of identity vector
    this.identityVector.stabilityBias =
      this.identityVector.stabilityBias * 0.99 +
      state.self.stability * 0.01;

    this.identityVector.entropyAversion =
      this.identityVector.entropyAversion * 0.99 +
      (1 - state.world.entropy) * 0.01;

    this.identityVector.signalPreference =
      this.identityVector.signalPreference * 0.99 +
      state.world.signal * 0.01;

    return this.identityVector;
  }

  score(state, goal) {
    if (!goal) return 0;

    let score = 0;

    if (goal.type === "reduce_entropy") {
      score += this.identityVector.entropyAversion;
    }

    if (goal.type === "increase_stability") {
      score += this.identityVector.stabilityBias;
    }

    if (goal.type === "preserve_signal") {
      score += this.identityVector.signalPreference;
    }

    return score * this.coherence;
  }
}
