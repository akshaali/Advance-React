export class EventEmitters {
  events = {};

  constructor() {
    this.events = {};
  }

  addEventListener(eventname, callback) {
    console.log("Adding listener for event:", eventname);
    if (!this.events[eventname]) {
      this.events[eventname] = [];
    }

    this.events[eventname].push(callback);
  }

  removeEventListener(eventname, callback) {
    console.log("Removing listener for event:", eventname);
    if (!this.events[eventname]) return;
    this.events[eventname] = this.events[eventname].filter(
      (listener) => listener !== callback
    );
  }

  emitEvent(eventname, ...args) {
    if (this.events[eventname]) {
      this.events[eventname].forEach((listener) => {
        console.log("Emitting event:", eventname, "with args:", args);
        listener(...args);
      });
    }
  }
}
