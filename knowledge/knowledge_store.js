export class KnowledgeStore {

  execute(state) {

    if (!state.knowledge.nodes) {
      state.knowledge.nodes = [];
    }

    if (!state.knowledge.edges) {
      state.knowledge.edges = [];
    }

    const tickNode = {
      id: "tick_" + state.runtime.tick,
      type: "runtime_tick",
      tick: state.runtime.tick
    };

    state.knowledge.nodes.push(tickNode);

    if (state.knowledge.nodes.length > 1) {

      const previous =
        state.knowledge.nodes[
          state.knowledge.nodes.length - 2
        ];

      state.knowledge.edges.push({
        source: previous.id,
        target: tickNode.id,
        relation: "precedes"
      });
    }
  }
}
