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

    async findUnique(id: string): Promise<Task | null> {
        const db = await this.orm.open();
        const task = db.tasks.find(task => task.id === id);

        return task
            ? this.fromDataBase(task)
            : null
    }

    async findMany(userId: string, page: number, take: number, id?: string, title?: string, finished?: boolean): Promise<[] | Task[]> {
        const db = await this.orm.open();

        const tasks = db.tasks.filter(this.filterFunction(userId, id, title, finished));

        const totalPages = this.getTotalPages(tasks.length, take);

        if (page > totalPages) return this.pageIsGraterThan(totalPages, take, tasks);
        if (page < 0) return this.pageIsSmallerThanZero(take, tasks);

        const { begin, end } = this.getBeginEnd(page, take);

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

    private filterFunction(userId: string, id?: string, title?: string, finished?: boolean) {
        return (task: any) => {
            if (task.id_usuario !== userId) {
                return false;
            }
            if (id && task.id !== id) {
                return false;
            }
            if (title && task.titulo !== title) {
                return false;
            }
            if (finished !== undefined && task.finalizada !== finished) {
                return false;
            }
            return true;
        };
    }

    private getTotalPages(amountRegisters: number, take: number): number {
        return Math.ceil(amountRegisters / take);
    }

    private getBeginEnd(page: number, take: number): { begin: number, end: number } {
        return ({
            begin: page * take,
            end: (page + 1) * take
        });
    }

    private pageIsGraterThan(totalPages: number, take: number, tasks: Task[]): Task[] {
        return tasks.slice(totalPages, (totalPages + 1) * take);
    }

    private pageIsSmallerThanZero(take: number, tasks: Task[]): Task[] {
        const start = 0;
        const end = 1 * take;

        return tasks.slice(start, end);
    }

}