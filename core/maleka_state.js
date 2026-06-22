export class MALEKAState {
  constructor() {

    this.identity = {
      id: "MALEKA-Ω",
      continuity: 1,
      coherence: 1,
      drift: 0
    };

    this.goals = [];

    this.memory = {
      events: [],
      concepts: []
    };

    this.knowledge = {
      entities: [],
      relations: []
    };

    this.capabilities = [];

    this.resources = {
      energy: 1,
      compute: 1
    };

    this.constraints = [];

    this.runtime = {
      tick: 0,
      startedAt: Date.now()
    };
  }

  nextTick() {
    this.runtime.tick += 1;
  }
}
