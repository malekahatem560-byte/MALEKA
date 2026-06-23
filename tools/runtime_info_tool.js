export class RuntimeInfoTool {

  execute(payload) {

    return {
      timestamp: Date.now(),
      received: payload
    };
  }
}
