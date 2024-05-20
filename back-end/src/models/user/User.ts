import Entity from "@src/shared/Entity";

type Props = {
    id?: string,
    username: string,
    password: string,
    email: string,
    phone: string
}

export default class User extends Entity {
    readonly username: string;
    readonly password: string;;
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
        this.password = password;
        this.email = email;
        this.phone = phone;
    }
}