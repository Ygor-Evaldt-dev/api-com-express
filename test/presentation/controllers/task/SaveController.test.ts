import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";
import tasks from "../../util/tasks";

describe("save controller", () => {
    const api = AxiosInstance.generate();

    test("Should return http status 201 if a new task is created", async () => {
        const headers: any = await Authorization.getHeaders();
        const { status } = await api.post("/task", tasks.new, { headers });

        expect(status).toBe(201);
    });
});