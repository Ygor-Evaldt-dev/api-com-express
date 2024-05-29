import Task from "@/core/models/task/Task";

export default interface ITaskRepository {
    save(task: Task): Promise<void>;
    find(id: string): Promise<Task | null>;
    findBy(userId: string, page: number, take: number): Promise<Task[] | []>
    delete(id: string): Promise<void>,
    total(userId?: string): Promise<number>
}