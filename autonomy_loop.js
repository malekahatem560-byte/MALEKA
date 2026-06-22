export class AutonomyLoop {
  constructor(engine) {
    this.engine = engine;
    this.cycle = 0;
  }

  tick() {
    const result = this.engine.evolve();

    const drift =
      result.state.world.entropy -
      result.state.self.stability;

    // self-reinforcing continuity signal
    const continuity = Math.max(0, 1 - Math.abs(drift));

    this.cycle++;

    return {
      ...result,
      continuity,
      cycle: this.cycle
    };
  }
}
