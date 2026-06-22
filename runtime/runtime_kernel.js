import { MALEKAState } from "../core/maleka_state.js";
import { EventBus } from "./event_bus.js";

export class RuntimeKernel {

  constructor() {

    this.state = new MALEKAState();

    this.bus = new EventBus();

    this.engines = [];
  }

  register(engine) {

    this.engines.push(engine);
  }

  step() {

    this.state.nextTick();

    for (const engine of this.engines) {

      if (typeof engine.execute === "function") {

        engine.execute(
          this.state,
          this.bus
        );
      }
    }

    const events =
      this.bus.drain();

    stateEventReducer(
      this.state,
      events
    );

    return this.state;
  }
}

function stateEventReducer(
  state,
  events
) {

  for (const event of events) {

    switch (event.type) {

      case "GOAL_CREATED":

        state.goals.push(
          event.payload
        );

        break;

      case "MEMORY_EVENT":

        state.memory.events.push(
          event.payload
        );

        break;
    }
  }
}
