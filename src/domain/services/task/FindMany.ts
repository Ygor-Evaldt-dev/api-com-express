import ITaskRepository from "@/domain/ports/repository-interfaces/ITaskRepository";
import IUseCase from "@/domain/services/IUseCase";
import Task from "@/domain/models/task/Task";

import { PaginatedOutput as Output } from "@/domain/services/task/types/PaginatedOutput";

type Input = {
    userId: string,
    page: number;
    take: number;
}

export default class FindMany implements IUseCase<Input, Output> {
    constructor(
        private repository: ITaskRepository
    ) { }

    async execute({ userId, page, take }: Input): Promise<Output> {
        const promises: [Promise<number>, Promise<Task[] | []>] = [
            this.repository.total(userId),
            this.repository.findMany(userId, page, take)
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