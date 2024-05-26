import Taks from "@/core/models/taks/Task";
import IDb from "@/core/ports/IDb";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import FileOrm from "@/infra/db/FileOrm";

export default class TaskLocalRepository implements ITaskRepository {
    private orm = new FileOrm();

    async save(task: Taks): Promise<void> {
        const db = await this.orm.open();

        db.tasks.push(task);
        await this.orm.save(db);
    }
    async find(id: string): Promise<Taks | null> {
        throw new Error("Method not implemented.");
    }

}