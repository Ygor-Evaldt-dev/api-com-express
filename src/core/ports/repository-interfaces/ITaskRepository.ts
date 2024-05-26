import Taks from "@/core/models/taks/Task";

export default interface ITaskRepository {
    save(task: Taks): Promise<void>
    find(id: string): Promise<Taks | null>
}