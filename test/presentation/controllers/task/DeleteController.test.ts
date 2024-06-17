import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";

describe("delete controller", () => {
    const api = AxiosInstance.generate();

    test.skip("Should return http status 200 if to delete with success", async () => {
        const headers: any = await Authorization.getHeaders();
        const id = "8c1ea1ae-4f99-40d4-a9be-962fee883e4d"

        const { status } = await api.delete(`/task/${id}`, { headers });
        expect(status).toBe(200);
    });

    test("Should return http status 404 not found if the task is not exists", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const { status } = await api.delete("/task/8c1ea1ae-4f99-40d4-a9be-962fee883e4d", { headers });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });
});