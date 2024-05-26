import Task from "@/core/models/taks/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import FileOrm from "@/infra/db/FileOrm";

import { TaskEntity } from "./TaskEntity";

export default class TaskLocalRepository implements ITaskRepository {
    private orm = new FileOrm();

    async save(task: Task): Promise<void> {
        const db = await this.orm.open();

        db.tasks.push(this.toDataBase(task));
        await this.orm.save(db);
    }
    async find(id: string): Promise<Task | null> {
        const db = await this.orm.open();
        const task = db.tasks.find(task => task.id === id);

        return task
            ? this.fromDataBase(task)
            : null
    }

    private toDataBase({ id, title, finished, description }: Task): TaskEntity {
        return ({
            id: id.value,
            titulo: title.lowerCase,
            finalizada: finished,
            descricao: description
        });
    }

    private fromDataBase(task: TaskEntity): Task {
        return new Task({
            id: task.id,
            title: task.titulo,
            description: task.descricao,
            finished: task.finalizada
        });
    }

}