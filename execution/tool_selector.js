export class ToolSelector {

  execute(state) {

    const action =
      state.runtime.lastAction;

    if (!action) {

      state.runtime.selectedTool = null;
      return;
    }

    switch (action.action) {

      case "analyze":
        state.runtime.selectedTool =
          "runtime_info";
        break;

      case "execute":
        state.runtime.selectedTool =
          "runtime_info";
        break;

      case "verify":
        state.runtime.selectedTool =
          "runtime_info";
        break;

      default:
        state.runtime.selectedTool =
          "runtime_info";
    }
  }
}
