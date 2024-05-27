import FindTask from "@/application/services/task/Find";
import Task from "@/core/models/taks/Task";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";

import tasks from "./data";

describe("find task", () => {
    function makeSut() {
        const repository = new TaskLocalRepository();
        const usecase = new FindTask(repository);

        return ({
            repository,
            usecase
        });
    }

    test("should to find an exists task", async () => {
        const { usecase, repository } = makeSut();

        const newTask = new Task({ ...tasks.new, id: "275fbd6b-b15f-403b-8fd2-203070d4708c" });
        await repository.save(newTask);

        const task = await usecase.execute(newTask.id.value);
        //deletar tarefa.

        expect(task).toBeDefined();
        expect(task?.id.value).toBe(newTask.id.value);
    });
})