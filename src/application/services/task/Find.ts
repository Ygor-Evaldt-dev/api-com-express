import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import IUseCase from "../IUseCase";
import Task from "@/core/models/task/Task";

export default class Find implements IUseCase<string, Promise<Task> | null> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute(id: string): Promise<Promise<Task> | null> {
        const task = await this.repository.find(id);
        return task;
    }
}