import FindBy from "@/application/services/task/FindBy";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import saveFiveTasksToTest from "../shared/saveFiveTasksToTest";
import UserLocalRepository from "@/infra/repositories/user/LocalRepository";
import Task from "@/core/models/task/Task";
import ITaskRepository from "@/core/ports/repository-interfaces/ITaskRepository";
import IUserRepository from "@/core/ports/repository-interfaces/IUserRepository";
import User from "@/core/models/user/User";

describe("find by", () => {
    function makeSut() {
        const userRepository = new UserLocalRepository();
        const taskRepository = new TaskLocalRepository();
        const usecase = new FindBy(taskRepository);

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
});