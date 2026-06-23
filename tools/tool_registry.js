export class ToolRegistry {

  constructor() {
    this.tools = new Map();
  }

  register(name, tool) {
    this.tools.set(name, tool);
  }

  execute(name, payload = {}) {

    const tool = this.tools.get(name);

    if (!tool) {
      throw new Error(
        `Tool not found: ${name}`
      );
    }

    return tool.execute(payload);
  }
}
