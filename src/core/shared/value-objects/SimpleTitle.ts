export default class SimpleTitle {
    constructor(
        readonly complete: string,
        private min: number = 3,
        private max: number = 100
    ) {
        if (this.min > this.max) throw new Error("internal error -> min is greater than max");
        if (complete.length < this.min) throw new Error(`O título deve ter no mínimo ${this.min} caracteres`);
        if (complete.length > this.max) throw new Error(`O título deve ter no máximo ${this.max} caracteres`);

        this.complete = this.complete.trim().toLowerCase();
    }

    partial(amountOfLetters: number): string {
        return this.complete.substring(0, ++amountOfLetters);
    }

    get lowerCase() {
        return this.complete.toLowerCase();
    }

    get upperCase() {
        return this.complete.toUpperCase();
    }

    get capitalize() {
        const words = this.complete.split(" ");

        for (let i = 0; i < words.length; i++) {
            let letters = words[i].split("");
            letters[0] = letters[0].toUpperCase();
            words[i] = letters.join("");
        }

        return words.join(" ");
    }
}