import TaskDto from "@/application/dtos/TaskDto";
import IUseCase from "../IUseCase";
import Task from "@/core/models/taks/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";

export default class Save implements IUseCase<TaskDto, Task> {
    constructor(
        private repository: ITaskRepository
    ) { }

    execute(data: TaskDto): Promise<Task> {
        throw new Error("Method not implemented.");
    }


}