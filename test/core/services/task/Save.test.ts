import Save from "@/application/services/task/Save";
import TaskLocalRepository from "@/infra/repositories/task/TaskLocalRepository";

import tasks from "./data";

describe("save task", () => {
    function makeSut() {
        const repository = new TaskLocalRepository();
        const usecase = new Save(repository);

        return ({
            repository,
            usecase
        });
    }

    test("should save a new task", async () => {
        const { usecase } = makeSut();
        const task = await usecase.execute(tasks.new);

        expect(task).toBeDefined();
        expect(task).toHaveProperty("id");
    });
})