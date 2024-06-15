import FindMany from "@/domain/services/task/FindMany";

import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import ITaskRepository from "@/domain/ports/repository-interfaces/ITaskRepository";

import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import IUserRepository from "@/domain/ports/repository-interfaces/IUserRepository";

import saveFiveTasksToTest from "../shared/saveFiveTasksToTest";
import Task from "@/domain/models/task/Task";
import User from "@/domain/models/user/User";

describe("find by", () => {
    function makeSut() {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();
        const usecase = new FindMany(taskRepository);

        return ({
            userRepository,
            taskRepository,
            usecase
        });
    }

    async function deleteTestTasks(repository: ITaskRepository, tasks: Task[]): Promise<void> {
        for (const task of tasks) {
            await repository.delete(task.id.value);
        }
    }

    async function deleteTestUser(repository: IUserRepository, users: User[]): Promise<void> {
        for (const user of users) {
            await repository.delete(user.id.value);
        }
    }

    test("should to find just user's tasks", async () => {
        const { usecase, taskRepository, userRepository } = makeSut();
        const { user1, user2, tasks } = await saveFiveTasksToTest();

        const userTasks = await usecase.execute({
            userId: user1.id.value,
            page: 0,
            take: 4
        });

        await deleteTestTasks(taskRepository, tasks);
        await deleteTestUser(userRepository, [user1, user2]);

        expect(userTasks.registers.length).toBe(3);
    });

    test("should to find any task when user don't have tasks", async () => {
        const { usecase } = makeSut();
        const userTasks = await usecase.execute({
            userId: "any",
            page: 0,
            take: 10
        });

        expect(userTasks.registers.length).toBe(0);
    });

    test("should return correct page sended to get pagination", async () => {
        const { usecase } = makeSut();
        const userTasks = await usecase.execute({
            userId: "any",
            page: 0,
            take: 10
        });

        expect(userTasks.take).toBe(10);
    });

    test("should return correct take sended to get pagination", async () => {
        const { usecase } = makeSut();
        const userTasks = await usecase.execute({
            userId: "any",
            page: 1,
            take: 10
        });

        expect(userTasks.page).toBe(1);
    });
});