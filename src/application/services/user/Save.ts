import IUseCase from "@/application/services/IUseCase";
import User from "@/core/models/user/User";
import IEncrypter from "@/core/ports/IEncrypter";
import IUserRepository from "@/core/ports/repository-interfaces/IUserRepository";

type Input = {
    email: string,
    username: string,
    password: string,
    phone: string
}

export default class Save implements IUseCase<Input, User> {
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncrypter
    ) { }

    async execute({ username, email, password, phone }: Input): Promise<User> {
        const exists = await this.repository.find(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const encryptPassword = await this.encrypter.encrypt(password);
        const newUser = new User({
            email,
            username,
            password,
            phone
        });
        const userEncrypted = Object.assign(newUser, {
            password: {
                value: encryptPassword
            }
        });
        await this.repository.save(userEncrypted);

        return userEncrypted;
    }
}