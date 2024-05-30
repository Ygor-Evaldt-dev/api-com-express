import FindTask from "@/application/services/task/Find";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import createNewTask from "../shared/createNewTask";

describe("find task", () => {
    function makeSut() {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();
        const usecase = new FindTask(taskRepository);

        return ({
            userRepository,
            taskRepository,
            usecase
        });
    }

    test("should to find an exists task", async () => {
        const { usecase, userRepository, taskRepository } = makeSut();
        const { user, task } = await createNewTask();

        const foundTask = await usecase.execute(task.id.value);

        await taskRepository.delete(task.id.value);
        userRepository.delete(user.id.value);

        expect(foundTask).toBeDefined();
        expect(foundTask?.id.value).toBe(task.id.value);
    });
});