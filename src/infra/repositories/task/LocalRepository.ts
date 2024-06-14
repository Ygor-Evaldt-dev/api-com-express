import Task from "@/domain/models/task/Task";
import ITaskRepository from "@/domain/ports/repository-interfaces/ITaskRepository";
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

    async findBy(userId: string, page: number, take: number): Promise<[] | Task[]> {
        const db = await this.orm.open();
        const tasks = db.tasks.filter(task => task.id_usuario === userId);

        const totalPages = Math.ceil(tasks.length / take);

        if (page > totalPages) return tasks.slice(totalPages, (totalPages + 1) * take);
        if (page < 0) return tasks.slice(0, 1 * take);

        const begin = page * take;
        const end = (page + 1) * take;

        return tasks.slice(begin, end);
    }

    async delete(id: string): Promise<void> {
        const db = await this.orm.open();
        db.tasks = db.tasks.filter(task => task.id !== id);

        await this.orm.save(db);
    }

    async total(userId?: string): Promise<number> {
        const db = await this.orm.open();
        return userId
            ? db.tasks.filter(task => task.id_usuario === userId).length
            : db.tasks.length;
    }

    private toDataBase({ id, title, finished, description, userId }: Task): IEntity {
        return ({
            id: id.value,
            titulo: title.lowerCase,
            finalizada: finished,
            descricao: description,
            id_usuario: userId
        });
    }

    private fromDataBase({ id, titulo, descricao, finalizada, id_usuario }: IEntity): Task {
        return new Task({
            id,
            title: titulo,
            description: descricao,
            finished: finalizada,
            userId: id_usuario
        });
    }

}