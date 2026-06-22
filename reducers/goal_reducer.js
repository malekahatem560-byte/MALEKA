export function goalReducer(
  state,
  event
) {

  if (
    event.type !==
    "GOAL_CREATED"
  ) {
    return;
  }

  state.goals.push(
    event.payload
  );
}
