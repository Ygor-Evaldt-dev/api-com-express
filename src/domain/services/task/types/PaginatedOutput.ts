import Task from "@/domain/models/task/Task";

export type PaginatedOutput = {
    totalRegisters: number;
    totalPages: number,
    page: number,
    take: number,
    registers: Task[] | [];
}