export default class Password {
    constructor(
        readonly value: string,
        readonly min: number = 6,
    ) {
        if (this.value.length < this.min) throw new Error(`A senha deve ter no mínimo ${this.min} caracteres`);
        if (!this.isValidPassword(this.value)) throw new Error("A senha deve conter pelo menos uma letra maiúscula, um caractere especial e um número");
    }

    private isValidPassword(password: string): boolean {
        const regex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[0-9])(?=.*[A-Z]).+$/;
        return regex.test(password);
    }
}