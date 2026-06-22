import fs from "fs";
import { MALEKAState } from "../core/maleka_state.js";

export function loadState(kernel) {

  const path = "./storage/maleka_state.json";

  try {

    if (!fs.existsSync(path)) {
      return;
    }

    const raw = fs.readFileSync(path, "utf8");

    const saved = JSON.parse(raw);

    const state = new MALEKAState();

    Object.assign(state, saved);

    kernel.state = state;

    console.log("STATE RESTORED");

  } catch (err) {

    console.error(
      "STATE LOAD ERROR:",
      err.message
    );
  }
}
