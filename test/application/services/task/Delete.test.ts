import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import DeleteTask from "@/application/services/task/Delete";

import createNewTask from "../shared/createNewTask";

describe('delete task', () => {
    function makeSut() {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();
        const usecase = new DeleteTask(taskRepository);

        return ({
            userRepository,
            taskRepository,
            usecase
        });
    }

    test("should throw error if the task doesn't exists", async () => {
        const { usecase } = makeSut();
        const exec = async () => await usecase.execute("any");
        await expect(exec()).rejects.toThrow("Tarefa não cadastrada");
    });

    test("should delete an exists task", async () => {
        const { usecase, userRepository } = makeSut();
        const { user, task } = await createNewTask();

        await userRepository.delete(user.id.value);

        const exec = async () => await usecase.execute(task.id.value);
        await expect(exec()).resolves.toBeUndefined();
    });
});