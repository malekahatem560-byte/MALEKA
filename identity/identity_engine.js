export class IdentityEngine {

  execute(state) {

    state.identity.coherence =
      Math.max(
        0,
        Math.min(
          1,
          state.identity.coherence - (state.identity.drift * 0.01)
        )
      );
  }
}
