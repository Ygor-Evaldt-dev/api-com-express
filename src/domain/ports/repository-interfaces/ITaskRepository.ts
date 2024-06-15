import Task from "@/domain/models/task/Task";

export default interface ITaskRepository {
    save(task: Task): Promise<void>;
    findUnique(id: string): Promise<Task | null>;
    findMany(userId: string, page: number, take: number, id?: string, title?: string, finished?: boolean): Promise<Task[] | []>;
    delete(id: string): Promise<void>;
    total(userId?: string, id?: string, title?: string, finished?: boolean): Promise<number>;
}