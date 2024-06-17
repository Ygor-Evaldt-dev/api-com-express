import User from "@/domain/models/user/User";

import IUseCase from "@/domain/services/IUseCase";
import IEncrypter from "@/domain/ports/IEncrypter";
import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";

type Input = {
    name?: string,
    email: string,
    password: string,
    phone?: string
}

export default class Save implements IUseCase<Input, void> {
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncrypter
    ) { }

    async execute({ name, email, password, phone }: Input): Promise<void> {
        const exists = await this.repository.findUnique(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const encryptPassword = await this.encrypter.encrypt(password);
        const user = new User({ name, email, password, phone });

        Object.assign(user, {
            password: {
                value: encryptPassword
            }
        });

        await this.repository.save(user);
    }
}