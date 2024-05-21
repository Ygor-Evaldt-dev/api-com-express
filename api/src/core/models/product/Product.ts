import Entity from "../Entity";
import { Props } from "./Props";

export default class Product extends Entity {
    readonly code: string;
    readonly name: string;
    readonly price: number;

    constructor({
        id,
        code,
        name,
        price
    }: Props) {
        super(id!);
        this.code = code;
        this.name = name;
        this.price = price;
    }
}