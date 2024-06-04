import AxiosInstance from "../../util/AxiosInstance";
import users from "../../util/users";

describe("login controller", () => {
    const api = AxiosInstance.generate();
    const endpoint = "/user/login";

    test("should authenticate a valid user", async () => {
        const { status, data } = await api.post(endpoint, users.validCredentials);

        expect(status).toBe(200);
        expect(data.token).toBeDefined();
        expect(data.user?.email?.complete).toBe(users.validCredentials.email);
    });

    test("should return bad request http status if email is not provided", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...users.validCredentials,
                email: null
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;
            expect(status).toBe(400);
            expect(data).toBe("E-mail não informado");
        }
    });

    test("should return bad request http status if password is not provided", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...users.validCredentials,
                password: null
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(400);
            expect(data).toBe("Senha não informada");
        }
    });

    test("should return not found http status if user is not registered", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...users.validCredentials,
                email: "any@gmail.com"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(404);
            expect(data).toBe("Usuário não cadastrado");
        }
    });

    test("should return unauthorized http status if user password is not valid", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...users.validCredentials,
                password: "invalidPassword"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(401);
            expect(data).toBe("Senha inválida");
        }
    });

    test.skip("should return service unavailable http status if something is wrong", async () => {
        try {
            const { status } = await api.post(endpoint, {
                ...users.validCredentials,
                password: "invalidPassword"
            });

            expect(status).toBe(200);
        } catch ({ response }: any) {
            const { status, data } = response;

            expect(status).toBe(503);
            expect(data).toBe("Serviço não disponível, tente mais tarde");
        }
    });
});