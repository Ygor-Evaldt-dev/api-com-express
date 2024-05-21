import IUserRepository from "@src/core/ports/repository-interfaces/IUserRepository";
import User from "@src/core/models/user/User";
import FileOrm from "@src/infra/db/FileOrm";
import UserDto from "@src/application/dtos/UserDto";

export default class UserLocalRepository implements IUserRepository {
    private orm: FileOrm;

    constructor() {
        this.orm = new FileOrm();
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
        return new UserDto(
            id.value,
            email,
            password.value,
            phone,
            username
        )
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

