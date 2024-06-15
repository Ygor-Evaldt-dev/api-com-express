import IUseCase from "@/domain/services/IUseCase";
import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";

export default class Delete implements IUseCase<string, Promise<void>> {
    constructor(
        private repository: IUserRepository
    ) { }

    async execute(email: string): Promise<Promise<void>> {
        const userToDelete = await this.repository.findUnique(email);
        if (userToDelete === null) throw new Error("Usuário não cadastrado");

        await this.repository.delete(userToDelete.id.value);
    }

}