import IUseCase from "../IUseCase";
import User from "@src/core/models/user/User";
import IUserRepository from "@src/core/ports/user/IUserRepository";

export default class Save implements IUseCase<User, User> {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }

    async execute({ username, email, password, phone }: User): Promise<User> {
        const exists = await this.repository.find(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const newUser = new User({
            email,
            username,
            password,
            phone
        });
        await this.repository.save(newUser);

        return newUser;
    }
}