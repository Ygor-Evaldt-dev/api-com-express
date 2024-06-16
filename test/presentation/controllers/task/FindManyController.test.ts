import Authorization from "../../util/Authorization";
import AxiosInstance from "../../util/AxiosInstance";
import users from "../../util/users";

describe("find many controller", () => {
    const api = AxiosInstance.generate();
    const params = {
        page: 0,
        take: 25,
        userId: users.validCredentials.id
    }

    test("should return http status code 401 unauthorized if user is not logged", async () => {
        try {
            const { page, take, userId } = params;
            const { status } = await api.get(`/task/findMany/${userId}/${page}/${take}`);

            expect(status).toBe(401);
        } catch ({ response }: any) {
            expect(response.status).toBe(401);
        }
    });

    test("should return http status code 404 not found if there are no tasks", async () => {
        try {
            const headers: any = await Authorization.getHeaders();

            const { page, take } = params;
            const { status } = await api.get(`/task/findMany/anyUserID/${page}/${take}`, { headers });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });

    test("should return http status code 200 ok if user has tasks", async () => {
        try {
            const headers: any = await Authorization.getHeaders();

            const { page, take, userId } = params;
            const { status, data } = await api.get(`/task/findMany/${userId}/${page}/${take}`, { headers });

            expect(status).toBe(200);
            expect(data.totalRegisters).toBeGreaterThan(0);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });
});