import { UserDto } from "@src/shared/dtos/UserDto";
import IUseCase from "../IUseCase";
import User from "@src/models/user/User";
import IUserRepository from "@src/ports/user/IUserRepository";

export default class Save implements IUseCase<UserDto, User> {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }

    async execute({ email, nome_usuario, senha, telefone }: UserDto): Promise<User> {
        const exists = await this.repository.find(email);
        if (exists) throw new Error("Usuário já cadastrado");

        const newUser = new User({
            email,
            username: nome_usuario,
            password: senha,
            phone: telefone
        })

        await this.repository.save(newUser);
        return newUser;
    }
}