/**
 * addEventListener(Function, { once: true }); だけの EventTarget
 */
export class Once {
  private listeners = new Set<Function>();
  add(listener: Function) {
    this.listeners.add(listener);
  }
  emit() {
    const copy = new Set(this.listeners);
    this.listeners.clear();
    copy.forEach(cb => {
      try {
        cb();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
