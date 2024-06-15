import IEncrypter from "@/domain/ports/IEncrypter";
import ITokenProvider from "@/domain/ports/ITokenProvider";
import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";
import IUseCase from "@/domain/services/IUseCase";
import User from "@/domain/models/user/User";

type Input = {
    email: string,
    password: string
}

type Output = {
    user: User,
    token: string
}

export default class Login implements IUseCase<Input, Output> {
    constructor(
        private repository: IUserRepository,
        private encrypter: IEncrypter,
        private tokenProvider: ITokenProvider
    ) { }

    async execute({
        email,
        password
    }: Input): Promise<Output> {
        const user = await this.repository.findUnique(email);
        if (!user) throw new Error("Usuário não cadastrado");

        const isValidPassword = await this.encrypter.compare(password, user.password.value);
        if (!isValidPassword) throw new Error("Senha inválida");

        const token = this.tokenProvider.generate({
            id: user.id.value,
            email: user.email
        });

        Object.assign(user, { password: null });
        return ({
            user,
            token
        })
    }


}