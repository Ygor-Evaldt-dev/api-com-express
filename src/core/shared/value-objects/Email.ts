export default class Email {
    constructor(
        readonly complete: string
    ) {
        if (!this.isValid(this.complete)) throw new Error("Endereço de e-mail inválido");
    }

    get provider(): string {
        return this.complete.split("@")[1].split(".")[0];
    }

    private isValid(email: string): boolean {
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
}