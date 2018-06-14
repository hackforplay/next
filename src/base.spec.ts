import 'mocha';
import { expect } from 'chai';
import { _Base } from './base';

describe('Base object class', () => {
  it('Instantiate', () => {
    const item = new _Base();
    expect(item).to.instanceof(_Base);
  });

  it('Set position relatively', () => {
    const parent = new _Base();
    parent.x = 1;
    expect(parent._absoluteX).to.equal(1);

    const child = new _Base();
    child.x = 1;
    child.parent = parent;
    expect(child._absoluteX).to.equal(2);
  });
});
