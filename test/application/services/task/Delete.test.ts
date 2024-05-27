import DeleteTask from "@/application/services/task/Delete";
import Task from "@/core/models/task/Task";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";

import tasks from "./data";

describe('delete task', () => {
    function makeSut() {
        const repository = new TaskLocalRepository();
        const usecase = new DeleteTask(repository);

        return ({
            repository,
            usecase
        });
    }

    test("should throw error if the task doesn't exists", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute("any");
        await expect(exec()).rejects.toThrow("Tarefa não cadastrada");
    });

    test("should delete an exists task", async () => {
        const { usecase, repository } = makeSut();

        const newTask = new Task({ ...tasks.new });
        await repository.save(newTask);

        const exec = async () => await usecase.execute(newTask.id.value);
        await expect(exec()).resolves.toBeUndefined();
    });
});