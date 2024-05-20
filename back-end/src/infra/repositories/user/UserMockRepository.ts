import IUserRepository from '@src/ports/repositories/IUserRepository';
import User from '@src/models/user/User';
import MockOrm from '@src/infra/db/MockOrm';
import { UserDto } from './UserDto';

export default class UserMockRepository implements IUserRepository {
    private orm: MockOrm;

    constructor() {
        this.orm = new MockOrm();
    }

    async findAll(): Promise<User[]> {
        const db = await this.orm.open();
        return db.users.map(user => this.fromDataBase(user));
    }

    async find(email: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async save(user: User): Promise<void> {
        const db = await this.orm.open();

        const isUserExists = db.users.find(register => register.email === user.email);
        if (isUserExists) throw new Error("Usuário já cadastrado");

        db.users.push(this.toDataBase(user));
        this.orm.save(db);
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

