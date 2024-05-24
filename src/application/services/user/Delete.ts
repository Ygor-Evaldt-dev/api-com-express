import IUseCase from "@/application/services/IUseCase";
import IUserRepository from "@/core/ports/repository-interfaces/IUserRepository";

export default class Delete implements IUseCase<string, Promise<void>> {
    constructor(
        private repository: IUserRepository
    ) { }

    async execute(email: string): Promise<Promise<void>> {
        const userToDelete = await this.repository.find(email);
        if (userToDelete === null) throw new Error("Usuário não cadastrado");

        await this.repository.delete(userToDelete.id.value);
    }

}