export class KnowledgeGraph {

  execute(state) {

    const recent = state.memory.events.slice(-10);

    for (const event of recent) {

      const entityId = `tick_${event.tick}`;

      const exists = state.knowledge.entities.find(
        e => e.id === entityId
      );

      if (!exists) {

        state.knowledge.entities.push({
          id: entityId,
          type: "runtime_tick",
          timestamp: event.timestamp
        });
      }
    }
  }
}
