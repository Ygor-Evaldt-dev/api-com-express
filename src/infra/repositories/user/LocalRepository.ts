import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";
import User from "@/domain/models/user/User";
import FileOrm from "@/infra/db/FileOrm";

import { IEntity } from "./IEntity";

export default class LocalRepository implements IUserRepository {
    private orm: FileOrm;

    constructor() {
        this.orm = new FileOrm();
    }

    async findMany(): Promise<User[] | null> {
        const db = await this.orm.open();

        return db.users[0]
            ? db.users.map(user => this.fromDataBase(user))
            : null
    }

    async findUnique(email: string): Promise<User | null> {
        const db = await this.orm.open();
        const user = db.users.find(user => user.email === email);

        return user
            ? this.fromDataBase(user)
            : null;
    }

    async save(user: User): Promise<void> {
        const db = await this.orm.open();

        db.users.push(this.toDataBase(user));
        await this.orm.save(db);
    }

    async delete(id: string): Promise<void> {
        const db = await this.orm.open();

        db.users = db.users.filter(user => user.id !== id);
        await this.orm.save(db);
    }

    private toDataBase({ id, email, password, phone, name }: User): IEntity {
        return ({
            id: id.value,
            email: email.complete,
            senha: password.value,
            telefone: phone.value,
            nome_usuario: name.value
        });
    }

    private fromDataBase({ id, email, senha, telefone, nome_usuario }: IEntity): User {
        return new User({
            id,
            email,
            password: senha,
            phone: telefone,
            name: nome_usuario
        });
    }
}

