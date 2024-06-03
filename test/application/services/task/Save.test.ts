import Save from "@/application/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";

import User from "@/core/models/user/User";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";

import tasks from "../shared/tasks";
import users from "../shared/users";
import Task from "@/core/models/task/Task";

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

        const user = new User(users.new);
        await userRepository.save(user);

        const task = new Task({ ...tasks.new, userId: user.id.value });
        const exec = async () => await usecase.execute({
            title: task.title.lowerCase,
            userId: task.userId,
            id: task.id.value
        });

        await expect(exec()).resolves.toBeUndefined();

        await userRepository.delete(user.id.value);
        await taskRepository.delete(task.id.value);
    });
});