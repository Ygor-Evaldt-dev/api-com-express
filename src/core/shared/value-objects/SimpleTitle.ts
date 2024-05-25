export default class SimpleTitle {
    constructor(
        readonly complete: string,
        private min: number = 3,
        private max: number = 100
    ) {
        if (this.min > this.max) throw new Error("internal error -> min is greater than max");
        if (complete.length < this.min) throw new Error(`O título deve ter no mínimo ${this.min} caracteres`);
        if (complete.length > this.max) throw new Error(`O título deve ter no máximo ${this.max} caracteres`);
    }

    partial(amountOfLetters: number): string {
        return this.complete.substring(0, ++amountOfLetters);
    }
}