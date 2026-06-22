export class EventBus {

  constructor() {
    this.events = [];
  }

  publish(type, payload = {}) {

    this.events.push({
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now()
    });
  }

  drain() {

    const copy = [...this.events];

    this.events = [];

    return copy;
  }
}
