import Save from "@/application/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import User from "@/core/models/user/User";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import tasks from "../shared/tasks";
import users from "../shared/users";

describe("save task", () => {
    function makeSut() {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();
        const usecase = new Save(taskRepository);

        return ({
            userRepository,
            taskRepository,
            usecase
        });
    }

    test("should save a new task", async () => {
        const { usecase, userRepository, taskRepository } = makeSut();

        const user = new User(users.exists);
        await userRepository.save(user);

        const task = await usecase.execute({ ...tasks.new, userId: user.id.value });

        await userRepository.delete(user.id.value);
        taskRepository.delete(task.id.value);

        expect(task).toBeDefined();
        expect(task).toHaveProperty("id");
    });
});