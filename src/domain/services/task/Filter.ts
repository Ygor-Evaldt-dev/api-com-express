import ITaskRepository from "@/domain/ports/repository-interfaces/ITaskRepository";
import IUseCase from "@/domain/services/IUseCase";
import Task from "@/domain/models/task/Task";

import { PaginatedOutput as Output } from "@/domain/services/task/types/PaginatedOutput";

type Input = {
    userId: string,
    id?: string,
    title?: string,
    finished?: boolean,
    page: number;
    take: number;
}

export default class Filter implements IUseCase<Input, Output> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute({ userId, page, take, id, title, finished }: Input): Promise<Output> {
        const promises: [Promise<number>, Promise<Task[] | []>] = [
            this.repository.total(userId, id, title, finished),
            this.repository.findMany(userId, page, take, id, title, finished)
        ];
        const [totalRegisters, registers] = await Promise.all(promises);
        const totalPages = Math.ceil(totalRegisters / take);

        return ({
            totalRegisters,
            totalPages,
            page,
            take,
            registers
        });
    }
}