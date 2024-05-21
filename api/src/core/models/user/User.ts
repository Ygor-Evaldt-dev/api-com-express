import Entity from "@src/core/models/Entity";
import { Props } from "./Props";
import Password from "@src/core/value-objects/Password";

export default class User extends Entity {
    readonly username: string;
    readonly password: Password;;
    readonly email: string;;
    readonly phone: string;

    constructor({
        id,
        username,
        password,
        email,
        phone
    }: Props) {
        super(id!);
        this.username = username;
        this.password = new Password(password);
        this.email = email;
        this.phone = phone;
    }
}