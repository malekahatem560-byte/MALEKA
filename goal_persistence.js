export class GoalPersistenceEngine {
  constructor() {
    this.activeGoals = new Map();
  }

  reinforce(goalType, score) {
    const current = this.activeGoals.get(goalType) || {
      strength: 0,
      age: 0
    };

    current.strength += score * 0.1;
    current.age += 1;

    this.activeGoals.set(goalType, current);
  }

  decay() {
    for (const [k, v] of this.activeGoals.entries()) {
      v.strength *= 0.98;
      v.age += 1;

      if (v.strength < 0.05) {
        this.activeGoals.delete(k);
      }
    }
  }

  getBias() {
    let bias = {
      reduce_entropy: 0,
      increase_stability: 0,
      preserve_signal: 0
    };

    for (const [k, v] of this.activeGoals.entries()) {
      if (bias[k] !== undefined) {
        bias[k] += v.strength;
      }
    }

    return bias;
  }
}
