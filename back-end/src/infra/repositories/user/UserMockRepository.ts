import IUserRepository from "@src/ports/user/IUserRepository";
import User from "@src/models/user/User";
import MockOrm from "@src/infra/db/MockOrm";
import { UserDto } from "@src/shared/dtos/UserDto";

export default class UserMockRepository implements IUserRepository {
    private orm: MockOrm;

    constructor() {
        this.orm = new MockOrm();
    }

    async findAll(): Promise<User[] | null> {
        const db = await this.orm.open();

        return db.users[0]
            ? db.users.map(user => this.fromDataBase(user))
            : null
    }

    async find(email: string): Promise<User | null> {
        const db = await this.orm.open();
        const user = db.users.find(user => user.email === email);

        return user
            ? this.fromDataBase(user)
            : null;
    }

    async save(user: User): Promise<void> {
        const db = await this.orm.open();

        const isUserExists = db.users.find(register => register.email === user.email);
        if (isUserExists) throw new Error("Usuário já cadastrado");

        db.users.push(this.toDataBase(user));
        this.orm.save(db);
    }

    async update(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private toDataBase({ id, email, password, phone, username }: User): UserDto {
        return ({
            id: id.value,
            email,
            senha: password,
            telefone: phone,
            nome_usuario: username
        });
    }

    private fromDataBase({ id, email, senha, telefone, nome_usuario }: UserDto): User {
        return new User({
            id,
            email,
            password: senha,
            phone: telefone,
            username: nome_usuario
        });
    }
}

