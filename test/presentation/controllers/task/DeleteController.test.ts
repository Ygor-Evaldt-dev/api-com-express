import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";
import tasks from "../../util/tasks";

describe("delete controller", () => {
    const api = AxiosInstance.generate();

    test("Should return http status 201 if a new task is created", async () => {
        const headers: any = await Authorization.getHeaders();
        const { status } = await api.post("/task/delete/97014362-0592-43de-a835-1d191cd3eb8a", { headers });

        expect(status).toBe(201);
    });
});