export class _Base {
  public parent?: _Base;
  public x: number;

  constructor() {
    this.x = 0;
  }

  get _absoluteX(): number {
    if (this.parent) {
      return this.parent._absoluteX + this.x;
    } else {
      return this.x;
    }
  }
}
