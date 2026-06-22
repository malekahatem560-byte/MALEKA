export class CapabilityGraph {

  execute(state) {

    state.runtime.capabilityGraph =
      state.capabilities.map(
        capability => ({
          capability,
          enabled: true
        })
      );
  }
}
