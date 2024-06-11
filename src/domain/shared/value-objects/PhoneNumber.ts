export default class PhoneNumber {
    constructor(
        readonly value: string
    ) {
        this.value = this.removeSpecialCaracters(this.value);
        if (
            this.isInvalidNumberOfDigits(this.value)
            || this.isInvalidFirstDigit(this.value)
            || !this.isValidDDD(this.value)
        ) throw new Error("Número de celular inválido");
    }

    get ddd() {
        return this.value.substring(0, 2);
    }

    get withoutDDD() {
        return this.value.substring(2);
    }

    private removeSpecialCaracters(value: string) {
        return value.replace(/\D/g, "");
    }

    private isInvalidNumberOfDigits(value: string) {
        const numberOfPhoneDigits = 11
        return value.length !== numberOfPhoneDigits;
    }

    private isInvalidFirstDigit(value: string) {
        const validFirstDigit = 9;
        return parseInt(value.substring(2, 3)) !== validFirstDigit;
    }

    private isValidDDD(value: string) {
        const DDDs = [...Array(100).keys()].filter(number => number > 10);
        return DDDs.indexOf(parseInt(value.substring(0, 2))) !== -1;
    }
}