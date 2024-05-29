import Dto from "@/application/dtos/ITaskDto";
import IUseCase from "../IUseCase";
import Task from "@/core/models/task/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";

export default class Save implements IUseCase<Dto, Task> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute({ title, finished, description, userId }: Dto): Promise<Task> {
        const task = new Task({ title, finished, description, userId });
        await this.repository.save(task);

        return task;
    }
}