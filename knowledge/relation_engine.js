export class RelationEngine {

  execute(state) {

    const lastAction =
      state.runtime.lastAction;

    if (!lastAction) {
      return;
    }

    const actionNode =
      "action_" + lastAction.id;

    const exists =
      state.knowledge.nodes.find(
        n => n.id === actionNode
      );

    if (!exists) {

      state.knowledge.nodes.push({
        id: actionNode,
        type: "action",
        action: lastAction.action
      });

      state.knowledge.edges.push({
        source: actionNode,
        target: lastAction.objective,
        relation: "supports"
      });
    }
  }
}
