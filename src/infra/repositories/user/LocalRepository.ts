import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";
import User from "@/domain/models/user/User";
import FileOrm from "@/infra/db/FileOrm";

import { IEntity } from "./IEntity";

export default class LocalRepository implements IUserRepository {
    private orm: FileOrm;

    constructor() {
        this.orm = new FileOrm();
    }

    async save(user: User): Promise<void> {
        const db = await this.orm.open();

        const exists = await this.findUnique(user.id.value);
        if (exists) {
            db.users.forEach((item) => {
                if (item.id === user.id.value)
                    item = this.toDataBase(user);
            });
        } else {
            db.users.push(this.toDataBase(user));
        }


        await this.orm.save(db);
    }

    async findMany(): Promise<User[] | null> {
        const db = await this.orm.open();

        return db.users[0]
            ? db.users.map(user => this.fromDataBase(user))
            : null
    }

    async findUnique(email?: string, id?: string): Promise<User | null> {
        const db = await this.orm.open();
        const user = email
            ? db.users.find(user => user.email === email)
            : db.users.find(user => user.id === id);

        return user
            ? this.fromDataBase(user)
            : null;
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
            telefone: phone ? phone.value : undefined,
            nome_usuario: name ? name.value : undefined
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

