import Task from "@/core/models/task/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import FileOrm from "@/infra/db/FileOrm";

import { IEntity } from "./IEntity";

export default class LocalRepository implements ITaskRepository {
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

    async findAll(page: number, take: number): Promise<[] | Task[]> {
        const db = await this.orm.open();
        const totalPages = db.tasks.length / take;
        if (page > totalPages || page < 0) return [];

        const begin = (page == 0) ? page : page * take;

        return db.tasks.slice(begin, take)
    }

    async delete(id: string): Promise<void> {
        const db = await this.orm.open();
        db.tasks = db.tasks.filter(task => task.id !== id);

        this.orm.save(db);
    }

    async total(): Promise<number> {
        const db = await this.orm.open();
        return db.tasks.length;
    }

    private toDataBase({ id, title, finished, description }: Task): IEntity {
        return ({
            id: id.value,
            titulo: title.lowerCase,
            finalizada: finished,
            descricao: description
        });
    }

    private fromDataBase(task: IEntity): Task {
        return new Task({
            id: task.id,
            title: task.titulo,
            description: task.descricao,
            finished: task.finalizada
        });
    }

}