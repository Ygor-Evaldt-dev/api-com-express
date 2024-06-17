import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";
import users from "../../util/users";

describe("find many controller", () => {
    const api = AxiosInstance.generate();

    const page = 0;
    const take = 25;
    const userId = users.validCredentials.id;

    test("should return http status code 401 unauthorized if user is not logged", async () => {
        try {
            const { status } = await api.get(`/task/${page}/${take}`);

            expect(status).toBe(401);
        } catch ({ response }: any) {
            expect(response.status).toBe(401);
        }
    });

    test("should return http status code 404 not found if there are no tasks", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const { status } = await api.get(`/task/${page}/${take}`, { headers });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });

    test("should return http status code 400 bad request if url param page is invalid", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const { status } = await api.get(`/task/invalid/${take}`, { headers });

            expect(status).toBe(400);
        } catch ({ response }: any) {
            expect(response.status).toBe(400);
        }
    });

    test("should return http status code 400 bad request if url param take is invalid", async () => {
        try {
            const headers: any = await Authorization.getHeaders();
            const { status } = await api.get(`/task/${page}/invalid`, { headers });

            expect(status).toBe(400);
        } catch ({ response }: any) {
            expect(response.status).toBe(400);
        }
    });

    test.skip("should return http status code 200 ok if user has tasks", async () => {
        try {
            const headers: any = await Authorization.getHeaders();

            const { status, data } = await api.get(`/task/${page}/${take}`, { headers });

            expect(status).toBe(200);
            expect(data.totalRegisters).toBeGreaterThan(0);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });
});