/**
 * テストケースの例を示すためのクラス
 */
export class Greeter {
    private user: string;

    constructor(user: string) {
        this.user = user;
    }

    greet() {
        return `Hello, ${this.user}!`;
    }
}
