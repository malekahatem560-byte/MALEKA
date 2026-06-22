export class CapabilityRegistry {

  execute(state) {

    const capabilities = [
      "memory_write",
      "knowledge_update",
      "goal_management",
      "runtime_execution"
    ];

    state.capabilities = capabilities;
  }
}
