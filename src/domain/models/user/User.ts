import Entity from "@/domain/models/Entity";
import Props from "./Props";
import Password from "@/domain/shared/value-objects/Password";
import Name from "@/domain/shared/value-objects/Name";
import Email from "@/domain/shared/value-objects/Email";
import PhoneNumber from "@/domain/shared/value-objects/PhoneNumber";

export default class User extends Entity {
    readonly name?: Name;
    readonly password: Password;;
    readonly email: Email;
    readonly phone?: PhoneNumber;

    constructor({
        id,
        name,
        password,
        email,
        phone
    }: Props) {
        super(id!);
        this.password = new Password(password);
        this.email = new Email(email);

        if (name) this.name = new Name(name);
        if (phone) this.phone = new PhoneNumber(phone);
    }
}