import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";

describe("delete controller", () => {
    const api = AxiosInstance.generate();

    test("Should return http status 200 if to delete with success", async () => {
        const headers: any = await Authorization.getHeaders();
        const id = "970f414a-89fc-4305-afdc-70929c06ec3e"

        const { status } = await api.delete(`/task/delete/${id}`, { headers });
        expect(status).toBe(200);
    });

    test("Should return http status 404 not found if the task is not exists", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const { status } = await api.delete("/task/delete/b4d3a1ba-5bc6-4a7b-86e5-896b610af1de", { headers });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });
});