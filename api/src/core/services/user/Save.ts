import IUseCase from "../IUseCase";
import User from "@src/core/models/user/User";
import IBcrypt from "@src/core/ports/IBcrypt";
import IUserRepository from "@src/core/ports/repository-interfaces/IUserRepository";

type Input = {
    email: string,
    username: string,
    password: string,
    phone: string
}

export default class Save implements IUseCase<Input, User> {
    constructor(
        private repository: IUserRepository,
        private bcrypt: IBcrypt
    ) {
        this.repository = repository;
    }

    async execute({ username, email, password, phone }: Input): Promise<User> {
        const exists = await this.repository.find(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const encryptPassword = await this.bcrypt.hash(password);
        const newUser = new User({
            email,
            username,
            password: encryptPassword,
            phone
        });
        await this.repository.save(newUser);

        return newUser;
    }
}