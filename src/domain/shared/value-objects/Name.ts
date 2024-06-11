export default class Name {
    constructor(
        readonly value: string,
        private min: number = 3,
        private max: number = 100
    ) {
        if (this.min > this.max) throw new Error("internal server error -> min is greater than max");
        if (this.value.length < this.min) throw new Error(`Nome deve ter no mínimo ${this.min} caracteres`);
        if (this.value.length > this.max) throw new Error(`Nome deve ter no máximo ${this.max} caracteres`);

        this.value = this.value;
    }
}