export function toolReducer(
  state,
  event
) {

  switch(event.type) {

    case "TOOL_RESULT":

      if (!state.runtime.toolResults) {
        state.runtime.toolResults = [];
      }

      state.runtime.toolResults.push(
        event.payload
      );

      break;

    case "TOOL_ERROR":

      if (!state.runtime.toolErrors) {
        state.runtime.toolErrors = [];
      }

      state.runtime.toolErrors.push(
        event.payload
      );

      break;
  }
}
