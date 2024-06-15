import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";

describe("find controler", () => {
    const api = AxiosInstance.generate();

    test("should return http status code 401 unauthorized if user is not logged", async () => {
        try {
            const id = "any_id";
            const { status } = await api.get(`/task/find/${id}`);

            expect(status).toBe(401);
        } catch ({ response }: any) {
            expect(response.status).toBe(401);
        }
    });

    test("should return http status code 404 not found if task is not exists", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const id = "any_id";
            const { status, data } = await api.get(`/task/find/${id}`, { headers });

            expect(status).toBe(200);
            expect(data.id.value).toBe(id);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });

    test("should return http status code 200 if to find an exists task", async () => {
        const headers: any = await Authorization.getHeaders();
        const id = "41fd2331-6769-4dcf-ac21-0611362816a9";
        const { status, data } = await api.get(`/task/find/${id}`, { headers });

        expect(status).toBe(200);
        expect(data.id.value).toBe(id);
    });
});