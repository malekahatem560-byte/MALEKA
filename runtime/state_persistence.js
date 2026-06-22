import fs from "fs";

export class StatePersistence {

  constructor() {
    this.path = "./storage/maleka_state.json";
  }

  execute(state) {

    try {

      fs.writeFileSync(
        this.path,
        JSON.stringify(state, null, 2)
      );

    } catch (err) {

      console.error(
        "STATE SAVE ERROR:",
        err.message
      );
    }
  }
}
