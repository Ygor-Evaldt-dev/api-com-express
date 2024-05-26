export default class Username {
    constructor(
        readonly value: string,
        private min: number = 3,
        private max: number = 20
    ) {
        if (this.min > this.max) throw new Error("internal error -> min is greater than max");

        if (this.isUsernameWithSpaces(this.value)) throw new Error("Nome de usuário não deve conter espaços vazios");
        if (this.value.length < this.min) throw new Error(`Nome de usuário deve ter no mínimo ${this.min} caracteres`);
        if (this.value.length > this.max) throw new Error(`Nome de usuário deve ter no máximo ${this.max} caracteres`);

        this.value = this.value;
    }

    private isUsernameWithSpaces(value: string): boolean {
        return value.indexOf(" ") >= 0;
    }
}