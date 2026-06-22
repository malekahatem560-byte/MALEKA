export class ReasoningEngine {

  execute(state) {

    const edges =
      state.knowledge.edges || [];

    const supports =
      edges.filter(
        e => e.relation === "supports"
      ).length;

    state.runtime.reasoning = {
      supportRelations: supports,
      graphSize: edges.length
    };
  }
}
