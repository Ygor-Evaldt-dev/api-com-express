import Task from "@/domain/models/task/Task";

export default interface ITaskRepository {
    save(task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(userId: string, page: number, take: number): Promise<Task[] | []>
    delete(id: string): Promise<void>,
    total(userId?: string): Promise<number>
}