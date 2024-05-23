export default class Username {
    constructor(
        readonly value: string,
        private min: number = 3,
        private max: number = 20
    ) {
        if (this.value.length < this.min) throw new Error(`O nome de usuário deve ter no mínimo ${this.min} caracteres`);
        if (this.value.length > this.max) throw new Error(`O nome de usuário deve ter no máximo ${this.max} caracteres`);
    }
}