export class MemoryEngine {

  execute(state) {

    state.memory.events.push({
      tick: state.runtime.tick,
      timestamp: Date.now()
    });

    if (state.memory.events.length > 1000) {
      state.memory.events.shift();
    }
  }
}
