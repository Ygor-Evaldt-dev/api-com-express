import AxiosInstance from "../../util/AxiosInstance";
import Authorization from "../../util/Authorization";
import users from "../../util/users";

describe("filter controller", () => {
    const api = AxiosInstance.generate();
    const params = {
        page: 0,
        take: 25,
        userId: users.validCredentials.id
    }
    const queryParams = {
        id: "",
        title: "",
        finished: "false"
    }

    test("Should return http status code 200 if valid url params are provided and user has tasks", async () => {
        const headers = await Authorization.getHeaders();

        const { userId, page, take } = params;
        const { status, data } = await api.get(`/task/filter/${userId}/${page}/${take}`, {
            headers,
            params: queryParams
        });

        expect(status).toBe(200);
        expect(data.totalRegisters).toBeGreaterThan(0);
    });

    test("Should return http status code 404 not found if user has no tasks", async () => {
        try {
            const headers = await Authorization.getHeaders();

            const { page, take } = params;
            const { status, data } = await api.get(`/task/filter/any_id/${page}/${take}`, {
                headers,
                params: queryParams
            });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });

    test("Should return http status code 404 not found if page is grader than totalPages", async () => {
        try {
            const headers = await Authorization.getHeaders();

            const { userId, page, take } = params;
            const { status, data } = await api.get(`/task/filter/${userId}/100/${take}`, {
                headers,
                params: queryParams
            });

            expect(status).toBe(404);
        } catch ({ response }: any) {
            expect(response.status).toBe(404);
        }
    });

    test("Should return http status code 400 bad request if take to be zero", async () => {
        try {
            const headers = await Authorization.getHeaders();

            const { userId, page, take } = params;
            const { status, data } = await api.get(`/task/filter/${userId}/${page}/0`, {
                headers,
                params: queryParams
            });

            expect(status).toBe(400);
        } catch ({ response }: any) {
            expect(response.status).toBe(400);
        }
    });
});