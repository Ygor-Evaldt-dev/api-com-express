import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import IUseCase from "../IUseCase";
import Task from "@/core/models/task/Task";

type Input = {
    page: number;
    take: number;
}

type Output = {
    total: number;
    page: number,
    take: number,
    registers: Task[] | [];
}

export default class FindAll implements IUseCase<Input, Output> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute({ page, take }: Input): Promise<Output> {
        const promises: [Promise<number>, Promise<Task[] | []>] = [
            this.repository.total(),
            this.repository.findAll(page, take)
        ];
        const [total, registers] = await Promise.all(promises);

        return ({
            total,
            page,
            take,
            registers
        });
    }
}