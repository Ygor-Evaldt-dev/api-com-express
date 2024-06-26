import ITaskRepository from "@/domain/ports/repository-interfaces/ITaskRepository";
import IUseCase from "@/domain/services/IUseCase";

export default class Delete implements IUseCase<string, Promise<void>> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<Promise<void>> {
        const task = await this.repository.findUnique(id);
        if (task === null) throw new Error("Tarefa não cadastrada");

        await this.repository.delete(id);
    }
}