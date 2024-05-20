type Props = {
    code: string,
    name: string,
    price: number
}

export default class Product {
    readonly code: string;
    readonly name: string;
    readonly price: number;

    constructor({
        code,
        name,
        price
    }: Props) {
        this.code = code;
        this.name = name;
        this.price = price;
    }
}