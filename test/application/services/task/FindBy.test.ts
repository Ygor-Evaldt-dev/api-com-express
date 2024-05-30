import FindBy from "@/application/services/task/FindBy";
import TaskLocalRepository from "@/infra/repositories/task/LocalRepository";
import saveFiveTasksToTest from "../shared/saveFiveTasksToTest";

describe("find by", () => {
    function makeSut() {
        const taskRepository = new TaskLocalRepository();
        const usecase = new FindBy(taskRepository);

        return ({
            taskRepository,
            usecase
        });
    }

    test("should to find just user's tasks", async () => {
        const { usecase, taskRepository } = makeSut();
        const { user1, user2, tasks } = await saveFiveTasksToTest();

        const userTasks = await usecase.execute({
            userId: user1.id.value,
            page: 0,
            take: 4
        });

        expect(userTasks.registers.length).toBe(3);
    });
});