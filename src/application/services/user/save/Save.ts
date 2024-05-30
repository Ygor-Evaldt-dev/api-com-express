import Dto from "@/application/dtos/IUserDto";
import { Input } from "./Input";

import User from "@/core/models/user/User";

import IUseCase from "@/application/services/IUseCase";
import IEncrypter from "@/core/ports/IEncrypter";
import IUserRepository from "@/core/ports/repository-interfaces/IUserRepository";

export default class Save implements IUseCase<Input, void> {
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncrypter
    ) { }

    async execute({ username, email, password, phone }: Input): Promise<void> {
        const exists = await this.repository.find(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const encryptPassword = await this.encrypter.encrypt(password);
        const user = new User({ username, email, password, phone });

        Object.assign(user, {
            password: {
                value: encryptPassword
            }
        });

        await this.repository.save(user);
    }
}