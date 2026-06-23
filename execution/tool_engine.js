export class ToolEngine {

  constructor(registry) {
    this.registry = registry;
  }

  execute(state, bus) {

    const action =
      state.runtime.lastAction;

    if (!action) {
      return;
    }

    const tool =
      state.runtime.selectedTool;

    if (!tool) {
      return;
    }

    try {

      const result =
        this.registry.execute(
          tool,
          {
            objective:
              action.objective,
            action:
              action.action
          }
        );

      bus.publish(
        "TOOL_RESULT",
        result
      );

    } catch (err) {

      bus.publish(
        "TOOL_ERROR",
        {
          error: err.message
        }
      );
    }
  }
}
