import 'mocha';
import { expect } from 'chai';
import { Greeter } from './example';

describe("example of testing", () => {
    it("should greet with name", () => {
        const greeter = new Greeter('World');
        expect(greeter.greet()).to.equal('Hello, World!');
    });
});
