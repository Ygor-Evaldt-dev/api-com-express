import Entity from "@/core/models/Entity";
import Props from "./Props";
import Password from "@/core/shared/value-objects/Password";
import Username from "@/core/shared/value-objects/Username";
import Email from "@/core/shared/value-objects/Email";

export default class User extends Entity {
    readonly username: Username;
    readonly password: Password;;
    readonly email: Email;
    readonly phone: string;

    constructor({
        id,
        username,
        password,
        email,
        phone
    }: Props) {
        super(id!);
        this.username = new Username(username);
        this.password = new Password(password);
        this.email = new Email(email);
        this.phone = phone;
    }
}