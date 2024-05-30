import Dto from "@/application/dtos/ITaskDto";
import IUseCase from "../IUseCase";
import Task from "@/core/models/task/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";

export default class Save implements IUseCase<Dto, void> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute({ id, title, finished, description, userId }: Dto): Promise<void> {
        const task = new Task({ id, title, finished, description, userId });
        await this.repository.save(task);
    }
}