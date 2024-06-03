import Entity from "@/core/models/Entity";
import Props from "./Props";
import Password from "@/core/shared/value-objects/Password";
import Name from "@/core/shared/value-objects/Name";
import Email from "@/core/shared/value-objects/Email";
import PhoneNumber from "@/core/shared/value-objects/PhoneNumber";

export default class User extends Entity {
    readonly name: Name;
    readonly password: Password;;
    readonly email: Email;
    readonly phone: PhoneNumber;

    constructor({
        id,
        name,
        password,
        email,
        phone
    }: Props) {
        super(id!);
        this.name = new Name(name);
        this.password = new Password(password);
        this.email = new Email(email);
        this.phone = new PhoneNumber(phone);
    }
}