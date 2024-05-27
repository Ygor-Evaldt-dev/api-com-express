import Task from "@/core/models/task/Task";

export default interface ITaskRepository {
    save(task: Task): Promise<void>;
    find(id: string): Promise<Task | null>;
    delete(id: string): Promise<void>
}